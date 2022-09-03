import { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';

import './imageGalleryItem.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', onEscapePress, false);

    return () => {
      document.removeEventListener('keydown', onEscapePress, false);
    };
  }, []);

  const onEscapePress = e => {
    if (e.key === 'Escape') {
      setShowModal(false);
    }
  };

  const handleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <li onClick={() => handleModal()} className="gallery__item">
        <img
          className="gallery__item_image"
          src={webformatURL}
          alt="someimage"
        />
      </li>
      {showModal ? (
        <Modal
          onEscapePress={onEscapePress}
          handleModal={handleModal}
          largeImageURL={largeImageURL}
        />
      ) : null}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
