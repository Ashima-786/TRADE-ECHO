import { useState, useEffect, useRef } from "react";
import {
  Activity, BarChart2, Layers, Cpu, Copy, Brain,
  ArrowRight, Download, Search, Bell, Moon,
  TrendingUp, Check, X, Eye, Target, Plus
} from "lucide-react";

// ─── SHARED DATA ─────────────────────────────────────────────────────────────
const tools = [
  {
    id: "optionflow", icon: Activity, label: "OptionFlow",
    desc: "Strike-level institutional activity across every U.S. exchange. Aggressive, Unusual, and Golden flow tiers filter the noise.",
    href: "/features/optionflow", color: "#d4af37",
    rows: [
      { time: "09:32", sym: "SPY", strike: "498C", type: "CALL", prem: "$1.2M", tier: "GOLDEN" },
      { time: "09:31", sym: "NVDA", strike: "190C", type: "CALL", prem: "$480K", tier: "UNUSUAL" },
      { time: "09:31", sym: "TSLA", strike: "340P", type: "PUT",  prem: "$360K", tier: "AGG" },
      { time: "09:30", sym: "AAPL", strike: "245C", type: "CALL", prem: "$210K", tier: "GOLDEN" },
    ],
  },
  {
    id: "dealeredge", icon: BarChart2, label: "DealerEdge (GEX)",
    desc: "Interactive GEX heatmaps with HVL, gamma flip points, call walls, put walls, and anchor points. All in one view.",
    href: "/features/dealeredge", color: "#3b82f6",
    bars: [
      { level: "500", val: 85 }, { level: "498", val: 60 },
      { level: "496", val: 30 }, { level: "494", val: -45 }, { level: "492", val: -70 },
    ],
  },
  {
    id: "darkpool", icon: Layers, label: "Darkpool",
    desc: "Off-exchange prints as they hit the tape. See size and levels before they rotate into the book.",
    href: "/features/darkpool", color: "#a855f7",
    prints: [
      { time: "09:34", sym: "SPY",  price: "497.80", size: "185,000", val: "$92M" },
      { time: "09:33", sym: "AAPL", price: "241.50", size: "420,000", val: "$101M" },
      { time: "09:32", sym: "MSFT", price: "427.90", size: "95,000",  val: "$41M" },
      { time: "09:31", sym: "NVDA", price: "186.40", size: "310,000", val: "$58M" },
    ],
  },
  {
    id: "algoedge", icon: Cpu, label: "AlgoEdge",
    desc: "Institutional algo trades, sorted into nine channels. Large Trades, SPX 0DTE, Momentum, Directional, Insider, and more.",
    href: "/features/algoedge", color: "#f59e0b",
    channels: ["Large Trades","SPX 0DTE","Momentum","Directional","Insider","Sweep Block","Multi-Leg","Dark Cross","Gamma Flip"],
  },
  {
    id: "copy-trading", icon: Copy, label: "Copy Trading",
    desc: "Mirror a pilot's trades directly in your linked brokerage. Lifetime members follow multiple pilots simultaneously.",
    href: "/features/copy-trading", color: "#ec4899",
    pilots: [
      { name: "AlphaFlow",   win: "74%", pnl: "+$48K", trades: 312 },
      { name: "GammaSurfer", win: "68%", pnl: "+$31K", trades: 198 },
      { name: "DeltaHunter", win: "71%", pnl: "+$62K", trades: 441 },
    ],
  },
  {
    id: "cortex", icon: Brain, label: "Cortex",
    desc: "AI that reads your live flow. Ask Cortex why TSLA just flipped to short gamma. Answered in seconds.",
    href: "/features/cortex", color: "#06b6d4",
    messages: [
      { role: "user", text: "Why is TSLA seeing unusual flow right now?" },
      { role: "ai",   text: "TSLA just printed $360K in aggressive put flow at the 340 strike — dealer gamma flipped negative at 345. Watch for acceleration below 342." },
    ],
  },
];

