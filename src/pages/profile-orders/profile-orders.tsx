import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getListOrders,
  getOrdersListUser
} from '../../services/order/ordersListState';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getListOrders);

  useEffect(() => {
    dispatch(getOrdersListUser());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
