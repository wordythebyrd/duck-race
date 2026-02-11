import type { DuckColor } from '../../constants/colors'

interface DuckBodyProps {
  color: DuckColor
}

export default function DuckBody({ color }: DuckBodyProps) {
  return (
    <g>
      {/* Body */}
      <ellipse cx="18" cy="24" rx="16" ry="12" fill={color.body} />
      {/* Belly */}
      <ellipse cx="20" cy="28" rx="10" ry="7" fill={color.belly} />
      {/* Head */}
      <circle cx="22" cy="12" r="10" fill={color.body} />
      {/* Eye */}
      <circle cx="27" cy="10" r="2.5" fill="white" />
      <circle cx="28" cy="9.5" r="1.5" fill="#1a1a2e" />
      <circle cx="28.5" cy="9" r="0.6" fill="white" />
      {/* Beak */}
      <path d="M30,14 L38,13 L30,17 Z" fill="#FF8C00" />
      {/* Wing */}
      <ellipse cx="14" cy="22" rx="6" ry="8" fill={color.body} opacity="0.8"
        transform="rotate(-15, 14, 22)" />
      {/* Tail feathers */}
      <path d="M2,18 Q-2,14 0,10 Q4,14 2,18" fill={color.body} opacity="0.7" />
    </g>
  )
}
