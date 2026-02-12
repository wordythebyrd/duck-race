import type { HatType, EyewearType, NeckwearType } from '../../constants/accessories'

export function Hat({ type }: { type: HatType }) {
  switch (type) {
    case 'tophat':
      return (
        <g transform="translate(22, -2)">
          <rect x="-8" y="-16" width="16" height="14" rx="2" fill="#1a1a2e" />
          <rect x="-12" y="-4" width="24" height="4" rx="2" fill="#1a1a2e" />
          <rect x="-7" y="-6" width="14" height="2" fill="#c084fc" />
        </g>
      )
    case 'cowboy':
      return (
        <g transform="translate(22, 0)">
          <ellipse cx="0" cy="-2" rx="16" ry="4" fill="#92400e" />
          <path d="M-8,-2 Q-6,-16 0,-12 Q6,-16 8,-2" fill="#b45309" />
          <ellipse cx="0" cy="-2" rx="10" ry="3" fill="#b45309" />
        </g>
      )
    case 'party':
      return (
        <g transform="translate(22, -2)">
          <polygon points="0,-18 -8,-2 8,-2" fill="#f472b6" />
          <polygon points="0,-18 -6,-2 6,-2" fill="#fb923c" opacity="0.5" />
          <circle cx="0" cy="-18" r="3" fill="#fbbf24" />
          <circle cx="-4" cy="-8" r="1.5" fill="#22d3ee" />
          <circle cx="3" cy="-12" r="1.5" fill="#4ade80" />
        </g>
      )
    case 'crown':
      return (
        <g transform="translate(22, -2)">
          <path d="M-10,-2 L-10,-10 L-5,-6 L0,-14 L5,-6 L10,-10 L10,-2 Z" fill="#fbbf24" />
          <rect x="-10" y="-4" width="20" height="3" fill="#f59e0b" />
          <circle cx="-4" cy="-4" r="1.5" fill="#ef4444" />
          <circle cx="4" cy="-4" r="1.5" fill="#3b82f6" />
          <circle cx="0" cy="-10" r="1.5" fill="#22c55e" />
        </g>
      )
    case 'chef':
      return (
        <g transform="translate(22, -2)">
          <circle cx="-4" cy="-12" r="6" fill="white" />
          <circle cx="4" cy="-12" r="6" fill="white" />
          <circle cx="0" cy="-14" r="6" fill="white" />
          <rect x="-8" y="-4" width="16" height="4" rx="1" fill="white" />
        </g>
      )
    case 'pirate':
      return (
        <g transform="translate(22, -1)">
          <path d="M-10,-2 Q0,-14 10,-2" fill="#1a1a2e" />
          <rect x="-10" y="-3" width="20" height="3" fill="#1a1a2e" />
          <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="6">☠</text>
        </g>
      )
    case 'wizard':
      return (
        <g transform="translate(22, -2)">
          <polygon points="0,-22 -10,-2 10,-2" fill="#6366f1" />
          <rect x="-12" y="-4" width="24" height="4" rx="2" fill="#6366f1" />
          <text x="0" y="-8" textAnchor="middle" fill="#fbbf24" fontSize="7">★</text>
        </g>
      )
    case 'santa':
      return (
        <g transform="translate(22, -2)">
          <path d="M-8,-2 Q-4,-18 8,-12" fill="#ef4444" />
          <circle cx="8" cy="-12" r="4" fill="white" />
          <rect x="-10" y="-4" width="22" height="5" rx="2" fill="white" />
        </g>
      )
  }
}

export function Eyewear({ type }: { type: EyewearType }) {
  switch (type) {
    case 'sunglasses':
      return (
        <g transform="translate(29, 10)">
          <rect x="-2" y="-3" width="8" height="5" rx="1" fill="#1a1a2e" />
          <line x1="-2" y1="-1" x2="-5" y2="-2" stroke="#1a1a2e" strokeWidth="1.5" />
        </g>
      )
    case 'monocle':
      return (
        <g transform="translate(31, 9)">
          <circle cx="2" cy="0" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="2" y1="4" x2="0" y2="14" stroke="#fbbf24" strokeWidth="0.8" />
        </g>
      )
    case 'starglasses':
      return (
        <g transform="translate(29, 9)">
          <text x="3" y="3" textAnchor="middle" fill="#f472b6" fontSize="9">★</text>
          <line x1="-1" y1="0" x2="-5" y2="-1" stroke="#f472b6" strokeWidth="1.5" />
        </g>
      )
    case 'goggles':
      return (
        <g transform="translate(27, 8)">
          <ellipse cx="6" cy="1" rx="6" ry="4" fill="none" stroke="#64748b" strokeWidth="2" />
          <ellipse cx="6" cy="1" rx="4" ry="3" fill="#bfdbfe" opacity="0.4" />
          <line x1="0" y1="1" x2="-4" y2="0" stroke="#64748b" strokeWidth="2" />
        </g>
      )
  }
}

export function Neckwear({ type }: { type: NeckwearType }) {
  switch (type) {
    case 'bowtie':
      return (
        <g transform="translate(24, 24)">
          <polygon points="-6,-3 0,0 -6,3" fill="#ef4444" />
          <polygon points="6,-3 0,0 6,3" fill="#ef4444" />
          <circle cx="0" cy="0" r="1.5" fill="#b91c1c" />
        </g>
      )
    case 'scarf':
      return (
        <g transform="translate(22, 23)">
          <path d="M-4,0 Q8,4 12,0 Q14,6 10,8 L6,6 Q4,10 2,8 L-2,4 Z" fill="#ef4444" />
          <path d="M-4,0 Q8,2 12,0" fill="none" stroke="#dc2626" strokeWidth="0.5" />
        </g>
      )
    case 'pearls':
      return (
        <g transform="translate(22, 24)">
          {[0, 4, 8, 12].map((x) => (
            <circle key={x} cx={x - 2} cy={0} r="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
          ))}
        </g>
      )
    case 'medal':
      return (
        <g transform="translate(20, 22)">
          <line x1="6" y1="0" x2="6" y2="8" stroke="#3b82f6" strokeWidth="2" />
          <circle cx="6" cy="12" r="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
          <text x="6" y="14" textAnchor="middle" fill="#92400e" fontSize="5">★</text>
        </g>
      )
  }
}

export function Cape() {
  return (
    <g transform="translate(8, 14)">
      <path d="M0,0 Q-8,10 -4,22 L4,20 Q6,10 2,0 Z" fill="#ef4444" opacity="0.85" />
      <path d="M0,0 Q-6,8 -4,22" fill="none" stroke="#dc2626" strokeWidth="0.5" />
    </g>
  )
}
