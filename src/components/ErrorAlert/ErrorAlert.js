import React from 'react';

export const ErrorAlert = (props) => {
  return (
    <div className="error__alert">
      <div className="alert alert-danger" role="alert">
        {props.data}
      </div>
    </div>
  );
};