// ─── TOOL PREVIEW ─────────────────────────────────────────────────────────────
function ToolPreview({ tool }) {
  if (tool.rows) return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.2)", paddingBottom:6, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <span>Time</span><span>Sym</span><span>Strike</span><span>Type</span><span>Prem</span><span>Tier</span>
      </div>
      {tool.rows.map((r,i) => (
        <div key={i} style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", fontSize:10, fontFamily:"monospace", padding:"4px 0" }}>
          <span style={{ color:"rgba(255,255,255,0.3)" }}>{r.time}</span>
          <span style={{ color:"#fff", fontWeight:700 }}>{r.sym}</span>
          <span style={{ color:"rgba(255,255,255,0.5)" }}>{r.strike}</span>
          <span style={{ color: r.type==="CALL"?"#d4af37":"#f87171" }}>{r.type}</span>
          <span style={{ color:"rgba(255,255,255,0.7)" }}>{r.prem}</span>
          <span style={{ fontWeight:700, fontSize:9, color: r.tier==="GOLDEN"?"#facc15":r.tier==="UNUSUAL"?"#d4af37":"#fb923c" }}>{r.tier}</span>
        </div>
      ))}
    </div>
  );
  if (tool.bars) return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {tool.bars.map((b,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:10, fontFamily:"monospace", width:32, color:"rgba(255,255,255,0.3)", flexShrink:0 }}>{b.level}</span>
          <div style={{ flex:1, height:16, position:"relative", display:"flex", alignItems:"center" }}>
            <div style={{ position:"absolute", left:"50%", width:1, height:"100%", background:"rgba(255,255,255,0.1)" }} />
            {b.val>0
              ? <div style={{ position:"absolute", left:"50%", height:12, borderRadius:2, width:`${b.val*0.4}%`, background:"rgba(212,175,55,0.7)" }} />
              : <div style={{ position:"absolute", right:"50%", height:12, borderRadius:2, width:`${Math.abs(b.val)*0.4}%`, background:"rgba(239,68,68,0.7)" }} />}
          </div>
          <span style={{ fontSize:9, fontWeight:700, width:40, textAlign:"right", color: b.val>0?"#d4af37":"#f87171" }}>{b.val>0?"+":""}{b.val}B</span>
        </div>
      ))}
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"rgba(255,255,255,0.2)", paddingTop:4, borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <span>← PUT WALL</span><span>GEX FLIP</span><span>CALL WALL →</span>
      </div>
    </div>
  );
  if (tool.prints) return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.2)", paddingBottom:6, borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <span>Time</span><span>Sym</span><span>Price</span><span>Shares</span><span>Value</span>
      </div>
      {tool.prints.map((p,i) => (
        <div key={i} style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", fontSize:10, fontFamily:"monospace", padding:"4px 0" }}>
          <span style={{ color:"rgba(255,255,255,0.3)" }}>{p.time}</span>
          <span style={{ color:"#fff", fontWeight:700 }}>{p.sym}</span>
          <span style={{ color:"rgba(255,255,255,0.5)" }}>{p.price}</span>
          <span style={{ color:"rgba(255,255,255,0.6)" }}>{p.size}</span>
          <span style={{ fontWeight:700, color:"#a855f7" }}>{p.val}</span>
        </div>
      ))}
    </div>
  );
  if (tool.channels) return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
      {tool.channels.map((ch,i) => (
        <span key={i} style={{ padding:"4px 8px", borderRadius:4, fontSize:10, fontWeight:600, border:"1px solid",
          background: i===0?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.05)",
          borderColor: i===0?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.1)",
          color: i===0?"#f59e0b":"rgba(255,255,255,0.4)" }}>
          {ch}
        </span>
      ))}
    </div>
  );
  if (tool.pilots) return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {tool.pilots.map((p,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.03)", borderRadius:8, padding:"8px 12px" }}>
          <div>
            <p style={{ margin:0, fontSize:12, fontWeight:700, color:"#fff" }}>{p.name}</p>
            <p style={{ margin:0, fontSize:10, color:"rgba(255,255,255,0.3)" }}>{p.trades} trades</p>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ margin:0, fontSize:12, fontWeight:700, color:"#d4af37" }}>{p.pnl}</p>
            <p style={{ margin:0, fontSize:10, color:"rgba(255,255,255,0.4)" }}>{p.win} win</p>
          </div>
          <button style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:6, marginLeft:8, background:"rgba(236,72,153,0.2)", color:"#ec4899", border:"1px solid rgba(236,72,153,0.3)", cursor:"pointer" }}>COPY</button>
        </div>
      ))}
    </div>
  );
  if (tool.messages) return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {tool.messages.map((m,i) => (
        <div key={i} style={{ display:"flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
          <div style={{ maxWidth:"90%", borderRadius:12, padding:"8px 12px", fontSize:10, lineHeight:1.5,
            background: m.role==="user"?"rgba(6,182,212,0.2)":"rgba(255,255,255,0.05)",
            color: m.role==="user"?"#06b6d4":"rgba(255,255,255,0.7)",
            border: m.role==="user"?"1px solid rgba(6,182,212,0.2)":"1px solid rgba(255,255,255,0.08)" }}>
            {m.text}
          </div>
        </div>
      ))}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4, background:"rgba(255,255,255,0.05)", borderRadius:8, padding:"8px 12px", border:"1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize:10, flex:1, color:"rgba(255,255,255,0.2)" }}>Ask Cortex anything...</span>
        <span style={{ fontSize:10, color:"#06b6d4" }}>↵</span>
      </div>
    </div>
  );
  return null;
}

