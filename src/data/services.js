import {
  HiOutlineTv,
  HiOutlineSignal,
  HiOutlineSignalSlash,
  HiOutlinePhone,
  HiOutlineDevicePhoneMobile,
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineFilm,
  HiOutlineMusicalNote,
  HiOutlinePlayCircle,
  HiOutlineWifi,
  HiOutlineStar,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineHome,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export const services = [
  {
    id: "ott",
    label: "OTT",
    icon: HiOutlineTv,
    headline: "OTT with Fast Internet",
    description:
      "Experience the best of both worlds with our high-speed internet and access to over 15+ OTT platforms. Enjoy seamless streaming and unlimited entertainment without any buffering. Get fast, reliable internet and a world of content right at your fingertips!",
    pricingBadge: "15+ OTTs @ Just ₹1000/year",
    logos: [
      { name: "Aha", icon: HiOutlinePlayCircle },
      { name: "Discovery+", icon: HiOutlineGlobeAlt },
      { name: "Disney+ Hotstar", icon: HiOutlineStar },
      { name: "Fancode", icon: HiOutlinePlayCircle },
      { name: "Hoichoi", icon: HiOutlineFilm },
      { name: "Hungama", icon: HiOutlineMusicalNote },
      { name: "JioCinema", icon: HiOutlineFilm },
      { name: "Lionsgate Play", icon: HiOutlineStar },
      { name: "ManoramaMAX", icon: HiOutlineTv },
      { name: "Netflix", icon: HiOutlinePlayCircle },
      { name: "Prime Video", icon: HiOutlineFilm },
      { name: "Shemaroo", icon: HiOutlineFilm },
      { name: "Sony LIV", icon: HiOutlineTv },
      { name: "Sun NXT", icon: HiOutlineStar },
      { name: "Zee5", icon: HiOutlinePlayCircle },
    ],
    benefits: [
      {
        icon: HiOutlineBolt,
        title: "Seamless Streaming",
        description:
          "Enjoy uninterrupted streaming with our high-speed internet, perfect for all your OTT needs.",
      },
      {
        icon: HiOutlineGlobeAlt,
        title: "Wide Content Selection",
        description:
          "Access over 15+ OTT platforms, offering a diverse range of movies, shows, and exclusive content.",
      },
      {
        icon: HiOutlineWifi,
        title: "No Buffering",
        description:
          "Experience smooth playback with fast, reliable internet that eliminates buffering.",
      },
      {
        icon: HiOutlineStar,
        title: "Convenience",
        description:
          "Get everything you need for top-quality entertainment in one package, with fast internet and extensive OTT options.",
      },
    ],
    faqs: [
      {
        id: "ott-1",
        question: "How many OTT platforms do you offer?",
        answer:
          "We provide access to over 15+ OTT platforms, giving you a wide variety of content options to choose from.",
      },
      {
        id: "ott-2",
        question: "Is there an additional cost for OTT services?",
        answer:
          "Our OTT bundle is available for just ₹1000/year with any KRP Networks plan. It's a fantastic add-on to enjoy premium streaming content.",
      },
      {
        id: "ott-3",
        question: "How do I set up my OTT accounts?",
        answer:
          "Once your connection is active, contact our support team via WhatsApp or call us. We'll guide you through activating each OTT platform step by step.",
      },
      {
        id: "ott-4",
        question: "What should I do if I experience issues with streaming?",
        answer:
          "Check your internet connection first. For persistent problems, reach out to our 24/7 customer support team for quick assistance.",
      },
      {
        id: "ott-5",
        question: "Can I watch OTT content on multiple devices?",
        answer:
          "Yes, you can enjoy OTT content on up to 2 devices simultaneously, including smartphones, tablets, smart TVs, and computers.",
      },
      {
        id: "ott-6",
        question: "Can I cancel or change my OTT subscriptions?",
        answer:
          "Yes, you can upgrade or downgrade your OTT plans based on your preferences. Contact our team to manage your subscription anytime.",
      },
    ],
  },
  {
    id: "iptv",
    label: "IPTV",
    icon: HiOutlineSignal,
    headline: "IPTV Digital Television",
    description:
      "Transform your television experience with KRP Networks' IPTV service. Access 500+ HD and SD channels across languages including Tamil, Telugu, Kannada, Hindi, and English. Crystal-clear picture quality delivered over fiber with zero signal interference.",
    pricingBadge: "500+ Channels @ Just ₹150/month",
    logos: [
      { name: "Cartoon Network", icon: HiOutlinePlayCircle },
      { name: "Colors", icon: HiOutlineFilm },
      { name: "Discovery", icon: HiOutlineGlobeAlt },
      { name: "ESPN", icon: HiOutlineTv },
      { name: "History TV", icon: HiOutlineGlobeAlt },
      { name: "MTV", icon: HiOutlineMusicalNote },
      { name: "National Geo", icon: HiOutlineGlobeAlt },
      { name: "Sony Max", icon: HiOutlineFilm },
      { name: "Star Plus", icon: HiOutlineStar },
      { name: "Star Sports", icon: HiOutlinePlayCircle },
      { name: "Sun TV", icon: HiOutlineTv },
      { name: "Zee Tamil", icon: HiOutlineStar },
    ],
    benefits: [
      {
        icon: HiOutlineSignal,
        title: "500+ Channels",
        description:
          "Access a massive library of HD and SD channels across entertainment, sports, news, kids, and more.",
      },
      {
        icon: HiOutlineBolt,
        title: "Crystal Clear Quality",
        description:
          "Fiber-delivered IPTV means no signal loss, no rain fade, and consistently sharp HD picture quality.",
      },
      {
        icon: HiOutlineGlobeAlt,
        title: "Multi-Language Support",
        description:
          "Channels in Tamil, Telugu, Kannada, Hindi, English, and more — something for every member of the family.",
      },
      {
        icon: HiOutlineClock,
        title: "Catch-Up TV",
        description:
          "Missed your favorite show? Use catch-up TV to replay programs from the past 7 days at your convenience.",
      },
    ],
    faqs: [
      {
        id: "iptv-1",
        question: "What equipment do I need for IPTV?",
        answer:
          "We provide a set-top box along with your IPTV subscription. It connects to your TV via HDMI and to your router via ethernet or Wi-Fi.",
      },
      {
        id: "iptv-2",
        question: "How many channels are included?",
        answer:
          "Our IPTV service includes 500+ channels across HD and SD, covering entertainment, sports, news, kids, movies, and regional content.",
      },
      {
        id: "iptv-3",
        question: "Can I add premium channel packs?",
        answer:
          "Yes, you can add premium sports, movie, and international channel packs to your base IPTV subscription at additional rates.",
      },
      {
        id: "iptv-4",
        question: "Does IPTV work without internet?",
        answer:
          "IPTV requires an active internet connection as channels are streamed over your fiber line. It works best with KRP Networks broadband.",
      },
      {
        id: "iptv-5",
        question: "Can I record live TV?",
        answer:
          "Our set-top box supports recording and catch-up TV features. You can record shows and replay content from the past 7 days.",
      },
    ],
  },
  {
    id: "dth",
    label: "DTH",
    icon: HiOutlineSignalSlash,
    headline: "Crystal Clear Satellite TV",
    description:
      "Get HD & SD channels via Direct-To-Home satellite setup — no cable clutter, no internet dependency. KRP Networks partners with major DTH providers so you enjoy 300+ channels across sports, entertainment, news, kids, and regional content with crystal-clear picture quality.",
    pricingBadge: "300+ Channels via Satellite DTH",
    logos: [
      { name: "300+ Channels", icon: HiOutlinePlayCircle },
      { name: "Airtel Digital", icon: HiOutlineSignal },
      { name: "Dish TV", icon: HiOutlineSignalSlash },
      { name: "HD Packs", icon: HiOutlineBolt },
      { name: "Kids Channels", icon: HiOutlineFilm },
      { name: "News 24×7", icon: HiOutlineClock },
      { name: "Regional TV", icon: HiOutlineGlobeAlt },
      { name: "Sports Channels", icon: HiOutlinePlayCircle },
      { name: "Sun Direct", icon: HiOutlineStar },
      { name: "Tata Play", icon: HiOutlineTv },
    ],
    benefits: [
      {
        icon: HiOutlineSignalSlash,
        title: "No Internet Needed",
        description:
          "DTH works independently of your broadband — enjoy uninterrupted TV even during internet outages.",
      },
      {
        icon: HiOutlineTv,
        title: "300+ HD/SD Channels",
        description:
          "Access a massive library of channels — sports, movies, news, kids, music, and regional content.",
      },
      {
        icon: HiOutlineStar,
        title: "Top DTH Providers",
        description:
          "We help you connect with Tata Play, Dish TV, Airtel Digital TV, and Sun Direct with assisted installation.",
      },
      {
        icon: HiOutlineHome,
        title: "Quick Installation",
        description:
          "Our team handles end-to-end satellite dish installation, set-top box setup, and remote configuration.",
      },
    ],
    faqs: [
      {
        id: "dth-1",
        question: "Which DTH providers do you support?",
        answer:
          "We assist with Tata Play, Dish TV, Airtel Digital TV, and Sun Direct connections including installation and activation.",
      },
      {
        id: "dth-2",
        question: "Do I need an internet connection for DTH?",
        answer:
          "No — DTH is a satellite service and works completely independently of your internet connection.",
      },
      {
        id: "dth-3",
        question: "Can I bundle DTH with my fiber plan?",
        answer:
          "Yes, we offer bundled plans where you can combine fiber internet with DTH for a discounted monthly rate.",
      },
      {
        id: "dth-4",
        question: "How long does installation take?",
        answer:
          "A standard DTH installation takes 1–2 hours. Our technician handles dish setup, set-top box wiring, and channel activation.",
      },
      {
        id: "dth-5",
        question: "Are HD channels included?",
        answer:
          "Yes, all major HD channels are available. You can choose from SD, HD, or premium HD channel packs based on your preference.",
      },
    ],
  },
  {
    id: "landline",
    label: "Landline",
    icon: HiOutlinePhone,
    headline: "Digital Landline Service",
    description:
      "Stay connected with KRP Networks' digital landline service. Enjoy crystal-clear voice calls with unlimited local and STD calling bundled with your internet plan. No separate line needed — it works directly over your fiber connection.",
    pricingBadge: "Unlimited Calls Bundled Free",
    logos: [
      { name: "Call Forwarding", icon: HiOutlineSignal },
      { name: "Caller ID", icon: HiOutlineShieldCheck },
      { name: "Conference Call", icon: HiOutlineUserGroup },
      { name: "HD Voice", icon: HiOutlineBolt },
      { name: "No Extra Line", icon: HiOutlineHome },
      { name: "Unlimited Local", icon: HiOutlinePhone },
      { name: "Unlimited STD", icon: HiOutlineGlobeAlt },
      { name: "Voice Mail", icon: HiOutlineMusicalNote },
    ],
    benefits: [
      {
        icon: HiOutlinePhone,
        title: "Crystal Clear Calls",
        description:
          "HD voice quality over fiber ensures every conversation is crisp, clear, and free of static or drops.",
      },
      {
        icon: HiOutlineGlobeAlt,
        title: "Unlimited Calling",
        description:
          "Make unlimited local and STD calls without worrying about per-minute charges or call limits.",
      },
      {
        icon: HiOutlineHome,
        title: "No Separate Line",
        description:
          "Your landline works over the same fiber connection — no need for a separate telephone line installation.",
      },
      {
        icon: HiOutlineShieldCheck,
        title: "Advanced Features",
        description:
          "Get caller ID, call forwarding, voicemail, and conference calling included at no extra cost.",
      },
    ],
    faqs: [
      {
        id: "land-1",
        question: "Do I need a separate phone line for landline?",
        answer:
          "No! Our digital landline works over your existing fiber connection. No separate telephone line is needed.",
      },
      {
        id: "land-2",
        question: "Are STD calls really free?",
        answer:
          "Yes, unlimited local and STD calls across India are included free with your landline service when bundled with our internet plans.",
      },
      {
        id: "land-3",
        question: "Can I keep my existing landline number?",
        answer:
          "In most cases, yes. We support number portability so you can retain your existing landline number when you switch to KRP Networks.",
      },
      {
        id: "land-4",
        question: "What phone hardware do I need?",
        answer:
          "Any standard telephone handset works. We provide an ATA (Analog Telephone Adapter) that connects your regular phone to the fiber network.",
      },
      {
        id: "land-5",
        question: "Does the landline work during a power outage?",
        answer:
          "The landline requires your router to be powered on. We recommend a UPS backup for uninterrupted service during outages.",
      },
    ],
  },
  {
    id: "firestick",
    label: "Firestick",
    icon: HiOutlineDevicePhoneMobile,
    headline: "Pre-configured Firestick",
    description:
      "Get a pre-configured Amazon Fire TV Stick with your KRP Networks connection. It comes loaded with all your OTT apps, ready to plug in and start streaming instantly. No setup hassle — just connect to your TV and enjoy endless entertainment in HD and 4K.",
    pricingBadge: "Pre-loaded & Ready to Stream",
    logos: [
      { name: "4K Streaming", icon: HiOutlineTv },
      { name: "Alexa Built-in", icon: HiOutlineStar },
      { name: "All OTT Apps", icon: HiOutlinePlayCircle },
      { name: "Amazon Fire TV", icon: HiOutlineCpuChip },
      { name: "HDMI Connect", icon: HiOutlineSignal },
      { name: "Plug & Play", icon: HiOutlineBolt },
      { name: "Voice Remote", icon: HiOutlineMusicalNote },
      { name: "Wi-Fi Enabled", icon: HiOutlineWifi },
    ],
    benefits: [
      {
        icon: HiOutlineCpuChip,
        title: "Pre-configured Setup",
        description:
          "Your Firestick arrives pre-loaded with all OTT apps and settings. Just plug into your TV and start watching.",
      },
      {
        icon: HiOutlineTv,
        title: "4K HDR Streaming",
        description:
          "Enjoy stunning 4K Ultra HD and HDR content with Dolby Atmos audio for a cinematic experience at home.",
      },
      {
        icon: HiOutlineMusicalNote,
        title: "Alexa Voice Remote",
        description:
          "Use your voice to search for shows, control playback, and even manage smart home devices with Alexa built-in.",
      },
      {
        icon: HiOutlineBolt,
        title: "Seamless Integration",
        description:
          "Works perfectly with KRP Networks' high-speed internet for buffer-free streaming on any TV with HDMI.",
      },
    ],
    faqs: [
      {
        id: "fire-1",
        question: "Is the Firestick included free with my plan?",
        answer:
          "The Firestick is available as an add-on with select plans. Contact us for current pricing and bundle offers.",
      },
      {
        id: "fire-2",
        question: "Which OTT apps come pre-installed?",
        answer:
          "All 15+ OTT apps from our OTT bundle come pre-installed and configured, along with popular free apps like YouTube and other streaming services.",
      },
      {
        id: "fire-3",
        question: "Does it support 4K content?",
        answer:
          "Yes, our Fire TV Stick supports 4K Ultra HD, HDR10, and Dolby Vision for the best possible picture quality on compatible TVs.",
      },
      {
        id: "fire-4",
        question: "Can I install additional apps?",
        answer:
          "Absolutely! You can install any app from the Amazon Appstore, including games, music apps, fitness apps, and more.",
      },
      {
        id: "fire-5",
        question: "What internet speed is recommended for 4K streaming?",
        answer:
          "We recommend at least 25 Mbps for smooth 4K streaming. Our 100 Mbps and above plans are ideal for the best Firestick experience.",
      },
    ],
  },
];
