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
  listByAuthor: [],
  listByISBN: [],
  listByTitle: [],
  searchResultsCount: null,
  pageCount: null,
  isLoaded: false,
  error: null,
};

export const fetchSearchBookByAuthor = createAsyncThunk(
  "posts/fetchSearchBookByAuthor",
  async (autor: string | undefined) => {
    const response = await fetch(
      `${baseURL}/reviews.json?author=${autor}&${apiKey}`
    );

    const data = response.json();
    return data;
  }
);

// https://api.nytimes.com/svc/books/v3/reviews.json?isbn=9781524763138&api-key=dJM8Ko23QB4CAg7RZX2kl0gl1tHcZZvP

// export const fetchSearchBookByISBN = createAsyncThunk(
//   "posts/fetchSearchBookByISBN",
//   async (isbn: string | undefined) => {
//     const response = await fetch(
//       `${baseURL}/reviews.json?isbn=${isbn}&${apiKey}`
//     );

//     const data = response.json();
//     return data;
//   }
// );
export const fetchSearchBookByTitle = createAsyncThunk(
  "posts/fetchSearchBookByISBN",
  async (title: string | undefined) => {
    const response = await fetch(
      `${baseURL}/reviews.json?title=${title}&${apiKey}`
    );

    const data = response.json();
    return data;
  }
);

export const searchSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchSearchBookByAuthor.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchSearchBookByAuthor.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.listByAuthor = action.payload.results;
      })
      .addCase(fetchSearchBookByAuthor.rejected, (state, action) => {
        state.isLoaded = false;
        // state.error = action.error.message;
      })
      /////////
      //   .addCase(fetchSearchBookByISBN.pending, (state) => {
      //     state.isLoaded = true;
      //     state.error = null;
      //   })
      //   .addCase(fetchSearchBookByISBN.fulfilled, (state, action) => {
      //     state.isLoaded = false;
      //     console.log(action.payload.result);
      //     state.listByISBN = action.payload.results;
      //   })
      //   .addCase(fetchSearchBookByISBN.rejected, (state, action) => {
      //     state.isLoaded = false;
      //     // state.error = action.error.message;
      //   })
      //////
      .addCase(fetchSearchBookByTitle.pending, (state) => {
        state.isLoaded = true;
        state.error = null;
      })
      .addCase(fetchSearchBookByTitle.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.listByTitle = action.payload.results;
      })
      .addCase(fetchSearchBookByTitle.rejected, (state, action) => {
        state.isLoaded = false;
        // state.error = action.error.message;
      });
  },
});

export const searchReduser = searchSlice.reducer;
