// ============================================================
//  Luma-style Mock Events API
//  Mirrors the schema from api.luma.com/discover/get-paginated-events
//  Usage: import { getEvents, getEventById, rsvpEvent, getRSVPs } from './lumaEventsAPI'
// ============================================================

const events = [
  {
    api_id: "evt-001",
    name: "WeaveHacks 4: Multi-Agent AI Hackathon",
    url: "https://luma.com/weavehacks4",
    cover_url:
      "https://scontent.fiba2-1.fna.fbcdn.net/v/t51.82787-15/705298512_18208824325338225_8851723168235258188_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x1707&ctp=p526x296&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8IHCvUruysoQ7kNvwF7RHz6&_nc_oc=Adr_-X_cEQNGp3y43BsnAXjrb4ns6MLaC4-pMPcpZAZLOSaG-X47cC-eOhdUdNKWf9g&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=g7eEOnQLlUu1N4ZNPgiZRA&_nc_ss=7b289&oh=00_AQDYjj4l22NgiMHnGcMpcq2vIZoiSimn8ehGY4-oVJWWTg&oe=6A49C213",
    start_at: "2026-07-01T16:00:00.000Z",
    end_at: "2026-07-01T22:00:00.000Z",
    timezone: "America/Los_Angeles",
    location_type: "offline",
    city: "San Francisco, CA",
    address: "101 Howard St, Satvf4rcde3Z1! CA 94105",
    venue: "Weights & Biases HQ",
    latitude: 37.7897,
    longitude: -122.3972,
    category: "tech",
    tags: ["AI", "Hackathon", "Multi-Agent"],
    description:
      "Build cutting-edge multi-agent AI systems in 24 hours. Prizes, mentors, and free food included.",
    hosts: [
      {
        name: "Weights & Biases",
        avatar_url: "https://avatars.luma.com/wandb.jpg",
      },
    ],
    calendar: { name: "AI Events SF", url: "https://luma.com/ai-sf" },
    ticket_type: "free",
    price: 0,
    capacity: 200,
    rsvp_count: 143,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-002",
    name: "Design Buddies SF Mixer",
    url: "https://luma.com/design-buddies-sf",
    cover_url:
      "https://scontent.fiba2-1.fna.fbcdn.net/v/t51.82787-15/705298512_18208824325338225_8851723168235258188_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x1707&ctp=p526x296&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8IHCvUruysoQ7kNvwF7RHz6&_nc_oc=Adr_-X_cEQNGp3y43BsnAXjrb4ns6MLaC4-pMPcpZAZLOSaG-X47cC-eOhdUdNKWf9g&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=g7eEOnQLlUu1N4ZNPgiZRA&_nc_ss=7b289&oh=00_AQDYjj4l22NgiMHnGcMpcq2vIZoiSimn8ehGY4-oVJWWTg&oe=6A49C213",
    start_at: "2026-07-08T18:00:00.000Z",
    end_at: "2026-07-08T21:00:00.000Z",
    timezone: "America/Los_Angeles",
    location_type: "offline",
    city: "San Francisco, CA",
    address: "274 Brannan St, San Francisco, CA 94107",
    venue: "The Village",
    latitude: 37.7815,
    longitude: -122.3908,
    category: "arts",
    tags: ["Design", "Networking", "Creative"],
    description:
      "Monthly mixer for designers across product, brand, and motion. Meet your next collaborator!",
    hosts: [
      {
        name: "Design Buddies",
        avatar_url: "https://avatars.luma.com/designbuddies.jpg",
      },
    ],
    calendar: { name: "Design Buddies", url: "https://luma.com/designbuddies" },
    ticket_type: "approval required",
    price: 0,
    capacity: 100,
    rsvp_count: 87,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-003",
    name: "Cursor Community Hackathon NYC",
    url: "https://luma.com/cursor-nyc",
    cover_url:
      "https://scontent.fiba2-1.fna.fbcdn.net/v/t51.82787-15/705298512_18208824325338225_8851723168235258188_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x1707&ctp=p526x296&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8IHCvUruysoQ7kNvwF7RHz6&_nc_oc=Adr_-X_cEQNGp3y43BsnAXjrb4ns6MLaC4-pMPcpZAZLOSaG-X47cC-eOhdUdNKWf9g&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=g7eEOnQLlUu1N4ZNPgiZRA&_nc_ss=7b289&oh=00_AQDYjj4l22NgiMHnGcMpcq2vIZoiSimn8ehGY4-oVJWWTg&oe=6A49C213",
    start_at: "2026-07-12T10:00:00.000Z",
    end_at: "2026-07-12T20:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "New York, NY",
    address: "335 Madison Ave, New York, NY 10017",
    venue: "The Wing Midtown",
    latitude: 40.7549,
    longitude: -73.9787,
    category: "tech",
    tags: ["Cursor", "Coding", "Hackathon"],
    description:
      "A full-day hackathon using Cursor AI. Build something amazing, win prizes, meet fellow builders.",
    hosts: [
      { name: "Cursor", avatar_url: "https://avatars.luma.com/cursor.jpg" },
    ],
    calendar: { name: "Cursor Community", url: "https://luma.com/cursor" },
    ticket_type: "free",
    price: 0,
    capacity: 150,
    rsvp_count: 112,
    require_approval: true,
    status: "upcoming",
  },
  {
    api_id: "evt-004",
    name: "Tech Happy Hour · Lagos",
    url: "https://luma.com/tech-happy-hour-lagos",
    cover_url:
      "https://scontent.fiba2-1.fna.fbcdn.net/v/t51.82787-15/705298512_18208824325338225_8851723168235258188_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x1707&ctp=p526x296&_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8IHCvUruysoQ7kNvwF7RHz6&_nc_oc=Adr_-X_cEQNGp3y43BsnAXjrb4ns6MLaC4-pMPcpZAZLOSaG-X47cC-eOhdUdNKWf9g&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=g7eEOnQLlUu1N4ZNPgiZRA&_nc_ss=7b289&oh=00_AQDYjj4l22NgiMHnGcMpcq2vIZoiSimn8ehGY4-oVJWWTg&oe=6A49C213",
    start_at: "2026-07-10T17:00:00.000Z",
    end_at: "2026-07-10T21:00:00.000Z",
    timezone: "Africa/Lagos",
    location_type: "offline",
    city: "Lagos, Nigeria",
    address: "1 Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    venue: "CcHUB",
    latitude: 6.4281,
    longitude: 3.4219,
    category: "tech",
    tags: ["Networking", "Tech", "Happy Hour"],
    description:
      "Connect with the Lagos tech community over drinks. Startups, engineers, and investors welcome.",
    hosts: [
      {
        name: "TechPoint Africa",
        avatar_url: "https://avatars.luma.com/techpoint.jpg",
      },
    ],
    calendar: { name: "Lagos Tech Events", url: "https://luma.com/lagos-tech" },
    ticket_type: "approval required",
    price: 0,
    capacity: 80,
    rsvp_count: 65,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-005",
    name: "Morning Run Club · Central Park",
    url: "https://luma.com/morning-run-nyc",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/runclub.jpg",
    start_at: "2026-07-06T06:30:00.000Z",
    end_at: "2026-07-06T08:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "New York, NY",
    address: "Central Park, New York, NY 10024",
    venue: "Bethesda Fountain, Central Park",
    latitude: 40.7736,
    longitude: -73.9566,
    category: "fitness",
    tags: ["Running", "Fitness", "Outdoors"],
    description:
      "Weekly 5K morning run through Central Park. All paces welcome. Coffee after!",
    hosts: [
      {
        name: "NYC Run Club",
        avatar_url: "https://avatars.luma.com/nycrun.jpg",
      },
    ],
    calendar: { name: "NYC Run Club", url: "https://luma.com/nyc-run" },
    ticket_type: "free",
    price: 0,
    capacity: 50,
    rsvp_count: 34,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-006",
    name: "Crypto & Web3 Summit London",
    url: "https://luma.com/crypto-summit-london",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/web3london.jpg",
    start_at: "2026-07-15T09:00:00.000Z",
    end_at: "2026-07-15T18:00:00.000Z",
    timezone: "Europe/London",
    location_type: "offline",
    city: "London, UK",
    address: "1 Canada Square, Canary Wharf, London E14 5AB",
    venue: "Level39",
    latitude: 51.5054,
    longitude: -0.0235,
    category: "crypto",
    tags: ["Web3", "Crypto", "DeFi", "Summit"],
    description:
      "A full-day summit on the future of decentralised finance, NFTs, and blockchain infrastructure.",
    hosts: [
      {
        name: "Web3 London",
        avatar_url: "https://avatars.luma.com/web3london.jpg",
      },
    ],
    calendar: { name: "Web3 London", url: "https://luma.com/web3-london" },
    ticket_type: "paid",
    price: 25,
    currency: "GBP",
    capacity: 300,
    rsvp_count: 210,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-007",
    name: "Wellness Wednesday: Sound Bath & Breathwork",
    url: "https://luma.com/sound-bath-sf",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/soundbath.jpg",
    start_at: "2026-07-09T19:00:00.000Z",
    end_at: "2026-07-09T20:30:00.000Z",
    timezone: "America/Los_Angeles",
    location_type: "offline",
    city: "San Francisco, CA",
    address: "555 Post St, San Francisco, CA 94102",
    venue: "The Wellness Collective",
    latitude: 37.7876,
    longitude: -122.4108,
    category: "wellness",
    tags: ["Wellness", "Meditation", "Sound Bath"],
    description:
      "Reset your nervous system with a guided sound bath and breathwork session. Limited spots.",
    hosts: [
      {
        name: "SF Wellness Club",
        avatar_url: "https://avatars.luma.com/sfwellness.jpg",
      },
    ],
    calendar: { name: "SF Wellness Club", url: "https://luma.com/sf-wellness" },
    ticket_type: "paid",
    price: 20,
    currency: "USD",
    capacity: 30,
    rsvp_count: 28,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-008",
    name: "Founders Dinner · Austin",
    url: "https://luma.com/founders-dinner-austin",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/foundersdinner.jpg",
    start_at: "2026-07-11T19:30:00.000Z",
    end_at: "2026-07-11T22:00:00.000Z",
    timezone: "America/Chicago",
    location_type: "offline",
    city: "Austin, TX",
    address: "600 W 6th St, Austin, TX 78701",
    venue: "Fareground",
    latitude: 30.2676,
    longitude: -97.7502,
    category: "tech",
    tags: ["Founders", "Startups", "Networking"],
    description:
      "An intimate dinner for startup founders. Share learnings, challenges, and make lasting connections.",
    hosts: [
      {
        name: "Austin Founders Club",
        avatar_url: "https://avatars.luma.com/austinfounders.jpg",
      },
    ],
    calendar: {
      name: "Austin Founders",
      url: "https://luma.com/austin-founders",
    },
    ticket_type: "free",
    price: 0,
    capacity: 20,
    rsvp_count: 18,
    require_approval: true,
    status: "upcoming",
  },
  {
    api_id: "evt-009",
    name: "AI Art & Creativity Workshop",
    url: "https://luma.com/ai-art-workshop",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/aiart.jpg",
    start_at: "2026-07-13T14:00:00.000Z",
    end_at: "2026-07-13T17:00:00.000Z",
    timezone: "America/Los_Angeles",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom",
    meeting_url: "https://zoom.us/j/9999999",
    latitude: null,
    longitude: null,
    category: "arts",
    tags: ["AI", "Art", "Creativity", "Online"],
    description:
      "Learn how to use Midjourney, DALL·E, and Stable Diffusion to create stunning art. Beginner friendly.",
    hosts: [
      {
        name: "Creative AI Studio",
        avatar_url: "https://avatars.luma.com/creativeai.jpg",
      },
    ],
    calendar: { name: "Creative AI", url: "https://luma.com/creative-ai" },
    ticket_type: "paid",
    price: 15,
    currency: "USD",
    capacity: 500,
    rsvp_count: 322,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-010",
    name: "Food & Wine Tasting Night · Chicago",
    url: "https://luma.com/food-wine-chicago",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/winetasting.jpg",
    start_at: "2026-07-17T18:30:00.000Z",
    end_at: "2026-07-17T21:30:00.000Z",
    timezone: "America/Chicago",
    location_type: "offline",
    city: "Chicago, IL",
    address: "66 W Kinzie St, Chicago, IL 60654",
    venue: "Gilt Bar",
    latitude: 41.8882,
    longitude: -87.6289,
    category: "food",
    tags: ["Food", "Wine", "Social"],
    description:
      "Five curated wine pours paired with artisanal bites. Meet new friends in a relaxed, social setting.",
    hosts: [
      {
        name: "Chicago Social Club",
        avatar_url: "https://avatars.luma.com/chicagosocial.jpg",
      },
    ],
    calendar: {
      name: "Chicago Social",
      url: "https://luma.com/chicago-social",
    },
    ticket_type: "paid",
    price: 40,
    currency: "USD",
    capacity: 60,
    rsvp_count: 47,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-011",
    name: "React & Next.js Meetup · Lagos",
    url: "https://luma.com/react-meetup-lagos",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/reactlagos.jpg",
    start_at: "2026-07-18T15:00:00.000Z",
    end_at: "2026-07-18T18:00:00.000Z",
    timezone: "Africa/Lagos",
    location_type: "offline",
    city: "Lagos, Nigeria",
    address: "14 Bayo Kuku Rd, Ikoyi, Lagos",
    venue: "Ventures Platform Lagos",
    latitude: 6.4549,
    longitude: 3.4372,
    category: "tech",
    tags: ["React", "Next.js", "Frontend", "Meetup"],
    description:
      "Talks, demos, and open discussion on the latest in React and Next.js. All skill levels welcome.",
    hosts: [
      {
        name: "React Lagos",
        avatar_url: "https://avatars.luma.com/reactlagos.jpg",
      },
    ],
    calendar: { name: "React Lagos", url: "https://luma.com/react-lagos" },
    ticket_type: "free",
    price: 0,
    capacity: 100,
    rsvp_count: 76,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-012",
    name: "Climate Tech Breakfast · Berlin",
    url: "https://luma.com/climate-tech-berlin",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/climatetech.jpg",
    start_at: "2026-07-20T08:00:00.000Z",
    end_at: "2026-07-20T10:30:00.000Z",
    timezone: "Europe/Berlin",
    location_type: "offline",
    city: "Berlin, Germany",
    address: "Rosenthaler Str. 40, 10178 Berlin",
    venue: "Factory Berlin",
    latitude: 52.5255,
    longitude: 13.4014,
    category: "climate",
    tags: ["Climate", "Sustainability", "Startups"],
    description:
      "Morning meetup for climate tech founders, investors and researchers. Croissants on us.",
    hosts: [
      {
        name: "Climate Founders Berlin",
        avatar_url: "https://avatars.luma.com/climatefounders.jpg",
      },
    ],
    calendar: {
      name: "Climate Founders",
      url: "https://luma.com/climate-founders",
    },
    ticket_type: "free",
    price: 0,
    capacity: 50,
    rsvp_count: 43,
    require_approval: true,
    status: "upcoming",
  },
  {
    api_id: "evt-013",
    name: "Women in Tech Brunch · NYC",
    url: "https://luma.com/women-in-tech-nyc",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/womenintech.jpg",
    start_at: "2026-07-19T11:00:00.000Z",
    end_at: "2026-07-19T14:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "New York, NY",
    address: "150 E 58th St, New York, NY 10155",
    venue: "The Wing Upper East Side",
    latitude: 40.7615,
    longitude: -73.9682,
    category: "tech",
    tags: ["Women in Tech", "Brunch", "Networking"],
    description:
      "Celebrate and connect with women in tech over a beautiful Sunday brunch. Guest speakers included.",
    hosts: [
      {
        name: "Tech Women NYC",
        avatar_url: "https://avatars.luma.com/techwomennyc.jpg",
      },
    ],
    calendar: {
      name: "Tech Women NYC",
      url: "https://luma.com/tech-women-nyc",
    },
    ticket_type: "paid",
    price: 30,
    currency: "USD",
    capacity: 75,
    rsvp_count: 61,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-014",
    name: "Indie Hacker Meetup · Remote",
    url: "https://luma.com/indie-hackers-online",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/indiehackers.jpg",
    start_at: "2026-07-22T18:00:00.000Z",
    end_at: "2026-07-22T19:30:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom",
    meeting_url: "https://zoom.us/j/12345678",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["Indie Hackers", "Bootstrapped", "Online"],
    description:
      "Monthly virtual hangout for indie makers and bootstrapped founders. Share wins, ask questions.",
    hosts: [
      {
        name: "Indie Hackers",
        avatar_url: "https://avatars.luma.com/indiehackers.jpg",
      },
    ],
    calendar: {
      name: "Indie Hackers Global",
      url: "https://luma.com/indie-hackers",
    },
    ticket_type: "approval required",
    price: 0,
    capacity: 1000,
    rsvp_count: 487,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-015",
    name: "Yoga & Meditation Retreat · Bali",
    url: "https://luma.com/yoga-bali",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/yogabali.jpg",
    start_at: "2026-08-01T07:00:00.000Z",
    end_at: "2026-08-07T12:00:00.000Z",
    timezone: "Asia/Makassar",
    location_type: "offline",
    city: "Ubud, Bali",
    address: "Jl. Kajeng No.7, Ubud, Gianyar, Bali 80571",
    venue: "Fivelements Retreat Bali",
    latitude: -8.5069,
    longitude: 115.2625,
    category: "wellness",
    tags: ["Yoga", "Retreat", "Meditation", "Bali"],
    description:
      "A week-long yoga and meditation retreat in the heart of Ubud. Daily classes, plant-based meals, and healing rituals.",
    hosts: [
      {
        name: "Global Wellness Retreats",
        avatar_url: "https://avatars.luma.com/globalwellness.jpg",
      },
    ],
    calendar: {
      name: "Global Wellness",
      url: "https://luma.com/global-wellness",
    },
    ticket_type: "paid",
    price: 1200,
    currency: "USD",
    capacity: 15,
    rsvp_count: 9,
    require_approval: true,
    status: "upcoming",
  },
  {
    api_id: "evt-016",
    name: "NFT Art Drop & Gallery Night · Miami",
    url: "https://luma.com/nft-gallery-miami",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/nftgallery.jpg",
    start_at: "2026-07-24T19:00:00.000Z",
    end_at: "2026-07-24T23:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "Miami, FL",
    address: "3841 NE 2nd Ave, Miami, FL 33137",
    venue: "Wynwood Walls",
    latitude: 25.8007,
    longitude: -80.199,
    category: "crypto",
    tags: ["NFT", "Art", "Web3", "Gallery"],
    description:
      "Live NFT art drops from top digital artists. Meet collectors, creators, and crypto enthusiasts.",
    hosts: [
      {
        name: "Miami Web3 Collective",
        avatar_url: "https://avatars.luma.com/miamiweb3.jpg",
      },
    ],
    calendar: { name: "Miami Web3", url: "https://luma.com/miami-web3" },
    ticket_type: "free",
    price: 0,
    capacity: 200,
    rsvp_count: 178,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-017",
    name: "Open Source Contribution Day",
    url: "https://luma.com/open-source-day",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/opensource.jpg",
    start_at: "2026-07-25T10:00:00.000Z",
    end_at: "2026-07-25T17:00:00.000Z",
    timezone: "America/Los_Angeles",
    location_type: "hybrid",
    city: "San Francisco, CA",
    address: "548 Market St, San Francisco, CA 94104",
    venue: "GitHub HQ",
    meeting_url: "https://zoom.us/j/98765432",
    latitude: 37.79,
    longitude: -122.3998,
    category: "tech",
    tags: ["Open Source", "GitHub", "Coding", "Community"],
    description:
      "Spend the day contributing to popular open source projects with guidance from maintainers. Lunch provided.",
    hosts: [
      { name: "GitHub", avatar_url: "https://avatars.luma.com/github.jpg" },
    ],
    calendar: { name: "GitHub Events", url: "https://luma.com/github" },
    ticket_type: "free",
    price: 0,
    capacity: 120,
    rsvp_count: 99,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-018",
    name: "Product Management Summit · Toronto",
    url: "https://luma.com/pm-summit-toronto",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/pmsummit.jpg",
    start_at: "2026-07-26T09:00:00.000Z",
    end_at: "2026-07-26T17:00:00.000Z",
    timezone: "America/Toronto",
    location_type: "offline",
    city: "Toronto, ON",
    address: "100 King St W, Toronto, ON M5X 1E1",
    venue: "MaRS Discovery District",
    latitude: 43.6532,
    longitude: -79.3832,
    category: "tech",
    tags: ["Product Management", "PM", "Career"],
    description:
      "Full-day conference for product managers at all levels. Workshops, panels, and networking.",
    hosts: [
      {
        name: "PM Society Toronto",
        avatar_url: "https://avatars.luma.com/pmtoronto.jpg",
      },
    ],
    calendar: { name: "PM Society", url: "https://luma.com/pm-society" },
    ticket_type: "paid",
    price: 50,
    currency: "CAD",
    capacity: 200,
    rsvp_count: 162,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-019",
    name: "Book Reading Party · NYC",
    url: "https://luma.com/book-reading-nyc",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/bookreading.jpg",
    start_at: "2026-07-27T15:00:00.000Z",
    end_at: "2026-07-27T17:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "New York, NY",
    address: "476 5th Ave, New York, NY 10018",
    venue: "New York Public Library",
    latitude: 40.7532,
    longitude: -73.9822,
    category: "arts",
    tags: ["Books", "Reading", "Social", "Culture"],
    description:
      "Not a book club — a reading party! Read with friends to curated playlists and live ambient music.",
    hosts: [
      {
        name: "Reese's Book Club x Apple Books",
        avatar_url: "https://avatars.luma.com/reesesbooks.jpg",
      },
    ],
    calendar: { name: "Book Party NYC", url: "https://luma.com/book-party" },
    ticket_type: "free",
    price: 0,
    capacity: 80,
    rsvp_count: 72,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-020",
    name: "Data & AI Summit · Washington D.C.",
    url: "https://luma.com/data-ai-dc",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/dataadc.jpg",
    start_at: "2026-07-28T09:00:00.000Z",
    end_at: "2026-07-28T18:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "Washington, D.C.",
    address: "900 7th St NW, Washington, DC 20001",
    venue: "Capital One Arena Conference Center",
    latitude: 38.8983,
    longitude: -77.0209,
    category: "tech",
    tags: ["Data", "AI", "Machine Learning", "Summit"],
    description:
      "Bringing together data scientists, AI researchers, and business leaders for a day of talks and demos.",
    hosts: [
      {
        name: "Data Community DC",
        avatar_url: "https://avatars.luma.com/datacommunitydc.jpg",
      },
    ],
    calendar: { name: "Data Community DC", url: "https://luma.com/dc2" },
    ticket_type: "free",
    price: 0,
    capacity: 350,
    rsvp_count: 289,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-021",
    name: "Summer BBQ & Networking · LA",
    url: "https://luma.com/summer-bbq-la",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/summerbarbq.jpg",
    start_at: "2026-07-04T16:00:00.000Z",
    end_at: "2026-07-04T21:00:00.000Z",
    timezone: "America/Los_Angeles",
    location_type: "offline",
    city: "Los Angeles, CA",
    address: "Griffith Park, Los Angeles, CA 90027",
    venue: "Griffith Park Picnic Area 12",
    latitude: 34.1341,
    longitude: -118.2943,
    category: "social",
    tags: ["BBQ", "Networking", "Summer", "Outdoors"],
    description:
      "July 4th BBQ and outdoor networking. Great food, good vibes, fire playlist. Bring your own drinks!",
    hosts: [
      {
        name: "LA Social Club",
        avatar_url: "https://avatars.luma.com/lasocial.jpg",
      },
    ],
    calendar: { name: "LA Social", url: "https://luma.com/la-social" },
    ticket_type: "free",
    price: 0,
    capacity: 150,
    rsvp_count: 134,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-022",
    name: "Intro to Python for Beginners",
    url: "https://luma.com/python-beginners-online",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/python.jpg",
    start_at: "2026-07-29T13:00:00.000Z",
    end_at: "2026-07-29T15:30:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom",
    meeting_url: "https://zoom.us/j/55555555",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["Python", "Beginner", "Coding", "Workshop"],
    description:
      "Your first step into programming. Learn Python basics with hands-on exercises. No experience needed.",
    hosts: [
      {
        name: "Code for Africa",
        avatar_url: "https://avatars.luma.com/codeforafrica.jpg",
      },
    ],
    calendar: { name: "Learn to Code", url: "https://luma.com/learn-code" },
    ticket_type: "free",
    price: 0,
    capacity: 500,
    rsvp_count: 411,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-023",
    name: "Startup Pitch Night · Nairobi",
    url: "https://luma.com/pitch-night-nairobi",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/pitchnairobi.jpg",
    start_at: "2026-07-30T17:00:00.000Z",
    end_at: "2026-07-30T20:00:00.000Z",
    timezone: "Africa/Nairobi",
    location_type: "offline",
    city: "Nairobi, Kenya",
    address: "Ngong Rd, Nairobi, Kenya",
    venue: "iHub Nairobi",
    latitude: -1.2921,
    longitude: 36.8219,
    category: "tech",
    tags: ["Startups", "Pitch", "Investors", "Africa"],
    description:
      "5 startups pitch to a panel of investors and community. Cash prizes for the top 2. Open audience.",
    hosts: [{ name: "iHub", avatar_url: "https://avatars.luma.com/ihub.jpg" }],
    calendar: { name: "iHub Events", url: "https://luma.com/ihub" },
    ticket_type: "free",
    price: 0,
    capacity: 100,
    rsvp_count: 88,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-024",
    name: "Evening Rooftop Drinks · London",
    url: "https://luma.com/rooftop-london",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/rooftoplondon.jpg",
    start_at: "2026-07-31T18:00:00.000Z",
    end_at: "2026-07-31T22:00:00.000Z",
    timezone: "Europe/London",
    location_type: "offline",
    city: "London, UK",
    address: "10 Bressenden Pl, London SW1E 5DH",
    venue: "Skylight Rooftop Bar",
    latitude: 51.4968,
    longitude: -0.1418,
    category: "social",
    tags: ["Drinks", "Rooftop", "Social", "Networking"],
    description:
      "Wind down the week with cocktails and good conversation on a London rooftop. All are welcome!",
    hosts: [
      {
        name: "London Social Network",
        avatar_url: "https://avatars.luma.com/londonsocial.jpg",
      },
    ],
    calendar: { name: "London Social", url: "https://luma.com/london-social" },
    ticket_type: "free",
    price: 0,
    capacity: 120,
    rsvp_count: 97,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-025",
    name: "Figma Design Workshop · Remote",
    url: "https://luma.com/figma-workshop",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/figmaworkshop.jpg",
    start_at: "2026-08-02T14:00:00.000Z",
    end_at: "2026-08-02T16:00:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom",
    meeting_url: "https://zoom.us/j/44444444",
    latitude: null,
    longitude: null,
    category: "arts",
    tags: ["Figma", "Design", "UI/UX", "Workshop"],
    description:
      "Learn Figma from scratch: frames, components, auto-layout, and prototyping. Live demo + Q&A.",
    hosts: [
      {
        name: "Design School Online",
        avatar_url: "https://avatars.luma.com/designschool.jpg",
      },
    ],
    calendar: { name: "Design School", url: "https://luma.com/design-school" },
    ticket_type: "paid",
    price: 10,
    currency: "USD",
    capacity: 300,
    rsvp_count: 214,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-026",
    name: "Basketball 3v3 Tournament · Atlanta",
    url: "https://luma.com/basketball-atlanta",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/basketball.jpg",
    start_at: "2026-08-03T09:00:00.000Z",
    end_at: "2026-08-03T15:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "Atlanta, GA",
    address: "3315 Peachtree Rd NE, Atlanta, GA 30326",
    venue: "Lenox Park Basketball Courts",
    latitude: 33.849,
    longitude: -84.362,
    category: "fitness",
    tags: ["Basketball", "Sports", "Tournament"],
    description:
      "Community 3v3 basketball tournament. Register your team of 3. Free entry, prizes for winners.",
    hosts: [
      {
        name: "ATL Ballers",
        avatar_url: "https://avatars.luma.com/atlballers.jpg",
      },
    ],
    calendar: { name: "ATL Sports", url: "https://luma.com/atl-sports" },
    ticket_type: "free",
    price: 0,
    capacity: 60,
    rsvp_count: 48,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-027",
    name: "Rave & Art Installation Night · Amsterdam",
    url: "https://luma.com/rave-amsterdam",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/raveamsterdam.jpg",
    start_at: "2026-08-07T22:00:00.000Z",
    end_at: "2026-08-08T05:00:00.000Z",
    timezone: "Europe/Amsterdam",
    location_type: "offline",
    city: "Amsterdam, Netherlands",
    address: "Zamenhofstraat 10, 1022 AG Amsterdam",
    venue: "Shelter Amsterdam",
    latitude: 52.3987,
    longitude: 4.9024,
    category: "arts",
    tags: ["Rave", "Nightlife", "Art", "Music"],
    description:
      "Techno music meets immersive art installations. Doors at 22:00. Dress code: creative black.",
    hosts: [
      {
        name: "Shelter AMS",
        avatar_url: "https://avatars.luma.com/shelterams.jpg",
      },
    ],
    calendar: {
      name: "Amsterdam Nightlife",
      url: "https://luma.com/ams-nightlife",
    },
    ticket_type: "paid",
    price: 15,
    currency: "EUR",
    capacity: 400,
    rsvp_count: 312,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-028",
    name: "Abuja Tech Fest 2026",
    url: "https://luma.com/abuja-tech-fest",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/abujatech.jpg",
    start_at: "2026-08-08T09:00:00.000Z",
    end_at: "2026-08-08T18:00:00.000Z",
    timezone: "Africa/Lagos",
    location_type: "offline",
    city: "Abuja, Nigeria",
    address: "Plot 770 Yakubu Gowon Crescent, Asokoro, Abuja",
    venue: "Transcorp Hilton Abuja",
    latitude: 9.0765,
    longitude: 7.3986,
    category: "tech",
    tags: ["Tech", "Festival", "Nigeria", "Innovation"],
    description:
      "Nigeria's premier annual technology festival. Panels, demos, startup exhibitions, and live music.",
    hosts: [
      {
        name: "Abuja Tech Hub",
        avatar_url: "https://avatars.luma.com/abujatechhub.jpg",
      },
    ],
    calendar: {
      name: "Abuja Tech Hub",
      url: "https://luma.com/abuja-tech-hub",
    },
    ticket_type: "paid",
    price: 5000,
    currency: "NGN",
    capacity: 500,
    rsvp_count: 423,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-029",
    name: "Journaling & Self-Discovery Workshop",
    url: "https://luma.com/journaling-workshop",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/journaling.jpg",
    start_at: "2026-08-09T10:00:00.000Z",
    end_at: "2026-08-09T12:30:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom",
    meeting_url: "https://zoom.us/j/33333333",
    latitude: null,
    longitude: null,
    category: "wellness",
    tags: ["Journaling", "Wellness", "Self-Care"],
    description:
      "A guided journaling session to explore identity, goals, and emotional wellbeing. Materials provided.",
    hosts: [
      {
        name: "Inner Work Studio",
        avatar_url: "https://avatars.luma.com/innerwork.jpg",
      },
    ],
    calendar: { name: "Inner Work", url: "https://luma.com/inner-work" },
    ticket_type: "free",
    price: 0,
    capacity: 200,
    rsvp_count: 156,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-030",
    name: "DevOps & Cloud Workshop · Singapore",
    url: "https://luma.com/devops-singapore",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/devops.jpg",
    start_at: "2026-08-10T09:00:00.000Z",
    end_at: "2026-08-10T17:00:00.000Z",
    timezone: "Asia/Singapore",
    location_type: "offline",
    city: "Singapore",
    address: "One North, 138602 Singapore",
    venue: "AWS Singapore Office",
    latitude: 1.2992,
    longitude: 103.7877,
    category: "tech",
    tags: ["DevOps", "Cloud", "AWS", "Workshop"],
    description:
      "Hands-on workshop covering CI/CD, Docker, Kubernetes, and AWS deployments. Laptop required.",
    hosts: [
      {
        name: "AWS User Group SG",
        avatar_url: "https://avatars.luma.com/awssg.jpg",
      },
    ],
    calendar: {
      name: "AWS User Group Singapore",
      url: "https://luma.com/aws-sg",
    },
    ticket_type: "free",
    price: 0,
    capacity: 80,
    rsvp_count: 73,
    require_approval: true,
    status: "upcoming",
  },
  {
    api_id: "evt-031",
    name: "Fashion & Style Swap · Paris",
    url: "https://luma.com/fashion-swap-paris",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/fashionparis.jpg",
    start_at: "2026-08-12T14:00:00.000Z",
    end_at: "2026-08-12T18:00:00.000Z",
    timezone: "Europe/Paris",
    location_type: "offline",
    city: "Paris, France",
    address: "2 Rue de Rivoli, 75004 Paris",
    venue: "Centre Pompidou",
    latitude: 48.8606,
    longitude: 2.3522,
    category: "arts",
    tags: ["Fashion", "Sustainability", "Swap", "Style"],
    description:
      "Bring 3 items, take 3 items. A sustainable fashion swap event in the heart of Paris.",
    hosts: [
      {
        name: "Paris Style Collective",
        avatar_url: "https://avatars.luma.com/parisstyle.jpg",
      },
    ],
    calendar: { name: "Paris Style", url: "https://luma.com/paris-style" },
    ticket_type: "free",
    price: 0,
    capacity: 100,
    rsvp_count: 82,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-032",
    name: "Solana Builders Meetup · Dubai",
    url: "https://luma.com/solana-dubai",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/solanadubai.jpg",
    start_at: "2026-08-14T17:00:00.000Z",
    end_at: "2026-08-14T21:00:00.000Z",
    timezone: "Asia/Dubai",
    location_type: "offline",
    city: "Dubai, UAE",
    address: "DIFC, Dubai, UAE",
    venue: "DIFC Innovation Hub",
    latitude: 25.2048,
    longitude: 55.2708,
    category: "crypto",
    tags: ["Solana", "Web3", "Builders", "DeFi"],
    description:
      "Meetup for Solana developers and builders in Dubai. Lightning talks, hacking, and networking.",
    hosts: [
      {
        name: "Solana Foundation",
        avatar_url: "https://avatars.luma.com/solana.jpg",
      },
    ],
    calendar: { name: "Solana Foundation", url: "https://luma.com/solana" },
    ticket_type: "free",
    price: 0,
    capacity: 150,
    rsvp_count: 129,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-033",
    name: "Community Gardening Day · Brooklyn",
    url: "https://luma.com/garden-brooklyn",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/gardenbrooklyn.jpg",
    start_at: "2026-08-15T09:00:00.000Z",
    end_at: "2026-08-15T13:00:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "Brooklyn, NY",
    address: "455 Clinton Ave, Brooklyn, NY 11238",
    venue: "Brooklyn Grange Rooftop Farm",
    latitude: 40.6843,
    longitude: -73.9686,
    category: "climate",
    tags: ["Gardening", "Community", "Sustainability"],
    description:
      "Help tend the rooftop garden, learn composting, and take home fresh produce. Kid-friendly.",
    hosts: [
      {
        name: "Brooklyn Grange",
        avatar_url: "https://avatars.luma.com/brooklyngrange.jpg",
      },
    ],
    calendar: {
      name: "Brooklyn Green",
      url: "https://luma.com/brooklyn-green",
    },
    ticket_type: "approval required",
    price: 0,
    capacity: 40,
    rsvp_count: 36,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-034",
    name: "Late Night Comedy Show · NYC",
    url: "https://luma.com/comedy-nyc",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/comedynyc.jpg",
    start_at: "2026-08-16T20:00:00.000Z",
    end_at: "2026-08-16T22:30:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "New York, NY",
    address: "226 W 46th St, New York, NY 10036",
    venue: "Comedy Cellar",
    latitude: 40.7589,
    longitude: -73.9851,
    category: "arts",
    tags: ["Comedy", "Nightlife", "Entertainment"],
    description:
      "An evening of stand-up comedy with 5 up-and-coming comedians. Two-drink minimum.",
    hosts: [
      {
        name: "Comedy Cellar NYC",
        avatar_url: "https://avatars.luma.com/comedycellar.jpg",
      },
    ],
    calendar: { name: "NYC Comedy", url: "https://luma.com/nyc-comedy" },
    ticket_type: "paid",
    price: 20,
    currency: "USD",
    capacity: 180,
    rsvp_count: 165,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-035",
    name: "UX Research Speed Dating · Remote",
    url: "https://luma.com/ux-research-online",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/uxresearch.jpg",
    start_at: "2026-08-18T16:00:00.000Z",
    end_at: "2026-08-18T18:00:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom Breakout Rooms",
    meeting_url: "https://zoom.us/j/22222222",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["UX", "Research", "Design", "Networking"],
    description:
      "5-minute 1:1 speed networking for UX researchers and product designers. Make connections fast.",
    hosts: [
      {
        name: "UX Research Guild",
        avatar_url: "https://avatars.luma.com/uxguild.jpg",
      },
    ],
    calendar: { name: "UX Research Guild", url: "https://luma.com/ux-guild" },
    ticket_type: "free",
    price: 0,
    capacity: 100,
    rsvp_count: 78,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-036",
    name: "Afrobeats Dance Class · London",
    url: "https://luma.com/afrobeats-london",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/afrobeats.jpg",
    start_at: "2026-08-19T19:00:00.000Z",
    end_at: "2026-08-19T21:00:00.000Z",
    timezone: "Europe/London",
    location_type: "offline",
    city: "London, UK",
    address: "Brixton, London SW2, UK",
    venue: "Brixton Recreation Centre",
    latitude: 51.4613,
    longitude: -0.1156,
    category: "fitness",
    tags: ["Afrobeats", "Dance", "Fitness", "Culture"],
    description:
      "Learn Afrobeats and Amapiano moves in this energetic weekly dance class. No experience needed.",
    hosts: [
      {
        name: "London Afrobeats Academy",
        avatar_url: "https://avatars.luma.com/afrobeats.jpg",
      },
    ],
    calendar: {
      name: "Afrobeats London",
      url: "https://luma.com/afrobeats-london",
    },
    ticket_type: "paid",
    price: 12,
    currency: "GBP",
    capacity: 50,
    rsvp_count: 44,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-037",
    name: "Venture Capital 101 for Founders",
    url: "https://luma.com/vc-101-online",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/vc101.jpg",
    start_at: "2026-08-20T17:00:00.000Z",
    end_at: "2026-08-20T18:30:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom",
    meeting_url: "https://zoom.us/j/11111111",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["VC", "Startups", "Fundraising", "Founders"],
    description:
      "A no-BS breakdown of how VC works: term sheets, valuations, dilution, and how to pitch.",
    hosts: [
      {
        name: "First Check VC",
        avatar_url: "https://avatars.luma.com/firstcheck.jpg",
      },
    ],
    calendar: { name: "First Check", url: "https://luma.com/first-check" },
    ticket_type: "free",
    price: 0,
    capacity: 500,
    rsvp_count: 388,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-038",
    name: "Sunday Brunch Social · Cape Town",
    url: "https://luma.com/brunch-capetown",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/brunchct.jpg",
    start_at: "2026-08-23T10:30:00.000Z",
    end_at: "2026-08-23T13:30:00.000Z",
    timezone: "Africa/Johannesburg",
    location_type: "offline",
    city: "Cape Town, South Africa",
    address: "V&A Waterfront, Cape Town, 8001",
    venue: "The Pot Luck Club",
    latitude: -33.9049,
    longitude: 18.4198,
    category: "food",
    tags: ["Brunch", "Social", "Cape Town"],
    description:
      "Weekly social brunch with a view of Table Mountain. Bottomless mimosas and good conversation.",
    hosts: [
      {
        name: "Cape Town Social",
        avatar_url: "https://avatars.luma.com/ctownasocial.jpg",
      },
    ],
    calendar: { name: "Cape Town Social", url: "https://luma.com/ct-social" },
    ticket_type: "paid",
    price: 350,
    currency: "ZAR",
    capacity: 40,
    rsvp_count: 33,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-039",
    name: "ML Paper Reading Club · Remote",
    url: "https://luma.com/ml-paper-club",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/mlpapers.jpg",
    start_at: "2026-08-24T18:00:00.000Z",
    end_at: "2026-08-24T19:30:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Google Meet",
    meeting_url: "https://meet.google.com/abc-defg-hij",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["ML", "Research", "Papers", "AI"],
    description:
      "We pick one ML paper per week and discuss it live. This week: 'Attention Is All You Need' revisited.",
    hosts: [
      {
        name: "Papers With Code Community",
        avatar_url: "https://avatars.luma.com/paperswithcode.jpg",
      },
    ],
    calendar: { name: "ML Paper Club", url: "https://luma.com/ml-papers" },
    ticket_type: "free",
    price: 0,
    capacity: 200,
    rsvp_count: 143,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-040",
    name: "Startup Weekend · Accra",
    url: "https://luma.com/startup-weekend-accra",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/startupaccra.jpg",
    start_at: "2026-08-28T17:00:00.000Z",
    end_at: "2026-08-30T18:00:00.000Z",
    timezone: "Africa/Accra",
    location_type: "offline",
    city: "Accra, Ghana",
    address: "14 Aviation Rd, Airport Residential Area, Accra",
    venue: "MEST Africa",
    latitude: 5.6037,
    longitude: -0.187,
    category: "tech",
    tags: ["Startups", "Weekend", "Ghana", "Entrepreneurship"],
    description:
      "54 hours to go from idea to demo. Teams form Friday night, pitch Sunday evening. Prizes up for grabs.",
    hosts: [
      {
        name: "MEST Africa",
        avatar_url: "https://avatars.luma.com/mestafrica.jpg",
      },
    ],
    calendar: { name: "MEST Africa", url: "https://luma.com/mest-africa" },
    ticket_type: "free",
    price: 0,
    capacity: 100,
    rsvp_count: 91,
    require_approval: true,
    status: "upcoming",
  },
  {
    api_id: "evt-041",
    name: "Night Photography Walk · Tokyo",
    url: "https://luma.com/night-photo-tokyo",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/phototokyo.jpg",
    start_at: "2026-08-29T20:00:00.000Z",
    end_at: "2026-08-29T23:00:00.000Z",
    timezone: "Asia/Tokyo",
    location_type: "offline",
    city: "Tokyo, Japan",
    address: "Shinjuku, Tokyo, Japan",
    venue: "Shinjuku Golden Gai",
    latitude: 35.6938,
    longitude: 139.7036,
    category: "arts",
    tags: ["Photography", "Tokyo", "Nightlife", "Creative"],
    description:
      "Guided night photography walk through Golden Gai and Kabukicho. Any camera welcome.",
    hosts: [
      {
        name: "Tokyo Creatives",
        avatar_url: "https://avatars.luma.com/tokyocreatives.jpg",
      },
    ],
    calendar: {
      name: "Tokyo Creatives",
      url: "https://luma.com/tokyo-creatives",
    },
    ticket_type: "free",
    price: 0,
    capacity: 25,
    rsvp_count: 22,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-042",
    name: "LLM Fine-Tuning Masterclass",
    url: "https://luma.com/llm-finetuning",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/llmfinetune.jpg",
    start_at: "2026-09-01T15:00:00.000Z",
    end_at: "2026-09-01T18:00:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom",
    meeting_url: "https://zoom.us/j/77777777",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["LLM", "AI", "Fine-Tuning", "Masterclass"],
    description:
      "Hands-on masterclass on fine-tuning large language models with LoRA and QLoRA. GPU provided.",
    hosts: [
      {
        name: "Hugging Face",
        avatar_url: "https://avatars.luma.com/huggingface.jpg",
      },
    ],
    calendar: {
      name: "Hugging Face Events",
      url: "https://luma.com/huggingface",
    },
    ticket_type: "paid",
    price: 29,
    currency: "USD",
    capacity: 500,
    rsvp_count: 441,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-043",
    name: "Solo Travel Meetup · Barcelona",
    url: "https://luma.com/solo-travel-barcelona",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/solotravel.jpg",
    start_at: "2026-09-02T18:00:00.000Z",
    end_at: "2026-09-02T21:00:00.000Z",
    timezone: "Europe/Madrid",
    location_type: "offline",
    city: "Barcelona, Spain",
    address: "La Barceloneta, Barcelona, Spain",
    venue: "Eclipse Bar, Hotel Arts",
    latitude: 41.3851,
    longitude: 2.1734,
    category: "social",
    tags: ["Solo Travel", "Networking", "Barcelona"],
    description:
      "A meetup for solo travelers passing through Barcelona. Make friends, swap stories, find travel buddies.",
    hosts: [
      {
        name: "Solo Travelers Club",
        avatar_url: "https://avatars.luma.com/solotravelers.jpg",
      },
    ],
    calendar: {
      name: "Solo Travelers",
      url: "https://luma.com/solo-travelers",
    },
    ticket_type: "free",
    price: 0,
    capacity: 80,
    rsvp_count: 64,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-044",
    name: "Piano & Jazz Night · New Orleans",
    url: "https://luma.com/jazz-nola",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/jazznola.jpg",
    start_at: "2026-09-05T20:30:00.000Z",
    end_at: "2026-09-05T23:30:00.000Z",
    timezone: "America/Chicago",
    location_type: "offline",
    city: "New Orleans, LA",
    address: "725 St Peter St, New Orleans, LA 70116",
    venue: "Preservation Hall",
    latitude: 29.9585,
    longitude: -90.0658,
    category: "arts",
    tags: ["Jazz", "Music", "New Orleans", "Live"],
    description:
      "An evening of live jazz in the legendary Preservation Hall. Limited seating — book early.",
    hosts: [
      {
        name: "NOLA Jazz Society",
        avatar_url: "https://avatars.luma.com/nolajazz.jpg",
      },
    ],
    calendar: { name: "NOLA Music", url: "https://luma.com/nola-music" },
    ticket_type: "paid",
    price: 25,
    currency: "USD",
    capacity: 100,
    rsvp_count: 97,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-045",
    name: "Future of Work Conference · Remote",
    url: "https://luma.com/future-of-work",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/futureofwork.jpg",
    start_at: "2026-09-08T14:00:00.000Z",
    end_at: "2026-09-08T18:00:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "Zoom Webinar",
    meeting_url: "https://zoom.us/j/66666666",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["Future of Work", "Remote Work", "AI", "Career"],
    description:
      "Industry leaders discuss AI's impact on jobs, remote work culture, and the skills of tomorrow.",
    hosts: [
      {
        name: "Work Forward",
        avatar_url: "https://avatars.luma.com/workforward.jpg",
      },
    ],
    calendar: { name: "Work Forward", url: "https://luma.com/work-forward" },
    ticket_type: "free",
    price: 0,
    capacity: 5000,
    rsvp_count: 3214,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-046",
    name: "Pottery & Ceramics Night · Melbourne",
    url: "https://luma.com/pottery-melbourne",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/pottery.jpg",
    start_at: "2026-09-10T18:30:00.000Z",
    end_at: "2026-09-10T21:00:00.000Z",
    timezone: "Australia/Melbourne",
    location_type: "offline",
    city: "Melbourne, Australia",
    address: "111 Gertrude St, Fitzroy VIC 3065",
    venue: "Brunswick Clay Studios",
    latitude: -37.8136,
    longitude: 144.9631,
    category: "arts",
    tags: ["Pottery", "Ceramics", "Creative", "Workshop"],
    description:
      "Beginner-friendly wheel-throwing pottery class. Aprons provided, natural wine available to purchase.",
    hosts: [
      {
        name: "Brunswick Clay",
        avatar_url: "https://avatars.luma.com/brunswickclay.jpg",
      },
    ],
    calendar: {
      name: "Melbourne Arts",
      url: "https://luma.com/melbourne-arts",
    },
    ticket_type: "paid",
    price: 45,
    currency: "AUD",
    capacity: 16,
    rsvp_count: 14,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-047",
    name: "Impact Investing Panel · NYC",
    url: "https://luma.com/impact-investing-nyc",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/impactinvest.jpg",
    start_at: "2026-09-11T18:00:00.000Z",
    end_at: "2026-09-11T20:30:00.000Z",
    timezone: "America/New_York",
    location_type: "offline",
    city: "New York, NY",
    address: "11 W 42nd St, New York, NY 10036",
    venue: "New York Public Library — Celeste Bartos Forum",
    latitude: 40.7535,
    longitude: -73.9822,
    category: "tech",
    tags: ["Impact Investing", "ESG", "Finance", "Social Good"],
    description:
      "A panel discussion on sustainable investing, ESG, and funding companies that do good for the world.",
    hosts: [
      {
        name: "Impact Capital NYC",
        avatar_url: "https://avatars.luma.com/impactcapital.jpg",
      },
    ],
    calendar: {
      name: "Impact Capital",
      url: "https://luma.com/impact-capital",
    },
    ticket_type: "free",
    price: 0,
    capacity: 150,
    rsvp_count: 111,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-048",
    name: "Hike & Connect · Golden Gate",
    url: "https://luma.com/hike-sf",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/hikesf.jpg",
    start_at: "2026-09-13T08:00:00.000Z",
    end_at: "2026-09-13T11:30:00.000Z",
    timezone: "America/Los_Angeles",
    location_type: "offline",
    city: "San Francisco, CA",
    address: "Golden Gate Bridge, San Francisco, CA 94129",
    venue: "Golden Gate Bridge Vista Point",
    latitude: 37.8199,
    longitude: -122.4783,
    category: "fitness",
    tags: ["Hiking", "Outdoors", "Networking", "Nature"],
    description:
      "A scenic 5-mile hike across the Golden Gate and through the Marin Headlands. Coffee after.",
    hosts: [
      {
        name: "Bay Area Hikers",
        avatar_url: "https://avatars.luma.com/bayareahikers.jpg",
      },
    ],
    calendar: { name: "Bay Area Hikers", url: "https://luma.com/bay-hikers" },
    ticket_type: "free",
    price: 0,
    capacity: 30,
    rsvp_count: 27,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-049",
    name: "Cybersecurity CTF Challenge",
    url: "https://luma.com/ctf-challenge",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/ctfchallenge.jpg",
    start_at: "2026-09-14T10:00:00.000Z",
    end_at: "2026-09-14T22:00:00.000Z",
    timezone: "UTC",
    location_type: "online",
    city: null,
    address: null,
    venue: "CTFd Platform",
    meeting_url: "https://ctfd.io/event/luma-ctf",
    latitude: null,
    longitude: null,
    category: "tech",
    tags: ["Cybersecurity", "CTF", "Hacking", "Challenge"],
    description:
      "A 12-hour Capture The Flag competition. Categories: web, crypto, pwn, reversing, forensics. All levels.",
    hosts: [
      {
        name: "HackersHub",
        avatar_url: "https://avatars.luma.com/hackershub.jpg",
      },
    ],
    calendar: { name: "HackersHub", url: "https://luma.com/hackers-hub" },
    ticket_type: "free",
    price: 0,
    capacity: 2000,
    rsvp_count: 1438,
    require_approval: false,
    status: "upcoming",
  },
  {
    api_id: "evt-050",
    name: "Closing Party: Lagos Tech Week 2026",
    url: "https://luma.com/lagos-tech-week-closing",
    cover_url:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/lagostechweek.jpg",
    start_at: "2026-09-20T19:00:00.000Z",
    end_at: "2026-09-20T23:59:00.000Z",
    timezone: "Africa/Lagos",
    location_type: "offline",
    city: "Lagos, Nigeria",
    address: "15 Water Corporation Rd, Victoria Island, Lagos",
    venue: "Eko Hotel & Suites",
    latitude: 6.4285,
    longitude: 3.4169,
    category: "tech",
    tags: ["Lagos Tech Week", "Party", "Nigeria", "Networking"],
    description:
      "The grand closing party of Lagos Tech Week 2026. Live music, DJs, open bar, and the best of Nigeria's tech ecosystem under one roof.",
    hosts: [
      {
        name: "Lagos Tech Week",
        avatar_url: "https://avatars.luma.com/lagostechweek.jpg",
      },
    ],
    calendar: {
      name: "Lagos Tech Week",
      url: "https://luma.com/lagos-tech-week",
    },
    ticket_type: "paid",
    price: 15000,
    currency: "NGN",
    capacity: 800,
    rsvp_count: 672,
    require_approval: false,
    status: "upcoming",
  },
];

