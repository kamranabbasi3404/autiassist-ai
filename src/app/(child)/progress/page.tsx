"use client";

import { BarChart2 } from "lucide-react";

export default function ProgressPage() {
  return (
    <div className="page-container">
      <div className="module-header">
        <h1>Progress</h1>
        <p>See how much you have learned!</p>
      </div>
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <BarChart2 size={48} strokeWidth={1.5} style={{ opacity: 0.4, marginBottom: "16px" }} />
        <p>Coming soon in the next phase!</p>
      </div>
    </div>
  );
}
