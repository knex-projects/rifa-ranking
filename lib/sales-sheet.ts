import { cacheLife } from "next/cache";
import { parseSalesSheet, type Seller } from "./ranking";

// The Sales Sheet, published to the web as CSV (File → Share → Publish to web).
const SALES_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRElqbvXf2xk8914_Qqhs3gmRsf6xKvxsz9Co1185iTUIZL9-7IJM2eX9BYlW9zEoRAHePa6nFZLIqJ/pub?gid=0&single=true&output=csv";

export type SalesSheet = {
  sellers: Seller[];
  /** Last Checked: when the Sales Sheet was read, as an ISO string. */
  checkedAt: string;
};

export async function getSalesSheet(): Promise<SalesSheet> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 60 * 60 });

  const response = await fetch(SALES_SHEET_CSV_URL);
  if (!response.ok) {
    throw new Error(`Could not read the Sales Sheet (HTTP ${response.status})`);
  }

  return {
    sellers: parseSalesSheet(await response.text()),
    checkedAt: new Date().toISOString(),
  };
}
