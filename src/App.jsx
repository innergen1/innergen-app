import { useState, useEffect } from "react";

// ─── STRIPE PAYMENT LINKS ─────────────────────────────────────────────────────
const PAYMENT_LINKS = {
  spark:     "https://buy.stripe.com/aFabJ024Z5pP5yNckV48000",
  rise:      "https://buy.stripe.com/5kQ14m10Vf0pf9nfx748001",
  sovereign: "https://buy.stripe.com/aFabJ0aBv6tTf9n5Wx48002",
};

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg:       "#04070E",
  card:     "rgba(255,255,255,0.032)",
  border:   "rgba(255,210,80,0.13)",
  gold:     "#F2C94C",
  goldLight:"#FFE790",
  goldDim:  "rgba(242,201,76,0.45)",
  text:     "#EDE8D4",
  muted:    "rgba(237,232,212,0.52)",
  dim:      "rgba(237,232,212,0.22)",
  green:    "#5FFFA0",
  blue:     "#79CCFF",
  rose:     "#FF9EB8",
};

const FONT_H = "'Century Gothic', 'AppleGothic', 'Trebuchet MS', sans-serif";
const FONT_B = "'Lato', 'Helvetica Neue', Arial, sans-serif";
const FONT = FONT_H;

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
const QUIZ = [
  {
    id: 1, phase: "Neuroscience", icon: "🧬",
    question: "Your brain has ~86 billion neurons. Research shows most people use repetitive thought loops. Which best describes your inner dialogue today?",
    science: "Dr. Joe Dispenza found that 90% of daily thoughts are identical to the day before — but neuroplasticity means every new thought literally rewires neural pathways.",
    options: [
      { text: "Replaying past events or worries most of the time", pts: 1, reveal: "That's the default mode network — your brain's autopilot. Simply noticing it is the first rewire." },
      { text: "Mixing old patterns with new curiosity", pts: 2, reveal: "Your prefrontal cortex is starting to override the amygdala. That friction you feel is growth." },
      { text: "Mostly focused on what I'm building or creating", pts: 3, reveal: "Goal-directed thinking activates your brain's reward circuitry — dopamine is literally flowing right now." },
      { text: "Deliberately choosing thoughts that serve my future", pts: 4, reveal: "This is metacognition — thinking about thinking. Fewer than 5% of people operate here consistently." },
    ],
  },
  {
    id: 2, phase: "Psychology", icon: "🧠",
    question: "Abraham Maslow studied the top 1% of human performers for decades. His research found one defining difference. Which resonates with how you approach life?",
    science: "Maslow's self-actualized subjects were more interested in problems outside themselves than personal comfort. Peak experience — not safety — was their compass.",
    options: [
      { text: "I mostly focus on getting through the day safely", pts: 1, reveal: "Survival mode is a biological response — not a character flaw. Recognizing it is the door above it." },
      { text: "I think about what I want but often feel stuck", pts: 2, reveal: "The gap between desire and action shrinks through one thing: one decision made today." },
      { text: "I'm actively working toward something meaningful", pts: 3, reveal: "Viktor Frankl called this 'will to meaning' — the deepest human motivator. You carry it." },
      { text: "I feel genuinely called to something larger than myself", pts: 4, reveal: "Transcendence — Maslow's highest level, added before his death. You're operating at humanity's peak." },
    ],
  },
  {
    id: 3, phase: "Behavioral Science", icon: "⚗️",
    question: "Stanford psychologist Carol Dweck's 30-year study identified two mindsets predicting success more reliably than IQ. When you face a hard challenge, you tend to:",
    science: "Dweck's research across 10,000+ people found Growth Mindset subjects achieved 40% better outcomes — not because they were smarter, but because they believed ability was expandable.",
    options: [
      { text: "Avoid it — I don't want to look incompetent", pts: 1, reveal: "Fixed mindset is installed early by well-meaning people. It can be uninstalled at any age." },
      { text: "Try, but feel anxious about failing publicly", pts: 2, reveal: "Anxiety means you care. Channel it: anxiety and excitement use the same neurochemistry." },
      { text: "Lean in — difficulty signals I'm learning something real", pts: 3, reveal: "Growth Mindset activated. Your brain builds new pathways specifically when challenged." },
      { text: "Seek it out — I know obstacles are the path forward", pts: 4, reveal: "Stoic philosophy and modern neuroscience agree: chosen difficulty is the fastest route to mastery." },
    ],
  },
  {
    id: 4, phase: "Human Potential", icon: "🔬",
    question: "Harvard's 75-year Grant Study — the longest human development research ever conducted — found the single greatest predictor of a thriving life. Which describes your relationship with people?",
    science: "Dr. Robert Waldinger found warm relationships predicted health, happiness, and longevity more powerfully than wealth, fame, or IQ. Social connection is not soft science — it's biology.",
    options: [
      { text: "I feel mostly isolated or disconnected right now", pts: 1, reveal: "Loneliness activates the same brain regions as physical pain. One genuine reach-out today rewires this." },
      { text: "I have some connections but want deeper ones", pts: 2, reveal: "Depth over breadth is the research finding. One real conversation outweighs ten surface ones." },
      { text: "I have meaningful relationships that genuinely energize me", pts: 3, reveal: "You have what many successful people wish they'd prioritized. This is foundational wealth." },
      { text: "I invest in people as consciously as I invest in my goals", pts: 4, reveal: "Reciprocal altruism — studied across evolutionary psychology and neuroscience — is the pinnacle of human design." },
    ],
  },
  {
    id: 5, phase: "Cognitive Science", icon: "💎",
    question: "Nobel laureate Daniel Kahneman identified two systems of thought — System 1 (fast, automatic) and System 2 (slow, deliberate). How do you typically make important decisions?",
    science: "Kahneman's research showed 95% of decisions are System 1 — emotional and habitual. System 2 thinkers who pause before deciding report 60% higher life satisfaction over time.",
    options: [
      { text: "I mostly react — gut feeling without much reflection", pts: 1, reveal: "System 1 dominance isn't weakness — it's the brain conserving energy. One pause per day shifts the ratio." },
      { text: "Sometimes I reflect, but habit usually wins", pts: 2, reveal: "Habit recognition IS System 2 activating. You're already shifting the balance without knowing it." },
      { text: "I pause and consider carefully before important choices", pts: 3, reveal: "Temporal discounting research shows this single habit compounds into dramatically better outcomes over five years." },
      { text: "I design my environment to make good decisions automatic", pts: 4, reveal: "Behavioral design — the science of nudging yourself. Used by top performers worldwide." },
    ],
  },
  {
    id: 6, phase: "Epigenetics", icon: "🌿",
    question: "Cell biology research revealed that genes respond to environment and perception — not the other way around. What best describes your beliefs about your own potential?",
    science: "Epigenetic research shows signals from our thoughts and environment switch genes on or off. Your beliefs are not just psychological — they are biological instructions to your cells.",
    options: [
      { text: "I think I'm mostly fixed — it's simply who I am", pts: 1, reveal: "This belief itself is the ceiling. Epigenetics proves it's a ceiling you installed — and can remove." },
      { text: "I think I can change some things with enough effort", pts: 2, reveal: "This partial belief is enough to begin. Every step forward updates your gene expression in real time." },
      { text: "I genuinely believe I can transform significantly", pts: 3, reveal: "You're operating on biological truth. Environment plus belief equals new cellular expression." },
      { text: "I know my potential is practically limitless", pts: 4, reveal: "This is not naive optimism — it is scientifically accurate. You're living aligned with your biology." },
    ],
  },
  {
    id: 7, phase: "Flow Science", icon: "🌊",
    question: "Psychologist Mihaly Csikszentmihalyi studied 8,000 people across 40 years on optimal human experience. When do you feel most fully alive and absorbed?",
    science: "Flow — complete absorption in meaningful challenge — produces more happiness than leisure. The brain in flow releases five neurochemicals simultaneously including dopamine, endorphins, and serotonin.",
    options: [
      { text: "During rest and passive relaxation", pts: 1, reveal: "Rest is essential — but research shows flow produces 5x more fulfillment than passive leisure." },
      { text: "In deep conversations with people I genuinely care about", pts: 2, reveal: "Interpersonal flow is real and documented. You're already tapping one of the most powerful channels." },
      { text: "When I'm deep in work that genuinely challenges me", pts: 3, reveal: "You know what flow feels like. The research says: engineer more of this and life transforms measurably." },
      { text: "I deliberately design my days around peak performance states", pts: 4, reveal: "Flow architecture — the deliberate structuring of challenge-to-skill ratio. Elite performers live here." },
    ],
  },
  {
    id: 8, phase: "Identity Science", icon: "🪞",
    question: "William James — father of American psychology — wrote in 1890: 'The greatest revolution of our generation is the discovery that human beings can alter their lives by altering their minds.' Which feels most true about you today?",
    science: "Identity-based behavior change research shows lasting transformation only sticks when it's identity-first. 'I am a person who...' outperforms goal-setting by 3:1 in long-term outcome studies.",
    options: [
      { text: "I define myself mostly by my past and current circumstances", pts: 1, reveal: "The past is data, not destiny. James wrote this 135 years ago — neuroscience confirmed it fully in 2020." },
      { text: "I'm not entirely sure who I am yet — still discovering", pts: 2, reveal: "Identity fluidity is a superpower. The most adaptable people in history described themselves exactly this way." },
      { text: "I'm consciously becoming a new and better version of myself", pts: 3, reveal: "Identity evolution — researchers call it narrative identity updating. You're doing it right now." },
      { text: "I live deliberately from my future self, not my past self", pts: 4, reveal: "Future-self psychology shows this orientation produces measurably better outcomes in health, finances, and relationships." },
    ],
  },
];

