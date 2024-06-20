import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../redux/newsSlice";

export const store = configureStore({
  reducer: { newsReducer },
});
