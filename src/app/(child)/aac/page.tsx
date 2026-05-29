"use client";

import { MessageSquare } from "lucide-react";

export default function AACPage() {
  return (
    <div className="page-container">
      <div className="module-header">
        <h1>AAC Communication Board</h1>
        <p>Tap pictures to build sentences and speak them!</p>
      </div>
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <MessageSquare size={48} strokeWidth={1.5} style={{ opacity: 0.4, marginBottom: "16px" }} />
        <p>Coming soon in the next phase!</p>
      </div>
    </div>
  );
}
