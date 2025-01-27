import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/user/userSlice';

export const AppHeader: FC = () => {
  // получение данных пользователя из redux при условии, что эти данные есть
  const userData = useSelector(getUserData);
  return <AppHeaderUI userName={userData ? userData.name : ''} />;
};
