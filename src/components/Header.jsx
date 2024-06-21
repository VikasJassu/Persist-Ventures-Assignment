import React, { useState, useEffect } from "react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../services/newsAPI";
import { setFilteredNews } from "../redux/newsSlice";
import { FaHeart, FaSearch } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState(false);
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

  //update filtered news in redux store instantly
  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
    dispatch(setFilteredNews(filteredNews));
  }, [dispatch, news.length, filteredNews.length]);

  //get all unique categories from all news to show in filter
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
    <div className="sticky z-50 top-0 border-b py-2 sm:px-4 px-1 flex items-center justify-between shadow-md border bg-white">
      <div className={` ${search ? "block" : "hidden"} sm:block relative `}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search News"
          className={`${
            search ? "block w-44" : "hidden w-48"
          }  pl-10 py-[5px] sm:block  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400`}
          onChange={(e) => {
            dispatch(
              setFilteredNews(
                news.filter((newsItem) =>
                  newsItem.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              )
            );
          }}
        />
      </div>
      <div
        onClick={() => setSearch((prev) => !prev)}
        className={`px-6 py-2 text-lg rounded-md border sm:hidden ${
          search ? "hidden" : "block"
        }`}
      >
        <FaSearch className="text-gray-500" />
      </div>

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
