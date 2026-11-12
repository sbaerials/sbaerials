import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "@/data/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-white/15"}`}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const arrowClass = (enabled: boolean) =>
    `w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
      enabled
        ? "border-white/15 text-cloud hover:border-brand-light hover:text-brand-light hover:bg-brand-blue/10"
        : "border-white/5 text-white/20 cursor-not-allowed"
    }`;

  return (
    <section id="reviews" className="bg-panel py-24 md:py-[120px] relative border-t border-white/10">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="sec-head !pt-0 !pb-0"
          >
            <div className="eyebrow">CLIENT REVIEWS</div>
            <h2>Word from the ground.</h2>
            <p>What clients say after the footage lands in their inbox.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center gap-6 self-start md:self-end"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold text-3xl text-cloud leading-none">
                  {average.toFixed(1)}
                </span>
                <Stars rating={Math.round(average)} />
              </div>
              <span className="font-mono text-[10px] tracking-[0.12em] text-steel uppercase">
                Based on {reviews.length} reviews
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
                className={arrowClass(canPrev)}
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
                className={arrowClass(canNext)}
                aria-label="Next reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
          >
            {reviews.map((review) => (
              <article
                key={review.name}
                data-review-card
                className="snap-start shrink-0 w-[85%] sm:w-[340px] md:w-[380px] p-7 rounded-lg border border-white/10 bg-white/[0.02] hover:border-brand-light/30 hover:bg-white/[0.04] transition-colors flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <Stars rating={review.rating} />
                  <Quote className="w-6 h-6 text-brand-light/30" />
                </div>

                <p className="text-cloud/90 text-[14.5px] leading-relaxed mt-5 flex-1">
                  “{review.text}”
                </p>

                <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-light/30 flex items-center justify-center font-display font-semibold text-sm text-brand-light shrink-0">
                    {initials(review.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-cloud text-[15px] leading-tight">
                      {review.name}
                    </div>
                    <div className="font-mono text-[10px] tracking-wider text-steel uppercase mt-1 truncate">
                      {review.service} · {review.location}
                    </div>
                  </div>
                  <span className="ml-auto font-mono text-[10px] text-steel/70 shrink-0">
                    {review.date}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Right-edge fade hints there is more to scroll */}
          {canNext && (
            <div className="pointer-events-none absolute top-0 right-0 bottom-2 w-16 bg-gradient-to-l from-panel to-transparent" />
          )}
        </motion.div>
      </div>
    </section>
  );
}