// ─── INTERSECTION OBSERVER HOOK ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
function SectionLabel({ num, label }) {
  return (
    <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.22em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", textAlign:"center", margin:"0 0 20px" }}>
      {num} / {label}
    </p>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DARKPOOL SECTIONS — 03 Capabilities | 04 Who It's For | 05 FAQ | 06 CTA
// ══════════════════════════════════════════════════════════════════════════════

const capabilities = [
  { icon: TrendingUp, title: "Live print stream",       desc: "Every dark pool print as it crosses. Size, level, attribution. Filter by minimum notional, by ticker, by sector." },
  { icon: Eye,        title: "Institutional footprint", desc: "Track accumulation patterns in the names you care about. Dark pool prints reveal positioning before retail sees it on the lit book." },
  { icon: Layers,     title: "Treemap visualization",   desc: "A live heatmap of dark pool activity sized by notional. Spot concentration at a glance. Drill in to the underlying prints." },
  { icon: Target,     title: "Paired with OptionFlow",  desc: "Cross-reference dark pool prints against OptionFlow tiers in the same terminal. When both fire together, conviction is highest." },
];

function CapabilityCard({ cap, delay }) {
  const [ref, inView] = useInView(0.1);
  const Icon = cap.icon;
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?"#111":"#0c0c0c", border:`1px solid ${hov?"rgba(212,175,55,0.2)":"rgba(255,255,255,0.07)"}`,
        borderRadius:14, padding:"28px 28px 32px", cursor:"default",
        transition:"all 0.35s ease",
        transform: inView?(hov?"translateY(-3px)":"translateY(0)"):"translateY(28px)",
        opacity:inView?1:0, transitionDelay:`${delay}ms` }}>
      <div style={{ width:44, height:44, borderRadius:10, background:hov?"rgba(212,175,55,0.18)":"rgba(212,175,55,0.1)",
          display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, transition:"background 0.3s" }}>
        <Icon size={20} color="#d4af37" />
      </div>
      <h3 style={{ fontWeight:700, fontSize:17, color:"#fff", margin:"0 0 10px", letterSpacing:"-0.01em" }}>{cap.title}</h3>
      <p  style={{ fontSize:14, lineHeight:1.65, color:"rgba(255,255,255,0.45)", margin:0 }}>{cap.desc}</p>
    </div>
  );
}

