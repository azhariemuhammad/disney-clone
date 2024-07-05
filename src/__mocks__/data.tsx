export const moviesQuery = {
  data: {
    results: [
      {
        id: 1,
        title: 'Movie 1',
        poster_path: '/poster_path/movie1.jpg',
        backdrop_path: '/backdrop_path/movie1.jpg',
        vote_average: 8.2,
        overview: 'Overview of movie 1',
        release_date: '2022-01-01',
      },
      {
        id: 2,
        title: 'Movie 2',
        poster_path: '/poster_path/movie2.jpg',
        backdrop_path: '/backdrop_path/movie2.jpg',
        vote_average: 7.8,
        overview: 'Overview of movie 2',
        release_date: '2022-02-01',
      },
    ],
  },
  isLoading: false,
  error: null,
}

export const tvSeriesQuery = {
  data: {
    results: [
      {
        id: 1,
        title: 'TV Series 1',
        poster_path: '/poster_path/tvSeries1.jpg',
        backdrop_path: '/backdrop_path/tvSeries1.jpg',
        vote_average: 8.2,
        overview: 'Overview of tv series 1',
        release_date: '2022-01-01',
      },
      {
        id: 2,
        title: 'TV Series 2',
        poster_path: '/poster_path/tvSeries2.jpg',
        backdrop_path: '/backdrop_path/tvSeries2.jpg',
        vote_average: 7.8,
        overview: 'Overview of tv series 2',
        release_date: '2022-02-01',
      },
    ],
  },
  isLoading: false,
  error: null,
}
