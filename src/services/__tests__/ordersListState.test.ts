import { getOrdersListUser, initialState, ordersListReducer} from './../order/ordersListState';


describe('тест для ordersListSlice', () => {
  const actions = {
    pending: {
      type: getOrdersListUser.pending.type,
      payload: null
    },
    rejected: {
      type: getOrdersListUser.rejected.type,
      error: { message: 'Error' }
    },
    fulfilled: {
      type: getOrdersListUser.fulfilled.type,
      payload: { orders: ['order3', 'order4'] }
    }
  };

  it('тест getOrdersUser.pending', () => {
    const state = ordersListReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест getOrdersUser.rejected', () => {
    const state = ordersListReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест getOrdersUser.fulfilled', () => {
    const state = ordersListReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(actions.fulfilled.payload);
  });
});
