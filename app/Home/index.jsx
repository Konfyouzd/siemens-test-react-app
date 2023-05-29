import React, { useState, useCallback, useEffect } from 'react';
import Helmet from 'react-helmet';

import LoadingSpinner from 'common/components/LoadingSpinner';
import { onError } from 'common/functions/error';

import ImageViewer from './components/ImageViewer';
import getMetadata from './fetch/getMetadata';
import imageMetadataAttributes from './imageMetadataAttributes';
import { getThumbnailImageUrl, getFullsizeImageUrl } from './utils';

const Home = () => {
  // Constants
  const numThumbnailsToDisplay = 4;

  // State variables
  const [thumbnailWindowStart, setThumbnailWindowStart] = useState(0);
  const [imagesMetadata, setImagesMetadata] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Run query to retrieve image metadata on page load
  useEffect(() => {
    const onSuccessCallback = (response) => {
      const metadata = response;
      setImagesMetadata(metadata);
      setLoading(false);
    };

    const onErrorCallback = (error) => {
      onError(error);
      setLoading(false);
    };

    getMetadata()
      .then(onSuccessCallback)
      .catch(onErrorCallback);
  }, []);

  // Callbacks for navigating the thumbnail viewer
  const onNext = useCallback(() => setThumbnailWindowStart(thumbnailWindowStart + numThumbnailsToDisplay), [thumbnailWindowStart]);
  const onPrevious = useCallback(() => setThumbnailWindowStart(thumbnailWindowStart - numThumbnailsToDisplay), [thumbnailWindowStart]);

  // Determine the state of the thumbnail explorer
  const nextDisabled = (imagesMetadata.length - thumbnailWindowStart) <= numThumbnailsToDisplay;
  const previousDisabled = (thumbnailWindowStart < numThumbnailsToDisplay);

  let thumbnailWindowEnd = thumbnailWindowStart + numThumbnailsToDisplay;
  if (thumbnailWindowEnd > imagesMetadata.length) {
    thumbnailWindowEnd = imagesMetadata.length;
  }

  // Display a loading spinner while querying metadata
  if (loading) {
    return (
      <div className="loading-spinner-container">
        <Helmet title="Code Development Project" />
        <LoadingSpinner />
      </div>
    );
  }

  if (!imagesMetadata || !imagesMetadata.length) {
    return (
      <div className="loading-spinner-container">
        <Helmet title="Code Development Project" />
        <h1>No images found</h1>
      </div>
    );
  }

  /*
    I am  not sure why, but the fact that this component has its own internal hooks for specific state management seems to cause a
    runtime console warning. This only happens when I add a useState() hook to the <img /> tags to display a placeholder until they've
    finished loading.

    It seemed reasonable to handle this within the Thumbnail object since an unknown number of them can be displayed and managing which
    have loaded individually seems cumbersome and prone to error.  Because this object does not render until after the query runs and
    we determine that we actually have metadata, its own internal state management hooks constitute a changing of the number of hooks
    rendered since the previous render.

    I have attemped a couple of refactors to mitigate this already to no avail and abandoned spending more time on debugging this
    because I wanted to make sure that I finished the remainder of the full stack effort in a reasonable amount of time. Since this
    error does not produce any user experience issues, I consider it a reasonable trade off to add debugging the console warning to
    the project backlog.
  */

  return (
    <>
      <Helmet title="Code Development Project" />
      <ImageViewer header="Code Development Project">
        <ImageViewer.MainImageContainer imageSrc={getFullsizeImageUrl(imagesMetadata[activeImage].image)}>
          {
            imageMetadataAttributes.map(({ key, title }) => (
              <ImageViewer.MainImageDetail title={title}>
                {imagesMetadata[activeImage][key]}
              </ImageViewer.MainImageDetail>
            ))
          }
        </ImageViewer.MainImageContainer>
        <ImageViewer.ThumbnailContainer
          previousDisabled={previousDisabled}
          nextDisabled={nextDisabled}
          onNext={onNext}
          onPrevious={onPrevious}
        >
          {
            imagesMetadata
              .slice(thumbnailWindowStart, thumbnailWindowEnd)
              .map((item, index) => {
                const trueIndex = thumbnailWindowStart + index;
                const className = activeImage === (trueIndex) ? 'active' : '';
                return (
                  <ImageViewer.Thumbnail
                    id={item.id}
                    key={trueIndex}
                    onClick={() => setActiveImage(trueIndex)}
                    title={item.title}
                    className={className}
                    imageSrc={getThumbnailImageUrl(imagesMetadata[trueIndex].thumbnail)}
                  />
                );
              })
          }
        </ImageViewer.ThumbnailContainer>
      </ImageViewer>
    </>
  );
};

export default Home;
