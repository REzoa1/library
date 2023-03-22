export const BOOKS_URL = "https://www.googleapis.com/books/v1/volumes/";
export const API_KEY = "AIzaSyB5gllJtLBZ1AjwP_3eztRGPEJy5jH-j_k";

export const booksInitial = { kind: "", totalItems: 0, items: [] };

export const bookInitial = { title: "" };

export const categories = [
  "all",
  "art",
  "biography",
  "computers",
  "history",
  "medical",
  "poetry",
];
export const sortItems = ["relevance", "newest"];

export const searchInitial = {
  q: "",
  orderBy: "",
  category: "",
  startIndex: 0,
};