// ─── LEVELS ───────────────────────────────────────────────────────────────────
const LEVELS = [
  { min: 8,  max: 14, title: "The Latent Giant",      emoji: "🌱", color: "#79CCFF", desc: "Your potential is fully intact and completely unrealized — which means the upside ahead of you is extraordinary. Every person who ever achieved something remarkable started exactly here." },
  { min: 15, max: 21, title: "The Stirring Mind",     emoji: "🌅", color: "#F0A060", desc: "Something real is activating inside you. You feel a pull toward more. Research shows this awareness alone — this exact feeling — is the neurological precursor to genuine transformation." },
  { min: 22, max: 26, title: "The Conscious Builder", emoji: "🔥", color: "#F2C94C", desc: "You are operating with deliberate intention. Behavioral science confirms: people at your stage who keep going don't just improve — they compound. You are genuinely rare." },
  { min: 27, max: 32, title: "The Awakened",          emoji: "⚡", color: "#5FFFA0", desc: "You are operating from your highest design. The science is clear: you have built the thinking architecture that produces what others call extraordinary. This is your natural state." },
];

// ─── TIERS ────────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "spark", label: "Spark", price: "$11.95", emoji: "🌱", color: "#79CCFF",
    tagline: "Your potential, clearly mapped",
    description: "A focused personal guide built entirely from your answers. Includes your Potential Blueprint, your #1 Core Strength with a science-backed activation strategy, your 7-Day Action Plan, your North Star Question, and one book matched specifically to where you are right now.",
    features: [
      "Your Potential Blueprint — what your results reveal about your current mindset",
      "Your #1 Core Strength — named, science-backed, and ready to activate",
      "Your 7-Day Action Plan — one precise practice per day based on your answers",
      "Your North Star Question — to return to every morning",
      "Your matched reading — one book chosen specifically for your profile",
    ],
  },
  {
    id: "rise", label: "Rise", price: "$33.95", emoji: "🔥", color: "#F2C94C",
    tagline: "Your complete transformation guide",
    description: "Everything in Spark, plus a deeper analysis of all three of your core strengths, a 30-day activation plan, your Shadow Pattern — the one belief most likely holding you back, precisely named and dissolved — and four resources matched to your specific profile.",
    features: [
      "Everything in Spark",
      "All 3 Core Strengths — fully analyzed with activation strategies",
      "Your Shadow Pattern — named precisely and dissolved with science",
      "Your 30-Day Activation Plan — week by week, based on your answers",
      "4 matched resources — books and tools chosen for your exact profile",
      "Monthly milestone markers — what to look for as you shift",
    ],
  },
  {
    id: "sovereign", label: "Sovereign", price: "$55.95", emoji: "⚡", color: "#5FFFA0",
    tagline: "Your complete life architecture",
    description: "The most comprehensive personal guide in InnerGen. Built entirely from your answers. Covers every dimension of your life — your genius profile, your wealth mindset, your relationships, your identity, and a full 90-day roadmap with complete resources.",
    features: [
      "Everything in Rise",
      "Your Genius Profile — based on Gardner's Multiple Intelligences research",
      "Your Wealth Mindset Chapter — how your thinking pattern affects financial outcomes",
      "Your Relationship Blueprint — your relational strengths and growth edges",
      "Your Identity Architecture — who you are becoming, mapped precisely",
      "Your 90-Day Compounding Roadmap — three months of weekly guidance",
      "Complete resource library — matched specifically to your profile",
      "Monthly re-assessment prompts — to track your evolution over time",
    ],
  },
];

function getLevel(pts) {
  return LEVELS.find(l => pts >= l.min && pts <= l.max) || LEVELS[0];
}

