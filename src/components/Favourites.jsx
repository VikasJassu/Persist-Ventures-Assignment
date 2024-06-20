import React, { useEffect, useState } from "react";
import { PiTelevisionFill } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewsCard from "./NewsCard";
import { fetchNews } from "../services/newsAPI";
import { getFavorites } from "../utils/localStorage";

const Favourites = () => {
  const { news } = useSelector((state) => state.newsReducer);
  const [favouriteNews, setFavouriteNews] = useState();
  const [removeLike, setRemoveLike] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    const favourites = getFavorites();
    if (news.length > 0 && favourites.length > 0) {
      const filteredData = news.filter((item) => favourites.includes(item.id));
      setFavouriteNews(filteredData);
    }
  }, [news, removeLike]);
  console.log("removeLike:", removeLike);
  return (
    <div>
      <div className="border rounded relative">
        {favouriteNews?.length > 0 ? (
          <div className="overflow-auto">
            {favouriteNews?.map((news, index) => (
              <NewsCard news={news} key={index} setRemoveLike={setRemoveLike} />
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
