import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useState } from 'react';

const Featured = ({ data }) => {
  const [index, setIndex] = useState(0);
  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  if (data.images.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-5 px-6">
      <p className="font-semibold">{data.title[0]}</p>
      <div className="text-center">
        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
          <div className="flex">
            {data.images.map((imgSrc, i) => {
              return (
                <img
                  src={imgSrc.url}
                  className="mx-auto h-16 w-20 object-contain"
                  // className="mx-auto object-contain"
                  draggable="false"
                  key={i}
                />
              );
            })}
          </div>
        </SwipeableViews>
      </div>
      {false && (
        <div className="flex justify-center gap-2">
          {data.images.map((im, i) => {
            return (
              <div
                key={i}
                className={`rounded-full h-2 w-2 ${
                  index === i ? 'bg-zinc-700' : 'bg-zinc-300'
                } cursor-pointer`}
                onClick={() => {
                  setIndex(i);
                }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Featured.propTypes = {
  data: PropTypes.object,
};

export default Featured;
