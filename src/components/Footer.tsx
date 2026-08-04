import { navLinks, site, whatsappHref } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-0 pb-9">
      <div className="wrap">
        <div className="flex justify-between items-start flex-wrap gap-8 pb-8 mb-6 border-b border-white/10 pt-12">
          <a href="#home" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="SB Aerials logo" className="h-11 w-auto" />
            <div className="flex flex-col leading-none font-display font-bold text-lg tracking-wide">
              {site.name}
              <span className="font-mono font-normal text-[9px] tracking-[0.22em] text-steel mt-1">
                {site.tagline.toUpperCase()}
              </span>
            </div>
          </a>
          <div className="flex flex-col gap-2.5 font-mono text-[12.5px] text-steel">
            <a href={site.phoneHref} className="hover:text-brand-light transition-colors">
              Phone — {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-brand-light transition-colors">
              Email — {site.email}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener"
              className="hover:text-brand-light transition-colors"
            >
              Instagram — {site.instagramHandle}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener"
              className="hover:text-brand-light transition-colors"
            >
              WhatsApp — Chat now
            </a>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div className="flex gap-7 font-mono text-[11px] tracking-[0.08em] uppercase text-steel">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-light transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="font-mono text-[11px] text-steel">© 2026 SB Aerials · Chennai, IN</div>
        </div>
      </div>
    </footer>
  );
}
