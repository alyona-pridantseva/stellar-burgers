import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedOrders, fetchFeed } from '../../services/feed/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  // список заказов
  const orders: TOrder[] = useSelector(getFeedOrders);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI
    orders={orders}
    //получение списка заказов
    handleGetFeeds={() => {
      dispatch(fetchFeed());
    }}
  />;
};
