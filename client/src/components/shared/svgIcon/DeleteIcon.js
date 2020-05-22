import React from 'react';
import PropTypes from 'prop-types';

function DeleteIcon({ fill }) {
  return (
    <svg
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z" />
      <path d="M0 0h48v48h-48z" fill="none" />
    </svg>
  );
}

DeleteIcon.propTypes = {
  fill: PropTypes.string,
};

DeleteIcon.defaultProps = {
  fill: '#1d1d1d',
};
export default DeleteIcon;
