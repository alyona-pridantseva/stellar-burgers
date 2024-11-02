import { TLoginData, TRegisterData } from './../../utils/burger-api';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi
} from '@api';
import { TUser } from './../../utils/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

// Начальное состояние пользователя
type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

// настройки начального состояния
export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

// получаем данные пользователя
export const userProfile = createAsyncThunk('user/getUserApi', async () =>
  getUserApi()
);

// проверка авторизован ли пользователь (11спр т.6 у.6)
export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch(() => {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  }
);

// регистрация
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi(registerData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

// 11 спр т.6 у.5
// вход
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi(loginData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

// выход (11 спр т.6 ур.7)
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        localStorage.removeItem('refreshToken');
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

// обновление данных
export const updateUser = createAsyncThunk(
  `user/updateUser`,
  async (user: TRegisterData) => {
    const data = await updateUserApi(user);
    return data.user;
  }
);

export const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUserData: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getAuthError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка получения пользовательских данных';
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка логина';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка регистрации пользователя';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error =
          action.error.message ?? 'Ошибка обновления данных пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Ошибка выхода';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const userReducer = userSlice.reducer;
export const userSliceName = userSlice.name;
export const { setAuthChecked, setUser } = userSlice.actions;
export const { getUserData, getAuthChecked, getAuthError } =
  userSlice.selectors;
