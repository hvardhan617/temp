import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { sendEvent } from '../../helper/EventTracker';

const Overview = ({ data }) => {
  const listEle = useRef();
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    if (data.length > 4) {
      setHideContent(true);
    }
  }, []);

  return (
    <div>
      {data && (
        <div>
          <p className="text-lg font-semibold mt-4">{data.header}</p>
          <div>
            <ul className="list-disc p-5 pt-2" ref={listEle}>
              {hideContent
                ? data.slice(0, 4).map((d, i) => {
                    return (
                      <li key={i} className="text-sm mt-4">
                        <span className="font-semibold">{d}</span>
                        {d.text}
                      </li>
                    );
                  })
                : data.map((d, i) => {
                    return (
                      <li key={i} className="text-sm mt-4">
                        <span className="font-semibold">{d}</span>
                        {d.text}
                      </li>
                    );
                  })}
            </ul>
            {data.length > 4 && (
              <button
                className="border-2 border-zinc-400 w-full p-4 rounded-lg cursor-pointer mb-4"
                onClick={() => {
                  setHideContent(!hideContent);
                  sendEvent(hideContent ? 'Click_Overview_Show_Less' : 'Click_Overview_Show_More');
                }}
              >
                {hideContent ? 'Show More' : 'Show Less'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Overview.propTypes = {
  data: PropTypes.array,
};

export default Overview;
