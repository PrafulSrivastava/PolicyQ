# 🚀 Application Features Overview

This document provides a detailed breakdown of the features available in the Knowledge Base Query Client.

## 📚 1. Knowledge Base Management (Data Ingestion)
Located in the **Data Sources** view, this module handles the creation and management of the context data used for reasoning.

*   **Manual Document Entry**: 
    *   Users can manually type or paste a **Title** and **Body Content** to create a new knowledge asset.
    *   Input validation ensures no empty documents are added.
*   **File Import**: 
    *   Supports importing text-based files directly from the local device.
    *   **Supported Formats**: `.txt`, `.md`, `.json`, `.csv`.
    *   Automatically extracts the filename as the title and file contents as the body.
*   **Live Indexing**: 
    *   Documents are added to the active session state immediately.
    *   **Instant Availability**: No waiting for server-side embedding jobs; data is immediately available for injection into the AI context window.
*   **Document List View**:
    *   Displays all currently indexed documents.
    *   Shows metadata including Title, ID snippet, timestamp, and a content preview.
*   **CRUD Operations**:
    *   **Create**: via Manual Entry or Upload.
    *   **Read**: via List View.
    *   **Delete**: Specific documents can be removed from the index using the trash icon.

## 💬 2. Interactive Query Engine (Chat)
Located in the **Query Index** view, this is the core interface for retrieving information from the knowledge base.

*   **Context-Aware Reasoning (Client-Side RAG)**:
    *   Dynamically injects all valid documents from the Data Sources tab into the Gemini 1.5 Flash System Instruction.
    *   Ensures answers are strictly grounded in the provided data.
*   **Multi-Turn Conversation**:
    *   Maintains a history of the current chat session.
    *   Allows the AI to reference previous questions and answers for a natural conversational flow.
*   **Real-Time Feedback**:
    *   Visual indicators for "Reasoning..." states while the model processes the query.
    *   Auto-scrolling to the latest message.
*   **System Instructions**:
    *   Configured to act as a precise assistant.
    *   Instructed to admit ignorance if the answer is not found in the provided documents (minimizing hallucinations).

## ⚡ 3. Quick Query Interface (Landing Page)
Located at the root route (`/`), this serves as a streamlined entry point for simple questions.

*   **Simplified UI**: A clean, distraction-free search bar focused solely on asking a question.
*   **Input Enhancements**:
    *   **Character Counter**: Visual limit (500 chars) to ensure concise queries.
    *   **Auto-Resize**: Text area adjusts to fit content.
    *   **Keyboard Shortcuts**: `Enter` to submit, `Shift+Enter` for new lines.
*   **Clear & Reset**: One-click button to reset the interface for a new query.
*   **Suggested Questions**: Pre-populated chips to help users understand what to ask.
*   **Result Presentation**:
    *   Displays the AI Analysis clearly.
    *   Expandable "Sources" section (Architectural placeholder for future vector-db integration).

## 🛠️ 4. Technical Capabilities

*   **Hybrid Architecture**:
    *   **Client-Side Reasoning**: The Chat interface runs logic in the browser (via `geminiService.ts`) to allow for instant RAG with local state.
    *   **Server-Side API**: The Quick Query interface uses a Next.js API Route (`/api/query`) for secure, server-side processing.
*   **Performance Optimization**:
    *   **In-Memory Caching**: The API route implements a 5-minute cache (`Map<string, CacheEntry>`) for identical queries to reduce API latency and costs.
    *   **Request Timeouts**: API logic includes a race condition to handle timeouts (25s) gracefully.
*   **Responsive Design**:
    *   Built with **Tailwind CSS**.
    *   Fully responsive sidebar (collapsible on mobile) and flexible layouts.
    *   Custom scrollbars for a native application feel.
