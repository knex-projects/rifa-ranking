// Domain terms (Seller, Ranking, Position, Podium, Field…) are defined in CONTEXT.md.

export type Seller = {
  id: string;
  fullName: string;
  displayName: string;
  initials: string;
  photoSrc: string | null;
  ticketsSold: number;
};

export type RankedSeller = Seller & { position: number };

export type PodiumStep = { position: number; sellers: RankedSeller[] };

export type Ranking = {
  podium: PodiumStep[];
  field: RankedSeller[];
  teamTotal: number;
};

const PODIUM_POSITIONS = 3;

const COLUMNS = {
  id: "id",
  fullName: "participante",
  ticketsSold: "quantidade vendida",
  photoName: "photo_name",
} as const;

export function parseSalesSheet(csv: string): Seller[] {
  const [header, ...rows] = parseCsv(csv);
  if (!header) return [];

  const columnIndex = (name: string) => {
    const index = header.findIndex((cell) => cell.trim().toLowerCase() === name);
    if (index === -1) throw new Error(`Sales Sheet is missing the "${name}" column`);
    return index;
  };
  const idAt = columnIndex(COLUMNS.id);
  const fullNameAt = columnIndex(COLUMNS.fullName);
  const ticketsSoldAt = columnIndex(COLUMNS.ticketsSold);
  const photoNameAt = columnIndex(COLUMNS.photoName);

  return rows
    .map((row) =>
      toSeller(row[idAt] ?? "", row[fullNameAt] ?? "", row[ticketsSoldAt] ?? "", row[photoNameAt] ?? ""),
    )
    .filter((seller): seller is Seller => seller !== null);
}

export function rankSellers(sellers: Seller[]): Ranking {
  const ordered = [...sellers].sort(
    (a, b) => b.ticketsSold - a.ticketsSold || a.displayName.localeCompare(b.displayName, "pt-BR"),
  );

  // Ties share a Position and the next one skips past them: 1, 2, 2, 4.
  const ranked = ordered.map(
    (seller): RankedSeller => ({
      ...seller,
      position: ordered.findIndex((other) => other.ticketsSold === seller.ticketsSold) + 1,
    }),
  );

  const isOnPodium = (seller: RankedSeller) =>
    seller.position <= PODIUM_POSITIONS && seller.ticketsSold > 0;

  const podium: PodiumStep[] = [];
  for (const seller of ranked.filter(isOnPodium)) {
    const step = podium.find((s) => s.position === seller.position);
    if (step) step.sellers.push(seller);
    else podium.push({ position: seller.position, sellers: [seller] });
  }

  return {
    podium,
    field: ranked.filter((seller) => !isOnPodium(seller)),
    teamTotal: sellers.reduce((total, seller) => total + seller.ticketsSold, 0),
  };
}

function toSeller(
  rawId: string,
  rawFullName: string,
  rawTicketsSold: string,
  rawPhotoName: string,
): Seller | null {
  // Only rows with a Seller ID are Sellers; anything else is a stray row.
  const id = rawId.trim();
  const fullName = rawFullName.trim().replace(/\s+/g, " ");
  if (!id || !fullName) return null;

  const words = fullName.split(" ");
  const photoName = rawPhotoName.trim().toLowerCase().replace(/\.png$/, "");
  const ticketsSold = rawTicketsSold.trim();

  return {
    id,
    fullName,
    displayName: words.slice(0, 2).join(" "),
    initials: words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase(),
    photoSrc: photoName ? `/assets/team/${photoName}.png` : null,
    // A blank or non-numeric quantity counts as zero.
    ticketsSold: /^\d+$/.test(ticketsSold) ? Number(ticketsSold) : 0,
  };
}

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (inQuotes) {
      if (char === '"' && csv[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && csv[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) rows.push([...row, cell]);

  return rows;
}
