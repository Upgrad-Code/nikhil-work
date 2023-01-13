import { ACTION_TYPES } from '../helpers/actions';

export const iState = {
  loading: false,
  products: [],
  cart: [],
  error: null,
  pageNum: 1,
  prodsLimit: 25,
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
    case ACTION_TYPES.UPDATE_PAGE_NUMBER:
      return { ...state, pageNum: action.payload };
    case ACTION_TYPES.ADD_TO_CART:
      return {
        ...state,
        cart: state.cart.concat(action.payload),
      };
    case ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload),
      };
    case ACTION_TYPES.UPDATE_PRODUCT_QTY:
      return {
        ...state,
        cart: state.cart.filter((cp) =>
          cp.id === action.payload.id
            ? (cp.quantity = action.payload.quantity)
            : 1
        ),
      };
    default:
      return state;
  }
};
