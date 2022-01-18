import SearchIcon from '@mui/icons-material/Search';
import React, {FunctionComponent} from 'react';
import {movieStore} from '../stores/movieStore';

export const NavigatonBar: FunctionComponent<any> = () => {
  return (
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
  );
};
