import { useAtom } from 'jotai'
import { Movie } from '../types'
import { watchListAtom } from '../atom/watchlistAtom'

type WatchList = Pick<Movie, 'id' | 'title' | 'poster_path' | 'overview'>

const useWatchList = () => {
  const [watchList, setWatchList] = useAtom(watchListAtom)

  const addToWatchList = (item: WatchList) => {
    const updatedWatchList = [...watchList, item].filter((item: WatchList) => item.id)
    setWatchList(updatedWatchList)
  }

  const removeFromWatchList = (itemId: string) => {
    const updatedWatchList = watchList.filter((item: WatchList) => String(item.id) !== itemId)
    setWatchList(updatedWatchList)
  }

  const checkIfWatched = (itemId: string) => {
    return watchList.some((item: WatchList) => String(item.id) === itemId)
  }

  return {
    addToWatchList,
    removeFromWatchList,
    checkIfWatched,
  }
}

export default useWatchList
