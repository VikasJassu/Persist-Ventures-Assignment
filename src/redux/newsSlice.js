import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  loading: false,
  fullNews: null,
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
    setFullNews: (state, action) => {
      state.fullNews = action.payload;
    },
  },
});

export const { setAllNews, setLoading, setFullNews } = newsSlice.actions;

export default newsSlice.reducer;
