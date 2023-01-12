import { ACTION_TYPES } from '../helpers/actions';

export const iState = {
  loading: false,
  products: [],
  error: null,
  pageNum: 1,
  prodsLimit: 10,
  prodsTotal: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return { ...state, loading: true };
    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        prodsTotal: action.payload.total,
        loading: false,
      };
    case ACTION_TYPES.FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    // case ACTION_TYPES.UPDATE_PAGE_NUMBER:
    //   return { ...state, pageNum: action.payload };
    // case ACTION_TYPES.INCREASE_PAGE_NUMBER:
    //   return { ...state, pageNum: action.payload };
    default:
      return state;
  }
};
