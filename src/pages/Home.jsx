import React, { useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../services/newsAPI";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = parseInt(useLocation().pathname.split("/")[1]) || 0;
  const { news, loading, filteredNews } = useSelector(
    (state) => state.newsReducer
  );
  console.log("news filtered", filteredNews);

  useEffect(() => {
    //fetch news from api
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [filteredNews]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div>
      <div className="border rounded relative">
        {loading ? (
          <Spinner />
        ) : (
          <div className="">
            {page === 0 &&
              (filteredNews.length > 0 ? filteredNews : news)
                ?.slice(0, 10)
                ?.map((news, index) => <NewsCard news={news} key={index} />)}
            {page === 1 &&
              (filteredNews.length > 0 ? filteredNews : news)
                ?.slice(10, 20)
                ?.map((news, index) => <NewsCard news={news} key={index} />)}
            {page === 2 &&
              (filteredNews.length > 0 ? filteredNews : news)
                ?.slice(20)
                ?.map((news, index) => <NewsCard news={news} key={index} />)}
          </div>
        )}
        <hr />

        <div className="flex justify-between sm:px-5 px-2 py-2">
          <button
            disabled={page == 0}
            onClick={() => navigate(`/${page - 1}`)}
            className={`${
              page == 0 ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
            }  text-white sm:px-12 px-9 py-2 rounded-md flex items-center gap-3`}
          >
            <FaArrowLeft /> Prev
          </button>

          <button
            disabled={page == 2}
            onClick={() => navigate(`/${page + 1}`)}
            className={`${
              page == 2 ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
            }  text-white sm:px-12 px-9 py-2 rounded-md flex items-center gap-3`}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
