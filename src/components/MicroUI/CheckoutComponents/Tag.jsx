import PropTypes from 'prop-types';

const Tag = ({ title, styles }) => {
  return (
    <div
      className={` bg-green-600 p-1 px-2 text-white -skew-x-[15deg] text-center font-semibold rounded-b-md  ${
        styles ? styles : 'w-28 text-[12px] h-6'
      }`}
    >
      {title}
    </div>
  );
};

Tag.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.string,
};

export default Tag;
