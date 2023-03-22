import PropTypes from 'prop-types';
import { useState } from 'react';
import { sendEvent } from '../../helper/EventTracker';

const Accordion = ({ title, children, type }) => {
  // const [extraContent, setExtraContent] = useState([]);
  const [isOpen, setIsOpen] = useState(type === 'reviews' ? true : false);

  return (
    <div
      className="flex flex-col border-b-[1px] first:border-t-[1px] border-zinc-100 p-4 px-6 cursor-pointer"
      id={type === 'reviews' ? 'reviewSection' : 'accordion'}
    >
      <div
        className="flex justify-between items-center"
        onClick={() => {
          setIsOpen(!isOpen);
          sendEvent(isOpen ? `${title} Opened` : `${title} Opened`);
        }}
      >
        <p className="font-semibold select-none">{title}</p>
        <button
          className={`text-2xl ease-in-out ${isOpen ? '-rotate-45' : 'rotate-0'}`}
          onClick={() => {
            setIsOpen(!isOpen);
            sendEvent(isOpen ? `${title} Opened` : `${title} Opened`);
          }}
        >
          <span className="">+</span>
        </button>
      </div>
      <div
        className={`flex flex-col gap-4  duration-1000 ease-in-out ${
          isOpen ? 'max-h-max' : 'max-h-0 overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
};

export default Accordion;
