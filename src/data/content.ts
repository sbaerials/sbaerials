export const site = {
  name: "SB AERIALS",
  tagline: "Drone Photography & Videography",
  phone: "+91 73587 52827",
  phoneHref: "tel:+917358752827",
  whatsappBase: "https://wa.me/917358752827",
  whatsappMessage:
    "Hi SB Aerials, I'd like to enquire about a drone shoot.",
  instagram: "https://www.instagram.com/sb_aerials",
  instagramHandle: "@sb_aerials",
  // Official contact email
  email: "contact.sbaerials@gmail.com",
  location: "Chennai, Tamil Nadu",
};

export const whatsappHref = `${site.whatsappBase}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Bookings", href: "#bookings" },
];

// All six clips live in /public/videos — add more by dropping a file in
// that folder and adding an entry here.
export const flightClips = [
  "/videos/flight-01.mp4",
  "/videos/flight-02.mp4",
  "/videos/flight-03.mp4",
  "/videos/flight-04.mp4",
  "/videos/flight-05.mp4",
  "/videos/flight-06.mp4",
];

export const heroClipOrder = [
  "/videos/flight-02.mp4",
  "/videos/flight-03.mp4",
  "/videos/flight-04.mp4",
  "/videos/flight-05.mp4",
  "/videos/flight-06.mp4",
  "/videos/flight-01.mp4",
];

/**
 * Rotation configuration for video clips in degrees (-90, 90, 180, or 0).
 * Set to 0 since ffmpeg encoded clips are already straight horizontal landscape.
 */
export const videoRotations: Record<string, number> = {
  "/videos/flight-01.mp4": 0,
  "/videos/flight-02.mp4": 0,
  "/videos/flight-03.mp4": 0,
  "/videos/flight-04.mp4": 0,
  "/videos/flight-05.mp4": 0,
  "/videos/flight-06.mp4": 0,
};

export function getVideoRotation(src: string): number {
  return videoRotations[src] ?? 0;
}

export const stats = [
  { value: "120+", label: "Projects Delivered" },
  { value: "340", label: "Flight Hours Logged" },
  { value: "4K/60", label: "Cinematic Output" },
  { value: "18", label: "Cities Covered" },
];

export const services = [
  {
    title: "Wedding Photography",
    body: "Sweeping establishing shots and candid aerials woven into your wedding film.",
  },
  {
    title: "Real Estate",
    body: "Property walkthroughs and listing reels that make a space feel bigger and clearer.",
  },
  {
    title: "Construction Monitoring",
    body: "Regular aerial passes to track site progress over time, milestone by milestone.",
  },
  {
    title: "Land Survey",
    body: "Aerial mapping and boundary documentation for land parcels and development sites.",
  },
  {
    title: "Agriculture Survey",
    body: "Crop and field overviews to help monitor land use and irrigation coverage.",
  },
  {
    title: "Event Coverage",
    body: "Crowd shots, venue coverage, and highlight aerials for launches and gatherings.",
  },
  {
    title: "Cinematic Videos",
    body: "Story-driven aerial films with smooth movement, framing, and colour grading.",
  },
  {
    title: "Commercial Shoots",
    body: "Brand films, site documentation, and promotional aerial footage for businesses.",
  },
];

export const serviceOptions = services.map((s) => s.title);

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "all" | "architecture" | "coastal" | "commercial" | "cinematic";
  categoryLabel: string;
  location: string;
  altitude: string;
  src: string;
}

export const showcaseReels = [
  {
    id: "01",
    tag: "01 // BASILICA",
    title: "Cathedral & City Skyline",
    subtitle: "High-altitude architectural perspective",
    category: "Architecture",
    location: "Santhome, Chennai",
    altitude: "115m AGL",
    fps: "60 FPS",
    resolution: "4K UHD",
    src: "/videos/flight-01.mp4",
  },
  {
    id: "02",
    tag: "02 // RESORT",
    title: "Azure Lagoon & Coastal Retreat",
    subtitle: "Sweeping hospitality aerial walkthrough",
    category: "Commercial",
    location: "East Coast Road",
    altitude: "85m AGL",
    fps: "30 FPS",
    resolution: "4K UHD",
    src: "/videos/flight-02.mp4",
  },
  {
    id: "03",
    tag: "03 // HERITAGE",
    title: "Historic Temple Complex",
    subtitle: "Dravidian architecture symmetry",
    category: "Heritage",
    location: "Kanchipuram, TN",
    altitude: "90m AGL",
    fps: "60 FPS",
    resolution: "4K UHD",
    src: "/videos/flight-03.mp4",
  },
  {
    id: "04",
    tag: "04 // SUNSET",
    title: "Golden Hour Estuary & Coast",
    subtitle: "Backwater twilight descent",
    category: "Cinematic",
    location: "Kovalam Coast, TN",
    altitude: "70m AGL",
    fps: "60 FPS",
    resolution: "4K UHD",
    src: "/videos/flight-04.mp4",
  },
  {
    id: "05",
    tag: "05 // URBAN",
    title: "Metropolitan Transit & Skyline",
    subtitle: "Infrastructure site documentation",
    category: "Infrastructure",
    location: "Chennai Central",
    altitude: "120m AGL",
    fps: "60 FPS",
    resolution: "4K UHD",
    src: "/videos/flight-05.mp4",
  },
  {
    id: "06",
    tag: "06 // EXPRESSWAY",
    title: "Coastal Expressway & Bay",
    subtitle: "High-speed vehicular shoreline tracking",
    category: "Commercial",
    location: "Bay of Bengal",
    altitude: "95m AGL",
    fps: "60 FPS",
    resolution: "4K UHD",
    src: "/videos/flight-06.mp4",
  },
];

export const projectCategories = [
  { id: "all", label: "All Works" },
  { id: "architecture", label: "Architecture" },
  { id: "coastal", label: "Coastal & Resort" },
  { id: "cinematic", label: "Cinematic & Sunset" },
  { id: "commercial", label: "Commercial" },
];

export const projects: ProjectItem[] = [
  {
    id: "p-01",
    title: "Basilica & Metropolitan City",
    subtitle: "Architectural perspective of Santhome Cathedral",
    category: "architecture",
    categoryLabel: "Architecture",
    location: "Chennai, IN",
    altitude: "115M",
    src: "/videos/flight-01.mp4",
  },
  {
    id: "p-02",
    title: "Coastal Resort & Azure Lagoon",
    subtitle: "Luxury hospitality and shoreline showcase",
    category: "coastal",
    categoryLabel: "Coastal",
    location: "ECR, Chennai",
    altitude: "85M",
    src: "/videos/flight-02.mp4",
  },
  {
    id: "p-03",
    title: "Historic Temple Complex",
    subtitle: "Geometric symmetry and heritage architecture",
    category: "architecture",
    categoryLabel: "Architecture",
    location: "Kanchipuram, TN",
    altitude: "90M",
    src: "/videos/flight-03.mp4",
  },
  {
    id: "p-04",
    title: "Golden Hour Estuary & Sunset",
    subtitle: "Cinematic twilight descent across backwaters",
    category: "cinematic",
    categoryLabel: "Cinematic",
    location: "Kovalam, TN",
    altitude: "70M",
    src: "/videos/flight-04.mp4",
  },
  {
    id: "p-05",
    title: "Urban Development & Transit",
    subtitle: "Commercial site documentation and corridor sweep",
    category: "commercial",
    categoryLabel: "Commercial",
    location: "Chennai, IN",
    altitude: "120M",
    src: "/videos/flight-05.mp4",
  },
  {
    id: "p-06",
    title: "Shoreline Expressway & Ocean",
    subtitle: "High-speed vehicular tracking along the Bay",
    category: "coastal",
    categoryLabel: "Coastal",
    location: "Bay of Bengal",
    altitude: "95M",
    src: "/videos/flight-06.mp4",
  },
];
