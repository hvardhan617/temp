import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { sendEvent } from '../../helper/EventTracker';
// import ImageViewer from '../Modal/ImageViewer';

const Description = ({ productDetails }) => {
  // const [showImageViewer, setImageViewer] = useState(false);
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    if (productDetails.length > 50) {
      setHideContent(true);
    }
  }, []);

  // const handleImageViewer = (toggle) => {
  //   document.body.style.overflow = 'scroll';
  //   setImageViewer(toggle);
  // };

  return (
    <div className="py-4">
      {/* <div
        className="grid grid-cols-2 gap-4 place-items-stretch"
        onClick={() => {
          mixpanel.track('Product Desc Image', {
            view: true,
          });
          setImageViewer(true);
        }}
      >
        {data.images.map((imgSrc, i) => {
          return <img src={imgSrc} key={i} className="rounded-md" />;
        })}
      </div> */}
      <div className="mt-4">
        {hideContent ? (
          <>
            {productDetails.details.substr(0, 150)}
            {productDetails.details.length > 150 && (
              <button
                className="border-2 border-zinc-400 w-full p-4 rounded-lg cursor-pointer"
                onClick={() => {
                  setHideContent(!hideContent);
                  sendEvent(hideContent ? 'Click_Description_Less' : 'Click_Description_More');
                }}
              >
                {hideContent ? 'Show More' : 'Show Less'}
              </button>
            )}
          </>
        ) : (
          <>
            {productDetails.details}
            {productDetails.details.length > 150 && (
              <button
                className="border-2 border-zinc-400 w-full p-4 rounded-lg cursor-pointer"
                onClick={() => {
                  setHideContent(!hideContent);
                  sendEvent(hideContent ? 'Description Show Less' : 'Description Show More');
                }}
              >
                {hideContent ? 'Show More' : 'Show Less'}
              </button>
            )}
          </>
        )}
      </div>
      {/* {showImageViewer ? (
        <ImageViewer images={data.images} handleImageViewer={handleImageViewer} />
      ) : null} */}
    </div>
  );
};

Description.propTypes = {
  productDetails: PropTypes.object,
};

export default Description;
