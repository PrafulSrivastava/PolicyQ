import { NextRequest, NextResponse } from 'next/server';
import { LlamaCloud } from "@llamaindex/llama-cloud";
import Groq from 'groq-sdk';

// --- Configuration ---
const TIMEOUT_MS = 60000;
const MIN_QUERY_LENGTH = 5;
const MAX_QUERY_LENGTH = 500;

export async function POST(req: NextRequest) {
  try {
    // 1. Environment Validation
    const requiredEnvVars = ['LLAMA_CLOUD_API_KEY', 'LLAMA_CLOUD_PIPELINE_ID', 'GROQ_API_KEY'];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingVars.length > 0) {
      console.error(`Missing environment variables: ${missingVars.join(', ')}`);
      return NextResponse.json(
        { error: 'Server configuration error. Please check server logs.' },
        { status: 500 }
      );
    }

    // 2. Input Parsing & Validation
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required and must be a string' }, { status: 400 });
    }

    const trimmedQuery = query.trim();

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      return NextResponse.json(
        { error: `Query too short. Please use at least ${MIN_QUERY_LENGTH} characters.` },
        { status: 400 }
      );
    }

    if (trimmedQuery.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        { error: `Query too long. Please keep it under ${MAX_QUERY_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // 3. Process Query
    const result = await Promise.race([
      processQuery(trimmedQuery),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS)
      )
    ]);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('API Handler Error:', error);

    if (error.message === 'TIMEOUT') {
      return NextResponse.json(
        { error: 'The request timed out. The knowledge base is taking too long to respond.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong processing your request. Please try again.' },
      { status: 500 }
    );
  }
}

async function processQuery(query: string) {
  // A. Retrieve from LlamaCloud Pipeline
  let chunks: string[] = [];
  let sourceNodes: any[] = [];

  try {
    const client = new LlamaCloud({
      apiKey: process.env.LLAMA_CLOUD_API_KEY,
    });

    const pipelineId = process.env.LLAMA_CLOUD_PIPELINE_ID;
    if (!pipelineId) throw new Error("Pipeline ID not configured");

    const results = await client.pipelines.retrieve(pipelineId, {
      query: query,
    });

    // Map the results
    if (results.retrieval_nodes) {
      chunks = results.retrieval_nodes
        .map(n => n.node?.text)
        .filter((t): t is string => !!t);

      sourceNodes = results.retrieval_nodes;
    }

  } catch (error) {
    console.error('LlamaCloud Pipeline Retrieval Error:', error);
  }

  // B. Generate Answer with Groq
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const systemPrompt = `You are a helpful and accurate assistant. 
You have access to the following context documents:
---------------------
${chunks.join('\n\n---------------------\n\n')}
---------------------

Your task is to answer the user's question based ONLY on the provided context.
If the answer is not in the context, say "I cannot find the answer in the provided documents."
Do not halluncinate or use outside knowledge.
Keep your answer clear and concise.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
    });

    const answer = chatCompletion.choices[0]?.message?.content || "No answer generated.";

    // Format sources for the UI
    const sources = sourceNodes.map((n, index) => ({
      text: (n.node?.text || "").substring(0, 300) + "...",
      score: n.score ?? (1.0 - index * 0.1)
    }));

    return { answer, sources };

  } catch (error) {
    console.error('Groq Generation Error:', error);
    throw new Error('Failed to generate answer from Groq.');
  }
}
