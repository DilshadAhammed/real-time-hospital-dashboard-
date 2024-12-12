import React, { useState, useEffect } from 'react';

const Alert = ({ message, isError , onClose }) => {
  const [show, setShow] = useState(true); // Initialize to true

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false); // Hide immediately
        if (onClose) onClose();
      }, 3000);

      // Cleanup the timer on unmount or when show changes
      return () => clearTimeout(timer);
    }
  }, [show]);

  // Handle close button click
  const handleClose = () => {
    setShow(false); // Hide immediately
    if (onClose) onClose();
  };

  return (
    <div
      className={`${
        show ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-x-full -translate-y-full opacity-0'
      } fixed top-4 left-4 ${ isError ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded shadow-lg transition-transform duration-500 ease-out`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={handleClose} className="ml-4 text-white font-bold">
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
