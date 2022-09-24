import { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';

import { scrollToMax } from 'utils/functions';
import imageGalleryItem from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    scrollToMax();
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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = e => {
    if (e.target.tagName !== 'IMG') {
      setShowModal(false);
    }
  };

  return (
    <>
      <li onClick={() => openModal()} className={imageGalleryItem.item}>
        <img
          className={imageGalleryItem.itemImage}
          src={webformatURL}
          alt="someimage"
        />
      </li>
      {showModal && (
        <Modal
          onEscapePress={onEscapePress}
          closeModal={closeModal}
          largeImageURL={largeImageURL}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
