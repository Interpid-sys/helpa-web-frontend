export const RESPONSE_STEPS = [
  {
    n: "01",
    tag: "SOS",
    title: "One tap. Signal sent.",
    body: "A single press sends an swift alert and the nature of the emergency from your phone.",
  },
  {
    n: "02",
    tag: "Signal",
    title: "Trusted circle alerted.",
    body: "Family, friends, and chosen contacts are notified immediately and can follow the situation in real time.",
  },
  {
    n: "03",
    tag: "Support",
    title: "Nearby help dispatched.",
    body: "Verified responders, estate security, and community members close to you are coordinated in parallel.",
  },
  {
    n: "04",
    tag: "Resolution",
    title: "One thread, until safe.",
    body: "Everyone stays on the same response thread, no repeated calls, no lost context, until the situation is resolved.",
  },
] as const;

export const ECOSYSTEM_ROLES = [
  {
    code: "R-01",
    title: "Residents",
    note: "First eyes and hands on the ground in any neighbourhood.",
  },
  {
    code: "R-02",
    title: "Families",
    note: "Trusted circles who must know first, with full context.",
  },
  {
    code: "R-03",
    title: "Estates",
    note: "Security teams and gated community coverage layers.",
  },
  {
    code: "R-04",
    title: "Campuses",
    note: "Duty of care for students, staff, and visitors.",
  },
  {
    code: "R-05",
    title: "Fleet operators",
    note: "Drivers and vehicles already moving across the city.",
  },
  {
    code: "R-06",
    title: "Medical & security teams",
    note: "Trained, verified, response-ready professionals.",
  },
  {
    code: "R-07",
    title: "Institutions",
    note: "Hospitals, agencies, and public services as the wider net.",
  },
] as const;

export const WAITLIST_REASONS = [
  "Waitlist demand tells us where coordinated response is needed most.",
  "It defines the first launch communities, estates, and campuses.",
  "It guides our outreach to responders, operators, and medical teams.",
  "It builds the density required for reliable response before day one.",
] as const;

export const FAQ_ITEMS = [
  {
    q: "When will oyaAlerts launch?",
    a: "We are rolling out city by city based on waitlist density. The communities with the most early signups go live first, that is exactly what your signup helps decide.",
  },
  {
    q: "Why does joining early matter?",
    a: "Emergency response is a density problem. Waitlist signal tells us where to concentrate responder and operator outreach so that coverage is real, not theoretical, on launch day.",
  },

  {
    q: "How is my privacy protected?",
    a: "Your location and details are only shared when you actively trigger a signal, and only with the people in your trusted circle and the verified responders closest to you. Nothing is broadcast in the background.",
  },
  {
    q: "How reliable will response be?",
    a: "oyaAlerts is a coordination layer, not a promise of perfect response. Reliability grows as residents, responders, and operators join. We launch in a community only once the network is dense enough to be useful.",
  },
  {
    q: "Which areas will be covered first?",
    a: "Initial focus is on the highest-density waitlist clusters across Lagos, Abuja, and Port Harcourt, expanding outward as community and responder participation grows.",
  },
  {
    q: "Who exactly will respond?",
    a: "Every responder in the community is NIN-verified and some specially trained with extra layer of verification done. When you press SOS, the nearest verified community responders and registered neighbours are notified instantly - alongside any professional security partners in your plan.",
  },

  {
    q: "What if there are fake responders?",
    a: "Every responder passes NIN verification, background checks, and first-aid certification before activation. A reputation system and abuse penalties keep the network clean.",
  },
  {
    q: "Why pay monthly if emergencies are rare?",
    a: "oyaAlerts delivers daily value: safe route recommendations, area security alerts, family check-ins, welfare pings, and road incident notifications. You pay for continuous protection, not just rare events.",
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
    a: "We launch community-first: one street, one estate, one campus, one neighbourhood at a time, until coverage is dense enough to guarantee a response. Your waitlist position reserves your city slot.",
  },
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
export const TYPEWRITER_WORDS = [
  "robbery.",
  "kidnapping.",
  "accidents.",
  "medical emergencies.",
  "distress.",
] as const;
