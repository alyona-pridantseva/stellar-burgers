import { userProfile, userReducer, initialState, registerUser, loginUser, updateUser, logoutUser } from "../user/userSlice";

describe('тест для userSlice', () => {
  describe('тест userProfile', () => {
    const actions = {
      pending: {
        type: userProfile.pending.type,
        payload: null
      },
      rejected: {
        type: userProfile.rejected.type,
        error: { message: 'Error' }
      },
      fulfilled: {
        type: userProfile.fulfilled.type,
        payload: { user: { name: 'name', email: 'testTest' } }
      }
    };

    it('тест userProfile.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест userProfile.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест userProfile.fulfilled', () => {
      const nextState = userReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload.user);
    });
  });

  describe('тест registerUser', () => {
    const actions = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'Error' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: { user: { name: 'name', email: 'testTest' } }
      }
    };

    it('тест registerUser.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест registerUser.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест registerUser.fulfilled', () => {
      const nextState = userReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });

  describe('тест loginUser', () => {
    const actions = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'Error' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: { user: { name: 'name', email: 'testTest' } }
      }
    };

    it('тест loginUser.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест loginUser.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест loginUser.fulfilled', () => {
      const nextState = userReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });

  describe('тест logoutUser', () => {
    const actions = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'Error' }
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: null
      }
    };

    it('тест logoutUser.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест logoutUser.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест logoutUser.fulfilled', () => {
      const nextState = userReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });

  describe('тест updateUser', () => {
    const actions = {
      pending: {
        type: updateUser.pending.type,
        payload: null
      },
      rejected: {
        type: updateUser.rejected.type,
        error: { message: 'Error' }
      },
      fulfilled: {
        type: updateUser.fulfilled.type,
        payload: { user: { name: 'name', email: 'testTest' } }
      }
    };

    it('тест updateUser.pending', () => {
      const state = userReducer(initialState, actions.pending);
      expect(state.error).toBe(actions.pending.payload);
    });

    it('тест updateUser.rejected', () => {
      const state = userReducer(initialState, actions.rejected);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    it('тест updateUser.fulfilled', () => {
      const nextState = userReducer(initialState, actions.fulfilled);
      expect(nextState.user).toEqual(actions.fulfilled.payload);
    });
  });
});
