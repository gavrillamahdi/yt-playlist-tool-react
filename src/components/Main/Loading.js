import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ width: '10vmax', height: '10vmax' }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loading;
