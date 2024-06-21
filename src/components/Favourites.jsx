import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewsCard from "./NewsCard";
import { fetchNews } from "../services/newsAPI";
import { getfavourites } from "../utils/localStorage";
import Spinner from "./Spinner";

const Favourites = () => {
  const { news, loading } = useSelector((state) => state.newsReducer);
  const [favouriteNews, setFavouriteNews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    const favourites = getfavourites();
    if (news.length > 0 && favourites.length > 0) {
      const filteredData = news.filter((item) => favourites.includes(item.id));
      setFavouriteNews(filteredData);
    }
  }, [news]);

  return (
    <div>
      <div className="border rounded relative">
        {loading ? (
          <div className="flex justify-center mt-10 h-[80vh]">
            <Spinner />
          </div>
        ) : favouriteNews.length > 0 ? (
          <div className="overflow-auto">
            {favouriteNews.map((news, index) => (
              <NewsCard
                news={news}
                key={news.id}
                setFavouriteNews={setFavouriteNews}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center mt-10 h-[80vh]">
            <p className="text-xl font-semibold text-orange-600">
              No Favourites Found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