function CapabilitiesSection() {
  const [hr, hv] = useInView(0.2);
  return (
    <section style={{ padding:"100px 24px", background:"#000", borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div ref={hr} style={{ textAlign:"center", marginBottom:56, opacity:hv?1:0, transform:hv?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease" }}>
          <SectionLabel num="03" label="CAPABILITIES" />
          <h2 style={{ fontSize:"clamp(2.2rem,5vw,3.2rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.08, margin:0 }}>What it does.</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(440px,1fr))", gap:16 }}>
          {capabilities.map((cap,i) => <CapabilityCard key={cap.title} cap={cap} delay={i*90} />)}
        </div>
      </div>
    </section>
  );
}

const personas = [
  { tag:"POSITION TRADERS",     headline:"Follow the build.",   desc:"Watch for multi-day accumulation in a name. Size into the trend the desks are building." },
  { tag:"SWING TRADERS",        headline:"Confirm with flow.",   desc:"Cross-reference dark pool prints with OptionFlow. When both fire, conviction is highest." },
  { tag:"ACCUMULATION HUNTERS", headline:"Alert on the whales.", desc:"Filter for prints above $5M notional. Receive push alerts the moment they hit." },
];

function PersonaCard({ p, delay }) {
  const [ref, inView] = useInView(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:hov?"#111":"#0c0c0c", border:`1px solid ${hov?"rgba(212,175,55,0.18)":"rgba(255,255,255,0.07)"}`,
        borderRadius:14, padding:"28px 26px 32px", flex:1, minWidth:240, cursor:"default",
        transition:"all 0.35s ease",
        transform: inView?(hov?"translateY(-3px)":"translateY(0)"):"translateY(28px)",
        opacity:inView?1:0, transitionDelay:`${delay}ms` }}>
      <div style={{ display:"inline-flex", alignItems:"center", padding:"5px 10px", borderRadius:6, border:"1px solid rgba(212,175,55,0.35)", background:"rgba(212,175,55,0.08)", marginBottom:20 }}>
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", color:"#d4af37", textTransform:"uppercase" }}>{p.tag}</span>
      </div>
      <h3 style={{ fontWeight:800, fontSize:19, color:"#fff", letterSpacing:"-0.02em", margin:"0 0 12px" }}>{p.headline}</h3>
      <p  style={{ fontSize:14, lineHeight:1.65, color:"rgba(255,255,255,0.45)", margin:0 }}>{p.desc}</p>
    </div>
  );
}

function WhoItsForSection() {
  const [hr, hv] = useInView(0.2);
  return (
    <section style={{ padding:"100px 24px", background:"#000", borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:1040, margin:"0 auto" }}>
        <div ref={hr} style={{ textAlign:"center", marginBottom:56, opacity:hv?1:0, transform:hv?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease" }}>
          <SectionLabel num="04" label="WHO IT'S FOR" />
          <h2 style={{ fontSize:"clamp(2rem,4.5vw,3rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.08, margin:0 }}>
            Built for every seat <span style={{ color:"#d4af37" }}>at the desk.</span>
          </h2>
        </div>
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {personas.map((p,i) => <PersonaCard key={p.tag} p={p} delay={i*100} />)}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q:"What is Darkpool on Trade Echo?",
    a:"Darkpool is Trade Echo's real-time off-exchange print monitor. It streams every qualifying block from every U.S. dark pool venue as it crosses, surfacing institutional accumulation before those positions rotate to the lit book. Filter by minimum notional, symbol, or venue." },
  { q:"How is this different from dark pool data on other platforms?",
    a:"Most platforms batch dark pool data and deliver it on a 15-minute delay. Trade Echo streams prints in real time, directly from FINRA TRF feeds, so you see accumulation as it happens — not after the move is already in progress." },
  { q:"How does Trade Echo work?",
    a:"Trade Echo aggregates off-exchange trade reports from all major U.S. dark pool venues and TRFs. Our engine filters, enriches, and surfaces prints that meet institutional thresholds — giving you the same tape the desks watch, without the Bloomberg terminal price tag." },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ border:`1px solid ${open?"rgba(212,175,55,0.2)":"rgba(255,255,255,0.07)"}`, borderRadius:12, overflow:"hidden",
        background:open?"rgba(212,175,55,0.03)":"#0c0c0c", transition:"all 0.3s ease",
        opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(20px)", transitionDelay:`${index*80}ms` }}>
      <button onClick={() => setOpen(!open)}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"22px 24px", background:"transparent", border:"none", cursor:"pointer", gap:16 }}>
        <span style={{ fontSize:15, fontWeight:700, color:"#fff", textAlign:"left", letterSpacing:"-0.01em" }}>{item.q}</span>
        <div style={{ width:28, height:28, borderRadius:"50%", border:`1px solid ${open?"#d4af37":"rgba(212,175,55,0.4)"}`,
            background:open?"#d4af37":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.3s ease" }}>
          {open ? <X size={13} color="#000" /> : <Plus size={13} color="#d4af37" />}
        </div>
      </button>
      <div style={{ maxHeight:open?300:0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
        <p style={{ fontSize:14, lineHeight:1.7, color:"rgba(255,255,255,0.5)", padding:"0 24px 24px", margin:0 }}>{item.a}</p>
      </div>
    </div>
  );
}

function FaqSection() {
  const [hr, hv] = useInView(0.2);
  return (
    <section style={{ padding:"100px 24px", background:"#000", borderTop:"1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <div ref={hr} style={{ textAlign:"center", marginBottom:52, opacity:hv?1:0, transform:hv?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease" }}>
          <SectionLabel num="05" label="QUESTIONS" />
          <h2 style={{ fontSize:"clamp(2rem,4.5vw,3rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.08, margin:0 }}>Quick answers.</h2>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {faqs.map((f,i) => <FaqItem key={f.q} item={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function GetStartedSection({ onStartTracking, onViewPlans }) {
  const [ref, inView] = useInView(0.15);
  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  return (
    <section style={{ padding:"80px 24px 100px", background:"#000" }}>
      <div ref={ref} style={{ maxWidth:820, margin:"0 auto",
          background:"radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, rgba(0,0,0,0) 70%), #0c0c0c",
          border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"72px 40px", textAlign:"center",
          opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(28px)", transition:"all 0.7s ease" }}>
        <SectionLabel num="06" label="GET STARTED" />
        <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.1, margin:"0 0 18px" }}>
          Start tracking <span style={{ color:"#d4af37" }}>the dark</span> today.
        </h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", lineHeight:1.6, maxWidth:480, margin:"0 auto 40px" }}>
          Included in Trade Echo Pro with OptionFlow, DealerEdge, AlgoEdge, Cortex, and Copy Trading. $199/mo. Cancel anytime.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onStartTracking} onMouseEnter={() => setB1(true)} onMouseLeave={() => setB1(false)}
            style={{ background:b1?"#b8912e":"#d4af37", color:"#000", border:"none", borderRadius:8, padding:"13px 26px", fontSize:14, fontWeight:700,
              cursor:"pointer", display:"flex", alignItems:"center", gap:8,
              transform:b1?"scale(1.03)":"scale(1)", transition:"all 0.2s ease",
              boxShadow:b1?"0 0 24px rgba(212,175,55,0.35)":"none" }}>
            Start tracking the dark <ArrowRight size={15} />
          </button>
          <button onClick={onViewPlans} onMouseEnter={() => setB2(true)} onMouseLeave={() => setB2(false)}
            style={{ background:b2?"rgba(255,255,255,0.05)":"transparent",
              color:b2?"#fff":"rgba(255,255,255,0.75)",
              border:`1px solid ${b2?"rgba(255,255,255,0.35)":"rgba(255,255,255,0.2)"}`,
              borderRadius:8, padding:"13px 26px", fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s ease" }}>
            View all plans
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── COMPOSED DARKPOOL SECTIONS ───────────────────────────────────────────────
function DarkpoolSections({ onStartTracking, onViewPlans }) {
  return (
    <div style={{ background:"#000" }}>
      <CapabilitiesSection />
      <WhoItsForSection />
      <FaqSection />
      <GetStartedSection onStartTracking={onStartTracking} onViewPlans={onViewPlans} />
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const livePrints = [
  { time:"09:34", sym:"SPY",  price:"497.80", size:"3,832,100", val:"$22.83M", exch:"D", tape:"A", cond:"12, 22" },
  { time:"09:33", sym:"QQQ",  price:"512.08", size:"1,240,500", val:"$6.35M",  exch:"D", tape:"A", cond:"12" },
  { time:"09:32", sym:"SPY",  price:"596.38", size:"8,100,000", val:"$355.1M", exch:"D", tape:"A", cond:"12, 22" },
  { time:"09:31", sym:"IWM",  price:"228.91", size:"890,200",   val:"$2.04M",  exch:"D", tape:"A", cond:"12" },
  { time:"09:30", sym:"NVDA", price:"140.22", size:"2,015,400", val:"$2.83M",  exch:"D", tape:"A", cond:"12, 37" },
  { time:"09:29", sym:"SPY",  price:"596.21", size:"1,102,800", val:"$6.57M",  exch:"D", tape:"A", cond:"12" },
];
const liveFeedData = [
  { time:"14:32:18", sym:"NVDA",  size:"125K", price:"$894.12", notional:"$111.7M" },
  { time:"14:31:44", sym:"AAPL",  size:"280K", price:"$227.45", notional:"$63.6M" },
  { time:"14:30:51", sym:"MSFT",  size:"92K",  price:"$428.11", notional:"$39.3M" },
  { time:"14:30:22", sym:"META",  size:"45K",  price:"$612.44", notional:"$27.5M" },
  { time:"14:29:58", sym:"TSLA",  size:"210K", price:"$348.11", notional:"$73.1M" },
  { time:"14:28:33", sym:"GOOGL", size:"156K", price:"$192.77", notional:"$30.0M" },
];

// ─── DARKPOOL PAGE ────────────────────────────────────────────────────────────
function DarkpoolPage({ navigate }) {
  const [activeTab,   setActiveTab]   = useState("All prints");
  const [ticker,      setTicker]      = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [visible,     setVisible]     = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  const tabs = ["All prints","$50M+","$100M+","Snapshot"];

  return (
    <div style={{ minHeight:"100vh", background:"#000", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color:"#fff" }}>

      {/* ── 01 HERO ── */}
      <section style={{ padding:"80px 24px 60px", textAlign:"center", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.25em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:24 }}>01 / DARKPOOL</p>
        <h1 style={{ fontSize:"clamp(2.5rem,6vw,4.5rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:28,
            opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(24px)", transition:"opacity 0.6s ease,transform 0.6s ease" }}>
          See accumulation<br /><span style={{ color:"#d4af37" }}>before it rotates.</span>
        </h1>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.7,
            opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(16px)", transition:"opacity 0.7s ease 0.1s,transform 0.7s ease 0.1s" }}>
          Darkpool streams off-exchange prints in real time. Every significant block, every level, every time stamp. Filter by size, symbol, or venue. No delay.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", opacity:visible?1:0, transition:"opacity 0.8s ease 0.2s" }}>
          <button onClick={() => navigate("pricing")}
            style={{ background:"#d4af37", color:"#000", border:"none", borderRadius:8, padding:"14px 28px", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#b8912e"; e.currentTarget.style.transform="scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#d4af37"; e.currentTarget.style.transform="scale(1)"; }}>
            Start tracking the dark <ArrowRight size={16} />
          </button>
          <button onClick={() => navigate("platform")}
            style={{ background:"transparent", color:"#fff", border:"1px solid rgba(255,255,255,0.25)", borderRadius:8, padding:"14px 28px", fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; e.currentTarget.style.background="transparent"; }}>
            See the full platform
          </button>
        </div>
      </section>

      {/* ── DASHBOARD MOCKUP ── */}
      <section style={{ padding:"60px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", background:"#0d0d0d", borderRadius:16, border:"1px solid rgba(255,255,255,0.08)", overflow:"hidden" }}>
          {/* top bar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, background:"#d4af37", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <BarChart2 size={18} color="#000" />
              </div>
              <span style={{ fontWeight:800, fontSize:20 }}>Darkpool</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <Moon size={18} style={{ color:"rgba(255,255,255,0.4)", cursor:"pointer" }} />
              <Bell size={18} style={{ color:"rgba(255,255,255,0.4)", cursor:"pointer" }} />
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#a855f7)" }} />
                <span style={{ fontSize:14, color:"rgba(255,255,255,0.7)" }}>Test Users</span>
              </div>
            </div>
          </div>
          {/* tabs + search */}
          <div style={{ padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  style={{ padding:"8px 18px", borderRadius:999, fontSize:13, fontWeight:600, cursor:"pointer", border:"1px solid", transition:"all 0.2s",
                    background:activeTab===t?"#a855f7":"transparent",
                    borderColor:activeTab===t?"#a855f7":"rgba(255,255,255,0.15)",
                    color:activeTab===t?"#fff":"rgba(255,255,255,0.6)" }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ position:"relative", maxWidth:320 }}>
              <Search size={14} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.3)" }} />
              <input value={ticker} onChange={e => setTicker(e.target.value)} placeholder="Ticker..."
                style={{ width:"100%", padding:"10px 12px 10px 36px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, color:"#fff", fontSize:13, outline:"none", boxSizing:"border-box" }} />
            </div>
          </div>
          {/* stats bar */}
          <div style={{ padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.02)" }}>
            <div style={{ display:"flex", gap:16, alignItems:"center" }}>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>Results: <strong style={{ color:"#fff" }}>150</strong></span>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>Filters <strong style={{ color:"#fff" }}>0</strong></span>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div onClick={() => setAutoRefresh(!autoRefresh)}
                  style={{ width:44, height:24, borderRadius:12, background:autoRefresh?"#d4af37":"rgba(255,255,255,0.1)", cursor:"pointer", position:"relative", transition:"background 0.3s" }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left:autoRefresh?22:3, transition:"left 0.3s" }} />
                </div>
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>Auto Refresh</span>
              </div>
              <button style={{ background:"#a855f7", color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                <Download size={14} /> Export
              </button>
            </div>
          </div>
          {/* summary */}
          <div style={{ padding:"12px 24px", background:"rgba(99,102,241,0.12)", borderBottom:"1px solid rgba(99,102,241,0.2)", display:"flex", gap:24, flexWrap:"wrap" }}>
            <span style={{ fontSize:13, fontWeight:700 }}>SUMMARY</span>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>Top <span style={{ color:"#60a5fa" }}>SPY</span> ($2646.08M)</span>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>Largest print <span style={{ color:"#60a5fa" }}>SPY</span> ($355.1M)</span>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>Total notional <span style={{ color:"#60a5fa", fontWeight:700 }}>$11085.91M</span></span>
            <span style={{ marginLeft:"auto", fontSize:13, color:"rgba(255,255,255,0.35)" }}>150 rows</span>
          </div>
          {/* table */}
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  {["TIME (ET)","TICKER","PRICE","SIZE","PREMIUM","EXCH","TRF","TAPE","CONDITIONS"].map(h => (
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {livePrints.map((r,i) => (
                  <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.03)", transition:"background 0.15s", cursor:"default" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"14px 16px", color:"rgba(255,255,255,0.5)", fontFamily:"monospace" }}>{r.time}</td>
                    <td style={{ padding:"14px 16px", color:"#60a5fa", fontWeight:700 }}>{r.sym}</td>
                    <td style={{ padding:"14px 16px", fontFamily:"monospace" }}>{r.price}</td>
                    <td style={{ padding:"14px 16px", fontFamily:"monospace" }}>{r.size}</td>
                    <td style={{ padding:"14px 16px", fontWeight:700, color:"#fff" }}>{r.val}</td>
                    <td style={{ padding:"14px 16px", color:"rgba(255,255,255,0.5)" }}>{r.exch}</td>
                    <td style={{ padding:"14px 16px", color:"rgba(255,255,255,0.5)" }}>{r.tape}</td>
                    <td style={{ padding:"14px 16px", color:"rgba(255,255,255,0.5)" }}>{r.tape}</td>
                    <td style={{ padding:"14px 16px", color:"rgba(255,255,255,0.5)" }}>{r.cond}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 02 LIVE STREAM ── */}
      <section style={{ padding:"60px 24px", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.25em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", textAlign:"center", marginBottom:16 }}>02 / LIVE STREAM</p>
          <h2 style={{ fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, letterSpacing:"-0.03em", textAlign:"center", marginBottom:16 }}>
            Off-exchange prints, <span style={{ color:"#d4af37" }}>on the tape.</span>
          </h2>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", textAlign:"center", marginBottom:48, lineHeight:1.7 }}>
            Every qualifying block as it crosses. The same stream institutions watch. No 15-minute delay, no batched summary.
          </p>
          {/* live feed widget */}
          <div style={{ background:"#0d0d0d", borderRadius:16, border:"1px solid rgba(255,255,255,0.08)", overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#d4af37", boxShadow:"0 0 8px #d4af37", animation:"pulse 2s infinite" }} />
                <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>Live Feed</span>
              </div>
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>MIN. $20M NOTIONAL · ALL VENUES</span>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                    {["TIME","SYMBOL","SIZE","PRICE","NOTIONAL"].map(h => (
                      <th key={h} style={{ padding:"10px 20px", textAlign:"left", fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {liveFeedData.map((r,i) => (
                    <tr key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.03)", transition:"background 0.15s", cursor:"default" }}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                      <td style={{ padding:"16px 20px", color:"rgba(255,255,255,0.4)", fontFamily:"monospace", fontSize:13 }}>{r.time}</td>
                      <td style={{ padding:"16px 20px", fontWeight:700, fontSize:15 }}>{r.sym}</td>
                      <td style={{ padding:"16px 20px", color:"rgba(255,255,255,0.6)", fontFamily:"monospace", fontSize:13 }}>{r.size}</td>
                      <td style={{ padding:"16px 20px", color:"rgba(255,255,255,0.6)", fontFamily:"monospace", fontSize:13 }}>{r.price}</td>
                      <td style={{ padding:"16px 20px", fontWeight:700, fontSize:15, color:"#d4af37" }}>{r.notional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03–06 DARKPOOL SECTIONS (Capabilities → Who → FAQ → CTA) ── */}
      <DarkpoolSections
        onStartTracking={() => navigate("pricing")}
        onViewPlans={() => navigate("pricing")}
      />

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}

// ─── PLATFORM PAGE ────────────────────────────────────────────────────────────
function PlatformPage({ navigate }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  return (
    <div style={{ minHeight:"100vh", background:"#000", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color:"#fff" }}>
      <div style={{ padding:"20px 32px", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32, height:32, background:"#d4af37", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}><BarChart2 size={16} color="#000" /></div>
          <span style={{ fontWeight:800, fontSize:16 }}>FlowEdge</span>
        </div>
        <span style={{ color:"rgba(255,255,255,0.15)", margin:"0 4px" }}>›</span>
        <span style={{ fontSize:14, color:"rgba(255,255,255,0.4)" }}>Platform</span>
        <button onClick={() => navigate("darkpool")} style={{ marginLeft:"auto", background:"transparent", color:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"6px 14px", fontSize:13, cursor:"pointer" }}>← Back</button>
      </div>
      <section style={{ padding:"80px 24px 60px", textAlign:"center" }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.25em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:20 }}>01 / Platform</p>
        <h1 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:20,
            opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)", transition:"opacity 0.6s ease,transform 0.6s ease" }}>
          One workspace. <span style={{ color:"#d4af37" }}>Six professional-grade tools.</span>
        </h1>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.45)", maxWidth:480, margin:"0 auto 20px", lineHeight:1.7, opacity:visible?1:0, transition:"opacity 0.7s ease 0.1s" }}>
          Each module replaces a dedicated subscription. Together they run on web, iOS, and Android with the same real-time feed.
        </p>
      </section>
      <section style={{ padding:"0 24px 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:20 }}>
          {tools.map((tool,idx) => {
            const Icon = tool.icon;
            return (
              <div key={tool.id}
                style={{ borderRadius:16, border:"1px solid rgba(255,255,255,0.08)", background:"#0d0d0d", overflow:"hidden",
                  transition:"border-color 0.3s,transform 0.3s",
                  opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(24px)", transitionDelay:`${idx*0.07}s` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; e.currentTarget.style.transform="translateY(0)"; }}>
                <div style={{ padding:20, borderBottom:"1px solid rgba(255,255,255,0.05)", minHeight:180 }}><ToolPreview tool={tool} /></div>
                <div style={{ padding:20 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <div style={{ width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", background:`${tool.color}18`, flexShrink:0 }}>
                      <Icon size={14} style={{ color:tool.color }} />
                    </div>
                    <h3 style={{ fontWeight:700, fontSize:15, margin:0 }}>{tool.label}</h3>
                  </div>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6, marginBottom:16 }}>{tool.desc}</p>
                  <button style={{ background:"none", border:"none", padding:0, fontSize:12, fontWeight:600, color:tool.color, cursor:"pointer" }}>Learn more →</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section style={{ padding:"60px 24px", textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.5rem)", fontWeight:900, marginBottom:16 }}>Ready to see the edge?</h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", marginBottom:32 }}>Start with any tool. Scale to all six.</p>
        <button onClick={() => navigate("pricing")}
          style={{ background:"#d4af37", color:"#000", border:"none", borderRadius:8, padding:"14px 32px", fontSize:15, fontWeight:700, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background="#b8912e"; e.currentTarget.style.transform="scale(1.03)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="#d4af37"; e.currentTarget.style.transform="scale(1)"; }}>
          View Pricing <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}

// ─── PRICING PAGE ─────────────────────────────────────────────────────────────
const plans = [
  { name:"Starter",  price:"$49",    period:"/mo",       color:"#6366f1",
    desc:"For individual traders getting started with institutional data.",
    features:["OptionFlow (basic)","Darkpool live feed","1 Cortex query/day","Web access only","Email support"],
    missing:["DealerEdge GEX","AlgoEdge","Copy Trading","Multi-pilot follow"] },
  { name:"Pro",      price:"$149",   period:"/mo",       color:"#d4af37", popular:true,
    desc:"Full platform access. Everything professionals rely on daily.",
    features:["OptionFlow (all tiers)","DealerEdge GEX heatmaps","Darkpool live feed","AlgoEdge (9 channels)","Cortex AI (unlimited)","Copy Trading (1 pilot)","Web + iOS + Android"],
    missing:["Multi-pilot follow"] },
  { name:"Lifetime", price:"$1,299", period:" one-time", color:"#f59e0b",
    desc:"Pay once. Own it forever. Multi-pilot copy trading included.",
    features:["Everything in Pro","Copy Trading (unlimited pilots)","Priority support","Early feature access","All future updates"],
    missing:[] },
];

function PricingPage({ navigate }) {
  const [visible, setVisible] = useState(false);
  const [billing, setBilling] = useState("monthly");
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  return (
    <div style={{ minHeight:"100vh", background:"#000", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif", color:"#fff" }}>
      <div style={{ padding:"20px 32px", borderBottom:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32, height:32, background:"#d4af37", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}><BarChart2 size={16} color="#000" /></div>
          <span style={{ fontWeight:800, fontSize:16 }}>FlowEdge</span>
        </div>
        <span style={{ color:"rgba(255,255,255,0.15)", margin:"0 4px" }}>›</span>
        <span style={{ fontSize:14, color:"rgba(255,255,255,0.4)" }}>Pricing</span>
        <button onClick={() => navigate("darkpool")} style={{ marginLeft:"auto", background:"transparent", color:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"6px 14px", fontSize:13, cursor:"pointer" }}>← Back</button>
      </div>
      <section style={{ padding:"80px 24px 50px", textAlign:"center" }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.25em", color:"rgba(255,255,255,0.25)", textTransform:"uppercase", marginBottom:20 }}>Pricing</p>
        <h1 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:900, lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:20,
            opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease" }}>
          Institutional edge.<br /><span style={{ color:"#d4af37" }}>Trader-grade pricing.</span>
        </h1>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.45)", maxWidth:440, margin:"0 auto 32px", lineHeight:1.7 }}>
          Pick the plan that matches your trading style. Cancel or upgrade any time.
        </p>
        <div style={{ display:"inline-flex", background:"rgba(255,255,255,0.05)", borderRadius:10, padding:4, border:"1px solid rgba(255,255,255,0.08)", marginBottom:60 }}>
          {["monthly","annual"].map(b => (
            <button key={b} onClick={() => setBilling(b)}
              style={{ padding:"8px 20px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", border:"none", transition:"all 0.2s",
                background:billing===b?"#fff":"transparent", color:billing===b?"#000":"rgba(255,255,255,0.5)" }}>
              {b==="monthly"?"Monthly":"Annual (save 20%)"}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap", maxWidth:1100, margin:"0 auto", padding:"0 0 80px" }}>
          {plans.map((plan,idx) => (
            <div key={plan.name}
              style={{ width:320, borderRadius:20, border:`1px solid ${plan.popular?plan.color:"rgba(255,255,255,0.08)"}`,
                background:plan.popular?"rgba(212,175,55,0.04)":"#0d0d0d", padding:"32px 28px", position:"relative", transition:"transform 0.3s",
                opacity:visible?1:0, transitionDelay:`${idx*0.1}s`, transform:visible?(plan.popular?"scale(1.03)":"scale(1)"):"translateY(20px)" }}
              onMouseEnter={e => { if(!plan.popular) e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={e => { if(!plan.popular) e.currentTarget.style.transform="translateY(0)"; }}>
              {plan.popular && (
                <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"#d4af37", color:"#000", fontSize:11, fontWeight:800, letterSpacing:"0.1em", padding:"4px 14px", borderRadius:999 }}>MOST POPULAR</div>
              )}
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:plan.color }} />
                <span style={{ fontSize:13, fontWeight:700, color:plan.color, letterSpacing:"0.05em" }}>{plan.name.toUpperCase()}</span>
              </div>
              <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:8 }}>
                <span style={{ fontSize:42, fontWeight:900, letterSpacing:"-0.04em" }}>{plan.price}</span>
                <span style={{ fontSize:14, color:"rgba(255,255,255,0.4)" }}>{plan.period}</span>
              </div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", lineHeight:1.6, marginBottom:24 }}>{plan.desc}</p>
              <button style={{ width:"100%", padding:12, borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer", border:"none", transition:"all 0.2s", marginBottom:24,
                  background:plan.popular?"#d4af37":"rgba(255,255,255,0.06)", color:plan.popular?"#000":"#fff" }}
                onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                Get started
              </button>
              <div>
                {plan.features.map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <Check size={14} style={{ color:plan.color, flexShrink:0 }} />
                    <span style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>{f}</span>
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <X size={14} style={{ color:"rgba(255,255,255,0.15)", flexShrink:0 }} />
                    <span style={{ fontSize:13, color:"rgba(255,255,255,0.2)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:"0 0 80px", textAlign:"center" }}>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.35)", marginBottom:12 }}>Not sure which plan fits?</p>
          <button onClick={() => navigate("platform")}
            style={{ background:"transparent", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, padding:"11px 24px", fontSize:14, fontWeight:600, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}>
            Explore the full platform <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── APP ROUTER ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("darkpool");
  const navigate = (p) => { setPage(p); window.scrollTo({ top:0, behavior:"smooth" }); };
  if (page === "platform") return <PlatformPage navigate={navigate} />;
  if (page === "pricing")  return <PricingPage  navigate={navigate} />;
  return <DarkpoolPage navigate={navigate} />;
}