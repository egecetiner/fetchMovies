import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import {Grid} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';

const App = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [favMovies, setFavMovies] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    getPostsFromApi();
  }, []);

  useEffect(() => {
    filterdata();
  }, [searchValue, movies]);

  useEffect(() => {
    getLocalStorage();
  }, [movies]);

  const getLocalStorage = () => {
    const storage: any = [];
    const keys: any = Object.keys(localStorage).filter(
      (name) => name !== 'jwt',
    );
    let i: number = keys.length;
    while (i--) {
      let item: any = localStorage.getItem(keys[i]);
      storage.push(JSON.parse(item));
    }
    setFavMovies(storage);
  };

  const filterdata = () => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const clickFunction = (name: string) => {
    const isFav = favMovies.filter((movie) => movie.title === name);
    if (isFav.length !== 0) {
      const unFavMovie = favMovies.filter(
        (movies) => movies.title !== name,
      );
      setFavMovies(unFavMovie);
      localStorage.removeItem(name);
    } else {
      const movie = movies.filter((movie) => movie.title === name);
      setFavMovies([...favMovies, movie[0]]);
      localStorage.setItem(name, JSON.stringify(movie[0]));
    }
  };

  const TitlebarImageList = (props: any) => {
    const itemData = props.itemData;
    const name = props.name;

    return (
      <ImageList sx={{alignItems: 'center', justifyContent: 'center'}}>
        <Grid
          sx={{
            width: '201%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 2.2,
          }}
          container
          spacing={2}>
          <Grid item xs={12} md={12}>
            <ImageListItem key='Subheader'>
              <ListSubheader
                className='bg-warning text-dark w-100 py-2 text-center '
                component='div'
                sx={{
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                {name}
              </ListSubheader>
            </ImageListItem>
          </Grid>
          {itemData.map((item: any) => (
            <Grid
              item
              key={item.id}
              xs={name === 'Movies' ? 6 : 6}
              sm={name === 'Movies' ? 4 : 4}
              md={name === 'Movies' ? 4 : 8}
              xl={name === 'Movies' ? 3 : 6}>
              <ImageListItem key={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}?w=248&fit=crop&auto=format`}
                  srcSet={`https://image.tmdb.org/t/p/original/${item.poster_path}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading='lazy'
                />
                <ImageListItemBar
                  title={item.title}
                  actionIcon={
                    <IconButton
                      sx={{color: 'white'}}
                      onClick={() => {
                        clickFunction(item.title);
                      }}>
                      {favMovies.filter(
                        (movie) => item.title === movie.title,
                      ).length !== 0 ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Grid>
          ))}
        </Grid>
      </ImageList>
    );
  };

  const getPostsFromApi = async () => {
    await axios
      .get(
        'https://api.themoviedb.org/3/movie/popular/?api_key=2b697242dc7c04c8bed4d10fcb480f87',
      )
      .then(async (response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <nav className='navbar bg-dark navbar-expand-sm navbar-dark sticky-top mt-0 justify-content-around'>
        <a href='#element_target' className='badge badge-warning'>
          Go to Favourites
        </a>

        <form className='d-flex justify-content-center align-items-center  '>
          <SearchIcon sx={{color: 'white', marginRight: 1}}></SearchIcon>
          <input
            className='pt-1 px-2 '
            value={searchValue}
            onChange={(event: any) => setSearchValue(event.target.value)}
            placeholder='Search Movie...'
          />
        </form>
      </nav>
      <Grid sx={{justifyContent: 'center'}} container spacing={2}>
        <Grid
          style={{
            backgroundColor: '#c9c9c4',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
          item
          sm={12}
          md={8}
          lg={9}>
          {movies.length === 0 ? (
            <Spinner
              className='align-self-center'
              animation='border'
              role='status'></Spinner>
          ) : (
            <TitlebarImageList
              itemData={filteredData}
              name={'Movies'}></TitlebarImageList>
          )}
        </Grid>
        <Grid
          style={{
            backgroundColor: '#f0f0f0',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
          item
          id='element_target'
          sm={12}
          md={4}
          lg={3}>
          <TitlebarImageList
            itemData={favMovies}
            name={'Favourite Movies'}></TitlebarImageList>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
