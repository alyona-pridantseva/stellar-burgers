import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';
import { clsx } from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        {/* ссылка на главная стр */}
        <NavLink
          to='/'
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles.link_active)
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        {/* Cтраница с лентой заказов */}
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            clsx(styles.link, isActive && styles.link_active)
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      {/* Лого главной страницы */}
      <div className={styles.logo}>
        <Link to='/'>
          <Logo className='' />
        </Link>
      </div>
      {/* Личный кабинет */}
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <p className='text text_type_main-default ml-2'>
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            end
          >
            {userName || 'Личный кабинет'}
          </NavLink>
        </p>
      </div>
    </nav>
  </header>
);
