import { useState, useMemo } from 'react';

import Searchbar from '../searchbar/Searchbar';
import ImageGallery from '../imageGallery/ImageGallery';
import Button from '../button/Button';
import Loader from '../loader/Loader';
import useImageService from 'services/ImageService';

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
  };

  const onSearchImage = (e, searchText) => {
    e.preventDefault();

    setImages([]);
    setPage(1);
    setProcess('loading');

    searchImage(page, searchText).then(res => {
      setImages(res);
      setProcess('confirmed');
      setPage(page => page + 1);
    });
  };

  const onLoadMore = () => {
    setProcess('loading');
    setnewItemLoading(true);

    searchImage(page, searchText).then(res => {
      setImages([...images, ...res]);
      setProcess('confirmed');
      setPage(page => page + 1);
      setnewItemLoading(false);
    });
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

  console.log(process);

  return (
    <>
      <div className="app">
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
