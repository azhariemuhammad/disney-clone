import { atomWithStorage } from 'jotai/utils'
import { Movie } from '../types'

export const watchListAtom = atomWithStorage<Movie[]>('watchList', [])
