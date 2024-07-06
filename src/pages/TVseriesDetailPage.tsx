import { useEffect, useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Season, TVSeriesDetail } from '../types'
import { MovieContentDetail } from '../components/MovieContentDetail'
import { tmdbApiKey } from '../config'
import { Tabs, Tab } from '../components/Tab'
import LazyImage from '../components/LazyImage'
import './tvSeriesDetailPage.css'

const fetchTVseriesById = async (id: string): Promise<TVSeriesDetail> => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${tmdbApiKey}`)
  const data = await response.json()
  return data
}

const fetchTVSeriesSeasons = async (id: string, seasonNumber: number): Promise<Season> => {
  const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${tmdbApiKey}`)
  const data = await response.json()
  return data
}

export const TVseriesDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedSeason, setSelectedSeason] = useState(0)

  const [{ data: tvSeries, isLoading }, { data: seasons }] = useQueries({
    queries: [
      { queryKey: [{ id }], queryFn: () => fetchTVseriesById(id || '') },
      {
        queryKey: [{ id, seasonNumber: selectedSeason }],
        queryFn: () => fetchTVSeriesSeasons(id || '', selectedSeason),
      },
    ],
  })

  const seasonsData = tvSeries?.seasons
  const episodes = seasons?.episodes

  useEffect(() => {
    if (seasonsData) {
      setSelectedSeason(seasonsData[0].season_number)
    }
  }, [seasonsData])

  return (
    <div className='container container-sm-padding container-sm-margin'>
      {isLoading ? (
        <div className='spinner'></div>
      ) : tvSeries ? (
        <>
          <MovieContentDetail tvSeries={tvSeries} />
          <div>
            <Tabs>
              {seasonsData?.map((season, index) => (
                <Tab key={index} label={season.name} onClick={() => setSelectedSeason(season.season_number)}>
                  {episodes?.map((episode, index) => (
                    <div key={index} className='episode-container'>
                      <LazyImage
                        src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                        alt={episode.name}
                        sx={{ width: '100%' }}
                      ></LazyImage>
                      <div>
                        <h2>{episode.name}</h2>
                        <p>Air date: {episode.air_date}</p>
                        <p>Duration: {episode.runtime} minutes</p>
                        <p>
                          <span>Season {episode.season_number}</span> <span>Episode {episode.episode_number}</span>
                        </p>
                        <p className='overview'>{episode.overview}</p>
                      </div>
                    </div>
                  ))}
                </Tab>
              ))}
            </Tabs>
          </div>
        </>
      ) : (
        <p className='error-text'>Error fetching data</p>
      )}
    </div>
  )
}
