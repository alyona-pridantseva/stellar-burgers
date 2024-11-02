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
} from '../services/ingredients/ingredientsSlice';
import {
  burgerConstructorSliceName,
  burgerConstructorReducer
} from './ConstructorBurger/BurgerSlices';
import { userReducer, userSliceName } from '../services/user/userSlice';

const rootReducer = combineReducers({
  [ingredientsSliceName]: ingredientsReducer,
  [burgerConstructorSliceName]: burgerConstructorReducer,
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