// ─── In-memory RSVP store ────────────────────────────────────────────────────
const rsvpStore = {}; // { eventId: [{ name, email, rsvp_id, created_at }] }

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * GET /events
 * Returns paginated events with optional filters.
 * @param {Object} options
 * @param {string} [options.category]     - Filter by category slug
 * @param {string} [options.city]         - Filter by city name (partial match)
 * @param {string} [options.location_type] - "offline" | "online" | "hybrid"
 * @param {string} [options.query]        - Search by name or tag
 * @param {number} [options.page=1]       - Page number
 * @param {number} [options.limit=10]     - Events per page
 * @returns {{ events, total, page, limit, has_more }}
 */
export function getEvents({
  category,
  city,
  location_type,
  query,
  page = 1,
  limit = 10,
} = {}) {
  let results = [...events];

  if (category) results = results.filter((e) => e.category === category);
  if (location_type)
    results = results.filter((e) => e.location_type === location_type);
  if (city)
    results = results.filter((e) =>
      e.city?.toLowerCase().includes(city.toLowerCase()),
    );
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }

  const total = results.length;
  const start = (page - 1) * limit;
  const paginated = results.slice(start, start + limit);

  return {
    events: paginated,
    total,
    page,
    limit,
    has_more: start + limit < total,
  };
}

