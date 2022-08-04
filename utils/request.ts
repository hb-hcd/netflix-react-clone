const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

const requests = {
    //https://api.themoviedb.org/3/trending/all/week?api_key=25ef82cbb3ce4fe15a52d9899117b1fb
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-CA`,
    //https://api.themoviedb.org/3/discover/tv?api_key=25ef82cbb3ce4fe15a52d9899117b1fb&language=en-CA&page=1&with_networks=213
    //fetchNetflixOriginals:"https://api.themoviedb.org/3/discover/movie?api_key=25ef82cbb3ce4fe15a52d9899117b1fb&language=en-CA&page=1&with_networks=213",
    fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-CA&page=1&with_networks=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
}

export default requests