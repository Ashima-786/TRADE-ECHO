// components/EdgeHero.jsx
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function EdgeHero({ onSearch }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Ctrl+K focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter" && query.trim()) onSearch?.(query.trim());
  };

  return (
    <section style={{
      position: "relative",
      width: "100%",
      background: "#0a0a0a",
      overflow: "hidden",
      paddingBottom: "64px",
    }}>
      {/* Grid background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center",
        padding: "72px 32px 0",
        maxWidth: "1100px",
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.26em", color: "rgba(255,255,255,0.28)",
          textTransform: "uppercase", marginBottom: "28px",
        }}>
          01 / EDGE
        </p>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Inter', -apple-system, sans-serif",
          fontSize: "clamp(3.6rem, 9vw, 7rem)",
          fontWeight: 900, lineHeight: 0.96,
          letterSpacing: "-0.03em",
          color: "#ffffff",
          margin: "0 0 28px",
        }}>
          Trade Echo{" "}
          <span style={{ color: "#d4af37" }}>Edge</span>
          <span style={{ color: "#d4af37" }}>.</span>
        </h1>

        {/* Sub */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(14px, 1.5vw, 17px)",
          fontWeight: 400, color: "rgba(255,255,255,0.5)",
          lineHeight: 1.75, maxWidth: "640px",
          margin: "0 0 48px",
        }}>
          Master professional-grade tools. From foundational concepts to advanced strategies.
          <br />Learn the frameworks that give you an edge.
        </p>

        {/* Search */}
        <div style={{ width: "100%", maxWidth: "820px" }}>
          <SearchBar inputRef={ref} query={query} setQuery={setQuery} handleKey={handleKey} />
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px", color: "rgba(255,255,255,0.2)",
            textAlign: "right", marginTop: "10px", letterSpacing: "0.05em",
          }}>
            Showing 62 of 62 articles
          </p>
        </div>
      </div>
    </section>
  );
}

function SearchBar({ inputRef, query, setQuery, handleKey }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px",
      background: "#111214",
      border: `1px solid ${focused ? "#d4af37" : "rgba(255,255,255,0.1)"}`,
      borderRadius: "10px", padding: "14px 18px",
      transition: "border-color 0.2s",
    }}>
      <Search size={16} color={focused ? "#d4af37" : "#555"} strokeWidth={1.8} style={{ flexShrink: 0, transition: "color 0.2s" }} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search articles. e.g. 'GEX levels', 'position sizing', '0DTE'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, background: "none", border: "none", outline: "none",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "13px", color: "#fff",
        }}
      />
      <kbd style={{
        background: "#1a1a1a", border: "1px solid #2a2a2a",
        borderRadius: "5px", padding: "3px 8px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px", color: "#555",
        whiteSpace: "nowrap", flexShrink: 0,
      }}>
        Ctrl+K
      </kbd>
    </div>
  );
}