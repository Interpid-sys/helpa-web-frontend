import signalNetworkImage from "@/assets/signal-network.jpg";

export const NEWS_ITEMS = [
  {
    slug: "from-waitlist-to-safety-movement",
    tag: "Product PR",
    title: "Oya Alerts is moving from waitlist into public safety content and launch updates.",
    date: "June 2026",
    readingTime: "3 min read",
    image: signalNetworkImage,
    excerpt:
      "The next phase focuses on product announcements, safety education, community feedback, and launch notifications for early supporters.",
    trend:
      "Public trust in emergency response is low, so safety products must build trust before they ask people to rely on them.",
    body: [
      {
        heading: "Why this matters now",
        paragraphs: [
          "Oya Alerts is moving beyond simple interest collection. The project is shifting into a public-facing rollout where safety content, product PR, community updates, and pilot notifications become part of the adoption engine.",
          "In Nigeria, insecurity is urgent and deeply personal. People need practical safety information before a product is fully live, and they need to see that Oya Alerts is building a responsible movement rather than only an app.",
        ],
      },
      {
        heading: "What changes",
        paragraphs: [
          "The waitlist remains useful, but it now becomes a launch-update and community-signal channel. People who join should expect safety education, early product updates, pilot announcements, and opportunities to support the movement.",
          "This lets Oya Alerts grow trust before asking families, estates, fleets, campuses, and responders to depend on the platform during emergencies.",
        ],
      },
    ],
    takeaways: [
      "The signup flow is now a movement and launch-update channel.",
      "Product PR will become part of the rollout.",
      "Safety education is a growth strategy, not a side activity.",
    ],
  },
  {
    slug: "safety-content-as-public-education",
    tag: "Community",
    title: "Safety content becomes a core part of the Oya Alerts movement.",
    date: "June 2026",
    readingTime: "4 min read",
    image: signalNetworkImage,
    excerpt:
      "Oya Alerts will publish practical safety content that helps families, estates, campuses, fleets, and responders know what to do before help arrives.",
    trend:
      "Short-form video and WhatsApp distribution are becoming faster paths to trust than traditional product announcements.",
    body: [
      {
        heading: "Useful content builds trust",
        paragraphs: [
          "Public safety content can give people immediate value while the product rollout is still forming. The goal is to help people understand what to do during road incidents, distress calls, medical emergencies, estate alerts, campus safety concerns, and family check-ins.",
          "This approach keeps Oya Alerts visible, useful, and credible before full coverage is available in every area.",
        ],
      },
      {
        heading: "What the content should cover",
        paragraphs: [
          "The strongest content themes include 60 Seconds To Safety, Before Help Arrives, Family Safety Friday, Safe Estate, Safe Campus, Safe Fleet, Clear The Way, and Verify Before You Share.",
          "Every post should teach one behavior, avoid fear-mongering, and invite people to join the safety movement or share the lesson with someone who needs it.",
        ],
      },
    ],
    takeaways: [
      "Safety education gives value before product adoption.",
      "Content should be practical, calm, and shareable.",
      "WhatsApp, Instagram, TikTok, X, LinkedIn, YouTube, and Facebook each have a role.",
    ],
  },
  {
    slug: "early-careers-open-for-safety-rollout",
    tag: "Careers",
    title: "Three early roles open to help build Nigeria's safety movement.",
    date: "June 2026",
    readingTime: "2 min read",
    image: signalNetworkImage,
    excerpt:
      "Oya Alerts is hiring for social media, go-to-market, and project management roles to support product PR and community rollout.",
    trend:
      "Early-stage civic safety products need operators who can create content, build partnerships, and keep execution disciplined.",
    body: [
      {
        heading: "The team needs operators",
        paragraphs: [
          "The next phase of Oya Alerts requires people who can execute quickly across content, GTM, partnerships, project delivery, safety education, and public communication.",
          "The first open roles are Social Media Manager, GTM Manager, and Project Manager. Each role supports a different part of the same mission: making Oya Alerts visible, trusted, and operationally serious.",
        ],
      },
      {
        heading: "Why these roles come first",
        paragraphs: [
          "Social media turns the safety mission into daily public education. GTM turns awareness into adoption across estates, campuses, fleets, responders, and CSR partners. Project management keeps the rollout from becoming chaotic.",
          "Together, these roles help the project move faster without losing structure.",
        ],
      },
    ],
    takeaways: [
      "The careers section now has detailed role pages.",
      "Each role has clear salary, expectations, and success metrics.",
      "Women are strongly encouraged to apply.",
    ],
  },
] as const;

export type NewsSlug = (typeof NEWS_ITEMS)[number]["slug"];

export function getNewsItem(slug: string) {
  return NEWS_ITEMS.find((item) => item.slug === slug);
}
