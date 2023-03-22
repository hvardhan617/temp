import PropTypes from 'prop-types';
import { sendEvent } from '../../helper/EventTracker';

export const Rating = ({ v2, count = 5, ratingCount = 10 }) => {
  const getStars = (count) => {
    let stars = [];
    for (let index = 0; index < count; index++) {
      stars.push(<StarIcon />);
    }
    return stars;
  };

  if (v2) {
    return <div className="ratingLayout text-yellow-400">{getStars(count)}</div>;
  }

  return (
    <div
      className="flex gap-2 items-center text-sm cursor-pointer"
      onClick={() => {
        document.getElementById('reviewSection').scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
        sendEvent('Click_Ratings');
      }}
    >
      <p className="font-bold text-slate-800">{count}</p>
      <div className="flex gap-1 items-center text-yellow-400">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <p className="text-zinc-400 font-semibold">
        {ratingCount} <span className="font-normal">Ratings</span>
      </p>
    </div>
  );
};

Rating.propTypes = {
  v2: PropTypes.bool,
  count: PropTypes.number,
  ratingCount: PropTypes.number,
};

const StarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
};
