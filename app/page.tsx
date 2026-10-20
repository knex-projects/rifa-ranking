import { Suspense } from "react";
import { AutoRefresh } from "@/components/auto-refresh";
import { Field } from "@/components/field";
import { formatNumber, salesLabel } from "@/components/format";
import { LastChecked } from "@/components/last-checked";
import { MarqueeFooter } from "@/components/marquee-footer";
import { Podium } from "@/components/podium";
import { Purpose } from "@/components/purpose";
import { rankSellers } from "@/lib/ranking";
import { getSalesSheet } from "@/lib/sales-sheet";

export default function Home() {
  return (
    <>
      {/* 1152px of content on desktop, with 20px side margins on narrower screens. */}
      <main className="mx-auto flex w-full max-w-[1192px] flex-1 flex-col gap-7 px-5 py-10 lg:gap-12 lg:pt-20 lg:pb-20">
        <h1 className="text-center font-display text-[40px] leading-[42px] text-w1 lg:text-[64px] lg:leading-normal">
          Ranking de <span className="text-g3">rifas</span>
        </h1>

        <Suspense fallback={<p className="text-center text-pp3">Carregando ranking…</p>}>
          <Ranking />
        </Suspense>

        <Purpose />

        <AutoRefresh />
      </main>

      <MarqueeFooter />
    </>
  );
}

async function Ranking() {
  const { sellers, checkedAt } = await getSalesSheet();
  const { podium, field, teamTotal } = rankSellers(sellers);

  return (
    <>
      <Podium steps={podium} />

      <section aria-label="Resumo" className="flex flex-col items-center gap-1 text-center">
        <p className="font-display text-2xl text-w1 lg:text-[32px]">
          <span className="text-g4">{formatNumber(teamTotal)}</span> {salesLabel(teamTotal)} pela equipe
        </p>
        <p className="text-sm text-pp3 lg:text-base">
          <LastChecked checkedAt={checkedAt} />
        </p>
      </section>

      <Field sellers={field} />
    </>
  );
}
