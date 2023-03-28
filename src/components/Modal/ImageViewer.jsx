import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { ProductContext } from '../../context/ProductContext';
import { Rating } from '../MicroUI/Rating';
import CancelIcon from '../Icons/CrossIcon';

const ImageViewer = ({ images, review, handleImageViewer, userImages }) => {
  const [index, setIndex] = useState(0);

  const { globalState } = useContext(ProductContext);
  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-40 flex flex-col items-center justify-center w-full h-screen bg-black bg-opacity-90">
      <div className="w-full lg:max-w-[65%] h-screen flex flex-col justify-center items-center gap-4">
        <div className="flex items-start justify-between w-full px-4 lg:px-0">
          <div>
            <p className="text-sm font-semibold text-white lg:w-full">
              {globalState.productDetails.title}
            </p>
            <div
              className="mt-2 ratingLayout"
              onClick={() =>
                document.getElementById('reviewSection').scrollIntoView({
                  block: 'start',
                  behavior: 'smooth',
                })
              }
            >
              <p className="text-lg font-semibold text-white">4.5</p>
              <Rating v2 count={5} />
            </div>
          </div>
          <div className="px-2 text-zinc-200" onClick={() => handleImageViewer(false)}>
            <CancelIcon />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex justify-center w-full">
            <div className="w-[50vh]">
              <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                {images.map((url, i) => {
                  return (
                    <img
                      src={url}
                      className="w-[50vh] h-[50vh] select-none lg:mx-1 object-contain"
                      key={i}
                    />
                  );
                })}
              </SwipeableViews>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 px-4 lg:px-0">
            {userImages && (
              <p className="text-white">{images.length} images images uploaded by customers</p>
            )}
            <div className="flex overflow-scroll lg:flex-wrap gap-2 max-w-[525px]">
              {images.map((url, i) => {
                return (
                  <img
                    src={url}
                    className={`w-[10vh] h-[10vh] object-contain rounded-lg cursor-pointer border-[1px]  ${
                      i === index ? 'border-zinc-400' : 'border-transparent'
                    }`}
                    onClick={() => setIndex(i)}
                    key={i}
                  />
                );
              })}
            </div>
            {false && (
              <div className="p-5 border-[1px] border-zinc-200 rounded-lg">
                <div className="flex justify-between border-b-[0.5px] border-zinc-200 pb-4">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-white">
                      {review.review.customer}
                    </p>
                    <Rating v2 count={review.review.rating} />
                  </div>
                  <div className="text-xs text-white">{review.review.date}</div>
                </div>
                {
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-white">{review.review.title}</p>
                    <p className="mt-2 text-xs font-light text-white">{review.review.comment}</p>
                  </div>
                }{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ImageViewer.propTypes = {
  images: PropTypes.array,
  handleImageViewer: PropTypes.func,
  userImages: PropTypes.bool,
  review: PropTypes.object,
};

export default ImageViewer;
