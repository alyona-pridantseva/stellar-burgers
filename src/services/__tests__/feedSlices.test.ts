import { feedReducer, fetchFeed, initialState } from "../feed/feedSlice";

describe('тест для feedSlice', () => {
  const actions = {
    pending: {
      type: fetchFeed.pending.type,
      payload: null
    },
    rejected: {
      type: fetchFeed.rejected.type,
      error: { message: 'Error' }
    },
    fulfilled: {
      type: fetchFeed.fulfilled.type,
      payload: { orders: ['order1', 'order2'], total: 2, totalToday: 3 }
    }
  };

  it('тест fetchFeed.pending', () => {
    const state = feedReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест fetchFeed.rejected', () => {
    const state = feedReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест fetchFeed.fulfilled', () => {
    const state = feedReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(actions.fulfilled.payload.orders);
    expect(state.total).toEqual(actions.fulfilled.payload.total);
    expect(state.totalToday).toEqual(actions.fulfilled.payload.totalToday);
  });
})
