import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { ProductContext } from '../../context/ProductContext';
import { sendEvent } from '../../helper/EventTracker';

const ImageSlider = () => {
  const { globalState } = useContext(ProductContext);
  const selectedVariant = globalState.selectedVariant;

  const handleChangeIndex = (index) => {
    sendEvent('Click_Image_Scroll', {
      source: 'Man matters 1',
      Imgindex: index,
    });

    let vEle = document.getElementsByTagName('video');
    let tempVideos = [...vEle];
    tempVideos.map((ele) => ele.pause());

    if (index === globalState.productDetails.media.length + 1) {
      setIndex(1);
      return;
    }

    if (index === 0) {
      setIndex(globalState.productDetails.media.length);
      return;
    }

    console.log(index);

    setIndex(index);
  };

  useEffect(() => {
    globalState.productDetails.media.map((img, i) => {
      if (selectedVariant.media.length > 0) {
        if (img.url === selectedVariant.media[0].url) {
          setIndex(i + 1);
        }
      }
    });
  }, [selectedVariant]);

  const [index, setIndex] = useState(1);

  return (
    <div className="lg:w-[32vw] lg:max-w-[768px] xl:w-[36vw] xl:max-w-[768px]">
      <div className="w-full px-4 mx-auto my-4 rounded-xl text-center relative overflow-hidden">
        <div className="flex justify-center">
          <div>
            {globalState.productDetails.media.length === 1 ? (
              <img
                src={globalState.productDetails.media[0].url}
                className="w-full aspect-square rounded-xl select-none object-contain p-1 bg-clip-padding"
              />
            ) : (
              <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                <div className=""></div>
                {globalState.productDetails.media.map((asset, i) => {
                  if (asset.type === 'video') {
                    return (
                      <video
                        src={asset.url}
                        id="videoPlayer"
                        className="w-full aspect-square rounded-xl select-none object-contain p-1 bg-clip-padding"
                        key={i}
                        controls
                      />
                    );
                  }
                  return (
                    <img
                      src={asset.url}
                      className="w-full aspect-square rounded-xl select-none object-contain p-1 bg-clip-padding"
                      key={i}
                    />
                  );
                })}
                <div className=""></div>
              </SwipeableViews>
            )}
          </div>
        </div>
        <div className="hidden absolute lg:flex justify-between w-[95%] top-[45%] px-6">
          <button
            className={`bg-opacity-40 bg-black rounded-full h-10 w-10`}
            onClick={() => handleChangeIndex(index - 1)}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto text-white"
            >
              <path
                d="M7 13L1 7L7 1"
                stroke="#D2D2D2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={`bg-opacity-40 bg-black rounded-full h-10 w-10`}
            onClick={() => handleChangeIndex(index + 1)}
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                d="M1 13L7 7L1 1"
                stroke="#D2D2D2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="absolute md:hidden lg:hidden right-7 bottom-4 bg-zinc-800 text-white text-[10px] font-extralight p-1 px-2 rounded-md bg-opacity-80 flex items-center justify-center gap-2">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_986)">
              <path
                d="M8.51221 1.323H2.60841C2.14262 1.323 1.76501 1.7006 1.76501 2.1664V8.0702C1.76501 8.53599 2.14262 8.91359 2.60841 8.91359H8.51221C8.97801 8.91359 9.35561 8.53599 9.35561 8.0702V2.1664C9.35561 1.7006 8.97801 1.323 8.51221 1.323Z"
                stroke="white"
                strokeWidth="0.843399"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.08433 4.27487C4.43368 4.27487 4.71688 3.99166 4.71688 3.64232C4.71688 3.29297 4.43368 3.00977 4.08433 3.00977C3.73498 3.00977 3.45178 3.29297 3.45178 3.64232C3.45178 3.99166 3.73498 4.27487 4.08433 4.27487Z"
                stroke="white"
                strokeWidth="0.843399"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.35566 6.3834L7.24716 4.2749L2.60846 8.9136"
                stroke="white"
                strokeWidth="0.843399"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_986">
                <rect
                  width="10.1208"
                  height="10.1208"
                  fill="white"
                  transform="translate(0.499939 0.0581055)"
                />
              </clipPath>
            </defs>
          </svg>
          <p>
            {index} / {globalState.productDetails.media.length}
          </p>
        </div>
      </div>
      {globalState.productDetails.media.length > 1 && (
        <div className="w-[60vw] h-1 rounded-lg bg-zinc-200 mx-auto flex justify-center lg:hidden my-4">
          {globalState.productDetails.media.map((url, i) => {
            return (
              <div
                className={`w-full h-1 rounded-lg bg-zinc-700   ease-in-out  ${
                  index === i + 1 ? ' opacity-100' : ' opacity-0'
                }`}
                key={i}
              ></div>
            );
          })}
        </div>
      )}
      <div className="hidden lg:flex gap-2 lg:max-w-[768px] overflow-scroll mx-4 relative">
        {globalState.productDetails.media.map((asset, i) => {
          if (asset.type === 'video') {
            return (
              <div className="w-20 h-20 flex" key={i}>
                <div className="w-20 h-20">
                  <video
                    src={asset.url}
                    className={`w-20 h-20 rounded-lg cursor-pointer border-[1px] object-contain ${
                      index === i + 1 ? 'border-zinc-400' : 'border-zinc-100'
                    }`}
                    onClick={() => setIndex(i + 1)}
                    key={i}
                  />
                </div>
                <div
                  className="absolute w-20 h-20 top-0 bg-black bg-opacity-20 text-white grid place-items-center rounded-md cursor-pointer"
                  onClick={() => setIndex(i + 1)}
                >
                  <PlayIcon />
                </div>
              </div>
            );
          }
          return (
            <img
              src={asset.url}
              className={`w-20 h-20 top-0 right-0 left-0 bottom-0 rounded-lg cursor-pointer border-[1px] object-contain ${
                index === i + 1 ? 'border-zinc-400' : 'border-zinc-100'
              }`}
              onClick={() => setIndex(i + 1)}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.array,
};

export default ImageSlider;

const PlayIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-10 h-10"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
        clipRule="evenodd"
      />
    </svg>
  );
};
