import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import Altimeter from "@/components/Altimeter";
import Hero from "@/components/Hero";
import HorizonDivider from "@/components/HorizonDivider";
import VideoShowcase from "@/components/VideoShowcase";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Lightbox from "@/components/Lightbox";
import About from "@/components/About";
import Bookings from "@/components/Bookings";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const SECTION_IDS = ["home", "showcase", "work", "about", "bookings"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Altimeter />
      <Navbar activeSection={activeSection} onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main>
        <Hero />
        <HorizonDivider fill="#0C1220" />
        <VideoShowcase />
        <HorizonDivider fill="#121A2C" flip />
        <Stats />
        <Services />
        <Work onOpen={setLightboxSrc} />
        <About />
        <Bookings />
      </main>

      <Footer />
      <WhatsAppFloat />
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
