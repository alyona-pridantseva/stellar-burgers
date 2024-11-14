import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';

type TOrdersListState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const initialState: TOrdersListState = {
  orders: [],
  loading: false,
  error: null
};

// экшен для получения списка заказов
export const getOrdersListUser = createAsyncThunk(
  'orders/getOrdersList',
  getOrdersApi
);

const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  selectors: {
    getListOrders: (state) => state.orders,
    getOrdersLoading: (state) => state.loading,
    getOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersListUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersListUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrdersListUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const ordersListReducer = ordersListSlice.reducer;
export const ordersListSliceName = ordersListSlice.name;
export const { getListOrders, getOrdersLoading, getOrdersError } =
  ordersListSlice.selectors;
