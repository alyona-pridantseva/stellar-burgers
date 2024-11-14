import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  error: string | null;
  loading: boolean;
};

export const initialState: TOrderState = {
  order: null,
  error: null,
  loading: false
};

export const orderBurger = createAsyncThunk(
  `order/orderBurger`,
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
      state.loading = false;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderLoading: (state) => state.loading,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const orderSliceName = orderSlice.name;
export const { getOrder, getOrderLoading, getOrderError } =
  orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
