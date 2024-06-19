import React, { useState, useEffect } from "react";
import axios from "axios";
import { MultiSelectDropdown } from "../components/MultiSelectDropdown";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import { PiTelevisionFill } from "react-icons/pi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState({ news: [] });
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const page = parseInt(useLocation().pathname.split("/")[1]) || 0;
  console.log("params", page);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios(
          "https://api.currentsapi.services/v1/latest-news?language=en&apiKey=q0vJ7nWllMgbalBcomg8ACNt6NU3ieeZCH_qUqbHoRplm3up"
        );
        console.log("printing data", response.data);
        setApiData(response.data);

        // Extract and set unique categories
        const allCategories = response.data.news.flatMap(
          (newsItem) => newsItem.category
        );
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Filter news based on selected categories
  const filteredNews =
    selectedCategories.length === 0
      ? apiData.news
      : apiData.news.filter((newsItem) =>
          newsItem.category.some((category) =>
            selectedCategories.includes(category)
          )
        );

  console.log(filteredNews.length);
  return (
    <div>
      <div className="border rounded relative">
        <div className="border-b p-2 flex items-center justify-between shadow-md sticky top-0 z-10 bg-white">
          <p className="text-xl font-semibold flex items-center gap-1 text-orange-600">
            <PiTelevisionFill />
            News Platform
          </p>
          <MultiSelectDropdown
            options={categories}
            selectedOptions={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="overflow-auto">
            {page === 0 &&
              filteredNews
                .slice(0, 10)
                .map((news, index) => <NewsCard news={news} key={index} />)}
            {page === 1 &&
              filteredNews
                .slice(10, 20)
                .map((news, index) => <NewsCard news={news} key={index} />)}
            {page === 2 &&
              filteredNews
                .slice(20)
                .map((news, index) => <NewsCard news={news} key={index} />)}
          </div>
        )}
        <hr />

        <div className="flex justify-between px-5 py-2">
          <button
            disabled={page == 0}
            onClick={() => navigate(`/${page - 1}`)}
            className={`${
              page == 0 ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
            }  text-white px-12 py-2 rounded-md flex items-center gap-3`}
          >
            <FaArrowLeft /> Prev
          </button>

          <button
            disabled={page == 2}
            onClick={() => navigate(`/${page + 1}`)}
            className={`${
              page == 2 ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
            }  text-white px-12 py-2 rounded-md flex items-center gap-3`}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
