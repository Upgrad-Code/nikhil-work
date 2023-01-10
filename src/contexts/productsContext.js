import React, { createContext } from 'react';
import { iState, reducer } from '../reducers/productsPageReducer';

export const ProductsContext = createContext(null);

export const ProductsContextProvider = (props) => {
  return (
    <ProductsContext.Provider value={{ iState, reducer }}>
      {props.children}
    </ProductsContext.Provider>
  );
};
