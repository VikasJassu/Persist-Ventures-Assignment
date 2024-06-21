import React, { useState, useEffect } from "react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { PiTelevisionFill } from "react-icons/pi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../services/newsAPI";
import { setFilteredNews } from "../redux/newsSlice";
import { FaHeart } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesRoute = useLocation().pathname.includes("favourites");
  const { news } = useSelector((state) => state.newsReducer);
  console.log("location: ", favoritesRoute);

  // Filter news based on selected categories
  const filteredNews =
    selectedCategories.length === 0
      ? news
      : news.filter((newsItem) =>
          newsItem.category.some((category) =>
            selectedCategories.includes(category)
          )
        );

  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
    dispatch(setFilteredNews(filteredNews));
  }, [dispatch, news.length, filteredNews.length]);

  useEffect(() => {
    if (news.length > 0) {
      const getCategories = () => {
        try {
          const allCategories = news.flatMap((newsItem) => newsItem.category);
          const uniqueCategories = [...new Set(allCategories)];
          setCategories(uniqueCategories);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      getCategories();
    }
  }, [news]);

  return (
    <div className="sticky z-50 top-0 border-b p-2 flex items-center justify-between shadow-md border bg-white">
      <p className="text-xl font-semibold sm:flex items-center gap-1 text-orange-600 hidden">
        <PiTelevisionFill />
        News Platform
      </p>

      {!favoritesRoute ? (
        <button
          onClick={() => navigate("/favourites")}
          className="sm:px-12 sm:py-1 px-6 py-2 rounded-md flex items-center gap-1 text-lg border"
        >
          <p className="hidden sm:block">Favourites</p>
          <FaHeart className="text-red-600" />
        </button>
      ) : (
        <Link
          to="/"
          className="sm:px-12 sm:py-1 px-6 py-2 rounded-md flex items-center gap-1 text-lg border"
        >
          {" "}
          <p className="hidden sm:block">Home</p>
          <p className="sm:hidden">
            {" "}
            <BiHomeAlt2 />
          </p>
        </Link>
      )}

      <MultiSelectDropdown
        options={categories}
        selectedOptions={selectedCategories}
        onChange={setSelectedCategories}
      />
    </div>
  );
};

export default Header;
