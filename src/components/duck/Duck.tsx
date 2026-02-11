import DuckBody from './DuckBody'
import { Hat, Eyewear, Neckwear, Cape } from './DuckAccessory'
import type { Duck as DuckType } from '../../stores/raceStore'

interface DuckProps {
  duck: DuckType
  size?: number
}

export default function Duck({ duck, size = 40 }: DuckProps) {
  const scale = size / 40

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ transform: `scale(${scale > 1 ? 1 : 1})`, overflow: 'visible' }}
    >
      {duck.hasCape && <Cape />}
      <DuckBody color={duck.color} />
      {duck.hat && <Hat type={duck.hat} />}
      {duck.eyewear && <Eyewear type={duck.eyewear} />}
      {duck.neckwear && <Neckwear type={duck.neckwear} />}
    </svg>
  )
}
