/** Faixa de nós da rede do Hero: o teto evita pesar em telas grandes. */
export const NETWORK_MIN_NODES = 28
export const NETWORK_MAX_NODES = 70

const AREA_PER_NODE = 14000

export function networkNodeCount(width: number, height: number): number {
  const count = Math.round((width * height) / AREA_PER_NODE)
  if (!Number.isFinite(count)) return NETWORK_MIN_NODES
  return Math.min(NETWORK_MAX_NODES, Math.max(NETWORK_MIN_NODES, count))
}
