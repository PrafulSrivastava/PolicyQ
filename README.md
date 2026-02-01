# PolicyQ — Read policies your way

> **In today’s world, there is no excuse to be uninformed. Information is abundant, but clarity is scarce. PolicyQ bridges the gap between access and understanding.**

PolicyQ is a modern knowledge interface designed to help users navigate complex documents and government policies with precision. Unlike traditional search tools that force summaries or inject opinions, PolicyQ empowers users to ask directly and verify instantly.

## ◈ The Philosophy

PolicyQ is built on the belief that **information is already available**—in PDFs, notebooks, and code—but the problem is the **time and effort** required to extract truth. 

- **Agency over Automation**: We don't spoon-feed answers. We provide the tools for you to reach your own conclusions.
- **Verification over Summarization**: Every response is anchored by direct citations. No opinions injected, no summaries forced.
- **Modern Reality**: We acknowledge that AI and original documents must coexist. PolicyQ is the bridge between the two.

---

## ◈ Core Features

- **Direct Q&A**: Conversational interface optimized for complex policy interrogation.
- **Instant Citations**: Side-by-side verification with highlighted passages from original sources.
- **Editorial Design**: A sophisticated, monochrome, and brutalist UI that feels like a professional tool, not a government portal.
- **Sourced Truth**: Powered by LlamaCloud for high-precision retrieval and Groq for near-instant inference.

---

## ◈ Technical Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) with [Its Hover](https://www.itshover.com/) animated icons.
- **Search & Retrieval**: [LlamaCloud](https://llamaindex.ai/llamacloud) for intelligent document parsing and semantic search.
- **Inference**: [Groq](https://groq.com/) for low-latency LPU-powered responses.

---

## ◈ Getting Started

### Prerequisites

- Node.js 18.x or later
- A LlamaCloud API Key
- A Groq API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/policyq.git
   cd policyq
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   LLAMA_CLOUD_API_KEY=your_key_here
   GROQ_API_KEY=your_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## ◈ Design Intent

The PolicyQ interface uses a **monochrome, stylish aesthetic** to reflect calm confidence. 
- **Typography**: Space Grotesk (Display) and Inter (Body) for high-contrast readability.
- **Visual Language**: Bold borders (3px), brutalist offset shadows, and motion-first animated icons.
- **Interaction**: Subtle micro-animations that signify intent without causing distraction.

---

## ◈ License

Designed and developed for those who value clarity. 
Powered by the [LlamaIndex](https://llamaindex.ai/) ecosystem.
