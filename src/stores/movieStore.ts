import {action, makeObservable, observable} from 'mobx';

class MovieStore {
  movies = <any>[];
  favMovies = <any>[];
  filteredData = <any>[];
  searchValue: string = '';

  constructor() {
    makeObservable(this, {
      movies: observable,
      setMovies: action,
      favMovies: observable,
      setFavMovies: action,
      filteredData: observable,
      setFilteredData: action,
      searchValue: observable,
      setSearchValue: action,
    });
  }
  setMovies(newValue: any) {
    this.movies = newValue;
  }
  setFavMovies(newValue: any) {
    this.favMovies = newValue;
  }
  setFilteredData(newValue: any) {
    this.filteredData = newValue;
  }
  setSearchValue(newValue: any) {
    this.searchValue = newValue;
  }
}

export const movieStore = new MovieStore();
