import PropTypes from 'prop-types';

const Basic = ({ data }) => {
  return (
    <div>
      <ul className="px-5 list-disc">
        {/* {data.content.map((d, i) => {
          return (
            <li key={i} className="mt-4 text-xs text-zinc-600">
              {d}
            </li>
          );
        })} */}
        <li className="mt-4 text-xs text-zinc-600">{data}</li>
      </ul>
    </div>
  );
};

Basic.propTypes = {
  data: PropTypes.string,
};

export default Basic;
