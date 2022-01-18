import {Grid} from '@mui/material';
import {observer} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {Spinner} from 'react-bootstrap';
import {NavigatonBar} from './components/navBar';
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
      <NavigatonBar />
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
