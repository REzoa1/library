import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BooksData, SearchData, VolumeInfo } from "../../models";
import {
  API_KEY,
  BOOKS_URL,
  bookInitial,
  booksInitial,
  searchInitial,
} from "../../utils/constants";
import { RootState } from "../index";

export type BooksState = {
  searchData: SearchData;
  book: VolumeInfo;
  books: BooksData;
  status: "idle" | "loading" | "failed";
};

const initialState: BooksState = {
  searchData: searchInitial,
  book: bookInitial,
  books: booksInitial,
  status: "idle",
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ q, orderBy, category, startIndex }: SearchData) => {
    try {
      const subject = category !== "all" ? `+subject:${category}` : "";
      const defaultParams = "maxResults=30&printType=books&";
      const customParams = `q=${q}${subject}&orderBy=${orderBy}&startIndex=${startIndex}`;

      const link = `${BOOKS_URL}?${defaultParams}${customParams}&key=${API_KEY}`;

      const res = await fetch(link);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return new Error("Ошибка получения книг");
      }
    } catch (err) {
      return new Error("Ошибка получения книг (API хост некорректен)");
    }
  }
);
export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (bookId: string) => {
    try {
      const link = `${BOOKS_URL}${bookId}?key=${API_KEY}`;

      const res = await fetch(link);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return new Error("Ошибка получения книги");
      }
    } catch (err) {
      return new Error("Ошибка получения книги (API хост некорректен)");
    }
  }
);
export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetSearh: (state) => {
      state.books = booksInitial;
      state.searchData = searchInitial;
    },
    removeBook: (state) => {
      state.book = bookInitial;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, { payload, meta }) => {
        state.status = "idle";
        state.book = bookInitial;
        state.searchData = meta.arg;

        state.books.kind = payload.kind;
        if (payload.items) {
          state.books.totalItems = state.books.totalItems || payload.totalItems;
          state.books.items.push(...payload.items);
        }
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(fetchBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBook.fulfilled, (state, { payload }) => {
        state.status = "idle";
        state.book = payload.volumeInfo;
      })
      .addCase(fetchBook.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { resetSearh, removeBook } = booksSlice.actions;

export const selectData = (state: RootState) => state["books"];
export default booksSlice.reducer;
