import React, { useState, useEffect, useCallback, useRef } from "react";

/* ─── Default Brand Settings ─── */
const DEFAULT_BRAND = {
  name: "Your Brand",
  subtitle: "Content Planner · Reels + Carousels",
  months: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"],
  daySeries: { Mon: "Monday Series", Tue: "Tuesday Series", Wed: "Wednesday Series", Thu: "Thursday Series", Fri: "Friday Series" },
  dayColors: { Mon: "#f0c040", Tue: "#60aaff", Wed: "#ff6b6b", Thu: "#4cdd80", Fri: "#d070ff" },
  pillars: { Mon: "Pillar 1", Tue: "Pillar 2", Wed: "Pillar 3", Thu: "Pillar 4", Fri: "Pillar 5" },
};

const DY = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/* ─── Empty day template ─── */
const EMPTY = (d) => ({d, t:"", p:"", f:"Reel", h:"", sc:"", dn:"", br:"", ca:"", tg:""});
const BLANK_WEEK = () => DY.map(d => EMPTY(d));

/* ─── Build initial data: Mon W1 has example, everything else blank ─── */
const buildInitialData = () => {
  const weeks = [];
  for (let i = 0; i < 48; i++) weeks.push(BLANK_WEEK());
  // Week 1 Monday: example content
  weeks[0][0] = {d:"Mon",t:"Example: Your Monday Topic",p:"Principle or angle for this piece",f:"Reel",h:"Hook line that grabs attention in 0-2 seconds.",
  sc:"Write your full script here.\nBreak into sections as needed.\nInclude visual directions and dialogue.",
  dn:"Format: vertical video, 9:16.\nPlatforms: Instagram Reels, TikTok.\nDuration: 30-60 seconds.",
  br:"Shot 1: Opening visual\nShot 2: Main demonstration\nShot 3: Close-up detail\nShot 4: Final reveal",
  ca:"Your Instagram caption goes here. Tell the story behind the content.\n\nAdd a call to action.",
  tg:"#yourbrand #content #monday"};
  return weeks;
};

/* ─── Editable Field ─── */
function EditField({ value, onChange, color, style, multiline = true }) {
  const baseStyle = {
    background: "transparent", border: "1px solid transparent",
    borderRadius: "3px", outline: "none", width: "100%",
    fontFamily: "'Inter', sans-serif", resize: "vertical",
    padding: "6px 8px", margin: "-6px -8px",
    transition: "border-color 0.15s, background 0.15s",
    ...style,
  };
  const handlers = {
    onFocus: (e) => { e.currentTarget.style.borderColor = (color || "#333"); e.currentTarget.style.background = "#0a0a0a"; },
    onBlur: (e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; },
  };
  if (!multiline) {
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={{ ...baseStyle, height: "auto" }} {...handlers} />;
  }
  const rows = Math.max(2, (value || "").split("\n").length + 1);
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} style={{ ...baseStyle, lineHeight: style?.lineHeight || 1.75 }} {...handlers} />;
}