/**
 * GET /events/:id
 * Returns a single event by its api_id.
 * @param {string} id
 * @returns {Object|null}
 */
export function getEventById(id) {
  return events.find((e) => e.api_id === id) || null;
}

/**
 * POST /events/:id/rsvp
 * RSVP to an event.
 * @param {string} eventId
 * @param {{ name: string, email: string }} userData
 * @returns {{ success, rsvp_id, message, event }}
 */
export function rsvpEvent(eventId, { name, email }) {
  const event = getEventById(eventId);

  if (!event) return { success: false, message: "Event not found." };
  if (!name || !email)
    return { success: false, message: "Name and email are required." };

  if (!rsvpStore[eventId]) rsvpStore[eventId] = [];

  const alreadyRSVPd = rsvpStore[eventId].some((r) => r.email === email);
  if (alreadyRSVPd)
    return {
      success: false,
      message: "You have already RSVP'd to this event.",
    };

  const currentCount = event.rsvp_count + rsvpStore[eventId].length;
  if (currentCount >= event.capacity) {
    return { success: false, message: "This event is fully booked." };
  }

  const rsvp = {
    rsvp_id: `rsvp-${eventId}-${Date.now()}`,
    name,
    email,
    event_id: eventId,
    created_at: new Date().toISOString(),
    status: event.require_approval ? "pending" : "approved",
  };

  rsvpStore[eventId].push(rsvp);

  return {
    success: true,
    rsvp_id: rsvp.rsvp_id,
    status: rsvp.status,
    message: event.require_approval
      ? "Your RSVP request has been submitted. Awaiting approval."
      : `You're in! See you at "${event.name}".`,
    event: {
      name: event.name,
      start_at: event.start_at,
      venue: event.venue,
      url: event.url,
    },
  };
}

