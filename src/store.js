import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
};

// Reducers
const productReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
};

const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return state;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
};

// Actions
export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get("https://dummyjson.com/products");
  dispatch({
    type: "FETCH_PRODUCTS",
    payload: res.data,
  });
};

export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

// Combine Reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

// Store
export const store = createStore(rootReducer, applyMiddleware(thunk));
