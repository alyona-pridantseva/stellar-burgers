import { orderDetails, orderDetailsReducer, initialState } from "../order/orderDetailsSlice";


describe('тест для orderDetailsSlice', () => {
  const actions = {
    pending: {
      type: orderDetails.pending.type,
      payload: null
    },
    rejected: {
      type: orderDetails.rejected.type,
      error: { message: 'Error' }
    },
    fulfilled: {
      type: orderDetails.fulfilled.type,
      payload: { orders: ['order'] }
    }
  };

  it('тест orderDetails.pending', () => {
    const state = orderDetailsReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест orderDetails.rejected', () => {
    const state = orderDetailsReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест orderDetails.fulfilled', () => {
    const state = orderDetailsReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(actions.fulfilled.payload.orders);
  });
});