/* ─── Settings Modal ─── */
function SettingsModal({ brand, onSave, onClose }) {
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(brand)));

  const upd = (path, val) => {
    setDraft(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = val;
      return next;
    });
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const labelStyle = { fontSize: "0.64rem", color: "#888", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" };
  const inputStyle = {
    background: "#1a1a1a", border: "1px solid #333", borderRadius: "3px",
    padding: "8px 10px", color: "#e0e0e0", fontFamily: "Inter", fontSize: "0.82rem",
    outline: "none", width: "100%", boxSizing: "border-box",
  };
  const sectionStyle = { marginBottom: "24px" };
  const sectionTitle = {
    fontSize: "0.7rem", letterSpacing: "3px", textTransform: "uppercase",
    color: "#999", marginBottom: "12px", paddingBottom: "8px",
    borderBottom: "1px solid #252525",
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)",
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      padding: "32px 16px", overflowY: "auto",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#131313", border: "1px solid #252525",
        borderRadius: "6px", maxWidth: "580px", width: "100%",
        padding: "36px 32px", position: "relative",
        color: "#d0d0d0", fontFamily: "'Inter', sans-serif",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        marginBottom: "40px",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: "14px", right: "16px",
          background: "none", border: "1px solid #444", color: "#888",
          fontSize: "0.75rem", cursor: "pointer", borderRadius: "3px",
          padding: "4px 10px", fontFamily: "Inter", letterSpacing: "1px",
        }}>ESC</button>

        <h2 style={{
          fontSize: "1rem", fontWeight: 600, letterSpacing: "3px",
          textTransform: "uppercase", color: "#fff", margin: "0 0 28px"
        }}>Brand Settings</h2>

        {/* Brand Identity */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Identity</div>
          <div style={{ marginBottom: "12px" }}>
            <div style={labelStyle}>Brand Name</div>
            <input style={inputStyle} value={draft.name} onChange={(e) => upd("name", e.target.value)} />
          </div>
          <div>
            <div style={labelStyle}>Subtitle</div>
            <input style={inputStyle} value={draft.subtitle} onChange={(e) => upd("subtitle", e.target.value)} />
          </div>
        </div>

        {/* Month Names */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Month Names</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {draft.months.map((m, i) => (
              <div key={i}>
                <div style={labelStyle}>Month {i + 1}</div>
                <input style={inputStyle} value={m} onChange={(e) => {
                  const months = [...draft.months];
                  months[i] = e.target.value;
                  upd("months", "");
                  setDraft(prev => ({ ...prev, months }));
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Day Configuration */}
        <div style={sectionStyle}>
          <div style={sectionTitle}>Day Configuration</div>
          {DY.map((d) => (
            <div key={d} style={{
              display: "grid", gridTemplateColumns: "50px 1fr 1fr 40px",
              gap: "8px", marginBottom: "8px", alignItems: "end"
            }}>
              <div>
                <div style={labelStyle}>{d}</div>
                <div style={{
                  ...inputStyle, textAlign: "center", fontWeight: 600,
                  color: draft.dayColors[d], background: "#0f0f0f",
                  border: `1px solid ${draft.dayColors[d]}44`,
                }}>{d}</div>
              </div>
              <div>
                <div style={labelStyle}>Series Name</div>
                <input style={inputStyle} value={draft.daySeries[d]} onChange={(e) => upd(`daySeries.${d}`, e.target.value)} />
              </div>
              <div>
                <div style={labelStyle}>Pillar</div>
                <input style={inputStyle} value={draft.pillars[d]} onChange={(e) => upd(`pillars.${d}`, e.target.value)} />
              </div>
              <div>
                <div style={labelStyle}>Color</div>
                <input type="color" value={draft.dayColors[d]} onChange={(e) => upd(`dayColors.${d}`, e.target.value)}
                  style={{ width: "100%", height: "35px", border: "1px solid #333", borderRadius: "3px", background: "#1a1a1a", cursor: "pointer", padding: "2px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Save */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            background: "#1a1a1a", border: "1px solid #333", color: "#888",
            padding: "8px 20px", borderRadius: "3px", fontSize: "0.76rem",
            fontFamily: "Inter", letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={() => { onSave(draft); onClose(); }} style={{
            background: "#fff", border: "1px solid #fff", color: "#000",
            padding: "8px 20px", borderRadius: "3px", fontSize: "0.76rem",
            fontFamily: "Inter", letterSpacing: "1px", textTransform: "uppercase",
            cursor: "pointer", fontWeight: 600,
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Modal Brief Component ─── */
function BriefModal({ item, mo, tw, onClose, edits, onEdit, brand }) {
  const SC = brand.dayColors;
  const SN = brand.daySeries;
  const PIL = brand.pillars;
  const MN = brand.months;
  const c = SC[item.d];
  const key = `${tw - 1}-${item.d}`;

  const get = (field) => edits[key]?.[field] ?? item[field] ?? "";
  const set = (field) => (val) => onEdit(key, field, val);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const Section = ({ label }) => (
    <div style={{
      fontSize: "0.7rem", letterSpacing: "3.5px", textTransform: "uppercase",
      color: "#999", marginBottom: "8px", marginTop: "28px",
      borderTop: "1px solid #252525", paddingTop: "16px"
    }}>{label}</div>
  );

  const fieldBase = { color: "#d0d0d0", fontFamily: "'Inter', sans-serif" };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.82)", backdropFilter: "blur(12px)",
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        padding: "32px 16px", overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#131313", border: "1px solid #252525",
          borderRadius: "6px", maxWidth: "660px", width: "100%",
          padding: "40px 38px", position: "relative",
          color: "#d0d0d0", lineHeight: 1.75, fontFamily: "'Inter', sans-serif",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          marginBottom: "40px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "14px", right: "16px",
            background: "none", border: "1px solid #444",
            color: "#888", fontSize: "0.75rem", cursor: "pointer",
            borderRadius: "3px", padding: "4px 10px",
            fontFamily: "Inter", letterSpacing: "1px",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#666"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#444"; }}
        >
          ESC
        </button>

        {/* Badge row */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "6px" }}>
          <span style={{
            display: "inline-block", background: c, color: "#000",
            padding: "4px 14px", borderRadius: "3px", fontSize: "0.68rem",
            fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase"
          }}>{item.d} · {SN[item.d]}</span>
          <select value={get("f")} onChange={(e) => set("f")(e.target.value)} style={{
            display: "inline-block", background: "#1e1e1e", color: "#aaa",
            padding: "4px 12px", borderRadius: "3px", fontSize: "0.64rem",
            fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase",
            border: "1px solid #333", fontFamily: "Inter", outline: "none", cursor: "pointer",
          }}>
            <option value="Reel">Reel</option>
            <option value="Carousel">Carousel</option>
          </select>
          <span style={{
            display: "inline-block", background: c + "18", color: c,
            padding: "4px 10px", borderRadius: "3px", fontSize: "0.64rem",
            fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase"
          }}>{PIL[item.d]}</span>
        </div>

        {/* Meta */}
        <div style={{
          color: "#777", fontSize: "0.68rem", letterSpacing: "1.5px",
          marginBottom: "22px", textTransform: "uppercase"
        }}>{brand.name} · Month {mo + 1}: {MN[mo]} · Week {tw}</div>

        {/* Title */}
        <EditField value={get("t")} onChange={set("t")} color={c} multiline={false}
          style={{ ...fieldBase, fontSize: "1.25rem", fontWeight: 600, color: "#f0f0f0", lineHeight: 1.35, marginBottom: "4px" }} />

        {/* Principle */}
        <EditField value={get("p")} onChange={set("p")} color={c} multiline={false}
          style={{ ...fieldBase, fontSize: "0.84rem", color: "#888", fontStyle: "italic", marginTop: "8px", marginBottom: "20px" }} />

        {/* Hook */}
        <Section label="Hook (0-2 sec)" />
        <div style={{ borderLeft: `3px solid ${c}`, paddingLeft: "14px" }}>
          <EditField value={get("h")} onChange={set("h")} color={c} multiline={false}
            style={{ ...fieldBase, fontSize: "0.95rem", color: "#e8e8e8", fontStyle: "italic", lineHeight: 1.65 }} />
        </div>

        {/* Script */}
        <Section label="Script" />
        <EditField value={get("sc")} onChange={set("sc")} color={c}
          style={{ ...fieldBase, fontSize: "0.88rem", color: "#d0d0d0", lineHeight: 1.85 }} />

        {/* Delivery Notes */}
        <Section label="Delivery Notes" />
        <div style={{ background: "#0e0e0e", padding: "14px 16px", borderRadius: "4px", borderLeft: `3px solid ${c}44` }}>
          <EditField value={get("dn")} onChange={set("dn")} color={c}
            style={{ ...fieldBase, fontSize: "0.84rem", color: "#aaa", lineHeight: 1.7 }} />
        </div>

        {/* B-Roll */}
        <Section label="B-Roll Checklist" />
        <EditField value={get("br")} onChange={set("br")} color={c}
          style={{ ...fieldBase, fontSize: "0.84rem", color: "#aaa", lineHeight: 1.9 }} />

        {/* Caption */}
        <Section label="Caption (Instagram)" />
        <EditField value={get("ca")} onChange={set("ca")} color={c}
          style={{ ...fieldBase, fontSize: "0.86rem", color: "#bbb", lineHeight: 1.7 }} />

        {/* Tags */}
        <div style={{ marginTop: "24px", borderTop: "1px solid #252525", paddingTop: "14px" }}>
          <EditField value={get("tg")} onChange={set("tg")} color={c} multiline={false}
            style={{ ...fieldBase, fontSize: "0.78rem", color: "#777", letterSpacing: "0.3px" }} />
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "28px", borderTop: "1px solid #1e1e1e", paddingTop: "14px",
          fontSize: "0.6rem", color: "#555", textTransform: "uppercase",
          letterSpacing: "2.5px", display: "flex", justifyContent: "space-between"
        }}>
          <span>{brand.name} Content Plan</span>
          <span>{SN[item.d]} · WK{tw}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Planner ─── */
export default function P() {
  const [brand, setBrand] = useState(() => {
    try { return { ...DEFAULT_BRAND, ...JSON.parse(localStorage.getItem("cp-brand")) }; }
    catch { return { ...DEFAULT_BRAND }; }
  });
  const [showSettings, setShowSettings] = useState(false);
  const [mo, setMo] = useState(0);
  const [wk, setWk] = useState(0);
  const [vw, setVw] = useState("week");
  const [ap, setAp] = useState(null);
  const [sts, setSts] = useState(() => { try { return JSON.parse(localStorage.getItem("cp-sts") || "{}"); } catch { return {}; } });
  const [modalItem, setModalItem] = useState(null);
  const [edits, setEdits] = useState(() => { try { return JSON.parse(localStorage.getItem("cp-edits") || "{}"); } catch { return {}; } });
  const [allData, setAllData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cp-data"));
      if (saved && saved.length === 48) return saved;
    } catch {}
    return buildInitialData();
  });
  const [dragOver, setDragOver] = useState(null);
  const dragRef = useRef(null);

  // Derive colors/config from brand
  const SC = brand.dayColors;
  const SN = brand.daySeries;
  const PIL = brand.pillars;
  const MN = brand.months;
  const PILC = {};
  DY.forEach(d => { PILC[PIL[d]] = SC[d]; });

  const wi = mo * 4 + wk;
  const data = allData[wi];
  const tw = wi + 1;
  const stC = { Idea: "#f0c040", Drafting: "#60aaff", Ready: "#d070ff", Posted: "#4cdd80" };
  const sk = (d) => `${wi}-${d}`;

  // Persist to localStorage
  useEffect(() => { localStorage.setItem("cp-brand", JSON.stringify(brand)); }, [brand]);
  useEffect(() => { localStorage.setItem("cp-sts", JSON.stringify(sts)); }, [sts]);
  useEffect(() => { localStorage.setItem("cp-edits", JSON.stringify(edits)); }, [edits]);
  useEffect(() => { localStorage.setItem("cp-data", JSON.stringify(allData)); }, [allData]);

  const openDoc = useCallback((item) => {
    setModalItem(item);
  }, []);

  const closeModal = useCallback(() => {
    setModalItem(null);
  }, []);

  const handleEdit = useCallback((key, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [key]: { ...(prev[key] || {}), [field]: value },
    }));
  }, []);

  const getEdited = useCallback((item, field) => {
    const key = `${wi}-${item.d}`;
    return edits[key]?.[field] ?? item[field] ?? "";
  }, [wi, edits]);

  const isMatch = useCallback((d) => {
    if (!ap) return true;
    return PIL[d] === ap;
  }, [ap, PIL]);

  /* ─── Drag & Drop ─── */
  const handleDragStart = useCallback((weekIdx, day, item, e) => {
    dragRef.current = { weekIdx, day, item };
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", ""); } catch {}
  }, []);

  const handleDragEnd = useCallback(() => {
    dragRef.current = null;
    setDragOver(null);
  }, []);

  const handleDragOver = useCallback((weekIdx, day, e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const key = `${weekIdx}-${day}`;
    setDragOver((prev) => prev === key ? prev : key);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(null);
  }, []);

  const handleDrop = useCallback((targetWeekIdx, targetDay, e) => {
    e.preventDefault();
    setDragOver(null);
    if (!dragRef.current) return;
    const { weekIdx: srcWeekIdx, day: srcDay } = dragRef.current;
    dragRef.current = null;
    if (srcWeekIdx === targetWeekIdx && srcDay === targetDay) return;

    setAllData((prev) => {
      const next = prev.map((w) => w.map((i) => ({ ...i })));
      const srcWeek = next[srcWeekIdx];
      const tgtWeek = next[targetWeekIdx];
      const srcIdx = srcWeek.findIndex((x) => x.d === srcDay);
      const tgtIdx = tgtWeek.findIndex((x) => x.d === targetDay);

      if (srcIdx === -1) return prev;
      const srcItem = { ...srcWeek[srcIdx], d: targetDay };

      if (tgtIdx !== -1) {
        const tgtItem = { ...tgtWeek[tgtIdx], d: srcDay };
        srcWeek[srcIdx] = tgtItem;
        tgtWeek[tgtIdx] = srcItem;
      } else {
        srcWeek.splice(srcIdx, 1);
        tgtWeek.push(srcItem);
      }

      // move edits
      const srcKey = `${srcWeekIdx}-${srcDay}`;
      const tgtKey = `${targetWeekIdx}-${targetDay}`;
      setEdits((pe) => {
        const ne = { ...pe };
        const srcE = ne[srcKey];
        const tgtE = ne[tgtKey];
        delete ne[srcKey];
        delete ne[tgtKey];
        if (srcE) ne[tgtKey] = srcE;
        if (tgtE) ne[srcKey] = tgtE;
        return ne;
      });

      // move statuses
      setSts((ps) => {
        const ns = { ...ps };
        const srcS = ns[srcKey];
        const tgtS = ns[tgtKey];
        delete ns[srcKey];
        delete ns[tgtKey];
        if (srcS) ns[tgtKey] = srcS;
        if (tgtS) ns[srcKey] = tgtS;
        return ns;
      });

      return next;
    });
  }, []);

  /* ─── Button base ─── */
  const bs = {
    borderRadius: "3px", fontSize: "0.72rem", cursor: "pointer",
    fontFamily: "Inter", letterSpacing: "1px", textTransform: "uppercase",
    transition: "all 0.15s", border: "1px solid #333", padding: "5px 13px",
  };

  return (
    <div style={{
      fontFamily: "'Inter',sans-serif", background: "#0f0f0f",
      color: "#e0e0e0", padding: "20px", minHeight: "100vh"
    }}>
      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal brand={brand} onSave={setBrand} onClose={() => setShowSettings(false)} />
      )}

      {/* Brief Modal */}
      {modalItem && (
        <BriefModal item={modalItem} mo={mo} tw={tw} onClose={closeModal} edits={edits} onEdit={handleEdit} brand={brand} />
      )}

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        borderBottom: "1px solid #222", paddingBottom: "14px", marginBottom: "20px",
        flexWrap: "wrap", gap: "10px"
      }}>
        <div>
          <h1 style={{
            fontSize: "1.3rem", fontWeight: 700, letterSpacing: "3px",
            textTransform: "uppercase", color: "#fff", margin: 0
          }}>{brand.name}</h1>
          <p style={{
            fontSize: "0.68rem", color: "#777", letterSpacing: "2px",
            textTransform: "uppercase", margin: "4px 0 0"
          }}>{brand.subtitle}</p>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={() => setShowSettings(true)} style={{
            ...bs, background: "#1a1a1a", color: "#888", borderColor: "#333",
          }} onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#555"; }}
             onMouseLeave={e => { e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#333"; }}
          >Settings</button>
          {["week", "overview"].map((v) => (
            <button key={v} onClick={() => { setVw(v); setAp(null); }} style={{
              ...bs,
              background: vw === v ? "#fff" : "#1a1a1a",
              color: vw === v ? "#000" : "#888",
              borderColor: vw === v ? "#fff" : "#333"
            }}>{v}</button>
          ))}
        </div>
      </div>

      {/* Pillar Filters */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "14px", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
          textTransform: "uppercase", display: "flex", alignItems: "center", marginRight: "4px"
        }}>PILLARS</span>
        {Object.entries(PILC).map(([p, c]) => (
          <button key={p} onClick={() => setAp(ap === p ? null : p)} style={{
            ...bs, background: ap === p ? c : "#1a1a1a",
            color: ap === p ? "#000" : c,
            borderColor: ap === p ? c : c + "44",
            fontSize: "0.68rem", padding: "4px 12px"
          }}>{p}</button>
        ))}
      </div>

      {/* Month tabs */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "8px", flexWrap: "wrap" }}>
        {MN.map((m, i) => (
          <button key={i} onClick={() => { setMo(i); setWk(0); }} style={{
            ...bs, fontWeight: mo === i ? 600 : 400,
            background: mo === i ? "#fff" : "#1a1a1a",
            color: mo === i ? "#000" : "#888",
            borderColor: mo === i ? "#fff" : "#333",
            padding: "6px 13px"
          }}>M{i + 1} · {m}</button>
        ))}
      </div>

      {/* Week tabs */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "18px", alignItems: "center" }}>
        {[0, 1, 2, 3].map((w) => (
          <button key={w} onClick={() => setWk(w)} style={{
            ...bs,
            background: wk === w ? "#333" : "#1a1a1a",
            color: wk === w ? "#fff" : "#777",
            borderColor: wk === w ? "#444" : "#333"
          }}>WK {mo * 4 + w + 1}</button>
        ))}
        <span style={{
          fontSize: "0.66rem", color: "#666", marginLeft: "6px", letterSpacing: "1px"
        }}>WEEK {tw} / 48</span>
      </div>

      {/* WEEK VIEW */}
      {vw === "week" && (
        <>
          {/* Legend */}
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "14px" }}>
            {DY.map((d) => {
              const item = data.find((x) => x.d === d);
              return (
                <div key={d} style={{
                  background: "#1a1a1a", border: `1px solid ${SC[d]}33`,
                  borderRadius: "3px", padding: "3px 10px", fontSize: "0.7rem",
                  color: SC[d], letterSpacing: "1px", opacity: isMatch(d) ? 1 : 0.3
                }}>
                  <span style={{ fontWeight: 600 }}>{d}</span> · {SN[d]}{" "}
                  <span style={{ color: "#777", fontSize: "0.64rem" }}>({edits[`${wi}-${d}`]?.f ?? (item?.f || "—")})</span>
                </div>
              );
            })}
          </div>

          <p style={{
            fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "8px"
          }}>Drag cards to rearrange · Click to open brief</p>

          {/* Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(5,1fr)",
            gap: "5px", marginBottom: "20px"
          }}>
            {DY.map((d) => (
              <div key={d} style={{
                background: "#1a1a1a", borderRadius: "3px", padding: "4px",
                textAlign: "center", fontSize: "0.66rem", fontWeight: 600,
                color: SC[d], letterSpacing: "1.5px", opacity: isMatch(d) ? 1 : 0.3
              }}>{d}</div>
            ))}
            {DY.map((d) => {
              const item = data.find((x) => x.d === d);
              const isOver = dragOver === `${wi}-${d}`;
              if (!item) return (
                <div key={d}
                  onDragOver={(e) => handleDragOver(wi, d, e)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(wi, d, e)}
                  style={{
                    background: isOver ? "#1c1c1c" : "transparent",
                    border: isOver ? "1px dashed #555" : "1px dashed transparent",
                    borderRadius: "3px", minHeight: "150px",
                    transition: "all 0.15s",
                  }}
                />
              );
              const st = sts[sk(d)];
              const match = isMatch(d);
              return (
                <div
                  key={`c-${d}`}
                  draggable
                  onDragStart={(e) => handleDragStart(wi, d, item, e)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(wi, d, e)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(wi, d, e)}
                  onClick={() => openDoc(item)}
                  style={{
                    background: isOver ? "#1e1e1e" : (match ? "#141414" : "#0d0d0d"),
                    border: isOver ? "1px dashed #666" : `1px solid ${match ? "#1f1f1f" : "#151515"}`,
                    borderRadius: "3px", padding: "9px", minHeight: "150px",
                    cursor: "grab", transition: "all 0.2s", position: "relative",
                    opacity: match ? 1 : 0.25
                  }}
                  onMouseEnter={(e) => {
                    if (match) {
                      e.currentTarget.style.borderColor = SC[d] + "77";
                      e.currentTarget.style.background = "#181818";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = match ? "#1f1f1f" : "#151515";
                    e.currentTarget.style.background = match ? "#141414" : "#0d0d0d";
                  }}
                >
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "5px"
                  }}>
                    <span style={{
                      fontSize: "0.64rem", color: SC[d], fontWeight: 600,
                      letterSpacing: "1px", textTransform: "uppercase", opacity: 0.85
                    }}>{getEdited(item, "f")}</span>
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%", background: "#4cdd80"
                    }} title="Script ready" />
                  </div>
                  <div style={{
                    fontSize: "0.76rem", color: SC[d], fontWeight: 600,
                    marginBottom: "3px", lineHeight: 1.35
                  }}>{getEdited(item, "t")}</div>
                  <div style={{
                    fontSize: "0.64rem", color: "#777", marginBottom: "5px", lineHeight: 1.35
                  }}>{getEdited(item, "p")}</div>
                  <div style={{
                    fontSize: "0.68rem", color: "#999", fontStyle: "italic",
                    lineHeight: 1.4, borderLeft: `2px solid ${SC[d]}33`, paddingLeft: "6px"
                  }}>{getEdited(item, "h")}</div>
                  {st && (
                    <div style={{ marginTop: "5px", fontSize: "0.6rem", color: stC[st] }}>
                      ● {st}
                    </div>
                  )}
                  <div style={{ marginTop: "6px" }}>
                    <select
                      value={st || ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSts((p) => ({ ...p, [sk(d)]: e.target.value }));
                      }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: "0.64rem", border: `1px solid ${stC[st] || "#333"}`,
                        borderRadius: "3px", padding: "2px 4px", background: "#1a1a1a",
                        color: stC[st] || "#777", fontFamily: "Inter", outline: "none", width: "100%"
                      }}
                    >
                      <option value="">Status</option>
                      <option value="Idea">Idea</option>
                      <option value="Drafting">Drafting</option>
                      <option value="Ready">Ready</option>
                      <option value="Posted">Posted</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* YT Row */}
          <p style={{
            fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "6px", marginTop: "8px"
          }}>YouTube (Long-Form) — This Week</p>
          <div style={{
            background: "#141414", border: "1px solid #1f1f1f",
            borderRadius: "3px", padding: "10px", marginBottom: "20px", minHeight: "50px"
          }}>
            <div style={{ fontSize: "0.76rem", color: "#777", fontStyle: "italic" }}>
              Plan your YouTube video here — different content, long-form
            </div>
          </div>
        </>
      )}

      {/* OVERVIEW */}
      {vw === "overview" && (
        <div>
          <p style={{
            fontSize: "0.66rem", color: "#666", letterSpacing: "2px",
            textTransform: "uppercase", marginBottom: "10px"
          }}>Month {mo + 1}: {MN[mo]} — Drag cards to rearrange</p>
          <div style={{
            display: "grid", gridTemplateColumns: "auto repeat(5,1fr)", gap: "4px"
          }}>
            <div />
            {DY.map((d) => (
              <div key={d} style={{
                background: "#1a1a1a", borderRadius: "3px", padding: "4px",
                textAlign: "center", fontSize: "0.62rem", fontWeight: 600,
                color: SC[d], letterSpacing: "1.5px", opacity: isMatch(d) ? 1 : 0.3
              }}>{SN[d].toUpperCase()}</div>
            ))}
            {[0, 1, 2, 3].map((w) => {
              const gi = mo * 4 + w;
              const wd = allData[gi];
              return (
                <React.Fragment key={`row-${w}`}>
                  <div style={{
                    background: "#1a1a1a", borderRadius: "3px", padding: "5px",
                    fontSize: "0.64rem", fontWeight: 700, color: "#bbb",
                    letterSpacing: "1.5px", display: "flex", alignItems: "center"
                  }}>WK{gi + 1}</div>
                  {DY.map((d) => {
                    const item = wd.find((x) => x.d === d);
                    const isOver = dragOver === `${gi}-${d}`;
                    const match = isMatch(d);
                    if (!item) return (
                      <div key={d}
                        onDragOver={(e) => handleDragOver(gi, d, e)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(gi, d, e)}
                        style={{
                          background: isOver ? "#1c1c1c" : "transparent",
                          border: isOver ? "1px dashed #555" : "1px dashed transparent",
                          borderRadius: "3px", minHeight: "60px",
                          transition: "all 0.15s",
                        }}
                      />
                    );
                    return (
                      <div
                        key={`${w}-${d}`}
                        draggable
                        onDragStart={(e) => handleDragStart(gi, d, item, e)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(gi, d, e)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(gi, d, e)}
                        onClick={() => { setWk(w); openDoc(item); }}
                        style={{
                          background: isOver ? "#1e1e1e" : (match ? "#141414" : "#0d0d0d"),
                          border: isOver ? "1px dashed #666" : ("1px solid " + (match ? "#1f1f1f" : "#151515")),
                          borderRadius: "3px", padding: "6px", cursor: "grab",
                          minHeight: "60px", position: "relative", transition: "all 0.15s",
                          opacity: match ? 1 : 0.2
                        }}
                        onMouseEnter={(e) => { if (match) e.currentTarget.style.borderColor = "#444"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = match ? "#1f1f1f" : "#151515"; }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                          <span style={{
                            fontSize: "0.56rem", color: SC[d], letterSpacing: "1px",
                            textTransform: "uppercase", opacity: 0.8
                          }}>{edits[`${gi}-${d}`]?.f ?? item.f}</span>
                          <div style={{
                            width: "4px", height: "4px", borderRadius: "50%", background: "#4cdd80"
                          }} />
                        </div>
                        <div style={{
                          fontSize: "0.68rem", color: "#e0e0e0", lineHeight: 1.4, marginBottom: "2px"
                        }}>{item.t}</div>
                        <div style={{
                          fontSize: "0.58rem", color: "#777", lineHeight: 1.3
                        }}>{item.p}</div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
