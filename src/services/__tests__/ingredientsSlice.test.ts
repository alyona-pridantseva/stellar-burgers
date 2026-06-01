import { fetchIngredienst, ingredientsReducer, initialState } from "../ingredients/ingredientsSlice";

describe('тест для ingredientSlice', () => {
  const actions = {
    pending: {
      type: fetchIngredienst.pending.type,
      payload: null
    },
    rejected: {
      type: fetchIngredienst.rejected.type,
      error: { message: 'Error' }
    },
    fulfilled: {
      type: fetchIngredienst.fulfilled.type,
      payload: ['ingredienst1', 'ingredienst2']
    }
  };

  it('тест fetchIngredienst.pending', () => {
    const state = ingredientsReducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });

  it('тест fetchIngredienst.rejected', () => {
    const state = ingredientsReducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  it('тест fetchIngredienst.fulfilled', () => {
    const state = ingredientsReducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(actions.fulfilled.payload);
  });
});
