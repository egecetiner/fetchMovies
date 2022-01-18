import SearchIcon from '@mui/icons-material/Search';
import {Grid} from '@mui/material';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {Spinner} from 'react-bootstrap';
import {TitlebarImageList} from './components/titleBarImageList';
import {movieStore} from './stores/movieStore';
import {filterdata, getLocalStorage, getPostsFromApi} from './utils';

const App = observer(() => {
  useEffect(() => {
    getPostsFromApi();
    getLocalStorage();
  }, []);

  useEffect(() => {
    filterdata();
  }, [movieStore.searchValue, movieStore.movies]);

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
            value={movieStore.searchValue}
            onChange={(event: any) =>
              movieStore.setSearchValue(event.target.value)
            }
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
          {movieStore.movies.length === 0 ? (
            <Spinner
              className='align-self-center'
              animation='border'
              role='status'></Spinner>
          ) : (
            <TitlebarImageList
              itemData={movieStore.filteredData}
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
            itemData={movieStore.favMovies}
            name={'Favourite Movies'}></TitlebarImageList>
        </Grid>
      </Grid>
    </div>
  );
});

export default App;
