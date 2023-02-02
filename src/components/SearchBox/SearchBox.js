import React, { useContext } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { ACTION_TYPES } from '../../helpers/actions';
import './SearchBox.scss';

import { ProductsContext } from '../../contexts/productsContext';

export const SearchBox = (props) => {
  const { state, dispatch } = useContext(ProductsContext);
  // console.log(state, dispatch);
  const { searchPram } = state;

  const searchProductHandler = (e) => {
    dispatch({
      type: ACTION_TYPES.UPDATE_SEARCH_PRAM,
      payload: e.target.value,
    });
  };
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label={props.label}
        className="mb-3"
      >
        <Form.Control type="text" onChange={(e) => searchProductHandler(e)} />
      </FloatingLabel>
    </>
  );
};
