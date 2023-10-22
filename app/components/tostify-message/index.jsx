import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

/**
 * A toast message component that displays a temporary message with a close icon.
 *
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} className - Additional CSS classes for styling the toast.
 * @param {Function} setState - A function to update the state controlling the toast's visibility.
 * @param {number} duration=3000 - The duration in milliseconds for how long the toast is displayed.
 *
 * @example
 * // Example usage of TostifyMessage component
 * <TostifyMessage
 *   message="This is a toast message."
 *   className="custom-toast"
 *   setState={yourStateSetter}
 *   duration={5000}
 * />
 */
const TostifyMessage = ({ message, className, setState, duration = 3000 }) => {
  // Handle close function for closing the popup by clicking the cross icon
  const handleClose = () => {
    setState(false);
  };

  // This hook is for setTimeOut that how much time popup will show
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(false);
    }, duration);

    // Cleanup the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [duration, setState]);

  return (
    <div
      className={`absolute bg-red-600 text-gray-100 text-lg py-6 px-12 text-center top-20 left-0 z-10 ${className}`}
    >
      <span>{message}</span>
      {/* <button className="float-right" onClick={handleClose}> */}
      <FaTimes
        onClick={handleClose}
        className="absolute top-2 right-2 cursor-pointer"
      />
      {/* </button> */}
    </div>
  );
};

TostifyMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  setState: PropTypes.func.isRequired,
  duration: PropTypes.number, // Optional prop
};

TostifyMessage.defaultProps = {
  duration: 3000, // Default value for duration
};

export default TostifyMessage;
