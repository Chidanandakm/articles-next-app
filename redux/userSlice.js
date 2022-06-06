import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const API = axios.create({baseURL: "https://admin-app-bakend.herokuapp.com/"});
// export const API = axios.create({ baseURL: "http://localhost:5000/" });

const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);
API.interceptors.request.use((request) => {
   request.headers.Authorization = `Bearer ${getToken()}`;
   return request;
});
// const token = localStorage.getItem("token");
// if (typeof window !== "undefined") {
// Perform localStorage action
// }

export const getUser = createAsyncThunk("account/getUser", async (data, {rejectWithValue}) => {
   try {
      return await API.get(`/users/${data}`);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

export const updateUser = createAsyncThunk("account/updateUser", async (data, {rejectWithValue}) => {
   try {
      return await API.patch(`/users/${data.id}`, data);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

export const userLogin = createAsyncThunk("account/userLogin", async (data, {rejectWithValue}) => {
   try {
      return await API.post(`/users/login`, data);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

export const logout = createAsyncThunk("account/logout", async (data, {rejectWithValue}) => {
   window.localStorage.clear();
   return true;
});

export const createUser = createAsyncThunk("account/createUser", async (data, {rejectWithValue}) => {
   try {
      return await API.post(`/users/register`, data);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

export const deleteUser = createAsyncThunk("account/deleteUser", async (data, {rejectWithValue}) => {
   try {
      return await API.delete(`/users/${data}`);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

export const requestResetPassword = createAsyncThunk(
   "account/requestResetPassword",
   async (data, {rejectWithValue}) => {
      try {
         return await API.post(`/users/request-reset-password`, data);
      } catch (error) {
         return rejectWithValue(error.response);
      }
   }
);

export const resetPassword = createAsyncThunk("account/resetPassword", async (data, {rejectWithValue}) => {
   try {
      return await API.post(`/users/reset-password/${data.token}`, data);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

const userSlice = createSlice({
   name: "user",
   initialState: {
      isLoggedIn: false,
      user: {},
      regUser: {},
      delUser: {},
      userById: {},
      updateUser: {},
      error: null,
   },
   reducers: {},
   middleware: [],
   extraReducers: {
      [createUser.pending]: (state, action) => {
         state.loading = true;
      },
      [createUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.isLoggedIn = true;
         state.regUser = action.payload.data;
      },
      [createUser.rejected]: (state, action) => {
         state.loading = false;
      },

      [getUser.pending]: (state, action) => {
         state.loading = true;
      },
      [getUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.userById = action.payload.data;
      },
      [getUser.rejected]: (state, action) => {
         state.loading = false;
      },

      [userLogin.pending]: (state, action) => {
         state.loading = true;
      },
      [userLogin.fulfilled]: (state, action) => {
         state.loading = false;
         state.isLoggedIn = true;
         state.user = action.payload.data.user;
      },
      [userLogin.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.data;
      },

      [logout.pending]: (state, action) => {
         state.loading = true;
         state.isLoggedIn = false;
      },
      [logout.fulfilled]: (state, action) => {
         state.loading = false;
         state.isLoggedIn = false;
         state.error = null;
      },
      [logout.rejected]: (state, action) => {
         state.loading = false;
         state.isLoggedIn = false;
      },

      [deleteUser.pending]: (state, action) => {
         state.loading = true;
      },
      [deleteUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.delUser = action.payload.data;
      },
      [deleteUser.rejected]: (state, action) => {
         state.loading = false;
      },

      [updateUser.pending]: (state, action) => {
         state.loading = true;
      },
      [updateUser.fulfilled]: (state, action) => {
         state.loading = false;
         state.updateUser = action.payload.data;
      },
      [updateUser.rejected]: (state, action) => {
         state.loading = false;
      },

      [requestResetPassword.pending]: (state, action) => {
         state.loading = true;
      },
      [requestResetPassword.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [requestResetPassword.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.data;
      },

      [resetPassword.pending]: (state, action) => {
         state.loading = true;
      },
      [resetPassword.fulfilled]: (state, action) => {
         state.loading = false;
      },
      [resetPassword.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload.data;
      },
   },
});

export default userSlice.reducer;
