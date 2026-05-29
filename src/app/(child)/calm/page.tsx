"use client";

import { Heart } from "lucide-react";

export default function CalmPage() {
  return (
    <div className="page-container">
      <div className="module-header">
        <h1>Calm Down</h1>
        <p>Lets relax and feel better.</p>
      </div>
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <Heart size={48} strokeWidth={1.5} style={{ opacity: 0.4, marginBottom: "16px" }} />
        <p>Coming soon in the next phase!</p>
      </div>
    </div>
  );
}
