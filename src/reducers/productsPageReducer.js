import { ACTION_TYPES } from '../helpers/actions';

export const iState = {
  loading: false,
  products: [],
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return { ...state, loading: true };
    case ACTION_TYPES.FETCH_SUCCESS:
      return { ...state, products: action.payload, loading: false };
    case ACTION_TYPES.FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
