import { ingredientsSlice } from './../ingredients/ingredientsSlice';
import { configureStore } from "@reduxjs/toolkit";
import {burgerConstructorSlice} from "../constructorBurger/burgerSlices"
import { feedSlice } from '../feed/feedSlice';
import { orderSlice } from '../order/orderSlice';
import { ordersListSlice } from '../order/ordersListState';
import { orderDetailsSlice } from '../order/orderDetailsSlice';
import { userSlice } from '../user/userSlice';
import { rootReducer } from '../store';

const testRootState = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [burgerConstructorSlice.name]: burgerConstructorSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState(),
  [ordersListSlice.name]: ordersListSlice.getInitialState(),
  [orderDetailsSlice.name]: orderDetailsSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState(),
};

// по примеру с воркшопа
describe('тест для rootReducer', () => {
  test('объединение состояниий редюсеров', () => {
    const action = { type: 'SOME_ACTION' };
    const state = rootReducer(testRootState, action);
    expect(state).toEqual(testRootState);
  });

  test('проверка инициализации', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();
    expect(state).toEqual(testRootState);
  });
});
