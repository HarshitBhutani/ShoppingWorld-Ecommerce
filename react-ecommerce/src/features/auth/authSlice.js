import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, loginUser, signOut } from './authAPI';
import { updateUser } from '../user/userAPI';
import { createUser } from './authAPI';
const initialState = {
  loggedInUserToken: null, // this should only contain user identity 'id'and like 'role' 'email' 'name'
  status: 'idle',
  error: null,
  userChecked: false,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);  // rejectwithvalue se ye inbuilt func error ko directly action.payload me bhj dega taki hm display kra skte
    }
  } 
);
export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log('i am in the error of checkAuthAsync', error);
    }
  } 
);
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async (loginInfo) => {
    const response = await signOut(loginInfo);
    return response.data;
  }
);

// export const updateUserAsync = createAsyncThunk(  // dispatches when form is sumitted on checkout page
//   'user/updateUser',
//   async (update) => {
//     const response = await updateUser(update);
//     return response.data;
//   }
// );

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state)=> state.auth.userChecked;
export default authSlice.reducer;
