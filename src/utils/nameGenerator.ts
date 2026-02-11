import { pick } from './random'

const TITLES = [
  'Sir', 'Captain', 'Doctor', 'Professor', 'Lord', 'Lady', 'Baron', 'Duke',
  'General', 'Admiral', 'Agent', 'King', 'Queen', 'Prince', 'Princess',
]

const FIRST_NAMES = [
  'Quackers', 'Waddles', 'Feathers', 'Puddles', 'Bubbles', 'Wiggles',
  'Nibbles', 'Squeaky', 'Flapper', 'Ducky', 'Splashy', 'Cheeks',
  'Biscuit', 'Nugget', 'Pepper', 'Maple', 'Pickles', 'Waffles',
  'Muffin', 'Noodle', 'Tater', 'Beans', 'Sprout', 'Pebbles',
]

const SUFFIXES = [
  'the Bold', 'the Brave', 'the Swift', 'the Mighty', 'the Great',
  'the Fluffy', 'the Magnificent', 'the Terrible', 'the Wise',
  'Jr.', 'III', 'IV', 'Esq.', 'PhD', 'DDS',
  'von Quackenstein', 'McFeathers', 'de la Pond',
]

export function generateDuckName(): string {
  const useTitle = Math.random() < 0.6
  const useSuffix = Math.random() < 0.5

  const parts: string[] = []
  if (useTitle) parts.push(pick(TITLES))
  parts.push(pick(FIRST_NAMES))
  if (useSuffix) parts.push(pick(SUFFIXES))

  return parts.join(' ')
}
