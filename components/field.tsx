import type { RankedSeller } from "@/lib/ranking";
import { SellerAvatar } from "./seller-avatar";
import { formatTickets } from "./format";

export function Field({ sellers }: { sellers: RankedSeller[] }) {
  if (sellers.length === 0) return null;

  return (
    <ol aria-label="Demais vendedores" className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {sellers.map((seller) => (
        <li key={seller.id} className="flex items-center gap-3 px-4 py-3">
          <span className="w-8 shrink-0 text-right font-semibold tabular-nums text-zinc-500">
            {seller.position}º
          </span>
          <SellerAvatar photoSrc={seller.photoSrc} initials={seller.initials} size={40} />
          <span className="min-w-0 flex-1 truncate font-medium" title={seller.fullName}>
            {seller.displayName}
          </span>
          <span className="shrink-0 text-sm tabular-nums text-zinc-500">
            {formatTickets(seller.ticketsSold)}
          </span>
        </li>
      ))}
    </ol>
  );
}
