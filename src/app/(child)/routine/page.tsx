"use client";

import { Calendar } from "lucide-react";

export default function RoutinePage() {
  return (
    <div className="page-container">
      <div className="module-header">
        <h1>My Day</h1>
        <p>Your daily schedule and activities.</p>
      </div>
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
        <Calendar size={48} strokeWidth={1.5} style={{ opacity: 0.4, marginBottom: "16px" }} />
        <p>Coming soon in the next phase!</p>
      </div>
    </div>
  );
}
