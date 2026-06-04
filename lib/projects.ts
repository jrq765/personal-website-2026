export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  image: string;           // cover image shown in the gallery card
  imagePosition?: string;  // CSS object-position, e.g. "left center"
  embedUrl?: string;       // Canva embed src, Spotify embed src, etc.
  embedAspectRatio?: string; // e.g. "56.25%" for 16:9, "56.25%" is default
  embedHeight?: number;    // fixed px height for non-ratio embeds like Spotify
  description?: string;
  appStoreUrl?: string;
  instagramPosts?: string[];
  showInstagram?: boolean;
  galleryItems?: { image: string; text: string }[];
  highlights?: { title: string; description: string }[];
}

export const projects: ProjectData[] = [
  {
    slug: "cue-entertainment",
    title: "Cue Entertainment",
    category: "Brand Strategy & Sales",
    image: "/logos/cue-entertainment.png",
    embedUrl: "https://www.canva.com/design/DAHBvaPcdks/do9qEAPfmhEgH1v8tuEJ0g/view?embed",
    description: "Developed and pitched a full brand strategy to the Cue Entertainment sales team, covering positioning, content approach, and go-to-market direction. The deck below was the centerpiece of that pitch.",
    appStoreUrl: "https://apps.apple.com/us/app/cue-entertainment/id6752821280",
    instagramPosts: [
      "https://www.instagram.com/p/DXIGwFLEtSq/",
      "https://www.instagram.com/reel/DXdFdqhghy0/",
      "https://www.instagram.com/reel/DVP2YxKkYka/",
    ],
    // Add Instagram video thumbnails/screenshots here - { image: "/path/to/frame.jpg", text: "Caption" }
    galleryItems: [],
  },
  {
    slug: "reseet",
    title: "Reseet",
    category: "Product Strategy, 24hr Hackathon",
    image: "/logos/reseet.jpg",
    description: "A 24-hour hackathon project built with two teammates. Reseet is a mobile app that lets anyone scan physical receipts with their phone camera, instantly converting them into searchable digital records that compile into quarterly or annual statements with baseline deductible recommendations to send directly to a CPA.",
    embedUrl: "https://www.canva.com/design/DAG44Tl02H4/GRH4CWvmWEvkYA9M0Ee6oQ/view?embed",
    highlights: [
      {
        title: "The Problem",
        description: "Average people lose track of deductible expenses because receipts are physical, scattered, and easy to forget. CPAs spend hours sorting through shoeboxes of paper before they can even begin advising.",
      },
      {
        title: "Scan & Digitize",
        description: "Point your phone camera at any receipt. Reseet reads the merchant, date, amount, and category automatically. No manual entry required.",
      },
      {
        title: "Smart Statements",
        description: "At any time, export a clean quarterly or annual statement. Reseet flags likely deductibles based on IRS categories so nothing gets missed.",
      },
      {
        title: "CPA-Ready Export",
        description: "One-tap export sends a structured PDF to your accountant. Less back-and-forth, faster reviews, and a head start on deductibles before the first meeting.",
      },
      {
        title: "My Role",
        description: "Co-developed the core concept, defined the user flow, and shaped the product strategy from ideation through the final pitch, all within a 24-hour window.",
      },
    ],
  },
  {
    slug: "athletes-unlimited",
    title: "Athletes Unlimited",
    category: "Fan Engagement Strategy, SBUS 450 Sports Marketing",
    image: "/logos/athletes-unlimited.avif",
    embedUrl: "https://www.canva.com/design/DAG5FoH3fVg/UyHMdMZt47-ceYfYhBbafA/view?embed",
    description: "As part of a consulting project for Athletes Unlimited in SBUS 450, our team built a fan engagement strategy to close the gap between AU’s innovative weekly-redraft format and the way fans follow, root, and connect with it. AU’s model creates excitement, but it also creates a real challenge: without fixed teams, fans lack a natural rooting identity. I led the Fan Home Court Advantage concept, a live arena experience where arriving fans vote for which team receives home-court advantage and the court changes colors in real time based on the vote.",
    highlights: [
      {
        title: "The challenge",
        description: "AU’s weekly redraft creates excitement, but it also means fans do not have fixed teams to root for, which weakens emotional continuity.",
      },
      {
        title: "Two core fan types",
        description: "We identified devoted basketball fans and fluid fans, then built recommendations tailored to both in-venue and broadcast audiences.",
      },
      {
        title: "Home Court Advantage",
        description: "Fans arriving at the arena vote for which team earns home-court advantage, making them part of the game before it starts.",
      },
      {
        title: "Visible impact",
        description: "The court shifts color in real time based on the vote percentage, turning fan preference into a live, shareable moment.",
      },
      {
        title: "Why it works",
        description: "This concept gives fans a reason to arrive early, creates ownership and belonging, and makes AU’s tech-forward identity feel emotional and memorable.",
      },
    ],
  },
  {
    slug: "lando-norris-partnerships",
    title: "Lando Norris Strategic Partnerships",
    category: "Athlete Strategy, Sports Marketing, SBUS 450",
    image: "/logos/lando.webp",
    imagePosition: "left center",
    embedUrl: "https://www.canva.com/design/DAG6OH6P8WA/iWL7M3yIyx841zxaJQyfvQ/view?embed",
    description: "For SBUS 450 Sports Marketing I acted as a marketing representative for Lando Norris and produced a full athlete pitch targeted to Headspace. I chose Norris because he publicly named Headspace in a 2021 interview, calling meditation ‘the biggest thing to break away from racing,’ which made the partnership feel organic rather than manufactured. From there I audited his social presence across six platforms (21.2M total followers), identified his top five highest-engagement posts across Instagram, TikTok, and YouTube, segmented three core audiences (female fans, Gen Z, and young professionals), and mapped his ten current brand partnerships to confirm there were no conflicts with wellness.",
    // The deck below contains the full audit, audience analysis, partner map, and activation creative.
    highlights: [
      {
        title: "Lando brings Headspace into airport arrival flow",
        description: "Race weekend airports become activation space with branded meditation stations, a fast QR offer, and an instant first-year membership path.",
      },
      {
        title: "A live pre-race meditation ritual",
        description: "Norris leads a real-time Headspace reset before each race, turning calm preparation into a shareable digital event.",
      },
      {
        title: "Reach across 21.2M followers",
        description: "Six platforms deliver Headspace into female fans, Gen Z, and young professionals where Lando already commands attention.",
      },
      {
        title: "Wellness partner cleared",
        description: "Ten existing partnerships were audited and Headspace emerges as the singular wellness opportunity in Norris's portfolio.",
      },
      {
        title: "Public Headspace mention becomes subscriber momentum",
        description: "A known connection makes this campaign feel like the next natural step and creates immediate storytelling leverage.",
      },
    ],
  },
  {
    slug: "costco-kirkland",
    title: "Costco: Kirkland for ALL",
    category: "Corporate Strategy, BA 453 Capstone",
    image: "/logos/costco.png",
    embedUrl: "https://www.canva.com/design/DAHK_IsM7jE/bgz4qKdc6Rj1wAFw6r-nEQ/view?embed",
    description: "As part of a five-person team in my corporate strategy capstone (BA 453), I helped develop and pitch a strategic recommendation for Costco Wholesale. Our proposal, \"Kirkland for ALL,\" introduced a free-tier membership model giving non-members access exclusively to Kirkland Signature products during designated shopping hours — designed to expand Costco's customer base, drive merchandise revenue, and reduce over-reliance on membership fees.",
    highlights: [
      {
        title: "The Proposal",
        description: "A free-tier membership giving non-members access to Kirkland Signature products during designated hours, opening a new revenue stream without cannibalizing existing memberships.",
      },
      {
        title: "My Role",
        description: "Designed the presentation deck, delivered the introduction and current position analysis, built the SWOT, and led competitor research covering Sam's Club, Amazon, Target, and online grocery platforms.",
      },
      {
        title: "Core Concept",
        description: "Developed the \"Kirkland for ALL\" concept and authored the risk and contingency sections, identifying three primary implementation threats and outlining response strategies for each.",
      },
      {
        title: "Financial Projections",
        description: "The team modeled a five-year path to $13B in net income, with total revenue growing from $338B to $420B by 2030.",
      },
      {
        title: "Competitive Landscape",
        description: "Mapped Costco's position against Sam's Club, Amazon, Target, and emerging online grocery platforms to ground the recommendation in real market dynamics.",
      },
    ],
  },
  {
    slug: "safe-return",
    title: "Safe Return",
    category: "Startup, Technical Lead",
    image: "/logos/safe-return.png",
    embedUrl: "https://www.canva.com/design/DAHLKoJVwH4/Q1ZLESBRJmb1WhlKk6CxlA/view?embed",
    description: "Safe Return is a startup I joined as technical lead. I built safereturn.tech and collaborated with teammates on the brand. My role spans the full technical stack — from architecting and shipping the website to contributing to the product direction and pitch strategy.",
    highlights: [
      {
        title: "Technical Lead",
        description: "Took ownership of the full technical build, architecting and shipping safereturn.tech from the ground up.",
      },
      {
        title: "Brand Collaboration",
        description: "Worked closely with teammates on branding and positioning, ensuring the visual identity and messaging aligned with the product vision.",
      },
    ],
  },
  {
    slug: "nx1",
    title: "NX1",
    category: "Startup, NIL Education Platform & Podcast",
    image: "/logos/nx1.jpeg",
    embedUrl: "https://embed.podcasts.apple.com/gb/podcast/the-nx1-podcast/id1747252536",
    embedHeight: 450,
    description: "Co-founded NX1 to give student-athletes a clear, practical understanding of their NIL rights and how to monetize them. We built brand awareness through a podcast documenting the behind-the-scenes reality of college sports, used competitive startup programs to validate and fund the platform, and grew our network from zero to a trusted campus presence.",
    highlights: [
      {
        title: "The Idea",
        description: "Student-athletes had new money-making rights but almost no accessible resources for understanding them. We saw a gap between the legal change and the practical knowledge athletes needed to actually act on it.",
      },
      {
        title: "Oregon Innovation Challenge",
        description: "Competed in OIC Season 2 as a finalist, then returned in Season 3 and secured funding as one of just 30 ventures chosen from over 300 student-led startups across Oregon.",
      },
      {
        title: "The Podcast",
        description: "We launched the NX1 Podcast to document the hardships of sport that play out behind the scenes, giving athletes and insiders a place to speak honestly. Every episode was built around surfacing the real perspectives always hidden from the camera.",
      },
      {
        title: "Podcast as Go-to-Market",
        description: "Hosting the show was a deliberate strategy. It gave us a reason to reach out to athletes, coaches, and industry figures, building a real network and credibility on campus well ahead of launch.",
      },
      {
        title: "My Role",
        description: "Led brand strategy, go-to-market planning, content production, and stakeholder outreach. Defined how NX1 would be perceived, who we would serve first, and how we would earn the trust of our audience from zero.",
      },
    ],
  },
];
