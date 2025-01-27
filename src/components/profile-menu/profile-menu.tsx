import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/user/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // выход из акка
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
