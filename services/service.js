import axios from 'axios';

const api_Url = 'https://api.themoviedb.org/3';
const api_Key = 'api_key=5efaa7e32f262fdb1d8af6957cc0feb2';

export const getPopularMovies = async () => {
  const res = await axios.get(`${api_Url}/movie/popular?${api_Key}`);
  return res.data.results;
};

export const getUpcomigMovies = async () => {
  const res = await axios.get(`${api_Url}/movie/upcoming?${api_Key}`);
  return res.data.results;
};

export const getTop_ratedMovies = async () => {
  const res = await axios.get(`${api_Url}/movie/top_rated?${api_Key}`);
  return res.data.results;
};
export const getPopularTv = async () => {
  const res = await axios.get(`${api_Url}/tv/popular?${api_Key}`);
  return res.data.results;
};

// Get Family Movies
export const getFamilyMovies = async () => {
  const res = await axios.get(
    `${api_Url}/discover/movie?${api_Key}&with_genres=10751`,
  );
  return res.data.results;
};

// Get Documnetery Movies
export const getDocumentaryMovies = async () => {
  const res = await axios.get(
    `${api_Url}/discover/movie?${api_Key}&with_genres=99`,
  );
  return res.data.results;
};
export const getMovieDetail = async (id) => {
  const res = await axios.get(
    `${api_Url}/movie/${id}?${api_Key}`,
  );
  return res.data;
};

export const searchMovie = async (query) => {
  const res = await axios.get(`${api_Url}/search/movie?query=${query}&include_adult=false&language=en-US&page=1?${api_Key}`);
  return res.data.results;
}
