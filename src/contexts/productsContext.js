import React, { createContext, useReducer } from 'react';
import { iState, reducer } from '../reducers/productsPageReducer';

export const ProductsContext = createContext(null);

export const ProductsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, iState);
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
