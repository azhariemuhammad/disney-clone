import { useAtomValue } from 'jotai'
import { List } from '../components/MovieList'
import { watchListAtom } from '../atom/watchlistAtom'

export const WatchListPage = () => {
  const watchList = useAtomValue(watchListAtom)

  return (
    <div className='container container-sm-padding container-sm-margin'>
      <div className='top-rated'>
        <h2>Watchlist</h2>
        <List movies={watchList} />
      </div>
    </div>
  )
}
