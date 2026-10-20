// Enough copies to cover a wide screen; the track holds two identical halves and slides by
// one half per loop, so the text scrolls without a seam.
const COPIES_PER_HALF = 8;

export function MarqueeFooter() {
  return (
    <footer className="overflow-hidden border-t border-pp2 py-[13px] lg:py-7">
      <p className="sr-only">Knex - Aurora 2026</p>
      <div aria-hidden className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 gap-4 pr-4 lg:gap-20 lg:pr-20">
            {Array.from({ length: COPIES_PER_HALF }, (_, i) => (
              <span key={i} className="text-base font-medium whitespace-nowrap text-w0 lg:text-[32px]">
                <span className="text-g5">Knex</span> - <span className="text-p5">Aurora 2026</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