// ─── FETCH BOOK HELPER ────────────────────────────────────────────────────────
async function streamBookContent(prompt, maxTokens, onChunk, onDone, onError) {
  try {
    const res = await fetch("/api/generate-book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, maxTokens }),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const data = await res.json();
    if (!data.text) throw new Error("Empty response");
    onChunk(data.text);
    onDone(data.text);
  } catch (err) {
    onError(err);
  }
}

// ─── STAR FIELD ───────────────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 65 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 1.5 + 0.3, d: Math.random() * 6, dur: Math.random() * 4 + 2,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.s, height: s.s, borderRadius: "50%",
          background: s.id % 5 === 0 ? T.blue : T.gold, opacity: 0.18,
          animation: `tw ${s.dur}s ${s.d}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #04070E; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(242,201,76,0.2); border-radius: 2px; }
  @keyframes tw       { from { opacity:.05; } to { opacity:.45; } }
  @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes beat     { 0%,100%{transform:scale(1);}  50%{transform:scale(1.07);} }
  @keyframes glow     { 0%,100%{box-shadow:0 0 14px rgba(242,201,76,0.2);} 50%{box-shadow:0 0 32px rgba(242,201,76,0.55);} }
  @keyframes spin     { to { transform:rotate(360deg); } }
  @keyframes slideDown{ from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);} }
`;

// ─── PROMPTS ──────────────────────────────────────────────────────────────────
function getPrompt(tier, lvl, points, answerSummary) {
  const prompts = {
    spark: `You are a human potential guide. Create a personal Spark Guide for someone at the "${lvl.title}" level (score ${points}/32). Their assessment scores: ${answerSummary}.

Your job is simple: help this person take clear, practical steps toward a richer, more meaningful life. Be warm, direct, and specific to their answers. No fluff. No jargon. Write in second person. Do not mention AI or technology.

Use these section headings exactly:

YOUR POTENTIAL BLUEPRINT
Two paragraphs. What their answers reveal about where they are right now — honest, warm, specific. What's working. What's ready to shift.

YOUR CORE STRENGTH
The one strength their answers show most clearly. Name it simply. Explain in plain language why it matters for their life. Give one specific thing to do this week to use it.

YOUR 7-DAY STARTER PLAN
Seven daily practices. Each one named, one sentence of why it works, one exact instruction.

Day 1: [name] — [why it works] — [exact instruction]
Day 2: [name] — [why it works] — [exact instruction]
Day 3: [name] — [why it works] — [exact instruction]
Day 4: [name] — [why it works] — [exact instruction]
Day 5: [name] — [why it works] — [exact instruction]
Day 6: [name] — [why it works] — [exact instruction]
Day 7: [name] — [why it works] — [exact instruction]

YOUR DAILY QUESTION
One question to ask yourself every morning. Explain in two sentences why this question matters for them.

YOUR NEXT BOOK
One real book. Title and author. Two sentences on exactly why it fits where they are right now.`,

    rise: `You are a human potential guide. Create a Rise Guide for someone at the "${lvl.title}" level (score ${points}/32). Their assessment: ${answerSummary}.

Warm, direct, specific. No fluff. Second person. No mention of AI.

Use these section headings exactly:

YOUR POTENTIAL BLUEPRINT
Three paragraphs. Where they are now. What's strong. What's ready to transform.

YOUR THREE CORE STRENGTHS
Three strengths. For each: name it, explain why it matters, give one specific practice.

YOUR SHADOW PATTERN
The one limiting pattern. Name it plainly. Why it forms. One daily practice to dissolve it.

YOUR 30-DAY PLAN
Four weeks with theme and daily practices.
Week 1 — [Theme]: [practices]
Week 2 — [Theme]: [practices]
Week 3 — [Theme]: [practices]
Week 4 — [Theme]: [practices]

WHAT CHANGES AT 30 DAYS
Four specific observable things they will notice.

YOUR FOUR RESOURCES
Four real books with title, author, and why it fits their profile.`,

    sovereign: `You are a human potential guide. Create a complete Sovereign Life Architecture for someone at the "${lvl.title}" level (score ${points}/32). Their assessment: ${answerSummary}.

Practical, specific, immediately useful. Warm, intelligent, direct. Second person. No mention of AI.

Use these section headings exactly:

YOUR POTENTIAL BLUEPRINT
Three paragraphs. Full picture of where they are. What's exceptional. What's ready to break open.

YOUR GENIUS PROFILE
Two natural ways their mind works best. Name each. One way to use each more deliberately.

YOUR THREE CORE STRENGTHS
Each named. Why it matters. One practice to develop it.

YOUR SHADOW PATTERN
Named plainly. Why it formed. One daily practice to dissolve it.

YOUR IDENTITY SHIFT
Who they are becoming. Two paragraphs.

YOUR WEALTH MINDSET
How their thinking affects money. Two to three practical shifts.

YOUR RELATIONSHIP EDGE
Strongest relational quality and biggest growth edge. One practice each.

YOUR 90-DAY ROADMAP
Three months. Each with theme and weekly focuses.
Month 1 — [Theme]: [weekly focuses]
Month 2 — [Theme]: [weekly focuses]
Month 3 — [Theme]: [weekly focuses]

YOUR DAILY PRACTICES
Five core practices. Named, why it works, exact instruction.

YOUR RESOURCES
Five books, one podcast, one documentary. One sentence each on why it fits.

YOUR MONTHLY CHECK-IN QUESTIONS
Four questions to measure real growth.`,
  };
  return prompts[tier] || prompts.spark;
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
  const [paywall,     setPaywall]     = useState(false);
  const [paywallTier, setPaywallTier] = useState(null);
  const [purchased,   setPurchased]   = useState({});
  const [bookLoading, setBookLoading] = useState(false);
  const [bookContent, setBookContent] = useState("");
  const [bookTier,    setBookTier]    = useState(null);
  const [animKey,     setAnimKey]     = useState(0);
  const [shareMsg,    setShareMsg]    = useState("");
  const [prevScreen,  setPrevScreen]  = useState("splash");

  function goToTerms(from) { setPrevScreen(from); setScreen("terms"); }

  const currentQ = QUIZ[qIdx];
  const level    = getLevel(points);

  // ── PAYMENT VERIFICATION ──────────────────────────────────────────────────
  useEffect(() => {
    const params    = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const tier      = params.get("tier");
    if (!sessionId || !tier) return;

    window.history.replaceState({}, "", "/");

    const savedAnswers = localStorage.getItem("ig_answers");
    const savedPoints  = localStorage.getItem("ig_points");
    const savedTier    = localStorage.getItem("ig_tier") || tier;
    localStorage.removeItem("ig_answers");
    localStorage.removeItem("ig_points");
    localStorage.removeItem("ig_tier");

    const restoredAnswers = savedAnswers ? JSON.parse(savedAnswers) : [];
    const restoredPoints  = savedPoints  ? parseInt(savedPoints, 10) : 20;

    setAnswers(restoredAnswers);
    setPoints(restoredPoints);
    setScreen("verifying");
    setBookTier(savedTier);

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        if (data.verified) {
          const confirmedTier = data.tier || savedTier;
          setPurchased(p => ({ ...p, [confirmedTier]: true }));
          setBookLoading(true);
          setBookTier(confirmedTier);
          setBookContent("");
          setScreen("book");

          const lvl = getLevel(restoredPoints);
          const answerSummary = restoredAnswers.length > 0
            ? restoredAnswers.map(a => `${a.phase}: ${a.pts}/4`).join(", ")
            : "Assessment completed — generate a powerful personalized guide for a growth-oriented person";
          const maxTokens = confirmedTier === "spark" ? 1200 : confirmedTier === "rise" ? 2000 : 3000;
          const prompt    = getPrompt(confirmedTier, lvl, restoredPoints, answerSummary);

          streamBookContent(
            prompt, maxTokens,
            (text) => setBookContent(text),
            ()     => setBookLoading(false),
            ()     => { setBookContent("Your personal guide is ready. Please ensure a stable connection and try again."); setBookLoading(false); }
          );
        } else {
          setScreen("splash");
          alert("We couldn't verify your payment. Please contact support at support@innergen.app if you were charged.");
        }
      })
      .catch(() => setScreen("splash"));
  }, []);

  // ── ANSWER HANDLER ────────────────────────────────────────────────────────
  function handleAnswer(opt) {
    if (selected) return;
    setSelected(opt);
    setInsight({ text: opt.reveal, science: currentQ.science });
  }

  // ── NEXT QUESTION ─────────────────────────────────────────────────────────
  function nextQuestion() {
    const newAnswers = [...answers, { q: currentQ.id, pts: selected.pts, phase: currentQ.phase }];
    setAnswers(newAnswers);
    const next = qIdx + 1;
    if (next < QUIZ.length) {
      setQIdx(next); setSelected(null); setInsight(null);
      setPoints(p => p + selected.pts); setAnimKey(k => k + 1);
    } else {
      const total = newAnswers.reduce((s, a) => s + a.pts, 0);
      setPoints(total);
      setScreen("dashboard");
      setActiveTab("books");
    }
  }

  // ── BACK BUTTON ───────────────────────────────────────────────────────────
  function goBack() {
    if (qIdx === 0) return;
    const prev = answers[answers.length - 1];
    setPoints(p => p - (prev?.pts || 0));
    setAnswers(a => a.slice(0, -1));
    setQIdx(q => q - 1);
    setSelected(null); setInsight(null);
    setAnimKey(k => k + 1);
  }

  // ── GENERATE MAGIC BOOK ───────────────────────────────────────────────────
  async function generateBook(tier) {
    setBookLoading(true);
    setBookTier(tier);
    setBookContent("");
    setScreen("book");

    const lvl = getLevel(points);
    const answerSummary = answers.length > 0
      ? answers.map(a => `${a.phase}: ${a.pts}/4`).join(", ")
      : "Assessment completed";
    const maxTokens = tier === "spark" ? 1200 : tier === "rise" ? 2000 : 3000;
    const prompt    = getPrompt(tier, lvl, points, answerSummary);

    await streamBookContent(
      prompt, maxTokens,
      (text) => setBookContent(text),
      ()     => setBookLoading(false),
      ()     => { setBookContent("Your personal guide is ready. Please ensure a stable connection and try again."); setBookLoading(false); }
    );
  }

  // ── PAYWALL ───────────────────────────────────────────────────────────────
  function openPaywall(tierId) { setPaywallTier(tierId); setPaywall(true); }

  function handleStripeRedirect(tierId) {
    localStorage.setItem("ig_answers", JSON.stringify(answers));
    localStorage.setItem("ig_points",  String(points));
    localStorage.setItem("ig_tier",    tierId);
    window.location.href = PAYMENT_LINKS[tierId];
  }

  function downloadBook() {
    const t    = TIERS.find(t => t.id === bookTier);
    const blob = new Blob([
      `INNERGEN \u2014 YOUR PERSONAL GUIDE\n`,
      `${t?.label} Edition \u00B7 ${level.title} \u00B7 Score ${points}/32\n`,
      `${"─".repeat(50)}\n\n`,
      bookContent,
    ], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href = url; a.download = `InnerGen-${t?.label}-Guide.txt`; a.click();
    URL.revokeObjectURL(url);
  }

  function handleShare(platform) {
    const msg     = `I just discovered I'm "${level.title}" on InnerGen — a science-based human potential assessment. Score: ${points}/32. Take it free → innergen.app`;
    const encoded = encodeURIComponent(msg);
    if (platform === "whatsapp") window.open(`https://wa.me/?text=${encoded}`, "_blank");
    else if (platform === "twitter") window.open(`https://twitter.com/intent/tweet?text=${encoded}`, "_blank");
    else if (platform === "email")   window.open(`mailto:?subject=My InnerGen Result&body=${encoded}`, "_blank");
    else if (platform === "copy") {
      navigator.clipboard?.writeText(msg);
      setShareMsg("Copied! Share it anywhere.");
      setTimeout(() => setShareMsg(""), 3000);
    }
  }

  // ── STYLES ────────────────────────────────────────────────────────────────
  const card = {
    background: T.card, border: `1px solid ${T.border}`,
    borderRadius: 18, backdropFilter: "blur(14px)",
    boxShadow: "0 6px 40px rgba(0,0,0,0.45)",
  };
  const goldBtn = {
    width: "100%", padding: "15px 20px", borderRadius: 12, border: "none",
    background: `linear-gradient(135deg, ${T.gold}, #c49000)`, color: "#04070E",
    fontFamily: FONT, fontWeight: 700, fontSize: 13, letterSpacing: "0.05em",
    cursor: "pointer", animation: "glow 3s infinite",
  };
  const outlineBtn = {
    width: "100%", padding: "13px 20px", borderRadius: 12,
    border: `1.5px solid ${T.goldDim}`, background: "transparent",
    color: T.gold, fontFamily: FONT, fontWeight: 600, fontSize: 13, cursor: "pointer",
  };
  const dimBtn = {
    width: "100%", padding: "12px 20px", borderRadius: 12, border: "none",
    background: "rgba(255,255,255,0.05)", color: T.muted,
    fontFamily: FONT, fontSize: 12, cursor: "pointer",
  };
  const wrap  = { minHeight: "100vh", background: T.bg, position: "relative", overflow: "hidden" };
  const inner = { maxWidth: 500, margin: "0 auto", padding: "20px 18px 70px", position: "relative", zIndex: 2 };

  // ── VERIFYING ─────────────────────────────────────────────────────────────
  if (screen === "verifying") return (
    <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{CSS}</style>
      <StarField />
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ width: 52, height: 52, border: `3px solid rgba(242,201,76,0.2)`, borderTopColor: T.gold, borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto 24px" }} />
        <p style={{ fontFamily: FONT_H, fontSize: 22, color: T.gold, marginBottom: 10 }}>Verifying your payment...</p>
        <p style={{ fontFamily: FONT_B, fontSize: 14, color: T.muted }}>Preparing your personal Magic Book ✨</p>
      </div>
    </div>
  );

  // ── SPLASH ────────────────────────────────────────────────────────────────
  if (screen === "splash") return (
    <div style={wrap}>
      <style>{CSS}</style>
      <StarField />
      <div style={{ ...inner, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ ...card, padding: "44px 30px", textAlign: "center", animation: "fadeUp 0.65s ease", width: "100%" }}>
          <div style={{ fontSize: 54, marginBottom: 10, animation: "beat 3s infinite" }}>⚡</div>
          <div style={{ fontFamily: FONT_B, fontSize: 11, letterSpacing: 3, color: "rgba(242,201,76,0.7)", marginBottom: 14, textTransform: "uppercase", fontWeight: 700 }}>InnerGen · Human Potential Lab</div>
          <h1 style={{ fontFamily: FONT, fontSize: 32, fontWeight: 700, lineHeight: 1.2, marginBottom: 16, color: T.text }}>
            Discover What Science Says<br />
            <span style={{ color: T.gold }}>You're Actually Capable Of</span>
          </h1>
          <p style={{ fontFamily: FONT_B, color: "rgba(237,232,212,0.82)", fontSize: 15, lineHeight: 1.85, marginBottom: 28, fontWeight: 400 }}>
            8 questions grounded in 200 years of neuroscience, psychology, and human potential research. No performance. No judgment. Just truth about who you already are.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
            {["Always free", "8 questions · 5 min", "Personalized for you"].map(t => (
              <span key={t} style={{ fontFamily: FONT_B, background: "rgba(242,201,76,0.08)", border: `1px solid ${T.border}`, borderRadius: 50, padding: "5px 14px", fontSize: 12, color: T.gold, fontWeight: 700 }}>{t}</span>
            ))}
          </div>
          <button style={goldBtn} onClick={() => setScreen("quiz")}>BEGIN YOUR ASSESSMENT →</button>
          <p style={{ fontFamily: FONT_B, fontSize: 12, color: "rgba(237,232,212,0.45)", marginTop: 18, lineHeight: 1.7 }}>
            Grounded in research by Maslow · Csikszentmihalyi · Dweck · Kahneman · Waldinger · Dispenza · James
          </p>
          <p style={{ marginTop: 14 }}>
            <button onClick={() => goToTerms("splash")} style={{ background: "none", border: "none", fontFamily: FONT_B, fontSize: 11, color: T.goldDim, cursor: "pointer", textDecoration: "underline" }}>
              Terms & Conditions · Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  if (screen === "quiz") return (
    <div style={wrap}>
      <style>{CSS}</style>
      <StarField />
      <div style={inner}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {qIdx > 0 && (
              <button onClick={goBack} style={{ background: "none", border: `1px solid ${T.border}`, borderRadius: 8, padding: "5px 12px", color: T.muted, fontFamily: FONT, fontSize: 12, cursor: "pointer" }}>← Back</button>
            )}
            <span style={{ fontFamily: FONT, fontSize: 12, color: T.muted }}>Q{qIdx + 1} of {QUIZ.length}</span>
          </div>
          <span style={{ fontFamily: FONT, fontSize: 11, color: T.goldDim, letterSpacing: 2 }}>INNERGEN</span>
        </div>
        <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ height: "100%", width: `${(qIdx / QUIZ.length) * 100}%`, background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, transition: "width 0.5s ease", boxShadow: `0 0 8px ${T.gold}` }} />
        </div>
        <div key={animKey} style={{ ...card, padding: "28px 22px", animation: "fadeUp 0.4s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 18 }}>{currentQ.icon}</span>
            <span style={{ fontFamily: FONT_B, fontSize: 11, letterSpacing: 2, color: "rgba(242,201,76,0.8)", textTransform: "uppercase", fontWeight: 700 }}>{currentQ.phase}</span>
          </div>
          <h2 style={{ fontFamily: FONT_H, fontSize: 17, fontWeight: 700, lineHeight: 1.6, color: "#FFFFFF", marginBottom: 22 }}>{currentQ.question}</h2>
          {!insight && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentQ.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} style={{
                  background: selected === opt ? "rgba(242,201,76,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${selected === opt ? T.gold : "rgba(255,255,255,0.12)"}`,
                  borderRadius: 12, padding: "14px 16px", textAlign: "left",
                  cursor: selected ? "default" : "pointer",
                  color: selected === opt ? T.gold : "rgba(237,232,212,0.9)",
                  fontFamily: FONT_B, fontSize: 14, lineHeight: 1.65, fontWeight: 400,
                  transition: "all 0.22s",
                  transform: selected === opt ? "scale(1.015)" : "scale(1)",
                }}>
                  <span style={{ opacity: 0.55, marginRight: 10, fontSize: 12, fontFamily: FONT_B, fontWeight: 700 }}>{String.fromCharCode(65 + i)}</span>
                  {opt.text}
                </button>
              ))}
            </div>
          )}
          {insight && (
            <div style={{ animation: "slideDown 0.4s ease" }}>
              <div style={{ background: "rgba(242,201,76,0.06)", border: `1px solid rgba(242,201,76,0.18)`, borderRadius: 12, padding: "18px", marginBottom: 14 }}>
                <div style={{ fontFamily: FONT_B, fontSize: 11, letterSpacing: 2, color: "rgba(242,201,76,0.8)", marginBottom: 8, textTransform: "uppercase", fontWeight: 700 }}>Your Insight</div>
                <p style={{ fontFamily: FONT_B, fontSize: 15, fontStyle: "italic", color: "#FFFFFF", lineHeight: 1.8, fontWeight: 400 }}>"{insight.text}"</p>
              </div>
              <div style={{ background: "rgba(121,204,255,0.04)", border: "1px solid rgba(121,204,255,0.15)", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
                <div style={{ fontFamily: FONT_B, fontSize: 11, letterSpacing: 2, color: "rgba(121,204,255,0.8)", marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>The Research</div>
                <p style={{ fontFamily: FONT_B, fontSize: 14, color: "rgba(237,232,212,0.82)", lineHeight: 1.8, fontWeight: 400 }}>{insight.science}</p>
              </div>
              <button style={goldBtn} onClick={nextQuestion}>
                {qIdx + 1 < QUIZ.length ? "NEXT QUESTION →" : "SEE MY RESULTS →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  if (screen === "dashboard") {
    const tabs = [
      { id: "result",   label: "My Result" },
      { id: "books",    label: "Magic Books" },
      { id: "progress", label: "Progress" },
    ];
    return (
      <div style={wrap}>
        <style>{CSS}</style>
        <StarField />
        <div style={{ background: "rgba(4,7,14,0.94)", borderBottom: `1px solid ${T.border}`, backdropFilter: "blur(16px)", padding: "13px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 30 }}>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, color: T.gold, letterSpacing: 1 }}>InnerGen</div>
            <div style={{ fontFamily: FONT, fontSize: 9, color: T.dim, letterSpacing: 3, textTransform: "uppercase" }}>Human Potential Lab</div>
          </div>
          <div style={{ fontFamily: FONT, fontSize: 12, color: T.muted }}>{level.emoji} {level.title}</div>
        </div>
        <div style={{ display: "flex", borderBottom: `1px solid ${T.border}`, background: "rgba(4,7,14,0.88)", backdropFilter: "blur(8px)", position: "sticky", top: 56, zIndex: 29 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              flex: 1, padding: "12px 8px", border: "none", background: "transparent", cursor: "pointer",
              fontFamily: FONT, fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400,
              color: activeTab === t.id ? T.gold : T.muted,
              borderBottom: activeTab === t.id ? `2px solid ${T.gold}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>
        <div style={inner}>

          {activeTab === "result" && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <div style={{ ...card, padding: "28px 22px", marginBottom: 16, textAlign: "center" }}>
                <div style={{ fontSize: 50, marginBottom: 8, animation: "beat 2.5s infinite" }}>{level.emoji}</div>
                <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: 4, color: T.goldDim, marginBottom: 8, textTransform: "uppercase" }}>Your Potential Profile</div>
                <h2 style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: level.color, marginBottom: 10 }}>{level.title}</h2>
                <p style={{ fontFamily: FONT_B, fontSize: 14, color: "rgba(237,232,212,0.82)", lineHeight: 1.85, marginBottom: 22 }}>{level.desc}</p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  {[{ label: "Score", value: `${points}/32` }, { label: "Profile", value: level.emoji }].map(s => (
                    <div key={s.label} style={{ background: "rgba(242,201,76,0.07)", border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 22px" }}>
                      <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: T.gold }}>{s.value}</div>
                      <div style={{ fontFamily: FONT, fontSize: 10, color: T.dim, letterSpacing: 2, marginTop: 3, textTransform: "uppercase" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...card, padding: "26px 22px", marginBottom: 16, border: `1px solid rgba(242,201,76,0.3)`, background: "rgba(242,201,76,0.03)" }}>
                <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: 3, color: T.goldDim, marginBottom: 10, textTransform: "uppercase" }}>✦ Your Next Step</div>
                <h3 style={{ fontFamily: FONT, fontSize: 22, color: T.text, fontWeight: 700, marginBottom: 12 }}>Your Personal Magic Book is waiting</h3>
                <p style={{ fontFamily: FONT_B, fontSize: 14, color: T.muted, lineHeight: 1.85, marginBottom: 20 }}>
                  Based on your score of <strong style={{ color: T.gold }}>{points}/32</strong> as <strong style={{ color: level.color }}>{level.title}</strong>, your guide is ready to be built — personalized entirely from your answers. No two are ever the same.
                </p>
                <button style={goldBtn} onClick={() => setActiveTab("books")}>EXPLORE MY MAGIC BOOKS →</button>
              </div>
              <div style={{ ...card, padding: "20px 22px", marginBottom: 16 }}>
                <div style={{ fontFamily: FONT_B, fontSize: 10, letterSpacing: 3, color: T.goldDim, marginBottom: 10, textTransform: "uppercase" }}>✦ Share Your Result</div>
                <p style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted, lineHeight: 1.75, marginBottom: 16 }}>
                  Know someone who needs to hear this? Share your result and invite them to discover their own.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    { platform: "whatsapp", label: "WhatsApp",  emoji: "💬", color: "#25D366" },
                    { platform: "twitter",  label: "X / Twitter", emoji: "𝕏", color: "#1DA1F2" },
                    { platform: "email",    label: "Email",     emoji: "✉️", color: T.gold },
                    { platform: "copy",     label: "Copy Link", emoji: "🔗", color: T.muted },
                  ].map(s => (
                    <button key={s.platform} onClick={() => handleShare(s.platform)} style={{
                      padding: "12px 10px", borderRadius: 12, border: `1px solid rgba(255,255,255,0.08)`,
                      background: "rgba(255,255,255,0.03)", cursor: "pointer",
                      fontFamily: FONT_B, fontSize: 12, color: s.color,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}>
                      <span>{s.emoji}</span> {s.label}
                    </button>
                  ))}
                </div>
                {shareMsg && <p style={{ fontFamily: FONT_B, fontSize: 12, color: T.green, textAlign: "center", marginTop: 10 }}>{shareMsg}</p>}
              </div>
              <button style={dimBtn} onClick={() => { setScreen("quiz"); setQIdx(0); setSelected(null); setInsight(null); setPoints(0); setAnswers([]); setAnimKey(0); }}>
                ↩ Retake Assessment
              </button>
            </div>
          )}

          {activeTab === "books" && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <div style={{ marginBottom: 22 }}>
                <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: T.text, marginBottom: 8 }}>Your Magic Books</h2>
                <p style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted, lineHeight: 1.75 }}>
                  Each guide is built entirely from your answers. Personalized for you. No two are ever the same.
                </p>
              </div>
              {TIERS.map(tier => (
                <div key={tier.id} style={{ ...card, padding: "24px 22px", marginBottom: 16, border: `1px solid ${tier.color}20` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: FONT_B, fontSize: 10, letterSpacing: 3, color: tier.color, textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>
                        {tier.emoji} {tier.label}
                      </div>
                      <h3 style={{ fontFamily: FONT, fontSize: 18, color: T.text, fontWeight: 700 }}>{tier.tagline}</h3>
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: tier.color, flexShrink: 0, marginLeft: 12 }}>{tier.price}</div>
                  </div>
                  <p style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted, lineHeight: 1.8, marginBottom: 16 }}>{tier.description}</p>
                  {tier.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ color: tier.color, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <span style={{ fontFamily: FONT_B, fontSize: 12.5, color: T.muted, lineHeight: 1.55 }}>{f}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 18 }}>
                    {purchased[tier.id] ? (
                      <button style={{ ...goldBtn, background: `linear-gradient(135deg, ${tier.color}, ${tier.color}99)` }} onClick={() => generateBook(tier.id)}>
                        OPEN MY {tier.label.toUpperCase()} GUIDE →
                      </button>
                    ) : (
                      <button style={{ ...goldBtn, background: `linear-gradient(135deg, ${tier.color}, ${tier.color}bb)` }} onClick={() => openPaywall(tier.id)}>
                        UNLOCK FOR {tier.price} →
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div style={{ ...card, padding: "18px 20px", textAlign: "center", marginTop: 8 }}>
                <p style={{ fontFamily: FONT_B, fontSize: 12, fontStyle: "italic", color: T.dim, lineHeight: 1.7 }}>
                  One-time purchase · Instant access · Yours forever · No subscription
                </p>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: T.text, marginBottom: 6 }}>Your Progress</h2>
              <p style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted, marginBottom: 22, lineHeight: 1.7 }}>
                A breakdown of your scores across all eight dimensions of human potential.
              </p>
              <div style={{ ...card, padding: "24px 22px", marginBottom: 16 }}>
                <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: 3, color: T.goldDim, marginBottom: 18, textTransform: "uppercase" }}>Phase Breakdown</div>
                {QUIZ.map((q, i) => {
                  const ans = answers[i];
                  const pct = ans ? (ans.pts / 4) * 100 : 0;
                  const col = pct >= 75 ? T.green : pct >= 50 ? T.gold : T.rose;
                  return (
                    <div key={q.id} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontFamily: FONT_B, fontSize: 12, color: T.muted }}>{q.icon} {q.phase}</span>
                        <span style={{ fontFamily: FONT_B, fontSize: 12, color: col, fontWeight: 700 }}>{ans ? `${ans.pts}/4` : "—"}</span>
                      </div>
                      <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: col, borderRadius: 2, transition: "width 0.8s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ ...card, padding: "22px" }}>
                <div style={{ fontFamily: FONT, fontSize: 10, letterSpacing: 3, color: T.goldDim, marginBottom: 14, textTransform: "uppercase" }}>Overall Score</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 40 }}>{level.emoji}</div>
                  <div>
                    <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 700, color: level.color, lineHeight: 1 }}>{points}<span style={{ fontSize: 16, color: T.dim }}>/32</span></div>
                    <div style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted, marginTop: 4 }}>{level.title}</div>
                    <div style={{ fontFamily: FONT_B, fontSize: 11, color: T.dim, marginTop: 3 }}>Retake to track your growth over time</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {paywall && paywallTier && (() => {
          const tier = TIERS.find(t => t.id === paywallTier);
          return (
            <div style={{ position: "fixed", inset: 0, background: "rgba(4,7,14,0.95)", backdropFilter: "blur(20px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 16px 28px", animation: "fadeIn 0.3s ease" }}
              onClick={e => { if (e.target === e.currentTarget) setPaywall(false); }}>
              <div style={{ ...card, width: "100%", maxWidth: 480, padding: "32px 26px", border: `1px solid ${tier.color}35` }}>
                <div style={{ textAlign: "center", marginBottom: 22 }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>{tier.emoji}</div>
                  <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: T.text, marginBottom: 8 }}>{tier.label} — Your Personal Guide</h2>
                  <p style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted, lineHeight: 1.8 }}>Built entirely from your answers. Personalized for you. Instant access.</p>
                </div>
                {tier.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 9 }}>
                    <span style={{ color: tier.color, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted }}>{f}</span>
                  </div>
                ))}
                <div style={{ textAlign: "center", margin: "22px 0 8px" }}>
                  <span style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: tier.color }}>{tier.price}</span>
                  <span style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted }}> · one time · yours forever</span>
                </div>
                <p style={{ fontFamily: FONT_B, fontSize: 11, color: T.dim, textAlign: "center", marginBottom: 20 }}>No subscription. No upsells. Instant access.</p>
                <button style={{ ...goldBtn, background: `linear-gradient(135deg, ${tier.color}, ${tier.color}cc)`, marginBottom: 10 }}
                  onClick={() => handleStripeRedirect(paywallTier)}>
                  UNLOCK MY {tier.label.toUpperCase()} GUIDE →
                </button>
                <button style={dimBtn} onClick={() => setPaywall(false)}>Maybe later</button>
                <p style={{ fontFamily: FONT_B, fontSize: 11, color: T.dim, textAlign: "center", marginTop: 12 }}>
                  By purchasing you agree to our{" "}
                  <button onClick={() => { setPaywall(false); goToTerms("dashboard"); }} style={{ background: "none", border: "none", fontFamily: FONT_B, fontSize: 11, color: T.goldDim, cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                    Terms & Conditions
                  </button>
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  // ── MAGIC BOOK ────────────────────────────────────────────────────────────
  if (screen === "book") {
    const tier = TIERS.find(t => t.id === bookTier);
    return (
      <div style={wrap}>
        <style>{CSS}</style>
        <StarField />
        <div style={inner}>
          <button onClick={() => setScreen("dashboard")} style={{ background: "none", border: "none", color: T.muted, fontFamily: FONT_B, fontSize: 13, cursor: "pointer", marginBottom: 20, padding: "6px 0" }}>
            ← Back to Dashboard
          </button>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48, marginBottom: 10, animation: bookLoading ? "spin 2s linear infinite" : "beat 3s infinite" }}>
              {bookLoading ? "⚙️" : "📖"}
            </div>
            <div style={{ fontFamily: FONT_B, fontSize: 10, letterSpacing: 4, color: T.goldDim, marginBottom: 8, textTransform: "uppercase", fontWeight: 700 }}>
              {tier?.emoji} {tier?.label} · Your Personal Guide
            </div>
            <h1 style={{ fontFamily: FONT_H, fontSize: 26, fontWeight: 700, color: T.gold, marginBottom: 8 }}>{level.title}</h1>
            <p style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted }}>Score {points}/32 · Personalized for you</p>
          </div>

          {bookLoading && !bookContent ? (
            <div style={{ ...card, padding: "44px 22px", textAlign: "center" }}>
              <div style={{ width: 32, height: 32, border: `3px solid ${T.border}`, borderTopColor: T.gold, borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto 18px" }} />
              <p style={{ fontFamily: FONT_B, fontSize: 15, color: T.muted, lineHeight: 1.8 }}>
                Building your personal guide...<br />
                <span style={{ fontSize: 13, color: T.dim }}>Your words are streaming in now ✨</span>
              </p>
            </div>
          ) : (
            <>
              <div style={{ ...card, padding: "28px 22px", marginBottom: 20 }}>
                {bookLoading && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.gold, animation: "beat 1s infinite" }} />
                    <span style={{ fontFamily: FONT_B, fontSize: 12, color: T.goldDim }}>Writing your guide...</span>
                  </div>
                )}
                <p style={{ fontFamily: FONT_B, fontSize: 15, color: "rgba(237,232,212,0.88)", lineHeight: 2.1, whiteSpace: "pre-wrap", fontWeight: 400 }}>{bookContent}</p>
              </div>

              {!bookLoading && (
                <>
                  <div style={{
                    background: "rgba(242,201,76,0.07)",
                    border: `1.5px solid rgba(242,201,76,0.35)`,
                    borderRadius: 16, padding: "20px 22px", marginBottom: 16,
                    display: "flex", gap: 14, alignItems: "flex-start",
                  }}>
                    <div style={{ fontSize: 28, flexShrink: 0 }}>💛</div>
                    <div>
                      <p style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: T.gold, marginBottom: 6 }}>
                        Your guide is ready — save it now!
                      </p>
                      <p style={{ fontFamily: FONT_B, fontSize: 13, color: "rgba(237,232,212,0.78)", lineHeight: 1.8 }}>
                        Tap the download button below to save your personal guide to your device. It will land in your Downloads folder — easy to find, read anytime, and print whenever you're ready. Keep it somewhere safe. This guide was built just for you. ✨
                      </p>
                    </div>
                  </div>
                  <button style={goldBtn} onClick={downloadBook}>⬇ DOWNLOAD MY PERSONAL GUIDE</button>
                  <div style={{ height: 10 }} />
                  <button style={outlineBtn} onClick={() => { setScreen("dashboard"); setActiveTab("books"); }}>← Back to Magic Books</button>
                  <div style={{ height: 10 }} />
                  <div style={{ ...card, padding: "16px 20px", textAlign: "center" }}>
                    <p style={{ fontFamily: FONT_B, fontSize: 12, color: T.dim, lineHeight: 1.7 }}>
                      This guide was built entirely from your answers.<br />Retake the assessment anytime to receive a new one.
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ── TERMS ─────────────────────────────────────────────────────────────────
  if (screen === "terms") return (
    <div style={wrap}>
      <style>{CSS}</style>
      <StarField />
      <div style={inner}>
        <button onClick={() => setScreen(prevScreen)} style={{ background: "none", border: "none", color: T.muted, fontFamily: FONT_B, fontSize: 13, cursor: "pointer", marginBottom: 24, padding: "6px 0" }}>
          ← Back
        </button>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontFamily: FONT_B, fontSize: 10, letterSpacing: 5, color: T.goldDim, marginBottom: 10, textTransform: "uppercase", fontWeight: 700 }}>InnerGen</div>
          <h1 style={{ fontFamily: FONT_H, fontSize: 24, fontWeight: 700, color: T.text }}>Terms & Conditions</h1>
          <p style={{ fontFamily: FONT_B, fontSize: 12, color: T.dim, marginTop: 6 }}>Last updated: May 2026</p>
        </div>
        {[
          { title: "1. What InnerGen Is", body: "InnerGen is short for Inner Genius.\n\nEvery one of us has Genius living inside — often untapped. As Wayne Dyer once said, \"Some people die with the music still in them.\" InnerGen exists so that doesn't happen to you.\n\nDon't die with the music still in you. Let's write your music. Let's sing the tune exactly how you were meant to sing it. In other words — let's live the way we were meant to live. Healthy, wealthy, and happy.\n\nInnerGen was created by someone who has studied human development and results since 2020, and who is currently an active consultant and high performance coach. This app is the distillation of that work — made personal, made practical, made for you.\n\nInnerGen is a self-awareness assessment tool designed for personal development purposes. The quiz and personal guides are intended to support reflection, growth, and meaningful action in your life.\n\nInnerGen is not a medical service, psychological treatment, financial advisory service, or substitute for professional advice of any kind. If you are experiencing a mental health crisis or require professional support, please consult a qualified professional." },
          { title: "2. AI-Generated Content", body: "The personal guides delivered through InnerGen are generated using artificial intelligence technology, based on your specific assessment responses. Each guide is unique to your answers at the time of assessment.\n\nWhile every guide is built from a framework grounded in established research in neuroscience, psychology, and behavioral science, the output is generated by AI and has not been reviewed by a licensed professional. Results are for personal development and informational purposes only." },
          { title: "3. Purchases and Refund Policy", body: "InnerGen offers three personal guide tiers — Spark ($11.95), Rise ($33.95), and Sovereign ($55.95) — each as a one-time purchase.\n\nYour personal guide is generated and delivered digitally and instantly upon confirmed payment. Because each guide is uniquely generated from your personal responses and delivered immediately, we are unable to offer refunds once a guide has been generated and delivered.\n\nIf you experience a genuine technical failure that prevents delivery of your guide after payment, please contact us and we will resolve it promptly.\n\nPayments are processed securely through Stripe. InnerGen does not store your payment information." },
          { title: "4. No Guarantees of Specific Outcomes", body: "InnerGen provides tools, frameworks, and guidance for personal development. We believe deeply in human potential and the value of self-awareness.\n\nHowever, we cannot and do not guarantee specific life outcomes — financial, health-related, relational, or otherwise — as a result of using this application or its guides. Your results depend entirely on your own choices, effort, and circumstances." },
          { title: "5. Intellectual Property", body: "The InnerGen quiz, framework, brand, and application are the intellectual property of InnerGen and its creator. All rights reserved.\n\nYour personal guide is provided for your individual personal use only. You may not reproduce, sell, or distribute the content of your guide commercially." },
          { title: "6. Privacy", body: "What we collect: Your assessment responses and purchase information.\n\nHow we use it: To generate your personalized guide and process your payment.\n\nWhat we don't do: We do not sell, share, or distribute your personal data to third parties for marketing purposes.\n\nPayment data is handled entirely by Stripe. Please review Stripe's privacy policy for details on payment data handling." },
          { title: "7. Limitation of Liability", body: "To the fullest extent permitted by applicable law, InnerGen and its creator shall not be liable for any indirect, incidental, or consequential damages arising from your use of this application or its content." },
          { title: "8. Changes to These Terms", body: "We may update these Terms and Conditions from time to time. Continued use of InnerGen after any changes constitutes acceptance of the updated terms." },
          { title: "9. Contact", body: "For questions, technical issues, or concerns, please contact us at:\n\nsupport@innergen.app" },
        ].map((section, i) => (
          <div key={i} style={{ ...card, padding: "20px 22px", marginBottom: 12 }}>
            <h3 style={{ fontFamily: FONT_H, fontSize: 14, fontWeight: 700, color: T.gold, marginBottom: 10 }}>{section.title}</h3>
            <p style={{ fontFamily: FONT_B, fontSize: 13, color: T.muted, lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{section.body}</p>
          </div>
        ))}
        <div style={{ ...card, padding: "16px 20px", marginTop: 8, textAlign: "center" }}>
          <p style={{ fontFamily: FONT_B, fontSize: 11, color: T.dim, lineHeight: 1.7 }}>
            These terms were prepared for informational purposes.<br />Review by a qualified attorney is recommended.
          </p>
        </div>
        <div style={{ height: 20 }} />
        <button style={goldBtn} onClick={() => setScreen(prevScreen)}>← Back to InnerGen</button>
      </div>
    </div>
  );

  return null;
}
