import React from "react";
import PropTypes from "prop-types";

/**
 * A reusable input component.
 *
 * @component
 * @param {string} label - The label for the input.
 * @param {string} type - The input type (e.g., "text", "email").
 * @param {string} name - The input's name attribute.
 * @param {string} id - The input's unique id.
 * @param {string} placeholder - The input's placeholder text.
 * @param {function} onChange - The function to handle input value changes.
 * @param {string} value - The current value of the input.
 * @returns {JSX.Element}
 */
const Input = ({ label, type, name, placeholder, onChange, value }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-base font-medium text-gray-900 text-start"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        required=""
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
