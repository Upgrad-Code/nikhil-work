import { ACTION_TYPES } from '../helpers/actions';

export const iState = {
  isLoading: false,
  jsonPlaceholderData: [],
  isError: null,
  jsonPlaceholderPram: 'posts',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        jsonPlaceholderData: action.payload,
        isLoading: false,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return {
        ...state,
        isError: action.payload,
        isLoading: false,
      };
    case ACTION_TYPES.UPDATE_JSONPLACEHOLDER_PRAM:
      return {
        ...state,
        jsonPlaceholderPram: action.payload,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
