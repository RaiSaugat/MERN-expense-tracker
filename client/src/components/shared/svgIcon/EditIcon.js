import React from 'react';
import PropTypes from 'prop-types';

function EditIcon({ fill }) {
  return (
    <svg
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
      <path d="M0 0h48v48h-48z" fill="none" />
    </svg>
  );
}

EditIcon.propTypes = {
  fill: PropTypes.string,
};

EditIcon.defaultProps = {
  fill: '#1d1d1d',
};
export default EditIcon;
