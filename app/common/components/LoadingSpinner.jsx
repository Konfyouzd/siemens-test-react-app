import React from 'react';

const spinnerSize = '8rem';
const LoadingSpinner = () => (
  <div
    className="spinner-border text-secondary"
    role="status"
    style={{
      width: spinnerSize,
      height: spinnerSize,
    }}
  />
);

export default LoadingSpinner;
