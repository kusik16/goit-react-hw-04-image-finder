import { useState, useMemo } from 'react';

import Searchbar from '../searchbar/Searchbar';
import ImageGallery from '../imageGallery/ImageGallery';
import Button from '../button/Button';
import Loader from '../loader/Loader';
import useImageService from 'services/ImageService';

import app from './App.module.css';

const setContent = (process, Component, ButtonComponent, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return null;
    case 'loading':
      return newItemLoading ? (
        <>
          <Component />
          <Loader />
        </>
      ) : (
        <Loader />
      );
    case 'confirmed':
      return (
        <>
          <Component />
          <ButtonComponent />
        </>
      );
    case 'error':
      return <div>error</div>;
    default:
      throw new Error('Unexpected process state');
  }
};

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { searchImage, process, setProcess } = useImageService();

  const handleSearch = e => {
    setSearchText(e.target.value);
    if (e.target.value !== searchText) {
      setPage(1);
    }
  };

  const scrollToMax = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    window.scrollBy({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  const onSearchImage = (e, searchText) => {
    e.preventDefault();

    setImages([]);
    setPage(1);
    setProcess('loading');

    searchImage(page, searchText)
      .then(res => {
        setImages(res);
        setProcess('confirmed');
        setPage(page => page + 1);
      })
      .catch(() =>
        this.setState({
          process: 'error',
        })
      );
  };

  const onLoadMore = () => {
    setProcess('loading');
    setnewItemLoading(true);

    searchImage(page, searchText)
      .then(res => {
        setImages([...images, ...res]);
        setProcess('confirmed');
        setPage(page => page + 1);
        setnewItemLoading(false);
      })
      .then(() =>
        setTimeout(() => {
          scrollToMax();
        }, 100)
      )
      .catch(() =>
        this.setState({
          process: 'error',
        })
      );
  };

  const elements = useMemo(() => {
    return setContent(
      process,
      () => <ImageGallery images={images} />,
      () => <Button onLoadMore={onLoadMore} />,
      newItemLoading
    );
    // eslint-disable-next-line
  }, [process]);

  return (
    <>
      <div className={app.app}>
        <Searchbar
          searchText={searchText}
          handleSearch={handleSearch}
          onSearchImage={onSearchImage}
        />
        {elements}
      </div>
    </>
  );
};

export default App;
