import React from 'react';
import PropTypes from 'prop-types';

const CardPemesanan = ({
  title = "Hello World",
  description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed porro, mollitia soluta, dignissimos labore ab magni temporibus sequi maiores.",
  image = null,
  imageAlt = "Profile Picture",
  containerClassName = "flex flex-col max-w-md m-12 relative", // Ditambahkan relative
  cardClassName = "flex flex-col rounded-full sm:flex-row border border-gray-700 py-1 px-1 w-full text-center sm:text-left",
  imageContainerClassName = "absolute -left-4 top-1/2 transform -translate-y-1/2 w-20 h-20", // Dimodifikasi untuk posisi absolute
  imageClassName = "w-full h-full rounded-full object-cover", // Class baru untuk gambar
  contentClassName = "flex flex-col py-2 pl-20 pr-2", // Ditambahkan padding-left untuk mengakomodasi gambar
  titleClassName = "text-lg font-light",
  descriptionClassName = "text-sm font-hairline"
}) => {
  return (
    <div className={containerClassName}>
      <div className={cardClassName}>
        {image ? (
          <div className={imageContainerClassName}>
            <img 
              src={image} 
              alt={imageAlt}
              className={imageClassName}
            />
          </div>
        ) : (
          <div className={`${imageContainerClassName} bg-gray-400 rounded-full`} />
        )}
        <div className={contentClassName}>
          <h4 className={titleClassName}>{title}</h4>
          <p className={descriptionClassName}>{description}</p>
        </div>
      </div>
    </div>
  );
};

CardPemesanan.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  containerClassName: PropTypes.string,
  cardClassName: PropTypes.string,
  imageContainerClassName: PropTypes.string,
  imageClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  descriptionClassName: PropTypes.string
};

export default CardPemesanan;