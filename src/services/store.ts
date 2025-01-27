import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsSliceName,
  ingredientsReducer
} from './ingredients/ingredientsSlice';
import {
  burgerConstructorSliceName,
  burgerConstructorReducer
} from './constructorBurger/burgerSlices';
import { userReducer, userSliceName } from './user/userSlice';
import { feedSliceName, feedReducer } from './feed/feedSlice';
import {
  orderDetailsSliceName,
  orderDetailsReducer
} from './order/orderDetailsSlice';
import { orderSliceName, orderReducer } from './order/orderSlice';
import {
  ordersListSliceName,
  ordersListReducer
} from './order/ordersListState';

const rootReducer = combineReducers({
  [ingredientsSliceName]: ingredientsReducer,
  [burgerConstructorSliceName]: burgerConstructorReducer,
  [feedSliceName]: feedReducer,
  [orderSliceName]: orderReducer,
  [ordersListSliceName]: ordersListReducer,
  [orderDetailsSliceName]: orderDetailsReducer,
  [userSliceName]: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
