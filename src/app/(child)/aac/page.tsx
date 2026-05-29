"use client";

import React, { useState } from "react";
import { useAACBoard } from "@/features/aac/hooks/use-aac-board";
import { AAC_SYMBOLS, AAC_CATEGORIES, AACCategoryType } from "@/features/aac/data/symbols";
import DynamicIcon from "@/components/common/dynamic-icon";
import {
  Volume2,
  Trash2,
  Delete,
  Heart,
  Sparkles,
  Star,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AACPage() {
  const {
    selectedSymbols,
    favorites,
    addSymbol,
    removeSymbol,
    clearSentence,
    speakSentence,
    saveToFavorites,
    deleteFavorite,
    loadFavorite,
    isCurrentSentenceFavorited,
  } = useAACBoard();

  const [activeCategory, setActiveCategory] = useState<AACCategoryType | "favorites">("people");

  // Filter symbols based on active tab
  const displayedSymbols = AAC_SYMBOLS.filter((s) => s.category === activeCategory);

  return (
    <div className="page-container" style={{ paddingBottom: "40px" }}>
      {/* Header */}
      <div className="module-header" style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--color-text)" }}>AAC Communication Board</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1.05rem" }}>Tap visual cards below to build sentences and speak them!</p>
        </div>
        <div style={{ display: "flex", gap: "8px", background: "var(--color-bg-secondary)", padding: "8px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
          <Star size={18} fill="var(--color-warning)" stroke="var(--color-warning)" />
          <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Communication Training</span>
        </div>
      </div>

      {/* Top Sentence Builder Strip */}
      <div
        style={{
          background: "#FFFFFF",
          border: "2px solid var(--color-border)",
          borderRadius: "20px",
          padding: "16px 20px",
          marginBottom: "24px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.04)",
          minHeight: "110px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "relative",
        }}
      >
        {/* Sequence List */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            alignItems: "center",
            paddingRight: "10px",
          }}
        >
          {selectedSymbols.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", fontStyle: "italic", paddingLeft: "8px" }}>
              Tap words below to build your sentence...
            </p>
          ) : (
            <AnimatePresence>
              {selectedSymbols.map((symbol, index) => (
                <motion.button
                  key={`${symbol.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => removeSymbol(index)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "8px 12px",
                    background: symbol.color,
                    border: `2px solid ${symbol.borderColor}`,
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                    transition: "all 0.15s ease",
                  }}
                  title="Click to remove"
                >
                  <DynamicIcon name={symbol.icon} size={22} className="home-card-icon" style={{ color: symbol.textColor }} />
                  <span style={{ fontWeight: "700", fontSize: "0.8rem", color: symbol.textColor }}>
                    {symbol.label.toUpperCase()}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Action Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderLeft: "2px solid var(--color-border)",
            paddingLeft: "16px",
            flexShrink: 0,
          }}
        >
          {/* Heart (Favorite) */}
          <button
            className="btn btn-outline"
            onClick={saveToFavorites}
            disabled={selectedSymbols.length === 0}
            style={{
              padding: "10px",
              minWidth: "44px",
              minHeight: "44px",
              borderRadius: "12px",
              borderColor: isCurrentSentenceFavorited() ? "var(--color-error)" : "var(--color-border)",
              background: isCurrentSentenceFavorited() ? "var(--color-error-light)" : "transparent",
            }}
            title="Save to favorites"
          >
            <Heart
              size={20}
              fill={isCurrentSentenceFavorited() ? "var(--color-error)" : "none"}
              style={{ color: isCurrentSentenceFavorited() ? "var(--color-error)" : "var(--color-text-secondary)" }}
            />
          </button>

          {/* Delete last item */}
          <button
            className="btn btn-outline"
            onClick={() => removeSymbol(selectedSymbols.length - 1)}
            disabled={selectedSymbols.length === 0}
            style={{ padding: "10px", minWidth: "44px", minHeight: "44px", borderRadius: "12px" }}
            title="Remove last word"
          >
            <Delete size={20} />
          </button>

          {/* Clear all */}
          <button
            className="btn btn-outline"
            onClick={clearSentence}
            disabled={selectedSymbols.length === 0}
            style={{
              padding: "10px",
              minWidth: "44px",
              minHeight: "44px",
              borderRadius: "12px",
              borderColor: "var(--color-error)",
              color: "var(--color-error)",
            }}
            title="Clear sentence"
          >
            <Trash2 size={20} />
          </button>

          {/* Play/Speak Sentence */}
          <button
            className="btn btn-primary"
            onClick={speakSentence}
            disabled={selectedSymbols.length === 0}
            style={{
              padding: "12px 24px",
              borderRadius: "14px",
              fontSize: "1.1rem",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            title="Speak sentence aloud"
          >
            <Volume2 size={22} />
            Speak
          </button>
        </div>
      </div>

      {/* Category Navigation Tabs (Fitzgerald-coded pastel backgrounds) */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "20px",
          overflowX: "auto",
          paddingBottom: "8px",
          scrollbarWidth: "none",
        }}
      >
        {AAC_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                cursor: "pointer",
                border: `2px solid ${isActive ? cat.borderColor : "var(--color-border)"}`,
                borderRadius: "14px",
                padding: "12px 20px",
                fontWeight: "700",
                fontSize: "0.95rem",
                color: "var(--color-text)",
                background: isActive ? cat.color : "#FFFFFF",
                boxShadow: isActive ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: cat.borderColor,
                }}
              />
              {cat.label}
            </button>
          );
        })}

        {/* Favorites tab */}
        <button
          onClick={() => setActiveCategory("favorites")}
          style={{
            cursor: "pointer",
            border: `2px solid ${activeCategory === "favorites" ? "var(--color-error)" : "var(--color-border)"}`,
            borderRadius: "14px",
            padding: "12px 20px",
            fontWeight: "700",
            fontSize: "0.95rem",
            color: activeCategory === "favorites" ? "var(--color-error)" : "var(--color-text)",
            background: activeCategory === "favorites" ? "var(--color-error-light)" : "#FFFFFF",
            boxShadow: activeCategory === "favorites" ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Heart size={14} fill={activeCategory === "favorites" ? "var(--color-error)" : "none"} style={{ color: "var(--color-error)" }} />
          Saved Phrases
        </button>
      </div>

      {/* Grid Content Area */}
      <div style={{ background: "#FFFFFF", border: "2px solid var(--color-border)", borderRadius: "20px", padding: "24px", minHeight: "360px", boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>
        {activeCategory === "favorites" ? (
          /* Favorites Tab Content */
          favorites.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: "80px", color: "var(--color-text-muted)" }}>
              <Heart size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
              <p style={{ fontSize: "1.1rem" }}>No saved phrases yet.</p>
              <p style={{ fontSize: "0.9rem" }}>Build a sentence and tap the Heart button to save it here!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
              <AnimatePresence>
                {favorites.map((fav) => (
                  <motion.div
                    key={fav.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      border: "2px solid var(--color-border)",
                      borderRadius: "16px",
                      padding: "16px",
                      background: "var(--color-bg-secondary)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "12px",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", flex: 1 }}>
                      {fav.symbols.map((sym, index) => (
                        <span
                          key={`${sym.id}-${index}`}
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            background: sym.color,
                            color: sym.textColor,
                            border: `1px solid ${sym.borderColor}`,
                            borderRadius: "6px",
                            padding: "2px 6px",
                          }}
                        >
                          {sym.label.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "12px" }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => loadFavorite(fav)}
                        style={{
                          padding: "8px 16px",
                          fontSize: "0.85rem",
                          fontWeight: "700",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Volume2 size={16} />
                        Play
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => deleteFavorite(fav.id)}
                        style={{
                          padding: "8px 12px",
                          fontSize: "0.85rem",
                          fontWeight: "700",
                          borderRadius: "10px",
                          color: "var(--color-error)",
                          borderColor: "var(--color-border)",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )
        ) : (
          /* Fitzgerald Symbol Cards Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "16px",
            }}
          >
            {displayedSymbols.map((symbol) => (
              <motion.button
                key={symbol.id}
                whileHover={{ scale: 1.03, boxShadow: "0 4px 10px rgba(0,0,0,0.06)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => addSymbol(symbol)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "20px 12px",
                  background: symbol.color,
                  border: `3px solid ${symbol.borderColor}`,
                  borderRadius: "18px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                  transition: "all 0.1s ease",
                  minHeight: "115px",
                }}
              >
                <DynamicIcon
                  name={symbol.icon}
                  size={36}
                  strokeWidth={1.5}
                  style={{ color: symbol.textColor }}
                />
                <span
                  style={{
                    fontWeight: "800",
                    fontSize: "0.95rem",
                    color: symbol.textColor,
                    fontFamily: "var(--font-family)",
                    letterSpacing: "0.5px",
                    textAlign: "center",
                  }}
                >
                  {symbol.label.toUpperCase()}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Guide Banner for Parents */}
      <div
        className="card"
        style={{
          marginTop: "24px",
          background: "var(--color-bg-secondary)",
          padding: "20px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          border: "2px dashed var(--color-border)",
        }}
      >
        <Sparkles size={28} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
        <div>
          <h4 style={{ fontWeight: "700", marginBottom: "4px" }}>Autism Communication Scaffolding (AAC)</h4>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: "1.4" }}>
            This board is structured using the Fitzgerald Key pedagogical layout. Tapping a card reads the word immediately, which encourages phonetic matching. Clicking <strong>Speak</strong> vocalizes the full sequence to teach syntactic structure.
          </p>
        </div>
      </div>
    </div>
  );
}
