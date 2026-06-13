import { useState } from "react";

const DONATION_LINK = "https://buymeacoffee.com/InnerGen";

const T = {
  bg: "#04070E", card: "rgba(255,255,255,0.032)", border: "rgba(255,210,80,0.13)",
  gold: "#F2C94C", goldLight: "#FFE790", goldDim: "rgba(242,201,76,0.45)",
  text: "#EDE8D4", muted: "rgba(237,232,212,0.52)", dim: "rgba(237,232,212,0.22)",
  green: "#5FFFA0", blue: "#79CCFF", rose: "#FF9EB8",
};
const FONT_H = "'Century Gothic', 'AppleGothic', 'Trebuchet MS', sans-serif";
const FONT_B = "'Lato', 'Helvetica Neue', Arial, sans-serif";
const FONT   = FONT_H;
const SERIF  = "'Cormorant Garamond', Georgia, serif";

// ─── QUIZ (unchanged) ─────────────────────────────────────────────────────────
const QUIZ = [
  { id:1, phase:"Neuroscience", icon:"🧬", question:"Your brain has ~86 billion neurons. Research shows most people use repetitive thought loops. Which best describes your inner dialogue today?", science:"Dr. Joe Dispenza found that 90% of daily thoughts are identical to the day before — but neuroplasticity means every new thought literally rewires neural pathways.", options:[{text:"Replaying past events or worries most of the time",pts:1,reveal:"That's the default mode network — your brain's autopilot. Simply noticing it is the first rewire."},{text:"Mixing old patterns with new curiosity",pts:2,reveal:"Your prefrontal cortex is starting to override the amygdala. That friction you feel is growth."},{text:"Mostly focused on what I'm building or creating",pts:3,reveal:"Goal-directed thinking activates your brain's reward circuitry — dopamine is literally flowing right now."},{text:"Deliberately choosing thoughts that serve my future",pts:4,reveal:"This is metacognition — thinking about thinking. Fewer than 5% of people operate here consistently."}]},
  { id:2, phase:"Psychology", icon:"🧠", question:"Abraham Maslow studied the top 1% of human performers for decades. His research found one defining difference. Which resonates with how you approach life?", science:"Maslow's self-actualized subjects were more interested in problems outside themselves than personal comfort. Peak experience — not safety — was their compass.", options:[{text:"I mostly focus on getting through the day safely",pts:1,reveal:"Survival mode is a biological response — not a character flaw. Recognizing it is the door above it."},{text:"I think about what I want but often feel stuck",pts:2,reveal:"The gap between desire and action shrinks through one thing: one decision made today."},{text:"I'm actively working toward something meaningful",pts:3,reveal:"Viktor Frankl called this 'will to meaning' — the deepest human motivator. You carry it."},{text:"I feel genuinely called to something larger than myself",pts:4,reveal:"Transcendence — Maslow's highest level, added before his death. You're operating at humanity's peak."}]},
  { id:3, phase:"Behavioral Science", icon:"⚗️", question:"Stanford psychologist Carol Dweck's 30-year study identified two mindsets predicting success more reliably than IQ. When you face a hard challenge, you tend to:", science:"Dweck's research across 10,000+ people found Growth Mindset subjects achieved 40% better outcomes — not because they were smarter, but because they believed ability was expandable.", options:[{text:"Avoid it — I don't want to look incompetent",pts:1,reveal:"Fixed mindset is installed early by well-meaning people. It can be uninstalled at any age."},{text:"Try, but feel anxious about failing publicly",pts:2,reveal:"Anxiety means you care. Channel it: anxiety and excitement use the same neurochemistry."},{text:"Lean in — difficulty signals I'm learning something real",pts:3,reveal:"Growth Mindset activated. Your brain builds new pathways specifically when challenged."},{text:"Seek it out — I know obstacles are the path forward",pts:4,reveal:"Stoic philosophy and modern neuroscience agree: chosen difficulty is the fastest route to mastery."}]},
  { id:4, phase:"Human Potential", icon:"🔬", question:"Harvard's 75-year Grant Study — the longest human development research ever conducted — found the single greatest predictor of a thriving life. Which describes your relationship with people?", science:"Dr. Robert Waldinger found warm relationships predicted health, happiness, and longevity more powerfully than wealth, fame, or IQ. Social connection is not soft science — it's biology.", options:[{text:"I feel mostly isolated or disconnected right now",pts:1,reveal:"Loneliness activates the same brain regions as physical pain. One genuine reach-out today rewires this."},{text:"I have some connections but want deeper ones",pts:2,reveal:"Depth over breadth is the research finding. One real conversation outweighs ten surface ones."},{text:"I have meaningful relationships that genuinely energize me",pts:3,reveal:"You have what many successful people wish they'd prioritized. This is foundational wealth."},{text:"I invest in people as consciously as I invest in my goals",pts:4,reveal:"Reciprocal altruism — studied across evolutionary psychology and neuroscience — is the pinnacle of human design."}]},
  { id:5, phase:"Cognitive Science", icon:"💎", question:"Nobel laureate Daniel Kahneman identified two systems of thought — System 1 (fast, automatic) and System 2 (slow, deliberate). How do you typically make important decisions?", science:"Kahneman's research showed 95% of decisions are System 1 — emotional and habitual. System 2 thinkers who pause before deciding report 60% higher life satisfaction over time.", options:[{text:"I mostly react — gut feeling without much reflection",pts:1,reveal:"System 1 dominance isn't weakness — it's the brain conserving energy. One pause per day shifts the ratio."},{text:"Sometimes I reflect, but habit usually wins",pts:2,reveal:"Habit recognition IS System 2 activating. You're already shifting the balance without knowing it."},{text:"I pause and consider carefully before important choices",pts:3,reveal:"Temporal discounting research shows this single habit compounds into dramatically better outcomes over five years."},{text:"I design my environment to make good decisions automatic",pts:4,reveal:"Behavioral design — the science of nudging yourself. Used by top performers worldwide."}]},
  { id:6, phase:"Epigenetics", icon:"🌿", question:"Cell biology research revealed that genes respond to environment and perception — not the other way around. What best describes your beliefs about your own potential?", science:"Epigenetic research shows signals from our thoughts and environment switch genes on or off. Your beliefs are not just psychological — they are biological instructions to your cells.", options:[{text:"I think I'm mostly fixed — it's simply who I am",pts:1,reveal:"This belief itself is the ceiling. Epigenetics proves it's a ceiling you installed — and can remove."},{text:"I think I can change some things with enough effort",pts:2,reveal:"This partial belief is enough to begin. Every step forward updates your gene expression in real time."},{text:"I genuinely believe I can transform significantly",pts:3,reveal:"You're operating on biological truth. Environment plus belief equals new cellular expression."},{text:"I know my potential is practically limitless",pts:4,reveal:"This is not naive optimism — it is scientifically accurate. You're living aligned with your biology."}]},
  { id:7, phase:"Flow Science", icon:"🌊", question:"Psychologist Mihaly Csikszentmihalyi studied 8,000 people across 40 years on optimal human experience. When do you feel most fully alive and absorbed?", science:"Flow — complete absorption in meaningful challenge — produces more happiness than leisure. The brain in flow releases five neurochemicals simultaneously including dopamine, endorphins, and serotonin.", options:[{text:"During rest and passive relaxation",pts:1,reveal:"Rest is essential — but research shows flow produces 5x more fulfillment than passive leisure."},{text:"In deep conversations with people I genuinely care about",pts:2,reveal:"Interpersonal flow is real and documented. You're already tapping one of the most powerful channels."},{text:"When I'm deep in work that genuinely challenges me",pts:3,reveal:"You know what flow feels like. The research says: engineer more of this and life transforms measurably."},{text:"I deliberately design my days around peak performance states",pts:4,reveal:"Flow architecture — the deliberate structuring of challenge-to-skill ratio. Elite performers live here."}]},
  { id:8, phase:"Identity Science", icon:"🪞", question:"William James — father of American psychology — wrote in 1890: 'The greatest revolution of our generation is the discovery that human beings can alter their lives by altering their minds.' Which feels most true about you today?", science:"Identity-based behavior change research shows lasting transformation only sticks when it's identity-first. 'I am a person who...' outperforms goal-setting by 3:1 in long-term outcome studies.", options:[{text:"I define myself mostly by my past and current circumstances",pts:1,reveal:"The past is data, not destiny. James wrote this 135 years ago — neuroscience confirmed it fully in 2020."},{text:"I'm not entirely sure who I am yet — still discovering",pts:2,reveal:"Identity fluidity is a superpower. The most adaptable people in history described themselves exactly this way."},{text:"I'm consciously becoming a new and better version of myself",pts:3,reveal:"Identity evolution — researchers call it narrative identity updating. You're doing it right now."},{text:"I live deliberately from my future self, not my past self",pts:4,reveal:"Future-self psychology shows this orientation produces measurably better outcomes in health, finances, and relationships."}]},
];

