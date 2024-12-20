import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { baseURL } from "../config/bookApi";
import { categoriesEndPoint } from "../config/bookApi";
import { apiKey } from "../config/bookApi";
import { ICategory } from "../types/types";

// interface ISearchState {
//   list: ICategory | null;
//   searchResultsCount: null | number,
//   isLoaded: boolean;
//   error: null | string;
// }

const initialState = {
  list: [],
  searchResultsCount: null,
  pageCount: null,
  isLoaded: false,
  error: null,
};

export const fetchBestSellersBooks = createAsyncThunk(
  "posts/fetchBestSellersBook",
  async () => {
    const response = await fetch(
      `${baseURL}/lists/best-sellers/history.json?${apiKey}`
    );

    const data = response.json();
    return data;
  }
);

export const booksSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchBestSellersBooks.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchBestSellersBooks.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.list = action.payload.results;
      })
      .addCase(fetchBestSellersBooks.rejected, (state, action) => {
        state.isLoaded = false;
        // state.error = action.error.message;
      });
  },
});

export const booksReduser = booksSlice.reducer;
