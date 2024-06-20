import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  loading: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    setAllNews: (state, action) => {
      state.news = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAllNews, setLoading } = newsSlice.actions;

export default newsSlice.reducer;
