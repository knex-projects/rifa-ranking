import type { PodiumStep } from "@/lib/ranking";
import { SellerAvatar } from "./seller-avatar";
import { formatTickets } from "./format";

// Classic podium layout: 2nd on the left, 1st in the middle, 3rd on the right.
const VISUAL_ORDER = [2, 1, 3];

const STEP_STYLE: Record<number, { height: string; color: string; avatar: number }> = {
  1: { height: "h-28", color: "bg-amber-400 text-amber-950", avatar: 96 },
  2: { height: "h-20", color: "bg-zinc-300 text-zinc-800", avatar: 80 },
  3: { height: "h-14", color: "bg-orange-300 text-orange-950", avatar: 72 },
};

export function Podium({ steps }: { steps: PodiumStep[] }) {
  if (steps.length === 0) {
    return (
      <section aria-label="Pódio" className="flex flex-col items-center gap-6">
        <div className="flex w-full max-w-md items-end justify-center gap-2">
          {VISUAL_ORDER.map((position) => (
            <div key={position} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-zinc-300 text-2xl text-zinc-400 dark:border-zinc-700">
                ?
              </div>
              <Step position={position} />
            </div>
          ))}
        </div>
        <p className="text-zinc-500">Nenhuma venda ainda. O pódio está esperando!</p>
      </section>
    );
  }

  const ordered = VISUAL_ORDER.flatMap((position) => steps.filter((s) => s.position === position));

  return (
    <section aria-label="Pódio" className="flex items-end justify-center gap-2 sm:gap-4">
      {ordered.map((step) => (
        <div key={step.position} className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:max-w-xs" style={{ flexGrow: step.sellers.length }}>
          <ul className="flex flex-wrap items-end justify-center gap-3">
            {step.sellers.map((seller) => (
              <li key={seller.id} className="flex w-24 flex-col items-center gap-1 text-center sm:w-28">
                <SellerAvatar
                  photoSrc={seller.photoSrc}
                  initials={seller.initials}
                  size={STEP_STYLE[step.position].avatar}
                />
                <span className="text-sm font-semibold leading-tight" title={seller.fullName}>
                  {seller.displayName}
                </span>
                <span className="text-xs text-zinc-500">{formatTickets(seller.ticketsSold)}</span>
              </li>
            ))}
          </ul>
          <Step position={step.position} />
        </div>
      ))}
    </section>
  );
}

function Step({ position }: { position: number }) {
  const { height, color } = STEP_STYLE[position];
  return (
    <div className={`flex w-full items-start justify-center rounded-t-lg pt-2 text-2xl font-bold ${height} ${color}`}>
      {position}º
    </div>
  );
}
