import { Suspense } from "react";
import { AutoRefresh } from "@/components/auto-refresh";
import { Field } from "@/components/field";
import { formatTickets } from "@/components/format";
import { LastChecked } from "@/components/last-checked";
import { Podium } from "@/components/podium";
import { rankSellers } from "@/lib/ranking";
import { getSalesSheet } from "@/lib/sales-sheet";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4 py-10">
      <h1 className="text-center text-3xl font-bold tracking-tight">Ranking da Rifa</h1>

      <Suspense fallback={<p className="text-center text-zinc-500">Carregando ranking…</p>}>
        <Ranking />
      </Suspense>

      <AutoRefresh />
    </main>
  );
}

async function Ranking() {
  const { sellers, checkedAt } = await getSalesSheet();
  const { podium, field, teamTotal } = rankSellers(sellers);

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col items-center gap-2 text-center">
        <p className="text-lg">
          <strong>{formatTickets(teamTotal)}</strong> vendidos pela equipe
        </p>
        <p className="text-sm text-zinc-500">
          <LastChecked checkedAt={checkedAt} />
        </p>
      </header>

      <Podium steps={podium} />
      <Field sellers={field} />
    </div>
  );
}
