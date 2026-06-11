export const SCRIPT_ROLES = [
  { key: "A", value: "individual", label: "Protect myself & family" },
  { key: "B", value: "community", label: "Manage an estate or community" },
  { key: "C", value: "responder", label: "Volunteer as a community responder" },
  { key: "D", value: "business", label: "Business or fleet operator" },
] as const;

export const SCRIPT_STATES = [
  { key: "A", value: "lagos", label: "Lagos" },
  { key: "B", value: "abuja", label: "Abuja (FCT)" },
  { key: "C", value: "ph", label: "Port Harcourt" },
  { key: "D", value: "other", label: "Somewhere else" },
] as const;

export const SCRIPT_HOW_IT_WORKS = [
  {
    num: "01",
    title: "Trigger an Emergency Alert",
    body: "One tap sends an SOS directly from your device - no unlocking, no typing, no calling.",
  },
  {
    num: "02",
    title: "Share Your Live Location",
    body: "Trusted contacts and verified responders immediately see your location in real time.",
  },
  {
    num: "03",
    title: "Intelligent Community Response",
    body: "Nearby NIN-verified responders are alerted and dispatched while professional teams mobilise.",
  },
  {
    num: "04",
    title: "Rapid Rescue Coordination",
    body: "Security partners, emergency responders, and community volunteers work through one connected network.",
  },
  {
    num: "05",
    title: "Continuous Protection",
    body: "You receive live updates and safety notifications until the situation is fully resolved.",
  },
] as const;

export const SCRIPT_FEATURES = [
  "One-Tap Emergency SOS",
  "Real-Time Location Tracking",
  "Community-Based Rapid Response Network",
  "Verified Local Responders",
  "Medical & Security Emergency Assistance",
  "Family & Trusted Contact Notifications",
  "Personalised Security Subscription Plans",
  "24/7 Incident Monitoring",
  "Emergency Response Analytics & Reporting",
  "Offline SMS + USSD Fallback",
] as const;

export const SCRIPT_OBJECTIONS = [
  {
    q: "Who exactly will respond?",
    a: "Every responder is NIN-verified and trained. When you press SOS, the three nearest verified community responders are notified instantly - alongside any professional security partners in your plan.",
  },
  {
    q: "I already have WhatsApp. Why do I need this?",
    a: "In an emergency, you do not have time to make five phone calls. One tap on Helpa simultaneously alerts 10 trusted contacts, shares your live GPS location, and dispatches the nearest responder - no typing, no explaining where you are.",
  },
  {
    q: "What if there are fake responders?",
    a: "Every responder passes NIN verification, background checks, and first-aid certification before activation. A reputation system and abuse penalties keep the network clean.",
  },
  {
    q: "Why pay monthly if emergencies are rare?",
    a: "Helpa delivers daily value: safe route recommendations, area security alerts, family check-ins, welfare pings, and road incident notifications. You pay for continuous protection, not just rare events.",
  },
  {
    q: "Are you tracking me all the time?",
    a: "No. Location is only shared when you actively trigger an SOS or opt into family check-in. Your data is end-to-end encrypted and never sold. You control everything.",
  },
  {
    q: "How fast will help actually arrive?",
    a: "Urban target: community responder acknowledgement within 3 minutes, arrival within 7. We publish our SLAs publicly and never overpromise. Response stats are shown live in the app.",
  },
  {
    q: "What if nobody in my area uses it yet?",
    a: "We launch community-first: one estate, one campus, one neighbourhood at a time - until coverage is dense enough to guarantee a response. Your waitlist position reserves your city slot.",
  },
] as const;

export const SCRIPT_STATS = [
  { val: "87%", lbl: "Emergency calls go unanswered" },
  { val: "<60s", lbl: "Target SOS dispatch time" },
  { val: "1.2M", lbl: "Preventable deaths yearly" },
] as const;

export const SCRIPT_ALERTS = [
  "Responder #A47 verified - Lagos Island",
  "Alert dispatched - Lekki Phase 1 - 2 min ago",
  "Community joined - Gated Estate, Abuja - 14 members",
  "Responder #C12 certified - Port Harcourt",
  "Incident resolved - Ikeja - response time 4m 32s",
  "New estate onboarded - Magodo, Lagos",
  "SOS acknowledged - Wuse 2 - 3 responders notified",
] as const;

export const SCRIPT_LAYERS = [
  {
    label: "Community layer",
    color: "#3dba72",
    items: [
      "Nearby verified responders",
      "Neighbourhood safety groups",
      "Community watch integration",
    ],
  },
  {
    label: "Professional layer",
    color: "#5bc8ff",
    items: [
      "Security companies",
      "Medical responders",
      "Private rescue teams",
      "Emergency dispatch partners",
    ],
  },
  {
    label: "Technology layer",
    color: "#f0a030",
    items: [
      "AI-powered threat detection",
      "Smart escalation rules",
      "Predictive risk alerts",
      "Live location intelligence",
    ],
  },
] as const;

export const SCRIPT_PLANS = [
  {
    name: "Individual",
    price: "NGN 2,500",
    period: "/mo",
    desc: "Full offline pipeline, CV active, family sharing (2 seats), medical ID profile.",
    highlight: false,
  },
  {
    name: "Household",
    price: "NGN 5,500",
    period: "/mo",
    desc: "6 seats, estate responder network, priority dispatch, offline map caching.",
    highlight: true,
  },
  {
    name: "Community",
    price: "From NGN 150K",
    period: "/mo",
    desc: "50-500 seats, admin dashboard, SLA guarantee, incident reporting tools.",
    highlight: false,
  },
] as const;

export const TYPEWRITER_WORDS = [
  "robbery.",
  "kidnapping.",
  "accidents.",
  "medical emergencies.",
  "distress.",
] as const;
