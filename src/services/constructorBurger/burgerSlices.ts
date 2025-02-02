import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

// констуктор бургера
export interface IBurgerConstructorState {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
}

export const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        // Если добавляем bun, заменяем текущую
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          // Иначе добавляем ингредиент в список
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4(); // генерация уникального id для ингредиента
        return { payload: { ...ingredient, id } }; // возвращаем payload с новым id
      }
    },
    // Редьюсер для удаления ингредиента из конструктора
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    // Редьюсер для очистки конструктора
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    // Редьюсер для изменения порядка ингредиентов
    changeIngredientsOrder: (state, action) => {
      const initialElement = state.ingredients[action.payload.initialIndex];
      state.ingredients[action.payload.initialIndex] =
        state.ingredients[action.payload.lastIndex];
      state.ingredients[action.payload.lastIndex] = initialElement;
    }
  },
  selectors: {
    // Селектор для получения ингредиентов из конструктора
    getIngredientsSelector: (state) => state
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const burgerConstructorSliceName = burgerConstructorSlice.name;
export const {
  addIngredients,
  removeIngredient,
  clearBurgerConstructor,
  changeIngredientsOrder
} = burgerConstructorSlice.actions;
export const { getIngredientsSelector } = burgerConstructorSlice.selectors;
export const burgerConstructorAction = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
