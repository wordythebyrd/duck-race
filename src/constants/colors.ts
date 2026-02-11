export const DUCK_COLORS = [
  { name: 'Yellow', body: '#FFD700', belly: '#FFF3B0' },
  { name: 'Coral', body: '#FF6B6B', belly: '#FFB3B3' },
  { name: 'Teal', body: '#2DD4BF', belly: '#99F6E4' },
  { name: 'Lavender', body: '#A78BFA', belly: '#DDD6FE' },
  { name: 'Sky Blue', body: '#38BDF8', belly: '#BAE6FD' },
  { name: 'Pink', body: '#F472B6', belly: '#FBCFE8' },
  { name: 'Cyan', body: '#22D3EE', belly: '#A5F3FC' },
  { name: 'Orange', body: '#FB923C', belly: '#FED7AA' },
  { name: 'Green', body: '#4ADE80', belly: '#BBF7D0' },
  { name: 'Gold', body: '#FBBF24', belly: '#FDE68A' },
  { name: 'Purple', body: '#C084FC', belly: '#E9D5FF' },
  { name: 'Turquoise', body: '#2EC4B6', belly: '#99E2D0' },
] as const

export type DuckColor = (typeof DUCK_COLORS)[number]
