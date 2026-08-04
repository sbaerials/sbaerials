import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { navLinks, site } from "@/data/content";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-void z-[99] flex flex-col items-center justify-center gap-9 font-display text-3xl uppercase"
        >
          <button className="absolute top-6 right-6" onClick={onClose} aria-label="Close menu">
            <X className="w-7 h-7 text-cloud" />
          </button>
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={onClose}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href={site.phoneHref}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * navLinks.length, duration: 0.35 }}
            className="font-mono text-sm text-brand-light"
          >
            {site.phone}
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
