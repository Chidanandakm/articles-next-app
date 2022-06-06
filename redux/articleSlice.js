import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API} from "./userSlice";

const initialState = {
   loading: false,
   articles: {},
   article: {},
   error: null,
};

export const getArticles = createAsyncThunk("article/getArticles", async (data, {rejectWithValue}) => {
   try {
      return await API.get("/articles");
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

export const getArticle = createAsyncThunk("article/getArticle", async (data, {rejectWithValue}) => {
   try {
      return await API.get(`/articles/${data}`);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

export const commentOnArticle = createAsyncThunk("article/commentOnArticle", async (data, {rejectWithValue}) => {
   try {
      return await API.post(`/articles/comment/${data.id}`, data);
   } catch (error) {
      return rejectWithValue(error.response);
   }
});

const articleSlice = createSlice({
   name: "article",
   initialState,
   reducers: {},
   extraReducers: {
      [getArticles.pending]: (state, action) => {
         state.loading = true;
      },
      [getArticles.fulfilled]: (state, action) => {
         state.loading = false;
         state.articles = action.payload.data;
      },
      [getArticles.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      [getArticle.pending]: (state, action) => {
         state.loading = true;
      },
      [getArticle.fulfilled]: (state, action) => {
         state.loading = false;
         state.article = action.payload.data;
      },
      [getArticle.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      [commentOnArticle.pending]: (state, action) => {
         state.loading = true;
      },
      [commentOnArticle.fulfilled]: (state, action) => {
         state.loading = false;
         state.article = action.payload.data;
      },
      [commentOnArticle.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
   },
});

export default articleSlice.reducer;
