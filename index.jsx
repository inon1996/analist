import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client"; // הוספנו לצורך חיבור ל-HTML

const features = [
  { icon: "⚡", title: "ניתוח בשניות", desc: "הכנס טיקר — קבל תמונה מלאה של המניה תוך שניות. לא עוד שעות של מחקר." },
  { icon: "📊", title: "מספרים שחשובים", desc: "מכפיל רווח, שווי שוק, תשואת דיבידנד, ביצועים — הכל במקום אחד." },
  { icon: "🎯", title: "הזדמנויות וסיכונים", desc: "AI שמזהה את הנקודות החשובות ומציג אותן בצורה ברורה ומאורגנת." },
  { icon: "🇮🇱", title: "בעברית", desc: "הכל בעברית. לא עוד תרגום מאנגלית, לא עוד בלבול. פשוט וברור." },
];

const testimonials = [
  { name: "רון מ.", text: "חסך לי שעתיים של מחקר על NVDA. קיבלתי הכל תוך 10 שניות." },
  { name: "שירה כ.", text: "סוף סוף כלי שמדבר אליי בגובה העיניים. לא מסובך, לא מלא מונחים." },
  { name: "אמיר ל.", text: "הראיתי לחבר שלי שמתעסק בשוק ההון — הוא רצה להירשם מיד." },
];

const trustedStocks = ["AAPL","TSLA","NVDA","AMZN","MSFT","GOOGL","META","JPM"];

const faqs = [
  { q: "האם זה המלצת השקעה?", a: "לא. אנליסט הוא כלי מידע שעוזר לך להבין מניות מהר יותר. ההחלטה הסופית תמיד שלך. תמיד מומלץ להתייעץ עם יועץ השקעות מוסמך." },
  { q: "האם עובד גם על מניות ישראליות?", a: "כרגע הכלי מתמחה במניות אמריקאיות (NYSE, NASDAQ). תמיכה במניות ת\"א בקרוב!" },
  { q: "האם אפשר לבטל בכל עת?", a: "בהחלט. ביטול בלחיצה אחת, ללא שאלות, ללא עמלות. המנוי נשאר פעיל עד סוף התקופה ששולמה." },
  { q: "כמה ניתוחים אפשר לעשות?", a: "מנוי בסיסי — 20 ניתוחים בחודש. מנוי פרו — ללא הגבלה. לרוב המשקיעים הבסיסי מספיק בהחלט." },
  { q: "מה קורה אחרי 50 הנרשמים הראשונים?", a: "המחיר עולה ל-₪29 לחודש. הנרשמים הראשונים נועלים את מחיר ה-₪19 לתמיד, גם אם המחיר יעלה בעתיד." },
];

const generateTickerData = () => [
  { symbol: "AAPL", price: (189 + Math.random() * 4).toFixed(2), change: (Math.random() * 3 - 1).toFixed(2) },
  { symbol: "TSLA", price: (245 + Math.random() * 8).toFixed(2), change: (Math.random() * 5 - 2).toFixed(2) },
  { symbol: "NVDA", price: (875 + Math.random() * 20).toFixed(2), change: (Math.random() * 6 - 1).toFixed(2) },
  { symbol: "AMZN", price: (186 + Math.random() * 5).toFixed(2), change: (Math.random() * 3 - 1).toFixed(2) },
  { symbol: "MSFT", price: (415 + Math.random() * 6).toFixed(2), change: (Math.random() * 4 - 1.5).toFixed(2) },
  { symbol: "GOOGL", price: (172 + Math.random() * 4).toFixed(2), change: (Math.random() * 3 - 1).toFixed(2) },
  { symbol: "META", price: (508 + Math.random() * 10).toFixed(2), change: (Math.random() * 4 - 1).toFixed(2) },
  { symbol: "JPM", price: (196 + Math.random() * 4).toFixed(2), change: (Math.random() * 2 - 0.8).toFixed(2) },
  { symbol: "V", price: (271 + Math.random() * 4).toFixed(2), change: (Math.random() * 2 - 0.7).toFixed(2) },
  { symbol: "WMT", price: (68 + Math.random() * 2).toFixed(2), change: (Math.random() * 1.5 - 0.5).toFixed(2) },
];

function StockChartBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const points = [];
    let y = h * 0.6;
    for (let i = 0; i <= 120; i++) {
      y += (Math.random() - 0.46) * 12;
      y = Math.max(h * 0.15, Math.min(h * 0.85, y));
      points.push({ x: (i / 120) * w, y });
    }
    const drawLine = (offset, alpha, color) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y + offset);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i-1].x) / 2;
        const yc = (points[i].y + points[i-1].y) / 2 + offset;
        ctx.quadraticCurveTo(points[i-1].x, points[i-1].y + offset, xc, yc);
      }
      ctx.strokeStyle = color; ctx.globalAlpha = alpha; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
      ctx.fillStyle = color; ctx.globalAlpha = alpha * 0.08; ctx.fill(); ctx.globalAlpha = 1;
    };
    ctx.clearRect(0, 0, w, h);
    drawLine(0, 0.25, "#c8972a"); drawLine(30, 0.12, "#e8b84b"); drawLine(-20, 0.10, "#60a5fa");
    ctx.globalAlpha = 0.06; ctx.strokeStyle = "#c8972a"; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(0, (h/5)*i); ctx.lineTo(w, (h/5)*i); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", opacity:0.7 }} />;
}

function LiveTicker() {
  const [stocks, setStocks] = useState(generateTickerData());
  const trackRef = useRef(null);
  useEffect(() => {
    const priceInterval = setInterval(() => setStocks(generateTickerData()), 4000);
    let animOffset = 0; let raf;
    const animate = () => {
      animOffset += 0.5;
      if (trackRef.current) {
        const tw = trackRef.current.scrollWidth / 2;
        if (animOffset >= tw) animOffset = 0;
        trackRef.current.style.transform = `translateX(${animOffset}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { clearInterval(priceInterval); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div style={{ background:"#0a1628", borderTop:"1px solid #c8972a", borderBottom:"1px solid #c8972a", overflow:"hidden", padding:"10px 0", position:"relative" }}>
      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"80px", background:"linear-gradient(90deg,#0a1628,transparent)", zIndex:2, pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"80px", background:"linear-gradient(270deg,#0a1628,transparent)", zIndex:2, pointerEvents:"none" }} />
      <div style={{ display:"flex", alignItems:"center", whiteSpace:"nowrap" }}>
        <div ref={trackRef} style={{ display:"flex", alignItems:"center" }}>
          {[...stocks,...stocks].map((s,i) => {
            const chg = parseFloat(s.change); const isUp = chg >= 0;
            return (
              <div key={i} style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"0 24px", borderRight:"1px solid #1e2d4a" }}>
                <span style={{ fontSize:"12px", fontWeight:"600", color:"#e8b84b", letterSpacing:"1px", fontFamily:"monospace" }}>{s.symbol}</span>
                <span style={{ fontSize:"13px", color:"#e2ddd6", fontFamily:"monospace" }}>${s.price}</span>
                <span style={{ fontSize:"11px", color:isUp?"#4ade80":"#f87171", fontFamily:"monospace", fontWeight:"500" }}>{isUp?"▲":"▼"} {Math.abs(chg).toFixed(2)}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position:"absolute", top:"50%", right:"16px", transform:"translateY(-50%)", display:"flex", alignItems:"center", gap:"5px", zIndex:3 }}>
        <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80", animation:"livePulse 1.5s ease-in-out infinite" }} />
        <span style={{ fontSize:"9px", letterSpacing:"2px", color:"#4ade80", fontFamily:"monospace" }}>LIVE</span>
      </div>
    </div>
  );
}

function ProductDemo() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);
  const fullText = "NVDA";

  useEffect(() => {
    let timeout;
    if (step === 0) {
      setTyped(""); setShowResult(false);
      timeout = setTimeout(() => setStep(1), 1200);
    } else if (step === 1) {
      let i = 0;
      const interval = setInterval(() => {
        setTyped(fullText.slice(0, i + 1));
        i++;
        if (i >= fullText.length) { clearInterval(interval); setTimeout(() => setStep(2), 600); }
      }, 150);
      return () => clearInterval(interval);
    } else if (step === 2) {
      timeout = setTimeout(() => { setShowResult(true); setStep(3); }, 800);
    } else if (step === 3) {
      timeout = setTimeout(() => setStep(0), 5000);
    }
    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div style={{ maxWidth:"480px", margin:"0 auto", background:"#0a0e1a", border:"1px solid #1e2d4a", borderTop:"2px solid #c8972a" }}>
      <div style={{ background:"#06080f", padding:"10px 16px", display:"flex", alignItems:"center", gap:"8px", borderBottom:"1px solid #1e2d4a" }}>
        <div style={{ display:"flex", gap:"5px" }}>
          {["#f87171","#fbbf24","#4ade80"].map((c,i) => <div key={i} style={{ width:"8px", height:"8px", borderRadius:"50%", background:c }} />)}
        </div>
        <div style={{ flex:1, background:"#0f1420", borderRadius:"2px", padding:"3px 10px", fontSize:"11px", color:"#374151", fontFamily:"monospace" }}>
          analist.co.il
        </div>
      </div>
      <div style={{ padding:"24px", direction:"rtl" }}>
        <div style={{ fontSize:"11px", letterSpacing:"3px", color:"#c8972a", marginBottom:"12px", textAlign:"right" }}>הכנס טיקר לניתוח</div>
        <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
          <div style={{ flex:1, background:"#0f1420", border:"1px solid #c8972a", padding:"10px 14px", color:"#4ade80", fontFamily:"monospace", fontSize:"18px", letterSpacing:"3px", minHeight:"42px" }}>
            {typed}<span style={{ opacity: step===1 ? 1 : 0, animation: step===1 ? "blink 0.7s step-end infinite" : "none" }}>|</span>
          </div>
          <div style={{ background:"#c8972a", color:"#0f1f4a", padding:"10px 18px", fontSize:"13px", fontWeight:"600", cursor:"pointer", display:"flex", alignItems:"center" }}>נתח</div>
        </div>
        {showResult && (
          <div style={{ animation:"fadeInUp 0.4s ease", background:"#0f1420", border:"1px solid #1e2d4a", padding:"16px" }}>
            <div style={{ fontSize:"10px", letterSpacing:"2px", color:"#c8972a", marginBottom:"4px" }}>NVDA</div>
            <div style={{ fontFamily:"'Georgia',serif", fontSize:"20px", color:"#f0ebe3", marginBottom:"10px" }}>Nvidia Corp.</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"#1e2d4a", marginBottom:"12px" }}>
              {[["P/E","65.2"],["שווי שוק","$2.1T"],["דיבידנד","0.03%"],["52W","▲ +185%"]].map(([l,v],i) => (
                <div key={i} style={{ background:"#0f1420", padding:"10px 12px" }}>
                  <div style={{ fontSize:"9px", color:"#555", letterSpacing:"2px", marginBottom:"3px" }}>{l}</div>
                  <div style={{ fontSize:"16px", color:"#e8b84b", fontWeight:"600" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"4px", marginBottom:"10px" }}>
              {[["▲ מנהיגות AI","green"],["▲ Data Centers","green"],["▼ תמחור גבוה","red"],["▼ תחרות AMD","red"]].map(([t,c],i) => (
                <span key={i} style={{ fontSize:"10px", padding:"3px 8px", border:`1px solid ${c==="green"?"#1a3a1f":"#3a1a1a"}`, color:c==="green"?"#4ade80":"#f87171", background:c==="green"?"#091a0f":"#1a0909" }}>{t}</span>
              ))}
            </div>
            <div style={{ fontSize:"12px", color:"#9ca3af", borderRight:"2px solid #c8972a", paddingRight:"10px" }}>
              מניית הצמיחה הגדולה של עידן ה-AI. מחיר גבוה — אבל מוצדק בביצועים.
            </div>
          </div>
        )}
        {!showResult && step >= 0 && (
          <div style={{ textAlign:"center", padding:"20px", color:"#2a3545", fontSize:"12px", letterSpacing:"1px" }}>
            {step === 0 ? "מחכה לטיקר..." : step === 1 ? "מקליד..." : "מנתח..."}
          </div>
        )}
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid #f0e8d0", direction:"rtl" }}>
      <div onClick={() => setOpen(!open)} style={{ padding:"20px 0", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", gap:"16px" }}>
        <span style={{ fontSize:"15px", fontWeight:"500", color:"#0f1f4a" }}>{q}</span>
        <span style={{ color:"#c8972a", fontSize:"20px", flexShrink:0, transition:"transform 0.2s", transform:open?"rotate(45deg)":"rotate(0)" }}>+</span>
      </div>
      {open && <div style={{ fontSize:"14px", color:"#6b6b8a", lineHeight:"1.75", paddingBottom:"20px" }}>{a}</div>}
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [spotsLeft, setSpotsLeft] = useState(23);
  const tickers = ["AAPL","TSLA","NVDA","AMZN","MSFT"];

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const t = setInterval(() => setTickerIdx(i => (i+1) % tickers.length), 1800);
    const spotsTimer = setInterval(() => {
      setSpotsLeft(s => s > 3 ? s - 1 : s);
    }, 45000);
    return () => { clearInterval(t); clearInterval(spotsTimer); };
  }, []);

  const handleSubmit = () => {
    if (!email.includes("@")) return;
    setSpotsLeft(s => Math.max(0, s - 1));
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f8f5ef", color:"#1a1a2e", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        :root { --navy:#0f1f4a; --navy-mid:#1a3270; --gold:#c8972a; --gold-light:#e8b84b; --gold-pale:#f5e6c0; --cream:#f8f5ef; --cream-dark:#ede8de; --text:#1a1a2e; --text-muted:#6b6b8a; }
        .fade-up { opacity:0; transform:translateY(24px); transition:opacity 0.7s ease,transform 0.7s ease; }
        .fade-up.visible { opacity:1; transform:translateY(0); }
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes urgencyPulse { 0%,100%{background:#fef3c7} 50%{background:#fde68a} }

        .nav { display:flex; justify-content:space-between; align-items:center; padding:20px 48px; background:var(--navy); border-bottom:2px solid var(--gold); }
        .logo { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700; color:#fff; letter-spacing:1px; }
        .logo span { color:var(--gold-light); font-style:italic; }
        .nav-cta { background:var(--gold); color:var(--navy); border:none; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; padding:9px 22px; cursor:pointer; transition:background 0.2s; }
        .nav-cta:hover { background:var(--gold-light); }

        .hero { background:linear-gradient(160deg,var(--navy) 0%,#1a3270 60%,#0f1f4a 100%); padding:90px 20px 80px; text-align:center; position:relative; overflow:hidden; min-height:580px; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .hero::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,var(--gold),transparent); }
        .eyebrow { display:inline-block; font-size:10px; letter-spacing:4px; color:var(--gold-light); text-transform:uppercase; margin-bottom:28px; padding:6px 18px; border:1px solid rgba(200,151,42,0.4); background:rgba(200,151,42,0.08); position:relative; z-index:1; }
        .hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(44px,7vw,86px); font-weight:700; line-height:1.05; color:#fff; margin-bottom:24px; direction:rtl; position:relative; z-index:1; }
        .hero-title em { font-style:italic; color:var(--gold-light); }
        .hero-sub { font-size:16px; color:rgba(255,255,255,0.6); max-width:440px; margin:0 auto 40px; line-height:1.8; direction:rtl; position:relative; z-index:1; }
        .ticker-pill { display:inline-block; font-size:12px; font-weight:500; letter-spacing:3px; color:var(--navy); background:var(--gold-light); padding:5px 16px; margin-bottom:44px; position:relative; z-index:1; }

        .spots-bar { background:rgba(255,255,255,0.08); border:1px solid rgba(200,151,42,0.3); padding:10px 20px; margin-bottom:20px; direction:rtl; position:relative; z-index:1; max-width:360px; margin-left:auto; margin-right:auto; }
        .spots-track { height:4px; background:rgba(255,255,255,0.1); margin-top:8px; border-radius:0; }
        .spots-fill { height:4px; background:var(--gold); transition:width 0.5s ease; }

        .cta-form { display:flex; gap:0; max-width:420px; margin:0 auto; direction:rtl; position:relative; z-index:1; }
        .email-input { flex:1; background:rgba(255,255,255,0.08); border:1px solid rgba(200,151,42,0.35); border-left:none; color:#fff; font-family:'DM Sans',sans-serif; font-size:14px; padding:14px 18px; outline:none; direction:rtl; transition:border-color 0.2s; }
        .email-input::placeholder { color:rgba(255,255,255,0.3); }
        .email-input:focus { border-color:var(--gold); }
        .cta-btn { background:var(--gold); color:var(--navy); border:none; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; padding:14px 26px; cursor:pointer; white-space:nowrap; transition:background 0.2s; }
        .cta-btn:hover { background:var(--gold-light); }
        .price-note { font-size:12px; color:rgba(255,255,255,0.35); margin-top:12px; direction:rtl; position:relative; z-index:1; }
        .price-note strong { color:var(--gold-light); }

        .trusted-section { background:var(--navy); padding:36px 20px; border-bottom:1px solid rgba(200,151,42,0.2); }
        .trusted-label { text-align:center; font-size:10px; letter-spacing:3px; color:rgba(255,255,255,0.3); text-transform:uppercase; margin-bottom:20px; }
        .trusted-logos { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; max-width:700px; margin:0 auto; }
        .trusted-chip { background:rgba(255,255,255,0.05); border:1px solid rgba(200,151,42,0.2); padding:8px 18px; font-size:12px; font-weight:600; letter-spacing:1.5px; color:rgba(255,255,255,0.5); font-family:monospace; transition:all 0.2s; cursor:default; }
        .trusted-chip:hover { background:rgba(200,151,42,0.1); color:var(--gold-light); border-color:var(--gold); }

        .demo-section { background:var(--cream-dark); padding:80px 20px; border-top:2px solid var(--gold); }
        .section-label { text-align:center; font-size:10px; letter-spacing:4px; color:var(--gold); text-transform:uppercase; margin-bottom:40px; }

        .section-title { font-family:'Cormorant Garamond',serif; font-size:clamp(30px,4vw,46px); font-weight:700; color:var(--navy); text-align:center; margin-bottom:56px; direction:rtl; }
        .section-title span { color:var(--gold); font-style:italic; }
        .features-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:2px; background:var(--gold-pale); }
        .feature-card { background:#fff; padding:36px; direction:rtl; text-align:right; border-bottom:3px solid transparent; transition:border-color 0.2s,transform 0.2s; }
        .feature-card:hover { border-bottom-color:var(--gold); transform:translateY(-2px); }
        .feature-icon { font-size:28px; margin-bottom:14px; }
        .feature-title { font-size:16px; font-weight:500; color:var(--navy); margin-bottom:8px; }
        .feature-desc { font-size:13px; color:var(--text-muted); line-height:1.75; }

        .testimonials { background:var(--navy); padding:100px 20px; position:relative; }
        .testimonials::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--gold),transparent); }
        .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(200,151,42,0.15); max-width:860px; margin:0 auto; }
        .testi-card { background:var(--navy); padding:32px; direction:rtl; text-align:right; }
        .testi-stars { color:var(--gold); font-size:14px; margin-bottom:14px; letter-spacing:2px; }
        .testi-text { font-size:14px; color:rgba(255,255,255,0.65); line-height:1.75; margin-bottom:20px; }
        .testi-name { font-size:12px; letter-spacing:1px; color:var(--gold-light); }

        .final-cta { padding:110px 20px; text-align:center; background:var(--cream); }
        .price-badge { display:inline-block; background:var(--navy); color:var(--gold-light); font-family:'Cormorant Garamond',serif; font-size:72px; font-weight:700; padding:20px 48px; margin-bottom:8px; line-height:1; border:2px solid var(--gold); }
        .price-badge sup { font-size:28px; vertical-align:top; margin-top:14px; display:inline-block; }
        .price-original { font-size:13px; color:#aaa; text-decoration:line-through; margin-bottom:4px; }
        .price-promo { font-size:12px; color:#1a7a3a; background:#f0faf4; border:1px solid #b7e4c7; display:inline-block; padding:4px 14px; margin-bottom:32px; letter-spacing:1px; }
        .price-period { font-size:14px; color:var(--text-muted); margin-bottom:8px; letter-spacing:1px; }
        .success-box { background:#f0faf4; border:1px solid #b7e4c7; color:#1a7a3a; padding:20px 32px; font-size:15px; direction:rtl; max-width:380px; margin:0 auto; }

        .faq-section { background:var(--cream-dark); padding:80px 20px; }

        .footer { background:var(--navy); border-top:2px solid var(--gold); padding:24px 48px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:rgba(255,255,255,0.3); direction:rtl; }
        .footer-logo { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--gold-light); }

        @media (max-width:640px) {
          .features-grid,.testi-grid { grid-template-columns:1fr; }
          .nav { padding:16px 20px; }
          .cta-form { flex-direction:column; }
          .email-input { border-left:1px solid rgba(200,151,42,0.35); border-bottom:none; }
          .footer { flex-direction:column; gap:8px; text-align:center; }
        }
      `}</style>

      <nav className="nav">
        <div className="logo">אנל<span>יסט</span></div>
        <button className="nav-cta" onClick={() => document.getElementById('final-cta').scrollIntoView({behavior:'smooth'})}>התחל עכשיו</button>
      </nav>

      <LiveTicker />

      <section className="hero">
        <StockChartBg />
        <div className={`fade-up ${visible?'visible':''}`} style={{transitionDelay:'0.1s'}}>
          <div className="eyebrow">ניתוח מניות מבוסס AI</div>
        </div>
        <div className={`fade-up ${visible?'visible':''}`} style={{transitionDelay:'0.2s'}}>
          <h1 className="hero-title">מחקר מניות<br /><em>בשניות,</em><br />לא בשעות</h1>
        </div>
        <div className={`fade-up ${visible?'visible':''}`} style={{transitionDelay:'0.3s'}}>
          <p className="hero-sub">הכנס טיקר, קבל ניתוח מלא בעברית. הזדמנויות, סיכונים, מספרים — הכל במקום אחד.</p>
        </div>
        <div className={`fade-up ${visible?'visible':''}`} style={{transitionDelay:'0.35s'}}>
          <div className="ticker-pill">מנתח: {tickers[tickerIdx]}</div>
        </div>
        <div className={`fade-up ${visible?'visible':''}`} style={{transitionDelay:'0.4s', position:'relative', zIndex:1, width:'100%', maxWidth:'420px'}}>
          <div className="spots-bar">
            <div style={{fontSize:'12px', color:'rgba(255,255,255,0.7)', direction:'rtl', textAlign:'right'}}>
              <span style={{color:'#e8b84b', fontWeight:'600'}}>{spotsLeft} מקומות</span> נותרו מתוך 50 במחיר המבצע
            </div>
            <div className="spots-track">
              <div className="spots-fill" style={{width:`${(spotsLeft/50)*100}%`}} />
            </div>
          </div>
        </div>
        <div className={`fade-up ${visible?'visible':''}`} style={{transitionDelay:'0.5s'}}>
          {!submitted ? (
            <>
              <div className="cta-form">
                <button className="cta-btn" onClick={handleSubmit}>הצטרף למנוי</button>
                <input className="email-input" placeholder="האימייל שלך" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} />
              </div>
              <p className="price-note"><strong>19 ש"ח בחודש לנרשמים הראשונים</strong> · ביטול בכל עת</p>
            </>
          ) : (
            <div style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(200,151,42,0.5)',color:'#e8b84b',padding:'18px 32px',fontSize:'15px',direction:'rtl',maxWidth:'360px',margin:'0 auto',position:'relative',zIndex:1}}>
              ✓ נרשמת בהצלחה! נחזור אליך בקרוב
            </div>
          )}
        </div>
      </section>

      <div className="trusted-section">
        <div className="trusted-label">מניות שניתחנו</div>
        <div className="trusted-logos">
          {trustedStocks.map((s,i) => <div key={i} className="trusted-chip">{s}</div>)}
        </div>
      </div>

      <section className="demo-section">
        <div className="section-label">ראה את זה בפעולה</div>
        <ProductDemo />
      </section>

      <section style={{background:'var(--cream)',padding:'100px 20px'}}>
        <div style={{maxWidth:'860px',margin:'0 auto'}}>
          <h2 className="section-title">למה <span>אנליסט?</span></h2>
          <div className="features-grid">
            {features.map((f,i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title" style={{color:'#fff',marginBottom:'56px'}}>מה <span style={{color:'var(--gold-light)',fontStyle:'italic'}}>אומרים</span> המשתמשים</h2>
        <div className="testi-grid">
          {testimonials.map((t,i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-name">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div style={{maxWidth:'640px',margin:'0 auto'}}>
          <h2 className="section-title">שאלות <span>נפוצות</span></h2>
          {faqs.map((f,i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      <section className="final-cta" id="final-cta">
        <p style={{fontSize:'10px',letterSpacing:'4px',color:'var(--gold)',textTransform:'uppercase',marginBottom:'24px'}}>מבצע השקה</p>
        <div className="price-badge"><sup>₪</sup>19</div>
        <div className="price-period">לחודש לתמיד — ל-50 הנרשמים הראשונים בלבד</div>
        <div className="price-original">המחיר הרגיל: ₪29 לחודש</div>
        <div className="price-promo">✓ נותרו {spotsLeft} מקומות בלבד</div>
        {!submitted ? (
          <>
            <div className="cta-form" style={{justifyContent:'center'}}>
              <button className="cta-btn" onClick={handleSubmit}>הבטח את המחיר שלך</button>
              <input className="email-input" style={{background:'#fff',color:'#1a1a2e',border:'1px solid var(--gold-pale)',borderLeft:'none'}} placeholder="האימייל שלך" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} />
            </div>
            <p style={{fontSize:'12px',color:'#aaa',marginTop:'12px',direction:'rtl'}}>7 ימים ראשונים חינם · ללא כרטיס אשראי</p>
          </>
        ) : (
          <div className="success-box">✓ נרשמת! נחזור אליך בקרוב עם גישה למערכת</div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-logo">אנליסט</div>
        <div>לא המלצת השקעה · לצרכי מידע בלבד · © 2026</div>
        <div style={{fontSize:'11px', color:'rgba(255,255,255,0.2)', letterSpacing:'1px'}}>Created by Inon Yosef Cohen</div>
      </footer>
    </div>
  );
}

// שורות החיבור לקובץ ה-HTML הראשי של השרת
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<LandingPage />);
}
