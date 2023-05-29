import React, { useState } from 'react';
import PropTypes from 'proptypes';

import instructionsPDF from '../instructions.pdf';

/**
  This is a loading indicator specifically for ImageViewer images.
  This can be moved to common/components if it proves useful elsewhere in the application
  @size - An object dictacting the size of the dots with shape { radius: string, gap: string }
  @className - Image styling class as string
  @imageLoaded - Image loading status as boolean
 */
const ImageLoadingIndicator = ({ size, className, imageLoaded }) => {
  const { gap, radius } = size;

  if (imageLoaded) {
    return null;
  }

  return (
    <div className={className}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', gap }}>
          <div className="spinner-grow text-secondary" role="status" style={{ width: radius, height: radius }} />
          <div className="spinner-grow text-secondary" role="status" style={{ width: radius, height: radius }} />
          <div className="spinner-grow text-secondary" role="status" style={{ width: radius, height: radius }} />
        </div>
      </div>
    </div>
  );
};

const sizes = {
  SMALL: { radius: '1rem', gap: '7px' },
  LARGE: { radius: '2rem', gap: '11px' },
};

ImageLoadingIndicator.size = sizes;
ImageLoadingIndicator.propTypes = {
  className: PropTypes.string.isRequired,
  imageLoaded: PropTypes.bool.isRequired,
  size: PropTypes.shape({
    radius: PropTypes.string.isRequired,
    gap: PropTypes.string.isRequired,
  }).isRequired,
};

/**
  This component constructs the individual detail lines that display next to the current selected image
  @title - The detail line label as string
  @children - The metadata details as string
 */
const ImageViewerMainImageDetail = ({ title, children }) => (
  <p>
    <strong>{title}</strong>
    {` ${children}`}
  </p>
);

ImageViewerMainImageDetail.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

/**
  This component constructs the container for the current selected image and its details
  @imageSrc - The image URL as string
  @children - An array of type InterviewerMainImageDetail
 */
const ImageViewerMainImageContainer = ({ imageSrc, children }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const onImageLoad = () => setImageLoaded(true);
  return (
    <div id="large">
      <div className="group">
        <ImageLoadingIndicator
          className="img"
          imageLoaded={imageLoaded}
          size={ImageLoadingIndicator.size.LARGE}
        />
        <img
          src={imageSrc}
          alt="Large"
          width="430"
          height="360"
          onLoad={onImageLoad}
          style={{ display: imageLoaded ? 'flex' : 'none' }}
        />
        <div className="details">
          {children}
        </div>
      </div>
    </div>
  );
};

ImageViewerMainImageContainer.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(ImageViewerMainImageDetail).isRequired,
};

/**
  This component constructs a thumbnail
  @className - Thumbnail styling class as string
  @onClick - Thumbnail onClick event function
  @title - Thumbnail label as string
  @id - Thumbnail ID as string
  @imageSrc - Thumbnail URL as string
 */
const ImageViewerThumbnail = ({ className, onClick, title, id, imageSrc }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <a
      href="#"
      onClick={onClick}
      title={title}
      className={className}
    >
      <ImageLoadingIndicator
        className="img"
        imageLoaded={imageLoaded}
        size={ImageLoadingIndicator.size.SMALL}
        style={{ display: imageLoaded ? 'none' : 'flex' }}
      />
      <img
        src={imageSrc}
        alt={`${id}-m`}
        width="145"
        height="121"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'flex' : 'none' }}
      />
      <span>{id.substring(0, 4)}</span>
    </a>
  );
};

ImageViewerThumbnail.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

ImageViewerThumbnail.defaultProps = {
  className: null,
};

/**
  This component constructs the navigation button(s) for the thumbnail panel
  @disabled - The button's active/disabled state as boolean
  @title - The HTML title as string
  @className - Button styling class as string
  @onClick - Button onClick event function
 */
const ImageViewerNavButton = ({ disabled, title, className, onClick }) => {
  if (disabled) {
    return (
      <span
        className={`${className} disabled`}
        title={title}
      >
        {title}
      </span>
    );
  }

  return (
    <a
      href="#"
      onClick={onClick}
      className={className}
      title={title}
    >
      {title}
    </a>
  );
};

ImageViewerNavButton.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ImageViewerNavButton.defaultProps = {
  disabled: false,
  onClick: null, // It is not clickable when disable; this avoids console errors
};

/**
  This component constructs the thumbnail explorer panel
  @previousDisabled - The previous button's active/disabled state as boolean
  @nextDisabled - The next button's active/disabled state as boolean
  @onPrevious - The previous button's onClick event function
  @onNext - The next button's onClick event function
  @children - Array of type ImageViewerThumbnail
 */
const ImageViewerThumbnailContainer = ({ previousDisabled, nextDisabled, onNext, onPrevious, children }) => (
  <div className="thumbnails">
    <div className="group">
      {children}
      <ImageViewerNavButton
        title="Previous"
        className="previous"
        disabled={previousDisabled}
        onClick={onPrevious}
      />
      <ImageViewerNavButton
        title="Next"
        className="next"
        disabled={nextDisabled}
        onClick={onNext}
      />
    </div>
  </div>
);

ImageViewerThumbnailContainer.propTypes = {
  previousDisabled: PropTypes.bool.isRequired,
  nextDisabled: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(ImageViewerThumbnail).isRequired,
};

/**
  This image cosntructs the main ImageViewer container
  @header - The ImageViewer's header as string
  @children - A main image container and a thumbnail container (See PropType definition)
 */
const ImageViewer = ({ header, children }) => (
  <div id="container">
    <header>{header}</header>
    <div id="main" role="main">
      {children}
    </div>
    <footer>
      <a href={instructionsPDF}>Download PDF Instructions</a>
    </footer>
  </div>
);

ImageViewer.MainImageDetail = ImageViewerMainImageDetail;
ImageViewer.MainImageContainer = ImageViewerMainImageContainer;
ImageViewer.Thumbnail = ImageViewerThumbnail;
ImageViewer.ThumbnailContainer = ImageViewerThumbnailContainer;

ImageViewer.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      mainImageContainer: ImageViewerMainImageContainer,
      thumbnailContainer: ImageViewerThumbnailContainer,
    }),
  ).isRequired,
};

export default ImageViewer;