// ─── LEVELS ───────────────────────────────────────────────────────────────────
const LEVELS = [
  { min:8,  max:14, title:"The Latent Giant",      emoji:"🌱", color:"#79CCFF", desc:"Your potential is fully intact and completely unrealized — which means the upside ahead of you is extraordinary. Every person who ever achieved something remarkable started exactly here." },
  { min:15, max:21, title:"The Stirring Mind",     emoji:"🌅", color:"#F0A060", desc:"Something real is activating inside you. You feel a pull toward more. Research shows this awareness alone — this exact feeling — is the neurological precursor to genuine transformation." },
  { min:22, max:26, title:"The Conscious Builder", emoji:"🔥", color:"#F2C94C", desc:"You are operating with deliberate intention. Behavioral science confirms: people at your stage who keep going don't just improve — they compound. You are genuinely rare." },
  { min:27, max:32, title:"The Awakened",          emoji:"⚡", color:"#5FFFA0", desc:"You are operating from your highest design. The science is clear: you have built the thinking architecture that produces what others call extraordinary. This is your natural state." },
];
function getLevel(pts) { return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0]; }

// ─── BOOK PAGES ORDER ─────────────────────────────────────────────────────────
const BOOK_PAGES = ["cover","intro","p1","p2","p3","p4","p5","p6","p7","closing","final"];
const CONTENT_PAGES = ["p1","p2","p3","p4","p5","p6","p7"];
const TOTAL_CONTENT = CONTENT_PAGES.length;

// ─── BOOK SECTIONS ────────────────────────────────────────────────────────────
const BOOK_SECTIONS = [
  "YOUR POTENTIAL BLUEPRINT","YOUR GENIUS PROFILE","YOUR THREE CORE STRENGTHS",
  "YOUR SHADOW PATTERN","YOUR IDENTITY SHIFT","YOUR WEALTH MINDSET",
  "YOUR RELATIONSHIP EDGE","YOUR 90-DAY ROADMAP","YOUR DAILY PRACTICES",
  "YOUR RESOURCES","YOUR MONTHLY CHECK-IN QUESTIONS",
];

function parseBook(rawText) {
  // Strip common markdown so headings are findable regardless of AI formatting
  const text = rawText
    .replace(/\*\*/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/\r\n/g, "\n");

  const result = {};
  const upper = text.toUpperCase();

  for (let i = 0; i < BOOK_SECTIONS.length; i++) {
    const heading = BOOK_SECTIONS[i];
    const start = upper.indexOf(heading);
    if (start === -1) { result[heading] = []; continue; }
    let cStart = start + heading.length;
    if (text[cStart] === ":") cStart++; // skip optional trailing colon
    let end = text.length;
    for (let j = i + 1; j < BOOK_SECTIONS.length; j++) {
      const nx = upper.indexOf(BOOK_SECTIONS[j], cStart);
      if (nx !== -1) { end = nx; break; }
    }
    const raw = text.slice(cStart, end).trim();
    const bullets = raw
      .split("\n")
      .map(l => l.replace(/^[•\-\*◆➤▸·]\s*/,"").replace(/^\d+\.\s*/,"").trim())
      .filter(l => l.length > 3 && !BOOK_SECTIONS.some(s => l.toUpperCase().startsWith(s)));
    result[heading] = bullets;
  }
  return result;
}

