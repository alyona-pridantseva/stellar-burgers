import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  changeIngredientsOrder,
  removeIngredient
} from '../../services/ConstructorBurger/BurgerSlices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    // перемещение ингредиента вниз
    const handleMoveDown = () => {
      dispatch(
        changeIngredientsOrder({ nitialIndex: index, finishIndex: index + 1 })
      );
    };
    // перемещение ингредиента вверх
    const handleMoveUp = () => {
      dispatch(
        changeIngredientsOrder({ initialIndex: index, finishIndex: index - 1 })
      );
    };
    // удаление ингредиента
    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
