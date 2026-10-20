const number = new Intl.NumberFormat("pt-BR");

export function formatNumber(count: number) {
  return number.format(count);
}

export function salesLabel(count: number) {
  return count === 1 ? "Venda" : "Vendas";
}

export function formatSales(count: number) {
  return `${formatNumber(count)} ${salesLabel(count)}`;
}
