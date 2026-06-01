import burgerConstructorReducer, {
  burgerConstructorAction,
  initialState,
  IBurgerConstructorState
} from '../constructorBurger/burgerSlices';
import { TConstructorIngredient, TIngredient } from "@utils-types";


describe('тест для burgerConstructorSlice', () => {
  const testIngredient: TIngredient = {
    "_id": "1",
    "name": "testNameIngredient",
    "type": "main",
    "proteins": 433,
    "fat": 244,
    "carbohydrates": 33,
    "calories": 420,
    "price": 1337,
    "image": "test-img_small",
    "image_mobile": "test-img_mobile",
    "image_large": "test-img_large",
  };

  const testBunIngredient: TIngredient = {
    ...testIngredient,
    type: 'bun'
  };

  const testConstructorIngredient: TConstructorIngredient = {
    ...testIngredient,
    id: 'unique-id'
  };

  // по примеру с воркшопа
  test('тест на добавление булки', () => {
    const action = burgerConstructorAction.addIngredients(testBunIngredient);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.bun).toEqual(
      expect.objectContaining({
        ...testBunIngredient,
        id: expect.any(String)
      })
    );
  });

  test('тест на добавление ингредиента', () => {
    const action = burgerConstructorAction.addIngredients(testIngredient);
    const state = burgerConstructorReducer(initialState, action);
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        ...testIngredient,
        id: expect.any(String)
      })
    );
  });

  test('тест на удаление ингредиента', () => {
    const testInitialState: IBurgerConstructorState = {
      ...initialState,
      ingredients: [testConstructorIngredient]
    };
    const action = burgerConstructorAction.clearBurgerConstructor();
    const state = burgerConstructorReducer(testInitialState, action);
    expect(state.ingredients.length).toBe(0);
  });

  test('тест на изменение порядка ингредиентов', () => {
    const ingredient1: TConstructorIngredient = {
      ...testIngredient,
      id: 'unique-id_1'
    };

    const ingredient2: TConstructorIngredient = {
      ...testIngredient,
      id: 'unique-id_2'
    };

    const testInitialState: IBurgerConstructorState = {
      ...initialState,
      ingredients: [ingredient1, ingredient2]
    };

    const action = burgerConstructorAction.changeIngredientsOrder({
      initialIndex: 0,
      lastIndex: 1
    });

    const state = burgerConstructorReducer(testInitialState, action);
    //является ли ingredient2 подмножеством ingredients[0]
    expect(state.ingredients[0]).toEqual(expect.objectContaining(ingredient2));
    expect(state.ingredients[1]).toEqual(expect.objectContaining(ingredient1));

    const actionOpposite = burgerConstructorAction.changeIngredientsOrder({
      initialIndex: 1,
      lastIndex: 0
    });
    const stateOpposite = burgerConstructorReducer(state, actionOpposite);

    expect(stateOpposite.ingredients[0]).toEqual(expect.objectContaining(ingredient1));
    expect(stateOpposite.ingredients[1]).toEqual(expect.objectContaining(ingredient2));
  });
})
