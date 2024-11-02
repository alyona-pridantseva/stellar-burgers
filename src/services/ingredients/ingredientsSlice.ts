import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// начальное состояние
type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null;
};

// Настройки начального состояния
const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

// получение данных ингредиентов(асинхронный экшен)
export const fetchIngredienst = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

//11спр т.4 ур.6
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    //получаем данные из состояния хранилища
    getIngredientsSelector: (state) => state.ingredients,
    getLoadingSelector: (state) => state.loading,
    getIngredientsErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredienst.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredienst.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredienst.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});

export const ingredientsSliceName = ingredientsSlice.name;
export const ingredientsReducer = ingredientsSlice.reducer;
export const {
  getIngredientsSelector,
  getLoadingSelector,
  getIngredientsErrorSelector
} = ingredientsSlice.selectors;
