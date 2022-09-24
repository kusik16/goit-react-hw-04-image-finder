import PropTypes from 'prop-types';
import { useState } from 'react';

import searchbar from './Searchbar.module.css';

const Searchbar = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState('');

  return (
    <header className={searchbar.header}>
      <form onSubmit={e => onSearchSubmit(e, query)} className={searchbar.form}>
        <button type="submit" className={searchbar.btn}>
          <span className={searchbar.btnLabel}>Search</span>
        </button>

        <input
          onChange={e => setQuery(e.target.value)}
          className={searchbar.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
