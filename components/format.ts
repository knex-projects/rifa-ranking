const number = new Intl.NumberFormat("pt-BR");

export function formatTickets(count: number) {
  return `${number.format(count)} ${count === 1 ? "bilhete" : "bilhetes"}`;
}
