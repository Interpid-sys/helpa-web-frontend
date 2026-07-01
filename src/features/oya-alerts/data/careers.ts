export const CAREER_ROLES = [
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    salary: "NGN 100,000 / month",
    type: "Part-time / content and community",
    icon: "play",
    summary: "Own the public voice of Oya Alerts across social platforms and safety education.",
    focus: "Content, community growth, creator coordination, and safety education.",
    mission:
      "Make public safety content simple, emotional, useful, and shareable so Nigerians can learn what to do before help arrives.",
    responsibilities: [
      "Plan and publish daily public-safety content across TikTok, Instagram, X, LinkedIn, Facebook, YouTube Shorts, and WhatsApp.",
      "Turn emergency education, CSR, safety standards, and community-safety ideas into posts, reels, scripts, captions, carousels, and short campaigns.",
      "Coordinate creator outreach, community stories, safety campaigns, launch updates, and product PR without fear-based or divisive messaging.",
      "Track views, comments, shares, saves, waitlist signups, WhatsApp joins, creator leads, and audience questions.",
      "Package audience feedback into weekly insights for product, GTM, and community rollout.",
    ],
    requirements: [
      "Strong writing, storytelling, captioning, and short-form video sense.",
      "Comfortable with Canva, CapCut or similar editing tools, TikTok, Instagram, X, LinkedIn, Facebook, YouTube, and WhatsApp communities.",
      "Understands Nigerian online culture and can communicate safety topics with empathy, urgency, and good judgment.",
      "Can work with a lean team and publish consistently without waiting for perfect conditions.",
      "Women are strongly encouraged to apply.",
    ],
    successMetrics: [
      "Daily publishing cadence maintained.",
      "Weekly content report delivered.",
      "Measurable growth in social engagement and waitlist conversions.",
      "Creator and community collaboration pipeline active.",
    ],
  },
  {
    slug: "gtm-manager",
    title: "GTM Manager",
    salary: "NGN 200,000 / month",
    type: "Growth / partnerships / field activation",
    icon: "target",
    summary:
      "Drive adoption across communities, estates, campuses, fleets, responders, and CSR partners.",
    focus: "Market entry, adoption loops, partnerships, launch cells, and product PR conversion.",
    mission:
      "Turn attention into adoption by building the channels, partnerships, and field activations that make Oya Alerts visible and trusted.",
    responsibilities: [
      "Build and manage go-to-market campaigns for launch updates, product PR, safety awareness, and community rollout.",
      "Develop pipelines for estates, campuses, fleets, agencies, businesses, creators, responders, and CSR sponsors.",
      "Coordinate social, WhatsApp, community, and field activation loops that convert awareness into signups and pilot conversations.",
      "Design weekly GTM experiments across content, creator partnerships, community referrals, institutional outreach, and PR moments.",
      "Maintain outreach trackers, partner notes, conversion metrics, and next-step follow-ups.",
      "Report weekly on channel performance, conversion, outreach, partnerships, and launch-cell opportunities.",
    ],
    requirements: [
      "Strong sales, growth, partnerships, or field activation instinct.",
      "Comfortable speaking with estate managers, campus leaders, fleet operators, creators, responders, and CSR teams.",
      "Can convert a big mission into practical weekly campaigns and measurable adoption.",
      "Understands trust-building in Nigeria and can avoid political, religious, ethnic, or fear-based positioning.",
      "Women are strongly encouraged to apply.",
    ],
    successMetrics: [
      "Qualified partner pipeline created and updated weekly.",
      "Regular estate, campus, fleet, responder, and CSR conversations booked.",
      "Clear growth experiments shipped weekly.",
      "Waitlist and launch-cell growth tied to specific channels.",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    salary: "NGN 250,000 / month",
    type: "Operations / delivery / coordination",
    icon: "clipboard",
    summary:
      "Keep product, content, legal, operations, and partner work moving with clear ownership.",
    focus:
      "Execution rhythm, delivery tracking, internal coordination, risks, and weekly operating discipline.",
    mission:
      "Make sure Oya Alerts moves fast without becoming chaotic by keeping priorities clear, owners accountable, and blockers visible.",
    responsibilities: [
      "Manage timelines, task owners, weekly priorities, and execution follow-through across the Oya Alerts rollout.",
      "Coordinate content, PR, product updates, pilot planning, community activities, legal pages, careers, and stakeholder requests.",
      "Maintain trackers for launch assets, partnerships, vacancies, product feedback, risks, blockers, and open decisions.",
      "Prepare concise weekly updates covering progress, risks, next actions, and decisions needed.",
      "Organize meetings, notes, deliverables, due dates, reminders, and post-meeting follow-ups.",
      "Help turn strategy documents into actual tasks, operating checklists, and execution calendars.",
    ],
    requirements: [
      "Strong organization, communication, documentation, and follow-up discipline.",
      "Can work across product, content, operations, legal, and partnerships without losing details.",
      "Comfortable using task trackers, spreadsheets, docs, calendars, and async updates.",
      "Can push execution respectfully and keep a lean team focused.",
    ],
    successMetrics: [
      "Weekly operating tracker is always current.",
      "Owners, deadlines, and blockers are clear.",
      "Deliverables move from strategy to execution.",
      "The team spends less time chasing context and more time shipping.",
    ],
  },
] as const;

export type CareerRoleSlug = (typeof CAREER_ROLES)[number]["slug"];

export function getCareerRole(slug: string) {
  return CAREER_ROLES.find((role) => role.slug === slug);
}
