"use client";

import React from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          maxWidth: "480px",
          background: "#FFFFFF",
          border: "2px solid var(--color-border)",
          borderRadius: "24px",
          padding: "48px 32px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Soft, friendly circular icon background */}
        <div
          style={{
            background: "var(--color-accent-light, #e0f2fe)",
            color: "var(--color-accent, #0284c7)",
            padding: "20px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 16px rgba(2, 132, 199, 0.05)",
          }}
        >
          <Sparkles size={40} strokeWidth={1.5} style={{ animation: "pulseMascot 2s infinite ease-in-out" }} />
        </div>

        <div>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "800",
              color: "var(--color-text)",
              marginBottom: "12px",
              fontFamily: "var(--font-family)",
            }}
          >
            Welcome to AutiAssist AI!
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-text-secondary)",
              lineHeight: "1.5",
              fontFamily: "var(--font-family)",
              marginBottom: "8px",
            }}
          >
            Your friendly, sensory-safe learning companion.
          </p>
        </div>

        {/* Scaffolding instruction banner */}
        <div
          style={{
            background: "var(--color-bg-secondary, #f8fafc)",
            border: "2px dashed var(--color-border)",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <ArrowLeftRight size={24} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-secondary)",
              lineHeight: "1.4",
              margin: 0,
            }}
          >
            👈 Tap any practice tool in the sidebar on the left side to start learning and playing!
          </p>
        </div>
      </motion.div>

      {/* Embedded mascot soft pulse animation */}
      <style>{`
        @keyframes pulseMascot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
