"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold">Não foi possível carregar o ranking</h1>
      <p className="text-zinc-500">A planilha não respondeu. Tente novamente em instantes.</p>
      <button
        onClick={reset}
        className="rounded-full bg-foreground px-5 py-2 font-medium text-background"
      >
        Tentar de novo
      </button>
    </main>
  );
}
