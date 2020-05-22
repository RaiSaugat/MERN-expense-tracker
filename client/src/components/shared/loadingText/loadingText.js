import React from 'react';
import PropTypes from 'prop-types';

import loadingStyles from './loadingText.module.scss';

function LoadingText({ text }) {
  return (
    <div className={loadingStyles.loadingText}>
      <p>{text}</p>
    </div>
  );
}

LoadingText.propTypes = {
  text: PropTypes.string,
  loaderSize: PropTypes.number,
};

LoadingText.defaultProps = {
  text: '',
  loaderSize: 30,
};
export default LoadingText;
