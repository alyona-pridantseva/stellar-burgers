import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route';
import { fetchIngredienst } from '../../services/ingredients/ingredientsSlice';
import { checkUserAuth } from '../../services/user/userSlice';
import { PageDetailsComponent } from '../../pages/page-details/page-details';

export const AppRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // получаем background (11cпринт т5 ур8)
  const backgroundLocation = location.state?.background;

  //получаем ингредиенты и аккаунт(первоначальная загрузка данных)
  useEffect(() => {
    dispatch(fetchIngredienst());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <PageDetailsComponent title='Детали ингредиента'>
              <IngredientDetails />
            </PageDetailsComponent>
          }
        />

        <Route
          path='/feed/:number'
          element={
            <PageDetailsComponent title='Детали заказа'>
              <OrderInfo />
            </PageDetailsComponent>
          }
        />

        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <PageDetailsComponent title='Детали заказа'>
                <OrderInfo />
              </PageDetailsComponent>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Маршруты для модальных окон */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => navigate('/feed')}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title='Информация о заказе'
                  onClose={() => navigate('/profile/orders')}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppRoute />
  </div>
);

export default App;
