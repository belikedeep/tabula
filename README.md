# Tabula

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/108c1817-3cd6-45a7-9751-0d676e1b2a31" />

Tabula is a real-time collaborative workspace integrating whiteboard tools and rich text editing in a unified environment. 

## 🚀 Features

- **Real-Time Collaboration**: Concurrent editing powered by Convex with persistent state synchronization.
- **Interactive Whiteboard**: Integrated Excalidraw using a custom React wrapper.
- **Rich Text Editing**: EditorJS integration for smooth document creation.
- **Role-Based Access Control**: Secure entry and permission management using Kinde Authentication.
- **Type-Safe APIs**: Generated end-to-end type safety.

## 💻 Tech Stack

- **Frontend**: Next.js (React), TypeScript, Tailwind CSS
- **Backend/Database**: Convex (Real-time sync and data-store)
- **Authentication**: Kinde Auth
- **Editors**: Excalidraw, EditorJS

## 🛠️ Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/iamdeepakmardi/tabula.git
   cd tabula
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Environment Variables
   Create a `.env.local` file and add your Kinde and Convex credentials.

4. Start the frontend and backend servers
   ```bash
   npm run dev
   ```

## 🏗 Architecture & Learnings

- Managing state consistency across multiple clients during high-frequency drawing events using Convex.
- Resolving React wrapper issues for complex third-party tools like EditorJS and Excalidraw within a Next.js App Router context.
- Implementing robust RBAC through Next.js middleware and Kinde to protect organizational data.
