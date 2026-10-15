"use client";

import { useSyncExternalStore } from "react";

const TICK_MS = 10_000;

// Rounded to the tick so the snapshot stays stable between renders.
const getNow = () => Math.floor(Date.now() / TICK_MS) * TICK_MS;
const getServerNow = () => null;

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, TICK_MS);
  return () => clearInterval(id);
}

const relativeTime = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

function formatSince(checkedAt: Date, now: number) {
  const seconds = Math.max(0, Math.round((now - checkedAt.getTime()) / 1000));
  if (seconds < 60) return "há poucos segundos";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return relativeTime.format(-minutes, "minute");
  return relativeTime.format(-Math.round(minutes / 60), "hour");
}

export function LastChecked({ checkedAt }: { checkedAt: string }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const date = new Date(checkedAt);

  return (
    <time dateTime={checkedAt} title={date.toLocaleString("pt-BR")}>
      Atualizado {now === null ? "agora" : formatSince(date, now)}
    </time>
  );
}
