import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loader.scss';

export const Loader = () => {
  return (
    <div className="nk_loader_wrap">
      <div className="nk_loader">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};
