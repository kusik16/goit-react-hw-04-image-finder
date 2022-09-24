import { useState, useEffect } from 'react';

import Searchbar from '../searchbar/Searchbar';
import ImageGallery from '../imageGallery/ImageGallery';
import Button from '../button/Button';
import Loader from '../loader/Loader';
import useImageService from 'services/ImageService';

import app from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const { getImages, process } = useImageService();

  const handleSearchSubmit = (e, searchText) => {
    e.preventDefault();
    setImages([]);
    setPage(1);
    setSearchText(searchText);
  };
  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    const searchImage = searchText => {
      getImages(page, searchText).then(res => {
        setImages(s => (s = [...s, ...res]));
      });
    };
    searchImage(searchText);
    // eslint-disable-next-line
  }, [page, searchText]);

  return (
    <>
      <div className={app.app}>
        <Searchbar onSearchSubmit={handleSearchSubmit} />
        {(process === 'ok' || process === 'loading') && (
          <ImageGallery images={images} />
        )}
        {images.length > 1 && process !== 'loading' && (
          <Button onLoadMore={onLoadMore} />
        )}
        {process === 'loading' && <Loader />}
      </div>
    </>
  );
};

export default App;
