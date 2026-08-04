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

export const projects = flightClips.map((src, i) => ({
  title: `Aerial Reel 0${i + 1}`,
  label: "Aerial",
  src,
}));
