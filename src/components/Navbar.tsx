import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks, site } from "@/data/content";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  activeSection: string;
  onOpenMobileMenu: () => void;
}

export default function Navbar({ activeSection, onOpenMobileMenu }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "py-3 px-6 md:px-12 bg-[rgba(6,9,17,0.8)] backdrop-blur-xl border-b border-white/10"
          : "py-5 px-6 md:px-12 border-b border-transparent"
      }`}
    >
      <a href="#home" className="flex items-center gap-3">
        <img src="/images/logo.png" alt="SB Aerials logo" className="h-10 md:h-11 w-auto" />
        <div className="flex flex-col leading-none font-display font-bold text-lg tracking-wide">
          {site.name}
          <span className="font-mono font-normal text-[9px] tracking-[0.22em] text-steel mt-1">
            {site.tagline.toUpperCase()}
          </span>
        </div>
      </a>

      <div className="hidden md:flex gap-10 font-mono text-xs tracking-[0.1em] uppercase">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`relative pb-1.5 transition-colors ${
              activeSection === link.href.slice(1)
                ? "text-cloud after:w-full"
                : "text-steel hover:text-cloud after:w-0"
            } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-brand-light after:transition-all after:duration-300`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-5">
        <Button variant="ghost" size="sm" onClick={() => (window.location.hash = "#bookings")}>
          Book Now
        </Button>
      </div>

      <button
        className="md:hidden flex flex-col gap-1.5 z-[110]"
        onClick={onOpenMobileMenu}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-cloud" />
      </button>
    </motion.nav>
  );
}
