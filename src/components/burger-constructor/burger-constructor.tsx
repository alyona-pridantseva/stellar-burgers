import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getUserData } from '../../services/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { getIngredientsSelector } from '../../services/ConstructorBurger/BurgerSlices';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const constructorItems = useSelector(getIngredientsSelector);
  // const orderRequest = ;
  // const orderModalData = ;

  // const onOrderClick = () => {
  //   if (!constructorItems.bun || orderRequest) return;
  // };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return null;

  // return (
  //   <BurgerConstructorUI
  //     price={price}
  //     orderRequest={orderRequest}
  //     constructorItems={constructorItems}
  //     orderModalData={orderModalData}
  //     onOrderClick={onOrderClick}
  //     closeOrderModal={closeOrderModal}
  //   />
  // );
};
