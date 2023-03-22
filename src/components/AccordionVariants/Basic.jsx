import PropTypes from 'prop-types';

const Basic = ({ data }) => {
  return (
    <div>
      <ul className="list-disc px-5">
        {/* {data.content.map((d, i) => {
          return (
            <li key={i} className="text-xs text-zinc-600 mt-4">
              {d}
            </li>
          );
        })} */}
        <li className="text-xs text-zinc-600 mt-4">{data}</li>
      </ul>
    </div>
  );
};

Basic.propTypes = {
  data: PropTypes.object,
};

export default Basic;