// ─── PROMPT ───────────────────────────────────────────────────────────────────
function getPrompt(lvl, points, answerSummary, name) {
  const who = name || "this person";
  const pos = name ? `${name}'s` : "your";
  return `You are a world-class human potential guide. Create a deeply personal Magic Book for ${who} at the "${lvl.title}" level (score ${points}/32). Their assessment: ${answerSummary}.

Address them by name as "${name || "you"}" at least once per section. Format EVERY section as rich bullet points — one insight per line starting with "•". 4-5 bullets per section, each 1-2 lines. Warm, intelligent, direct, deeply specific to their score. No mention of AI.

Use these EXACT section headings in ALL CAPS:

YOUR POTENTIAL BLUEPRINT
• 4 bullets: current position, what is exceptional in ${who}, what is activating right now, what is ready to break open next.

YOUR GENIUS PROFILE
• 4 bullets: 2 natural genius modes each named precisely — one bullet naming the genius, one bullet on how to use it deliberately.

YOUR THREE CORE STRENGTHS
• 3 bullets: name each strength, why it matters for ${who} specifically, one practice to deepen it.

YOUR SHADOW PATTERN
• 3 bullets: the pattern named plainly, where it likely formed, one daily micro-practice to dissolve it.

YOUR IDENTITY SHIFT
• 4 bullets: describe exactly who ${who} is becoming — specific traits, language, energy of the emerging self.

YOUR WEALTH MINDSET
• 4 bullets: how ${pos} specific thinking patterns at score ${points}/32 affect money outcomes, and 3 precise mindset shifts.

YOUR RELATIONSHIP EDGE
• 4 bullets: strongest relational quality + one way to amplify it, biggest growth edge + one practice to grow it.

YOUR 90-DAY ROADMAP
• Month 1 — [Theme]: specific weekly focus for ${who}.
• Month 2 — [Theme]: specific weekly focus building on Month 1.
• Month 3 — [Theme]: specific weekly focus building on Month 2.
• One integration practice for the full 90 days.

YOUR DAILY PRACTICES
• 5 bullets: practice name + why it works specifically for ${who}'s level + exact daily instruction.

YOUR RESOURCES
• 5 books + 1 podcast + 1 documentary — one line each explaining exactly why it fits ${who}.

YOUR MONTHLY CHECK-IN QUESTIONS
• 4 powerful questions designed precisely for ${pos} growth edge.`;
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#04070E;overflow-x:hidden;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-thumb{background:rgba(242,201,76,0.2);border-radius:2px;}
  @keyframes tw{from{opacity:.05;}to{opacity:.45;}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
  @keyframes beat{0%,100%{transform:scale(1);}50%{transform:scale(1.07);}}
  @keyframes glow{0%,100%{box-shadow:0 0 14px rgba(242,201,76,0.2);}50%{box-shadow:0 0 32px rgba(242,201,76,0.55);}}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes pulse{0%,100%{opacity:.4;}50%{opacity:1;}}
`;

// ─── ORNAMENT ─────────────────────────────────────────────────────────────────
function Ornament({ width = 160 }) {
  return (
    <svg width={width} height="20" viewBox="0 0 160 20" fill="none" style={{display:"block",margin:"0 auto"}}>
      <line x1="0" y1="10" x2="62" y2="10" stroke="rgba(242,201,76,0.35)" strokeWidth="1"/>
      <path d="M80 1 L86 10 L80 19 L74 10 Z" fill="#F2C94C"/>
      <circle cx="80" cy="10" r="1.6" fill="#04070E"/>
      <line x1="98" y1="10" x2="160" y2="10" stroke="rgba(242,201,76,0.35)" strokeWidth="1"/>
    </svg>
  );
}

// ─── STAR FIELD ───────────────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({length:65},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,s:Math.random()*1.5+0.3,d:Math.random()*6,dur:Math.random()*4+2}));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
      {stars.map(s=>(
        <div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.s,height:s.s,borderRadius:"50%",background:s.id%5===0?"#79CCFF":"#F2C94C",opacity:0.18,animation:`tw ${s.dur}s ${s.d}s infinite alternate`}}/>
      ))}
    </div>
  );
}

// ─── BOOK CHAPTER COMPONENT ───────────────────────────────────────────────────
function BookChapter({ title, bullets=[], color, dimTitle=false }) {
  if (!bullets.length) return null;
  const label = title.replace("YOUR ","").replace("THREE ","3 ");
  return (
    <div style={{marginBottom:26}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <div style={{width:2,height:18,background:color||T.gold,borderRadius:1,flexShrink:0}}/>
        <h3 style={{fontFamily:SERIF,fontSize:17,fontWeight:600,color:dimTitle?T.muted:T.text,letterSpacing:0.3,lineHeight:1.2}}>{label}</h3>
      </div>
      {bullets.map((b,i)=>(
        <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:9}}>
          <span style={{color:color||T.gold,fontSize:11,lineHeight:"20px",flexShrink:0,marginTop:1}}>◆</span>
          <span style={{fontFamily:FONT_B,fontSize:13,color:T.muted,lineHeight:1.8}}>{b}</span>
        </div>
      ))}
    </div>
  );
}

// ─── BOOK PAGE SHELL ──────────────────────────────────────────────────────────
function BookShell({ roman, pageNum, totalPages, title, subtitle, color, children, onPrev, prevLabel, onNext, nextLabel, card, goldBtn, outlineBtn, dimBtn, inner, wrap }) {
  return (
    <div style={wrap}>
      <style>{CSS}</style>
      <StarField/>
      <div style={inner}>
        <div style={{textAlign:"center",marginBottom:18,animation:"fadeUp 0.35s ease"}}>
          <div style={{fontFamily:SERIF,fontSize:36,color:color||T.gold,lineHeight:1,fontStyle:"italic",marginBottom:6}}>{roman}</div>
          <Ornament width={100}/>
          {title && <h2 style={{fontFamily:SERIF,fontSize:20,fontWeight:600,color:T.text,marginTop:12,marginBottom:2,letterSpacing:0.3}}>{title}</h2>}
          {subtitle && <p style={{fontFamily:FONT_B,fontSize:11,color:T.dim,letterSpacing:2,textTransform:"uppercase",marginTop:4}}>{subtitle}</p>}
        </div>
        <div style={{...card,padding:"26px 22px 18px",animation:"fadeUp 0.4s ease"}}>
          {children}
          <div style={{textAlign:"center",marginTop:8,fontFamily:FONT_B,fontSize:10,letterSpacing:3,color:T.dim,textTransform:"uppercase",paddingTop:14,borderTop:`1px solid ${T.border}`}}>
            Page {pageNum} of {totalPages}
          </div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:14}}>
          <button onClick={onPrev} style={{...outlineBtn,flex:"none",width:"auto",padding:"13px 18px",animation:"none"}}>{prevLabel||"←"}</button>
          <button onClick={onNext} style={{...goldBtn,animation:"none"}}>{nextLabel||"Next →"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── STREAM ───────────────────────────────────────────────────────────────────
async function streamBookContent(prompt, maxTokens, onChunk, onDone, onError) {
  try {
    const res = await fetch("/api/generate-book",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt,maxTokens})});
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    if (!data.text) throw new Error("Empty response");
    onChunk(data.text);
    onDone(data.text);
  } catch(err) { onError(err); }
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function InnerGenApp() {
  const [screen,      setScreen]      = useState("splash");
  const [qIdx,        setQIdx]        = useState(0);
  const [selected,    setSelected]    = useState(null);
  const [points,      setPoints]      = useState(0);
  const [answers,     setAnswers]     = useState([]);
  const [insight,     setInsight]     = useState(null);
  const [activeTab,   setActiveTab]   = useState("result");
  const [bookContent, setBookContent] = useState("");
  const [animKey,     setAnimKey]     = useState(0);
  const [shareMsg,    setShareMsg]    = useState("");
  const [prevScreen,  setPrevScreen]  = useState("splash");
  const [userName,    setUserName]    = useState("");
  const [email,       setEmail]       = useState("");
  const [emailError,  setEmailError]  = useState("");
  const [nameError,   setNameError]   = useState("");
  const [isReturning, setIsReturning] = useState(false);
  const [bookPage,    setBookPage]    = useState("cover");
  const [parsedBook,  setParsedBook]  = useState({});
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError,   setBookError]   = useState(false);

  function goToTerms(from) { setPrevScreen(from); setScreen("terms"); }
  const currentQ = QUIZ[qIdx];
  const level    = getLevel(points);

  function nextBookPage() {
    const idx = BOOK_PAGES.indexOf(bookPage);
    if (idx < BOOK_PAGES.length - 1) setBookPage(BOOK_PAGES[idx + 1]);
  }
  function prevBookPage() {
    const idx = BOOK_PAGES.indexOf(bookPage);
    if (idx > 0) setBookPage(BOOK_PAGES[idx - 1]);
  }
  function contentPageNum(page) {
    const idx = CONTENT_PAGES.indexOf(page);
    return idx === -1 ? 0 : idx + 1;
  }

  function handleAnswer(opt) {
    if (selected) return;
    setSelected(opt);
    setInsight({ text: opt.reveal, science: currentQ.science });
  }

  function nextQuestion() {
    const newAnswers = [...answers, { q: currentQ.id, pts: selected.pts, phase: currentQ.phase }];
    setAnswers(newAnswers);
    const next = qIdx + 1;
    if (next < QUIZ.length) {
      setQIdx(next); setSelected(null); setInsight(null);
      setPoints(p => p + selected.pts); setAnimKey(k => k + 1);
    } else {
      const total = newAnswers.reduce((s,a) => s + a.pts, 0);
      setPoints(total);
      setScreen("dashboard");
      setActiveTab("result");
    }
  }

  function goBack() {
    if (qIdx === 0) return;
    const prev = answers[answers.length - 1];
    setPoints(p => p - (prev?.pts || 0));
    setAnswers(a => a.slice(0, -1));
    setQIdx(q => q - 1);
    setSelected(null); setInsight(null); setAnimKey(k => k + 1);
  }

  function handleEmailSubmit() {
    let ok = true;
    if (!userName.trim()) { setNameError("What's your first name?"); ok = false; } else setNameError("");
    if (!email || !email.includes("@")) { setEmailError("Please enter a valid email address."); ok = false; } else setEmailError("");
    if (!ok) return;
    try { const stored = localStorage.getItem("innergen_book_email"); setIsReturning(!!stored); } catch { setIsReturning(false); }
    setScreen("gate");
  }

  async function generateBook() {
    try { localStorage.setItem("innergen_book_email", email); } catch {}
    try {
      await fetch("/api/save-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,name:userName,level:level.title,score:points})});
    } catch {}

    setBookLoading(true);
    setBookContent("");
    setBookError(false);
    setParsedBook({});
    setBookPage("loading");
    setScreen("book");

    const answerSummary = answers.length > 0
      ? answers.map(a => `${a.phase}: ${a.pts}/4`).join(", ")
      : "Assessment completed";
    const prompt = getPrompt(level, points, answerSummary, userName.trim());

    await streamBookContent(
      prompt, 2000,
      (text) => setBookContent(text),
      (text) => { setParsedBook(parseBook(text)); setBookLoading(false); setBookPage("cover"); },
      () => { setBookError(true); setBookLoading(false); setBookPage("cover"); }
    );
  }

  function downloadBook() {
    if (!bookContent || bookContent.length < 50) {
      setBookPage("cover"); // send back to cover so they can retry
      return;
    }
    const nameLabel = userName ? `${userName}'s` : "Your";
    const blob = new Blob([
      `INNERGEN — ${nameLabel.toUpperCase()} PERSONAL MAGIC BOOK\n`,
      `${level.title} · Score ${points}/32\n`,
      `${"─".repeat(50)}\n\n`,
      bookContent,
    ], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `InnerGen-Magic-Book-${userName||"Yours"}.txt`; a.click();
    URL.revokeObjectURL(url);
  }

  function handleShare(platform) {
    const msg = `I just discovered I'm "${level.title}" on InnerGen — a science-based human potential assessment. Score: ${points}/32. Take it free → innergen.app`;
    const encoded = encodeURIComponent(msg);
    if (platform==="whatsapp") window.open(`https://wa.me/?text=${encoded}`,"_blank");
    else if (platform==="twitter") window.open(`https://twitter.com/intent/tweet?text=${encoded}`,"_blank");
    else if (platform==="email") window.open(`mailto:?subject=My InnerGen Result&body=${encoded}`,"_blank");
    else if (platform==="copy") { navigator.clipboard?.writeText(msg); setShareMsg("Copied! Share it anywhere."); setTimeout(()=>setShareMsg(""),3000); }
  }

  // ── STYLES ───────────────────────────────────────────────────────────────────
  const card = { background:T.card, border:`1px solid ${T.border}`, borderRadius:18, backdropFilter:"blur(14px)", boxShadow:"0 6px 40px rgba(0,0,0,0.45)" };
  const goldBtn = { width:"100%", padding:"15px 20px", borderRadius:12, border:"none", background:`linear-gradient(135deg, ${T.gold}, #c49000)`, color:"#04070E", fontFamily:FONT, fontWeight:700, fontSize:13, letterSpacing:"0.05em", cursor:"pointer", animation:"glow 3s infinite" };
  const outlineBtn = { width:"100%", padding:"13px 20px", borderRadius:12, border:`1.5px solid ${T.goldDim}`, background:"transparent", color:T.gold, fontFamily:FONT, fontWeight:600, fontSize:13, cursor:"pointer" };
  const dimBtn = { width:"100%", padding:"12px 20px", borderRadius:12, border:"none", background:"rgba(255,255,255,0.05)", color:T.muted, fontFamily:FONT, fontSize:12, cursor:"pointer" };
  const wrap  = { minHeight:"100vh", background:T.bg, position:"relative", overflow:"hidden" };
  const inner = { maxWidth:500, margin:"0 auto", padding:"20px 18px 70px", position:"relative", zIndex:2 };

  const shellProps = { card, goldBtn, outlineBtn, dimBtn, inner, wrap };
  const p = parsedBook;
  const nameLabel = userName ? `${userName}'s` : "Your";
  const firstName = userName || "you";

  // ── SPLASH ───────────────────────────────────────────────────────────────────
  if (screen==="splash") return (
    <div style={wrap}><style>{CSS}</style><StarField/>
      <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
        <div style={{...card,padding:"44px 30px",textAlign:"center",animation:"fadeUp 0.65s ease",width:"100%"}}>
          <div style={{fontSize:54,marginBottom:10,animation:"beat 3s infinite"}}>⚡</div>
          <div style={{fontFamily:FONT_B,fontSize:11,letterSpacing:3,color:"rgba(242,201,76,0.7)",marginBottom:14,textTransform:"uppercase",fontWeight:700}}>InnerGen · Human Potential Lab</div>
          <h1 style={{fontFamily:FONT,fontSize:32,fontWeight:700,lineHeight:1.2,marginBottom:16,color:T.text}}>Discover What Science Says<br/><span style={{color:T.gold}}>You're Actually Capable Of</span></h1>
          <p style={{fontFamily:FONT_B,color:"rgba(237,232,212,0.82)",fontSize:15,lineHeight:1.85,marginBottom:28,fontWeight:400}}>8 questions grounded in 200 years of neuroscience, psychology, and human potential research. No performance. No judgment. Just truth about who you already are.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:32}}>
            {["Always free","8 questions · 5 min","Personalized for you"].map(t=>(
              <span key={t} style={{fontFamily:FONT_B,background:"rgba(242,201,76,0.08)",border:`1px solid ${T.border}`,borderRadius:50,padding:"5px 14px",fontSize:12,color:T.gold,fontWeight:700}}>{t}</span>
            ))}
          </div>
          <button style={goldBtn} onClick={()=>setScreen("quiz")}>BEGIN YOUR ASSESSMENT →</button>
          <p style={{fontFamily:FONT_B,fontSize:12,color:"rgba(237,232,212,0.45)",marginTop:18,lineHeight:1.7}}>Grounded in research by Maslow · Csikszentmihalyi · Dweck · Kahneman · Waldinger · Dispenza · James</p>
          <p style={{marginTop:14}}>
            <button onClick={()=>goToTerms("splash")} style={{background:"none",border:"none",fontFamily:FONT_B,fontSize:11,color:T.goldDim,cursor:"pointer",textDecoration:"underline"}}>Terms & Conditions · Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ─────────────────────────────────────────────────────────────────────
  if (screen==="quiz") return (
    <div style={wrap}><style>{CSS}</style><StarField/>
      <div style={inner}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {qIdx>0 && <button onClick={goBack} style={{background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"5px 12px",color:T.muted,fontFamily:FONT,fontSize:12,cursor:"pointer"}}>← Back</button>}
            <span style={{fontFamily:FONT,fontSize:12,color:T.muted}}>Q{qIdx+1} of {QUIZ.length}</span>
          </div>
          <span style={{fontFamily:FONT,fontSize:11,color:T.goldDim,letterSpacing:2}}>INNERGEN</span>
        </div>
        <div style={{height:2,background:"rgba(255,255,255,0.06)",borderRadius:1,overflow:"hidden",marginBottom:24}}>
          <div style={{height:"100%",width:`${(qIdx/QUIZ.length)*100}%`,background:`linear-gradient(90deg, ${T.gold}, ${T.goldLight})`,transition:"width 0.5s ease",boxShadow:`0 0 8px ${T.gold}`}}/>
        </div>
        <div key={animKey} style={{...card,padding:"28px 22px",animation:"fadeUp 0.4s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
            <span style={{fontSize:18}}>{currentQ.icon}</span>
            <span style={{fontFamily:FONT_B,fontSize:11,letterSpacing:2,color:"rgba(242,201,76,0.8)",textTransform:"uppercase",fontWeight:700}}>{currentQ.phase}</span>
          </div>
          <h2 style={{fontFamily:FONT_H,fontSize:17,fontWeight:700,lineHeight:1.6,color:"#FFFFFF",marginBottom:22}}>{currentQ.question}</h2>
          {!insight && (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {currentQ.options.map((opt,i)=>(
                <button key={i} onClick={()=>handleAnswer(opt)} style={{background:selected===opt?"rgba(242,201,76,0.1)":"rgba(255,255,255,0.04)",border:`1.5px solid ${selected===opt?T.gold:"rgba(255,255,255,0.12)"}`,borderRadius:12,padding:"14px 16px",textAlign:"left",cursor:selected?"default":"pointer",fontFamily:FONT_B,fontSize:13,color:selected===opt?T.text:T.muted,lineHeight:1.5,transition:"all 0.2s"}}>{opt.text}</button>
              ))}
            </div>
          )}
          {insight && (
            <div style={{animation:"fadeUp 0.35s ease"}}>
              <div style={{background:"rgba(242,201,76,0.07)",border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 18px",marginBottom:16}}>
                <p style={{fontFamily:FONT_B,fontSize:14,color:T.text,lineHeight:1.8,marginBottom:10,fontWeight:700}}>{insight.text}</p>
                <p style={{fontFamily:FONT_B,fontSize:14,color:"rgba(237,232,212,0.82)",lineHeight:1.8,fontWeight:400}}>{insight.science}</p>
              </div>
              <button style={goldBtn} onClick={nextQuestion}>{qIdx+1<QUIZ.length?"NEXT QUESTION →":"SEE MY RESULTS →"}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ────────────────────────────────────────────────────────────────
  if (screen==="dashboard") {
    const tabs = [{id:"result",label:"My Result"},{id:"progress",label:"Progress"}];
    return (
      <div style={wrap}><style>{CSS}</style><StarField/>
        <div style={{background:"rgba(4,7,14,0.94)",borderBottom:`1px solid ${T.border}`,backdropFilter:"blur(16px)",padding:"13px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:30}}>
          <div>
            <div style={{fontFamily:FONT,fontSize:17,fontWeight:700,color:T.gold,letterSpacing:1}}>InnerGen</div>
            <div style={{fontFamily:FONT,fontSize:9,color:T.dim,letterSpacing:3,textTransform:"uppercase"}}>Human Potential Lab</div>
          </div>
          <div style={{fontFamily:FONT,fontSize:12,color:T.muted}}>{level.emoji} {level.title}</div>
        </div>
        <div style={{display:"flex",borderBottom:`1px solid ${T.border}`,background:"rgba(4,7,14,0.88)",backdropFilter:"blur(8px)",position:"sticky",top:56,zIndex:29}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{flex:1,padding:"12px 8px",border:"none",background:"transparent",cursor:"pointer",fontFamily:FONT,fontSize:12,fontWeight:activeTab===t.id?700:400,color:activeTab===t.id?T.gold:T.muted,borderBottom:activeTab===t.id?`2px solid ${T.gold}`:"2px solid transparent",transition:"all 0.2s"}}>{t.label}</button>
          ))}
        </div>
        <div style={inner}>
          {activeTab==="result" && (
            <div style={{animation:"fadeUp 0.4s ease"}}>
              <div style={{...card,padding:"28px 22px",marginBottom:16,textAlign:"center"}}>
                <div style={{fontSize:50,marginBottom:8,animation:"beat 2.5s infinite"}}>{level.emoji}</div>
                <div style={{fontFamily:FONT,fontSize:10,letterSpacing:4,color:T.goldDim,marginBottom:8,textTransform:"uppercase"}}>Your Potential Profile</div>
                <h2 style={{fontFamily:FONT,fontSize:26,fontWeight:700,color:level.color,marginBottom:10}}>{level.title}</h2>
                <p style={{fontFamily:FONT_B,fontSize:14,color:"rgba(237,232,212,0.82)",lineHeight:1.85,marginBottom:22}}>{level.desc}</p>
                <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                  {[{label:"Score",value:`${points}/32`},{label:"Profile",value:level.emoji}].map(s=>(
                    <div key={s.label} style={{background:"rgba(242,201,76,0.07)",border:`1px solid ${T.border}`,borderRadius:12,padding:"12px 22px"}}>
                      <div style={{fontFamily:FONT,fontSize:22,fontWeight:700,color:T.gold}}>{s.value}</div>
                      <div style={{fontFamily:FONT,fontSize:10,color:T.dim,letterSpacing:2,marginTop:3,textTransform:"uppercase"}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{...card,padding:"26px 22px",marginBottom:16,border:`1px solid rgba(242,201,76,0.3)`,background:"rgba(242,201,76,0.03)"}}>
                <div style={{fontFamily:FONT,fontSize:10,letterSpacing:3,color:T.goldDim,marginBottom:10,textTransform:"uppercase"}}>✦ Your Next Step</div>
                <h3 style={{fontFamily:SERIF,fontSize:22,color:T.text,fontWeight:600,marginBottom:12}}>Your Personal Magic Book is waiting</h3>
                <p style={{fontFamily:FONT_B,fontSize:14,color:T.muted,lineHeight:1.85,marginBottom:20}}>Based on your score of <strong style={{color:T.gold}}>{points}/32</strong> as <strong style={{color:level.color}}>{level.title}</strong>, your personalized guide is ready to be built — written just for you, from your own answers.</p>
                <button style={goldBtn} onClick={()=>setScreen("emailCapture")}>GET MY MAGIC BOOK →</button>
              </div>
              <div style={{...card,padding:"20px 22px",marginBottom:16}}>
                <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:3,color:T.goldDim,marginBottom:10,textTransform:"uppercase"}}>✦ Share Your Result</div>
                <p style={{fontFamily:FONT_B,fontSize:13,color:T.muted,lineHeight:1.75,marginBottom:16}}>Know someone who needs to hear this? Share your result and invite them to discover their own.</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[{platform:"whatsapp",label:"WhatsApp",emoji:"💬",color:"#25D366"},{platform:"twitter",label:"X / Twitter",emoji:"𝕏",color:"#1DA1F2"},{platform:"email",label:"Email",emoji:"✉️",color:T.gold},{platform:"copy",label:"Copy Link",emoji:"🔗",color:T.muted}].map(s=>(
                    <button key={s.platform} onClick={()=>handleShare(s.platform)} style={{padding:"12px 10px",borderRadius:12,border:`1px solid rgba(255,255,255,0.08)`,background:"rgba(255,255,255,0.03)",cursor:"pointer",fontFamily:FONT_B,fontSize:12,color:s.color,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                      <span>{s.emoji}</span>{s.label}
                    </button>
                  ))}
                </div>
                {shareMsg && <p style={{fontFamily:FONT_B,fontSize:12,color:T.green,textAlign:"center",marginTop:10}}>{shareMsg}</p>}
              </div>
              <button style={dimBtn} onClick={()=>{setScreen("quiz");setQIdx(0);setSelected(null);setInsight(null);setPoints(0);setAnswers([]);setAnimKey(0);}}>↩ Retake Assessment</button>
            </div>
          )}
          {activeTab==="progress" && (
            <div style={{animation:"fadeUp 0.4s ease"}}>
              <h2 style={{fontFamily:FONT,fontSize:24,fontWeight:700,color:T.text,marginBottom:6}}>Your Progress</h2>
              <p style={{fontFamily:FONT_B,fontSize:13,color:T.muted,marginBottom:22,lineHeight:1.7}}>A breakdown of your scores across all eight dimensions of human potential.</p>
              <div style={{...card,padding:"24px 22px",marginBottom:16}}>
                <div style={{fontFamily:FONT,fontSize:10,letterSpacing:3,color:T.goldDim,marginBottom:18,textTransform:"uppercase"}}>Phase Breakdown</div>
                {QUIZ.map((q,i)=>{
                  const ans=answers[i]; const pct=ans?(ans.pts/4)*100:0; const col=pct>=75?T.green:pct>=50?T.gold:T.rose;
                  return (
                    <div key={q.id} style={{marginBottom:14}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                        <span style={{fontFamily:FONT_B,fontSize:12,color:T.muted}}>{q.icon} {q.phase}</span>
                        <span style={{fontFamily:FONT_B,fontSize:12,color:col,fontWeight:700}}>{ans?.pts||0}/4</span>
                      </div>
                      <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2}}>
                        <div style={{height:"100%",width:`${pct}%`,background:col,borderRadius:2,transition:"width 1s ease"}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── EMAIL CAPTURE ─────────────────────────────────────────────────────────────
  if (screen==="emailCapture") return (
    <div style={wrap}><style>{CSS}</style><StarField/>
      <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
        <div style={{...card,padding:"40px 28px",width:"100%",animation:"fadeUp 0.4s ease"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:42,marginBottom:10}}>📖</div>
            <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:4,color:T.goldDim,marginBottom:10,textTransform:"uppercase",fontWeight:700}}>One Last Step</div>
            <h2 style={{fontFamily:SERIF,fontSize:28,fontWeight:600,color:T.gold,marginBottom:10,lineHeight:1.2,fontStyle:"italic"}}>Your Guide Is Almost Ready</h2>
            <p style={{fontFamily:FONT_B,fontSize:13.5,color:T.muted,lineHeight:1.85}}>We'll write your name on the cover and personalize every word inside — built from your answers, for you alone.</p>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontFamily:FONT_B,fontSize:11,color:T.dim,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6}}>First Name</label>
            <input value={userName} onChange={e=>{setUserName(e.target.value);setNameError("");}} onKeyDown={e=>e.key==="Enter"&&handleEmailSubmit()} placeholder="e.g. Leli" style={{width:"100%",padding:"14px 16px",borderRadius:12,background:"rgba(255,255,255,0.05)",border:`1.5px solid ${nameError?T.rose:T.border}`,color:T.text,fontFamily:FONT_B,fontSize:14,outline:"none"}}/>
            {nameError && <p style={{fontFamily:FONT_B,fontSize:12,color:T.rose,marginTop:4}}>{nameError}</p>}
          </div>
          <div style={{marginBottom:6}}>
            <label style={{fontFamily:FONT_B,fontSize:11,color:T.dim,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6}}>Email Address</label>
            <input value={email} onChange={e=>{setEmail(e.target.value);setEmailError("");}} onKeyDown={e=>e.key==="Enter"&&handleEmailSubmit()} placeholder="you@email.com" type="email" style={{width:"100%",padding:"14px 16px",borderRadius:12,background:"rgba(255,255,255,0.05)",border:`1.5px solid ${emailError?T.rose:T.border}`,color:T.text,fontFamily:FONT_B,fontSize:14,outline:"none"}}/>
            {emailError && <p style={{fontFamily:FONT_B,fontSize:12,color:T.rose,marginTop:4}}>{emailError}</p>}
          </div>
          <div style={{marginTop:20}}><button style={goldBtn} onClick={handleEmailSubmit}>REVEAL MY MAGIC BOOK →</button></div>
          <p style={{fontFamily:FONT_B,fontSize:11,color:T.dim,lineHeight:1.6,textAlign:"center",marginTop:14}}>Used to deliver your guide and occasional updates. We respect your inbox.</p>
          <div style={{marginTop:16,textAlign:"center"}}>
            <button onClick={()=>setScreen("dashboard")} style={{background:"none",border:"none",fontFamily:FONT_B,fontSize:12,color:T.dim,cursor:"pointer"}}>← Back</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── GATE ──────────────────────────────────────────────────────────────────────
  if (screen==="gate") return (
    <div style={wrap}><style>{CSS}</style><StarField/>
      <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
        <div style={{...card,padding:"36px 28px",width:"100%",animation:"fadeUp 0.4s ease"}}>
          {!isReturning ? (
            <>
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{fontSize:38,marginBottom:10}}>🎁</div>
                <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:4,color:T.goldDim,marginBottom:10,textTransform:"uppercase",fontWeight:700}}>✦ A Gift, Already Given</div>
                <h2 style={{fontFamily:SERIF,fontSize:26,fontWeight:600,color:T.gold,lineHeight:1.25,fontStyle:"italic"}}>This One's Covered, {userName}</h2>
              </div>
              <p style={{fontFamily:FONT_B,fontSize:13.5,color:T.muted,lineHeight:1.9,marginBottom:14}}>Your first guide is already taken care of — made possible by people who chose to pay it forward before you ever arrived. All you have to do is receive it.</p>
              <p style={{fontFamily:FONT_B,fontSize:13.5,color:T.muted,lineHeight:1.9,marginBottom:24}}>If it feels right, you're welcome to pay it forward too — in whatever amount feels good. Even $1 keeps this open for the next person. Completely optional, always.</p>
              <button style={goldBtn} onClick={generateBook}>BUILD {nameLabel.toUpperCase()} MAGIC BOOK →</button>
              <div style={{marginTop:10}}>
                <a href={DONATION_LINK} target="_blank" rel="noopener noreferrer" style={{...outlineBtn,display:"block",textAlign:"center",textDecoration:"none",lineHeight:"1",padding:"13px 20px"}}>Pay It Forward ✦</a>
              </div>
            </>
          ) : (
            <>
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{fontSize:38,marginBottom:10}}>✨</div>
                <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:4,color:T.goldDim,marginBottom:10,textTransform:"uppercase",fontWeight:700}}>✦ Welcome Back</div>
                <h2 style={{fontFamily:SERIF,fontSize:26,fontWeight:600,color:T.gold,lineHeight:1.25,fontStyle:"italic"}}>You're Already Doing The Work, {userName}</h2>
              </div>
              <p style={{fontFamily:FONT_B,fontSize:13.5,color:T.muted,lineHeight:1.9,marginBottom:12}}>Coming back for round two says something real about you — you're not just curious, you're committed. That's the exact energy this journey runs on.</p>
              <p style={{fontFamily:FONT_B,fontSize:13.5,color:T.muted,lineHeight:1.9,marginBottom:12}}>Your first guide was a gift, made possible by people who paid it forward before you arrived. Every guide after that takes real resources to create — and that's where you come in, if you'd like.</p>
              <div style={{background:"rgba(242,201,76,0.05)",border:`1px solid ${T.border}`,borderRadius:12,padding:"16px 18px",marginBottom:20}}>
                <p style={{fontFamily:FONT_B,fontSize:13,color:T.text,lineHeight:1.9,fontStyle:"italic"}}>✦ Notice what just came up reading that — ease, a pause, curiosity? No answer is wrong. Many of the most abundant thinkers describe generosity not as loss, but as circulation: what moves out tends to find its way back, often multiplied. Either way, your next guide is yours.</p>
              </div>
              <button style={goldBtn} onClick={generateBook}>BUILD {nameLabel.toUpperCase()} NEXT GUIDE →</button>
              <div style={{marginTop:10}}>
                <a href={DONATION_LINK} target="_blank" rel="noopener noreferrer" style={{...outlineBtn,display:"block",textAlign:"center",textDecoration:"none",lineHeight:"1",padding:"13px 20px"}}>Pay It Forward ✦</a>
              </div>
            </>
          )}
          <div style={{marginTop:14,textAlign:"center"}}>
            <button onClick={()=>setScreen("emailCapture")} style={{background:"none",border:"none",fontFamily:FONT_B,fontSize:12,color:T.dim,cursor:"pointer"}}>← Back</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── BOOK ──────────────────────────────────────────────────────────────────────
  if (screen==="book") {
    // Check if content is ready (skip for non-content pages)
    const contentPages = ["p1","p2","p3","p4","p5","p6","p7"];
    const hasContent = Object.values(parsedBook).some(arr => arr.length > 0);
    const needsContent = contentPages.includes(bookPage);

    // Empty / error state for chapter pages
    if ((needsContent && !hasContent) || (bookError && bookPage !== "loading")) return (
      <div style={wrap}><style>{CSS}</style><StarField/>
        <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <div style={{...card,padding:"44px 28px",textAlign:"center",width:"100%",animation:"fadeUp 0.4s ease"}}>
            <div style={{fontSize:44,marginBottom:16}}>⚡</div>
            <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:4,color:T.goldDim,marginBottom:12,textTransform:"uppercase",fontWeight:700}}>One More Try</div>
            <h3 style={{fontFamily:SERIF,fontSize:24,color:T.gold,fontStyle:"italic",marginBottom:14}}>Your guide is almost here</h3>
            <p style={{fontFamily:FONT_B,fontSize:13.5,color:T.muted,lineHeight:1.85,marginBottom:24}}>
              The connection didn't quite make it through. This happens occasionally — it only takes a moment to try again, and your guide will be just as personal and complete.
            </p>
            <button style={goldBtn} onClick={generateBook}>↺ Regenerate My Guide</button>
            <div style={{marginTop:10}}>
              <button onClick={()=>{setScreen("gate");setBookError(false);}} style={dimBtn}>← Start Over</button>
            </div>
          </div>
        </div>
      </div>
    );

    // LOADING
    if (bookPage==="loading"||bookLoading) return (
      <div style={wrap}><style>{CSS}</style><StarField/>
        <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <div style={{...card,padding:"50px 30px",textAlign:"center",width:"100%",animation:"fadeUp 0.4s ease"}}>
            <div style={{width:48,height:48,border:`3px solid ${T.border}`,borderTopColor:T.gold,borderRadius:"50%",animation:"spin 0.9s linear infinite",margin:"0 auto 24px"}}/>
            <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:4,color:T.goldDim,marginBottom:12,textTransform:"uppercase",fontWeight:700}}>Building Your Guide</div>
            <p style={{fontFamily:SERIF,fontSize:22,color:T.gold,lineHeight:1.6,fontStyle:"italic",marginBottom:8}}>Writing {nameLabel}<br/>Magic Book…</p>
            <p style={{fontFamily:FONT_B,fontSize:12,color:T.dim,lineHeight:1.7}}>Grounded in your answers.<br/>Built from science. Yours forever.</p>
          </div>
        </div>
      </div>
    );

    // COVER
    if (bookPage==="cover") return (
      <div style={wrap}><style>{CSS}</style><StarField/>
        <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <div style={{width:"100%",animation:"fadeUp 0.5s ease"}}>
            <div style={{...card,padding:"52px 28px 44px",textAlign:"center",border:`1px solid rgba(242,201,76,0.3)`}}>
              <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:5,color:T.goldDim,textTransform:"uppercase",fontWeight:700,marginBottom:28}}>InnerGen · Human Potential Lab</div>
              <Ornament width={140}/>
              <div style={{margin:"32px 0 10px"}}>
                <p style={{fontFamily:SERIF,fontSize:16,fontStyle:"italic",color:T.muted,marginBottom:4,letterSpacing:1}}>A Personal Magic Book for</p>
                <h1 style={{fontFamily:SERIF,fontSize:42,fontWeight:600,color:T.gold,lineHeight:1.1,fontStyle:"italic"}}>{userName || "You"}</h1>
              </div>
              <p style={{fontFamily:SERIF,fontSize:15,fontStyle:"italic",color:T.text,marginBottom:28}}>A Complete Life Architecture</p>
              <div style={{display:"inline-block",border:`1px solid ${T.border}`,borderRadius:999,padding:"8px 24px",marginBottom:32}}>
                <span style={{fontFamily:FONT_B,fontSize:12,color:T.muted,letterSpacing:1}}>{level.emoji} {level.title} · {points}/32</span>
              </div>
              <Ornament width={140}/>
              <p style={{fontFamily:FONT_B,fontSize:11,color:T.dim,letterSpacing:2,marginTop:28,textTransform:"uppercase"}}>Written for {firstName}, from {firstName === "you" ? "your" : `${userName}'s`} own answers</p>
            </div>
            <div style={{marginTop:14}}><button style={goldBtn} onClick={nextBookPage}>Begin Reading →</button></div>
            <div style={{marginTop:10}}><button onClick={()=>setScreen("gate")} style={dimBtn}>← Back</button></div>
          </div>
        </div>
      </div>
    );

    // INTRO LETTER
    if (bookPage==="intro") return (
      <div style={wrap}><style>{CSS}</style><StarField/>
        <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <div style={{width:"100%",animation:"fadeUp 0.45s ease"}}>
            <div style={{...card,padding:"40px 28px",border:`1px solid rgba(242,201,76,0.2)`}}>
              <Ornament width={120}/>
              <h2 style={{fontFamily:SERIF,fontSize:28,color:T.gold,fontStyle:"italic",fontWeight:500,textAlign:"center",margin:"20px 0 28px"}}>Dear {userName || "You"},</h2>
              <p style={{fontFamily:SERIF,fontSize:16,color:T.text,lineHeight:2,marginBottom:18,fontWeight:400}}>This book was written for you alone. Not for someone like you — for <em>you</em>, specifically, based on your answers, your score, your moment.</p>
              <p style={{fontFamily:SERIF,fontSize:16,color:T.text,lineHeight:2,marginBottom:18}}>What you'll find in these pages is already true. That's the thing about a blueprint — it doesn't invent anything new. It reveals what was always there.</p>
              <p style={{fontFamily:SERIF,fontSize:16,color:T.text,lineHeight:2,marginBottom:18}}>The science that built this guide has produced world-class performers, transformed lives, and driven results that once seemed impossible. And it begins with the same thing yours begins with: knowing exactly where you are.</p>
              <p style={{fontFamily:SERIF,fontSize:16,color:T.gold,lineHeight:2,fontStyle:"italic",fontWeight:500}}>Read slowly. Let it land. And know this — the fact that you're here already says something about who you're becoming.</p>
              <div style={{marginTop:28,textAlign:"center"}}>
                <Ornament width={100}/>
                <p style={{fontFamily:FONT_B,fontSize:11,color:T.dim,marginTop:16,letterSpacing:2,textTransform:"uppercase"}}>Intro · {TOTAL_CONTENT} Chapters Ahead</p>
              </div>
            </div>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              <button onClick={prevBookPage} style={{...outlineBtn,flex:"none",width:"auto",padding:"13px 18px",animation:"none"}}>← Cover</button>
              <button onClick={nextBookPage} style={{...goldBtn,animation:"none"}}>Chapter I →</button>
            </div>
          </div>
        </div>
      </div>
    );

    // p1 — I: YOUR POTENTIAL BLUEPRINT
    if (bookPage==="p1") return (
      <BookShell roman="I" pageNum={1} totalPages={TOTAL_CONTENT} title="Your Potential Blueprint" subtitle="Where You Stand · What's Opening" color={level.color}
        onPrev={prevBookPage} prevLabel="← Intro" onNext={nextBookPage} nextLabel="Chapter II →" {...shellProps}>
        <BookChapter title="YOUR POTENTIAL BLUEPRINT" bullets={p["YOUR POTENTIAL BLUEPRINT"]} color={level.color}/>
      </BookShell>
    );

    // p2 — II: YOUR GENIUS PROFILE
    if (bookPage==="p2") return (
      <BookShell roman="II" pageNum={2} totalPages={TOTAL_CONTENT} title="Your Genius Profile" subtitle="How Your Mind Works Best"
        onPrev={prevBookPage} prevLabel="← Chapter I" onNext={nextBookPage} nextLabel="Chapter III →" {...shellProps}>
        <BookChapter title="YOUR GENIUS PROFILE" bullets={p["YOUR GENIUS PROFILE"]} color={T.blue}/>
      </BookShell>
    );

    // p3 — III: YOUR THREE CORE STRENGTHS
    if (bookPage==="p3") return (
      <BookShell roman="III" pageNum={3} totalPages={TOTAL_CONTENT} title="Your Three Core Strengths" subtitle="Named · Why They Matter · How to Use Them"
        onPrev={prevBookPage} prevLabel="← Chapter II" onNext={nextBookPage} nextLabel="Chapter IV →" {...shellProps}>
        <BookChapter title="YOUR THREE CORE STRENGTHS" bullets={p["YOUR THREE CORE STRENGTHS"]} color={T.green}/>
      </BookShell>
    );

    // p4 — IV: SHADOW + IDENTITY
    if (bookPage==="p4") return (
      <BookShell roman="IV" pageNum={4} totalPages={TOTAL_CONTENT} title="Shadow & Identity" subtitle="The Pattern · The Shift · The New Self"
        onPrev={prevBookPage} prevLabel="← Chapter III" onNext={nextBookPage} nextLabel="Chapter V →" {...shellProps}>
        <BookChapter title="YOUR SHADOW PATTERN" bullets={p["YOUR SHADOW PATTERN"]} color={T.rose}/>
        <div style={{margin:"18px 0"}}><Ornament width={90}/></div>
        <BookChapter title="YOUR IDENTITY SHIFT" bullets={p["YOUR IDENTITY SHIFT"]} color={T.gold}/>
      </BookShell>
    );

    // p5 — V: WEALTH MINDSET
    if (bookPage==="p5") return (
      <BookShell roman="V" pageNum={5} totalPages={TOTAL_CONTENT} title="Your Wealth Mindset" subtitle="Money · Thinking · Expansion"
        onPrev={prevBookPage} prevLabel="← Chapter IV" onNext={nextBookPage} nextLabel="Chapter VI →" {...shellProps}>
        <BookChapter title="YOUR WEALTH MINDSET" bullets={p["YOUR WEALTH MINDSET"]} color={T.gold}/>
      </BookShell>
    );

    // p6 — VI: RELATIONSHIP EDGE
    if (bookPage==="p6") return (
      <BookShell roman="VI" pageNum={6} totalPages={TOTAL_CONTENT} title="Your Relationship Edge" subtitle="How You Connect · How You Grow"
        onPrev={prevBookPage} prevLabel="← Chapter V" onNext={nextBookPage} nextLabel="Chapter VII →" {...shellProps}>
        <BookChapter title="YOUR RELATIONSHIP EDGE" bullets={p["YOUR RELATIONSHIP EDGE"]} color={T.blue}/>
      </BookShell>
    );

    // p7 — VII: ROADMAP + PRACTICES + RESOURCES + CHECK-IN
    if (bookPage==="p7") return (
      <BookShell roman="VII" pageNum={7} totalPages={TOTAL_CONTENT} title="Your 90-Day Roadmap & Toolkit" subtitle="The Plan · The Practices · The Questions"
        onPrev={prevBookPage} prevLabel="← Chapter VI" onNext={nextBookPage} nextLabel="Your Next Chapter →" {...shellProps}>
        <BookChapter title="YOUR 90-DAY ROADMAP"             bullets={p["YOUR 90-DAY ROADMAP"]}             color={level.color}/>
        <div style={{margin:"16px 0"}}><Ornament width={90}/></div>
        <BookChapter title="YOUR DAILY PRACTICES"            bullets={p["YOUR DAILY PRACTICES"]}            color={T.green}/>
        <div style={{margin:"16px 0"}}><Ornament width={90}/></div>
        <BookChapter title="YOUR RESOURCES"                  bullets={p["YOUR RESOURCES"]}                  color={T.blue}/>
        <div style={{margin:"16px 0"}}><Ornament width={90}/></div>
        <BookChapter title="YOUR MONTHLY CHECK-IN QUESTIONS" bullets={p["YOUR MONTHLY CHECK-IN QUESTIONS"]} color={T.goldDim}/>
      </BookShell>
    );

    // CLOSING — coaching CTA
    if (bookPage==="closing") return (
      <div style={wrap}><style>{CSS}</style><StarField/>
        <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <div style={{width:"100%",animation:"fadeUp 0.45s ease"}}>
            <div style={{...card,padding:"40px 26px",border:`1px solid rgba(242,201,76,0.28)`}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:4,color:T.goldDim,textTransform:"uppercase",fontWeight:700,marginBottom:14}}>Final Chapter</div>
                <Ornament width={120}/>
                <h2 style={{fontFamily:SERIF,fontSize:30,color:T.gold,fontWeight:600,margin:"20px 0 0",fontStyle:"italic",lineHeight:1.2}}>{userName ? `${userName}'s Next Chapter` : "Your Next Chapter"}</h2>
              </div>
              <p style={{fontFamily:FONT_B,fontSize:14,color:T.muted,lineHeight:1.95,marginBottom:14,marginTop:22}}>Everything in this book came from your own answers — which means everything in it is already true for you. The blueprint is real. What remains is the same question every person who's ever changed their life has had to answer: what happens next?</p>
              <p style={{fontFamily:FONT_B,fontSize:14,color:T.muted,lineHeight:1.95,marginBottom:14}}>Insight is the spark. Action is the fire. And turning a spark into a fire is exactly where coaching comes in — not because anything is missing in {firstName}, but because every new level asks for support, structure, and someone who can see what's hard to see from inside your own story.</p>
              <p style={{fontFamily:FONT_B,fontSize:14,color:T.text,lineHeight:1.95,fontWeight:700,marginBottom:26}}>Changing is possible. Action often feels challenging. This is exactly why coaching exists — and why millions and billions are not just possible, but attainable. If that's where you are, the next step is simple: a conversation.</p>
              <button style={goldBtn} onClick={nextBookPage}>Let's Talk →</button>
            </div>
            <div style={{marginTop:12}}><button onClick={prevBookPage} style={dimBtn}>← Back to Chapter VII</button></div>
          </div>
        </div>
      </div>
    );

    // FINAL — download + contact
    if (bookPage==="final") return (
      <div style={wrap}><style>{CSS}</style><StarField/>
        <div style={{...inner,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <div style={{width:"100%",animation:"fadeUp 0.45s ease"}}>
            <div style={{...card,padding:"36px 26px"}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:42,marginBottom:10}}>💛</div>
                <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:4,color:T.goldDim,textTransform:"uppercase",fontWeight:700,marginBottom:12}}>✦ Ready For What's Next?</div>
                <h2 style={{fontFamily:SERIF,fontSize:26,color:T.gold,fontWeight:600,lineHeight:1.25,fontStyle:"italic"}}>You Just Met a Bigger Version of {userName||"Yourself"}</h2>
              </div>
              <p style={{fontFamily:FONT_B,fontSize:14,color:T.muted,lineHeight:1.9,marginBottom:12}}>You just got a glimpse of what's possible when you understand your own patterns. Imagine what becomes possible with someone walking alongside you as you bring it to life.</p>
              <p style={{fontFamily:FONT_B,fontSize:14,color:T.muted,lineHeight:1.9,marginBottom:24}}>Let's have a real conversation — just space to explore what's possible, together.</p>
              <button style={goldBtn} onClick={downloadBook}>⬇ Download {nameLabel} Magic Book</button>
              <div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <a href="mailto:hello@yuliantigroup.com" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 10px",borderRadius:12,textDecoration:"none",border:`1.5px solid ${T.border}`,color:T.gold,fontFamily:FONT_B,fontWeight:700,fontSize:13}}>✉ Email Leli</a>
                <a href="https://wa.me/14258774627" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 10px",borderRadius:12,textDecoration:"none",border:`1.5px solid ${T.border}`,color:T.gold,fontFamily:FONT_B,fontWeight:700,fontSize:13}}>💬 WhatsApp</a>
              </div>
              <div style={{marginTop:20,background:"rgba(242,201,76,0.04)",border:`1px solid ${T.border}`,borderRadius:14,padding:"18px 20px",textAlign:"center"}}>
                <p style={{fontFamily:FONT_B,fontSize:13,color:T.muted,lineHeight:1.8,marginBottom:12}}>InnerGen is free for everyone. If this book gave you something meaningful, a small contribution helps keep it open for the next person. ☕</p>
                <a href={DONATION_LINK} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",textDecoration:"none",background:`linear-gradient(135deg, ${T.gold}, #c49000)`,color:"#04070E",fontFamily:FONT,fontWeight:700,fontSize:12,padding:"11px 24px",borderRadius:10}}>SUPPORT INNERGEN ✦</a>
              </div>
              <p style={{fontFamily:FONT_B,fontSize:11,fontStyle:"italic",color:T.dim,textAlign:"center",lineHeight:1.8,marginTop:20}}>Always free · Built entirely from your answers · Yours forever</p>
            </div>
            <div style={{marginTop:12}}><button onClick={prevBookPage} style={dimBtn}>← Back</button></div>
          </div>
        </div>
      </div>
    );
  }

  // ── TERMS ─────────────────────────────────────────────────────────────────────
  if (screen==="terms") return (
    <div style={wrap}><style>{CSS}</style><StarField/>
      <div style={inner}>
        <button onClick={()=>setScreen(prevScreen)} style={{background:"none",border:"none",color:T.muted,fontFamily:FONT_B,fontSize:13,cursor:"pointer",marginBottom:24,padding:"6px 0"}}>← Back</button>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontFamily:FONT_B,fontSize:10,letterSpacing:5,color:T.goldDim,marginBottom:10,textTransform:"uppercase",fontWeight:700}}>InnerGen</div>
          <h1 style={{fontFamily:FONT_H,fontSize:24,fontWeight:700,color:T.text}}>Terms & Conditions</h1>
          <p style={{fontFamily:FONT_B,fontSize:12,color:T.dim,marginTop:6}}>Last updated: June 2026</p>
        </div>
        {[
          {title:"1. What InnerGen Is",body:"InnerGen is short for Inner Genius.\n\nEvery one of us has Genius living inside — often untapped. As Wayne Dyer once said, \"Some people die with the music still in them.\" InnerGen exists so that doesn't happen to you.\n\nDon't die with the music still in you. Let's write your music. Let's sing the tune exactly how you were meant to sing it. In other words — let's live the way we were meant to live. Healthy, wealthy, and happy.\n\nInnerGen was created by someone who has studied human development and results since 2020, and who is currently an active consultant and high performance coach. This app is the distillation of that work — made personal, made practical, made for you.\n\nInnerGen is a self-awareness assessment tool designed for personal development purposes. The quiz and personal guide are intended to support reflection, growth, and meaningful action in your life.\n\nInnerGen is not a medical service, psychological treatment, financial advisory service, or substitute for professional advice of any kind. If you are experiencing a mental health crisis or require professional support, please consult a qualified professional."},
          {title:"2. AI-Generated Content",body:"Your personal Magic Book is generated using artificial intelligence technology, based on your specific assessment responses. Each guide is unique to your answers at the time of assessment.\n\nWhile your guide is built from a framework grounded in established research in neuroscience, psychology, and behavioral science, the output is generated by AI and has not been reviewed by a licensed professional. Results are for personal development and informational purposes only."},
          {title:"3. Free Access & Voluntary Support",body:"Your Magic Book is provided completely free of charge. There is no purchase required and no payment information is collected to generate your guide.\n\nIf you find value in InnerGen, you may choose to leave a voluntary donation through our support page. Donations are entirely optional, are not tied to access of your guide, and do not unlock any additional features. Donations are processed securely through Buy Me a Coffee and Stripe. InnerGen does not store your payment information."},
          {title:"4. No Guarantees of Specific Outcomes",body:"InnerGen provides tools, frameworks, and guidance for personal development. We believe deeply in human potential and the value of self-awareness.\n\nHowever, we cannot and do not guarantee specific life outcomes — financial, health-related, relational, or otherwise — as a result of using this application or its guide. Your results depend entirely on your own choices, effort, and circumstances."},
          {title:"5. Intellectual Property",body:"The InnerGen quiz, framework, brand, and application are the intellectual property of InnerGen and its creator. All rights reserved.\n\nYour personal guide is provided for your individual personal use only. You may not reproduce, sell, or distribute the content of your guide commercially."},
          {title:"6. Privacy",body:"What we collect: Your first name, email address, and assessment responses.\n\nHow we use it: To personalize your guide, deliver it to you, and send occasional updates about InnerGen.\n\nWhat we don't do: We do not sell, share, or distribute your personal data to third parties for marketing purposes.\n\nIf you choose to make a voluntary donation, that transaction is handled entirely by Buy Me a Coffee and Stripe."},
          {title:"7. Limitation of Liability",body:"To the fullest extent permitted by applicable law, InnerGen and its creator shall not be liable for any indirect, incidental, or consequential damages arising from your use of this application or its content."},
          {title:"8. Changes to These Terms",body:"We may update these Terms and Conditions from time to time. Continued use of InnerGen after any changes constitutes acceptance of the updated terms."},
          {title:"9. Contact",body:"For questions, technical issues, or concerns, please contact us at:\n\nsupport@innergen.app"},
        ].map((section,i)=>(
          <div key={i} style={{...card,padding:"20px 22px",marginBottom:12}}>
            <h3 style={{fontFamily:FONT_H,fontSize:14,fontWeight:700,color:T.gold,marginBottom:10}}>{section.title}</h3>
            <p style={{fontFamily:FONT_B,fontSize:13,color:T.muted,lineHeight:1.85,whiteSpace:"pre-wrap"}}>{section.body}</p>
          </div>
        ))}
        <div style={{...card,padding:"16px 20px",marginTop:8,textAlign:"center"}}>
          <p style={{fontFamily:FONT_B,fontSize:11,color:T.dim,lineHeight:1.7}}>These terms were prepared for informational purposes.<br/>Review by a qualified attorney is recommended.</p>
        </div>
        <div style={{height:20}}/>
        <button style={{...goldBtn,animation:"none"}} onClick={()=>setScreen(prevScreen)}>← Back to InnerGen</button>
      </div>
    </div>
  );

  return null;
}
