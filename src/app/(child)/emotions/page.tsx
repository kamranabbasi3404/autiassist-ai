"use client";

import { Smile } from "lucide-react";

export default function EmotionsPage() {
  return (
    <div className="page-container">
      <div className="module-header">
        <h1>Emotions</h1>
        <p>How are you feeling today?</p>
      </div>
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <Smile size={48} strokeWidth={1.5} style={{ opacity: 0.4, marginBottom: "16px" }} />
        <p>Coming soon in the next phase!</p>
      </div>
    </div>
  );
}
