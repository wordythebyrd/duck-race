import type { DuckColor } from '../../constants/colors'

interface DuckBodyProps {
  color: DuckColor
}

export default function DuckBody({ color }: DuckBodyProps) {
  return (
    <g>
      {/* Water splash/wake behind duck */}
      <g className="duck-wake" opacity="0.5">
        <ellipse cx="-2" cy="30" rx="6" ry="2.5" fill="white" opacity="0.3" />
        <ellipse cx="-6" cy="29" rx="3" ry="1.5" fill="white" opacity="0.2" />
        <ellipse cx="-8" cy="31" rx="2" ry="1" fill="white" opacity="0.15" />
      </g>

      {/* Water line - duck sits in water */}
      <ellipse cx="18" cy="31" rx="18" ry="4" fill="rgba(255,255,255,0.15)" />

      {/* Tail feathers - more defined */}
      <path d="M1,18 Q-4,12 -1,7 Q2,11 1,15" fill={color.body} opacity="0.8" />
      <path d="M2,20 Q-3,16 0,11 Q3,15 2,19" fill={color.body} opacity="0.6" />

      {/* Body - slightly rounder, lower for swimming look */}
      <ellipse cx="18" cy="23" rx="16" ry="11" fill={color.body} />

      {/* Belly - visible above waterline */}
      <ellipse cx="20" cy="26" rx="11" ry="7" fill={color.belly} />

      {/* Wing - more detailed with feather lines */}
      <ellipse cx="13" cy="21" rx="7" ry="9" fill={color.body} opacity="0.85"
        transform="rotate(-12, 13, 21)" />
      <path d="M8,17 Q13,15 16,18" fill="none" stroke={color.belly} strokeWidth="0.5" opacity="0.6" />
      <path d="M9,20 Q13,18 16,20" fill="none" stroke={color.belly} strokeWidth="0.5" opacity="0.5" />

      {/* Neck */}
      <ellipse cx="24" cy="16" rx="6" ry="7" fill={color.body} />

      {/* Head - slightly larger and rounder */}
      <circle cx="26" cy="10" r="10" fill={color.body} />

      {/* Cheek blush */}
      <circle cx="28" cy="14" r="3" fill={color.belly} opacity="0.5" />

      {/* Eye - more expressive with highlight */}
      <circle cx="30" cy="8" r="3" fill="white" />
      <circle cx="31" cy="7.5" r="2" fill="#1a1a2e" />
      <circle cx="31.5" cy="7" r="0.8" fill="white" />
      {/* Eyelid hint */}
      <path d="M28,6.5 Q30,5.5 32,6.5" fill="none" stroke={color.body} strokeWidth="1" opacity="0.4" />

      {/* Beak - more defined with upper/lower */}
      <path d="M34,10 L42,9 L36,12 Z" fill="#FF8C00" />
      <path d="M34,12 L40,11 L36,14 Z" fill="#E67E00" />
      {/* Nostril */}
      <circle cx="37" cy="10" r="0.5" fill="#CC6600" />

      {/* Feet paddling under water - subtle */}
      <g opacity="0.35">
        <path d="M14,32 L10,36 L8,34 L12,32 Z" fill="#FF8C00" className="duck-paddle-left" />
        <path d="M22,32 L18,36 L16,34 L20,32 Z" fill="#FF8C00" className="duck-paddle-right" />
      </g>
    </g>
  )
}
