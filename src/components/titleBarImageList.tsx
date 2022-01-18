import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Grid, ImageListItemBar, ListSubheader} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React from 'react';
import {movieStore} from '../stores/movieStore';
import {clickFunction} from '../utils';

export const TitlebarImageList = (props: any) => {
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
                    {movieStore.favMovies.filter(
                      (movie: any) => item.title === movie.title,
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
