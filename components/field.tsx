"use client";

import { useState } from "react";
import type { RankedSeller } from "@/lib/ranking";
import { SellerAvatar } from "./seller-avatar";
import { formatSales } from "./format";

const PAGE_SIZE = 10;

export function Field({ sellers }: { sellers: RankedSeller[] }) {
  const [shown, setShown] = useState(PAGE_SIZE);

  if (sellers.length === 0) return null;

  return (
    <section aria-label="Demais vendedores" className="flex flex-col gap-3 lg:gap-4">
      <div aria-hidden className="flex items-center gap-3 font-display text-w1 lg:gap-8 lg:text-2xl">
        <span className="w-[52px] shrink-0 text-[13px] lg:w-auto lg:text-2xl">Posição</span>
        <span className="flex-1 text-sm lg:text-2xl">Nome</span>
        <span className="shrink-0 text-right text-[13px] leading-[18px] lg:text-2xl lg:leading-normal">
          Quantidade de <span className="text-g4">vendas</span>
        </span>
      </div>

      <ol className="flex flex-col gap-3 lg:gap-4">
        {sellers.slice(0, shown).map((seller) => (
          <li
            key={seller.id}
            className="flex h-[68px] items-center gap-3 overflow-hidden rounded bg-p1 px-3.5 lg:h-auto lg:gap-4 lg:px-[21px] lg:py-[19px]"
          >
            <span className="w-[31px] shrink-0 font-display text-xl text-w0 lg:w-[68px] lg:text-[28px]">
              {seller.position}º
            </span>
            <span aria-hidden className="h-8 w-px shrink-0 bg-w1 lg:h-11 lg:w-0.5 lg:bg-w0" />
            <span className="size-10 shrink-0 lg:size-11">
              <SellerAvatar photoSrc={seller.photoSrc} initials={seller.initials} size={44} fallbackClassName="bg-p3" />
            </span>
            <span className="min-w-0 flex-1 truncate text-[17px] font-medium text-w0 lg:text-[28px]" title={seller.fullName}>
              {seller.displayName}
            </span>
            <span className="shrink-0 text-[15px] font-medium whitespace-nowrap text-w0 lg:w-[231px] lg:text-right lg:text-[28px]">
              {formatSales(seller.ticketsSold)}
            </span>
          </li>
        ))}
      </ol>

      {shown < sellers.length && (
        <button
          type="button"
          onClick={() => setShown((count) => count + PAGE_SIZE)}
          className="mt-2 self-center rounded bg-p1 px-6 py-3 font-medium text-w1 transition-colors hover:bg-p3 lg:mt-6 lg:py-4 lg:text-2xl"
        >
          Mostra mais
        </button>
      )}
    </section>
  );
}
