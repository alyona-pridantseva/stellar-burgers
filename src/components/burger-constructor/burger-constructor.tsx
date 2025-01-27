import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getUserData } from '../../services/user/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  getIngredientsSelector,
  clearBurgerConstructor
} from '../../services/constructorBurger/burgerSlices';
import {
  getOrderLoading,
  getOrder,
  clearOrder
} from '../../services/order/orderSlice';
import { orderBurger } from '../../services/order/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserData);
  const constructorItems = useSelector(getIngredientsSelector);
  const orderRequest = useSelector(getOrderLoading);
  const orderModalData = useSelector(getOrder);

  // Обработчик клика на кнопку заказа
  const onOrderClick = () => {
    if (!userData) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const dataOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(orderBurger(dataOrder));
  };

  const closeOrderModal = () => {
    dispatch(clearBurgerConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
