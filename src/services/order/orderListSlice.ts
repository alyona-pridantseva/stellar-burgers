import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

// Интерфейс состояния пользовательских заказов
type TOrderListState = {
  order: TOrder | null;
  error: string | null;
  loading: boolean;
};

export const initialState: TOrderListState = {
  order: null,
  error: null,
  loading: false
};

export const orderBurger = createAsyncThunk(
  `order/orderBurger`,
  async (dataOrder: string[]) => orderBurgerApi(dataOrder)
);

const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
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

export const ordersListReducer = ordersListSlice.reducer;
export const ordersListSliceName = ordersListSlice.name;
export const { getOrder, getOrderLoading, getOrderError } =
  ordersListSlice.selectors;
export const { clearOrder } = ordersListSlice.actions;
