import axios from 'axios';
import {movieStore} from '../stores/movieStore';

export const getLocalStorage = () => {
  const storage: any = [];
  const keys: any = Object.keys(localStorage).filter(
    (name) => name !== 'jwt',
  );
  let i: number = keys.length;
  while (i--) {
    let item: any = localStorage.getItem(keys[i]);
    storage.push(JSON.parse(item));
  }
  movieStore.setFavMovies(storage);
};

export const clickFunction = (name: string) => {
  const isFav = movieStore.favMovies.filter(
    (movie: any) => movie.title === name,
  );
  if (isFav.length !== 0) {
    const unFavMovie = movieStore.favMovies.filter(
      (movies: any) => movies.title !== name,
    );
    movieStore.setFavMovies(unFavMovie);
    localStorage.removeItem(name);
  } else {
    const movie = movieStore.movies.filter(
      (movie: any) => movie.title === name,
    );
    movieStore.setFavMovies([...movieStore.favMovies, movie[0]]);
    localStorage.setItem(name, JSON.stringify(movie[0]));
  }
};

export const filterdata = () => {
  const filtered = movieStore.movies.filter((movie: any) =>
    movie.title
      .toLowerCase()
      .includes(movieStore.searchValue.toLowerCase()),
  );
  movieStore.setFilteredData(filtered);
};

export const getPostsFromApi = async () => {
  await axios
    .get(
      'https://api.themoviedb.org/3/movie/popular/?api_key=2b697242dc7c04c8bed4d10fcb480f87',
    )
    .then(async (response) => {
      movieStore.setMovies(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
};
