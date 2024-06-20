import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  loading: false,
  fullNews: null,
  filteredNews: [],
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
    setFilteredNews: (state, action) => {
      state.filteredNews = action.payload;
    },
  },
});

export const { setAllNews, setLoading, setFullNews, setFilteredNews } = newsSlice.actions;

export default newsSlice.reducer;