/**
 * GET /events/:id/rsvps
 * Returns list of RSVPs for a given event.
 * @param {string} eventId
 * @returns {{ rsvps: Array, count: number }}
 */
export function getRSVPs(eventId) {
  const event = getEventById(eventId);
  if (!event) return { success: false, message: "Event not found." };

  const rsvps = rsvpStore[eventId] || [];
  return { success: true, rsvps, count: rsvps.length + event.rsvp_count };
}

/**
 * DELETE /events/:id/rsvp
 * Cancel an RSVP by rsvp_id.
 * @param {string} eventId
 * @param {string} rsvpId
 * @returns {{ success, message }}
 */
export function cancelRSVP(eventId, rsvpId) {
  if (!rsvpStore[eventId])
    return { success: false, message: "No RSVPs found for this event." };
  const index = rsvpStore[eventId].findIndex((r) => r.rsvp_id === rsvpId);
  if (index === -1) return { success: false, message: "RSVP not found." };
  rsvpStore[eventId].splice(index, 1);
  return { success: true, message: "Your RSVP has been cancelled." };
}

export default { getEvents, getEventById, rsvpEvent, getRSVPs, cancelRSVP };

import {
  Ticket,
  CalendarDays,
  Compass,
  Astroid,
  Search,
  Bell,
  Users,
  Mail,
} from "lucide-react";

export const navLinks = [
  {
    id: 1,
    name: "Events",
    icon: Ticket,
    to: "/",
  },
  {
    id: 2,
    name: "Calendars",
    icon: CalendarDays,
    to: "/calendars",
  },
  {
    id: 3,
    name: "Discover",
    icon: Compass,
    to: "/discover",
  },
];

export const utilityActions = [
  {
    id: "search",
    name: "Search",
    icon: Search,
    size: 18,
    to: "/search",
  },
];

export const logoConfig = {
  icon: Astroid,
  size: 20,
};

export const footerLinks = [
  {
    id: 1,
    name: "",
    icon: Mail,
    to: "/instagram.com",
  },
  {
    id: 2,
    name: "",
    icon: Mail,
    to: "/x.com",
  },
  {
    id: 3,
    name: "",
    icon: Mail,
    to: "/google.mail.com",
  },
];
