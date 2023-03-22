import { Rating } from './Rating';
import PropTypes from 'prop-types';

const CommentCard = ({
  customer,
  reviewerName,
  title,
  description,
  comment,
  rating,
  date,
  images,
  handleReview,
  index,
}) => {
  return (
    <div className="w-full p-5 border-[1px] border-zinc-200 rounded-lg">
      <div className="w-full flex flex-col justify-between border-b-[0.5px] border-zinc-200 pb-4">
        <div className="flex justify-between items-center w-full">
          <p className="text-sm font-semibold mb-1">{reviewerName}</p>
          <div className="text-xs text-zinc-700">{date.split('T')[0]}</div>
        </div>
        <Rating v2 count={parseInt(rating)} />
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <p className="font-semibold text-sm leading-3">{title}</p>
        <p className="text-xs text-zinc-500 font-light">{description}</p>
        <div className="flex gap-2">
          {images &&
            images.map((imgUrl, i) => {
              return (
                <img
                  src={imgUrl}
                  className="w-12 h-12 rounded-md object-contain"
                  key={i}
                  onClick={() =>
                    handleReview(index, { customer, title, comment, rating, date, images })
                  }
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  customer: PropTypes.string,
  rating: PropTypes.number,
  title: PropTypes.string,
  reviewerName: PropTypes.string,
  description: PropTypes.string,
  comment: PropTypes.string,
  date: PropTypes.string,
  images: PropTypes.array,
  handleReview: PropTypes.func,
  index: PropTypes.func,
};

export default CommentCard;
