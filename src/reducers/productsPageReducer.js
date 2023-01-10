import { ACTION_TYPES } from '../helpers/actions';

export const iState = {
  isLoading: false,
  products: [],
  isError: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return state;
    case ACTION_TYPES.FETCH_SUCCESS:
      return state;
    case ACTION_TYPES.FETCH_ERROR:
      return state;
    default:
      return state;
  }
};
