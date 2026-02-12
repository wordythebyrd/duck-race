import DuckBody from './DuckBody'
import { Hat, Eyewear, Neckwear, Cape } from './DuckAccessory'
import type { Duck as DuckType } from '../../stores/raceStore'

interface DuckProps {
  duck: DuckType
  size?: number
}

export default function Duck({ duck, size = 48 }: DuckProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-10 -4 55 44"
      style={{ overflow: 'visible' }}
    >
      {duck.hasCape && <Cape />}
      <DuckBody color={duck.color} />
      {duck.hat && <Hat type={duck.hat} />}
      {duck.eyewear && <Eyewear type={duck.eyewear} />}
      {duck.neckwear && <Neckwear type={duck.neckwear} />}
    </svg>
  )
}
