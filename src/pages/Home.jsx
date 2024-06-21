import React, { useEffect } from "react";
import NewsCard from "../components/NewsCard";
import Spinner from "../components/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../services/newsAPI";
import { PiSmileySadLight } from "react-icons/pi";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = parseInt(useLocation().pathname.split("/")[1]) || 0;
  const { news, loading, filteredNews } = useSelector(
    (state) => state.newsReducer
  );

  //fetch news from api
  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [filteredNews]);

  //scroll to top when navigate to new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div>
      <div className="border rounded relative">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            {page === 0 &&
              (filteredNews.length > 0 ? (
                filteredNews
                  .slice(0, 10)
                  .map((news, index) => <NewsCard news={news} key={index} />)
              ) : (
                <div className="flex flex-col justify-center items-center h-[80vh]">
                  <p className="text-9xl text-gray-600">
                    {" "}
                    <PiSmileySadLight />
                  </p>
                  <p className="text-2xl font-semibold text-orange-700">
                    No News Found
                  </p>
                </div>
              ))}
            {page === 1 && filteredNews.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-[80vh]">
                <p className="text-9xl text-gray-600">
                  {" "}
                  <PiSmileySadLight />
                </p>
                <p className="text-2xl font-semibold text-orange-700">
                  No News Found
                </p>
              </div>
            ) : filteredNews.length > 9 ? (
              filteredNews
                .slice(10, 20)
                .map((news, index) => <NewsCard news={news} key={index} />)
            ) : filteredNews.length <= 30 ? (
              filteredNews.map((news, index) => (
                <NewsCard news={news} key={index} />
              ))
            ) : (
              <div></div>
            )}
            {page === 2 && filteredNews.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-[80vh]">
                <p className="text-9xl text-gray-600">
                  {" "}
                  <PiSmileySadLight />
                </p>
                <p className="text-2xl font-semibold text-orange-700">
                  No News Found
                </p>
              </div>
            ) : filteredNews.length > 19 ? (
              filteredNews
                .slice(20)
                .map((news, index) => <NewsCard news={news} key={index} />)
            ) : filteredNews.length <= 30 ? (
              filteredNews.map((news, index) => (
                <NewsCard news={news} key={index} />
              ))
            ) : (
              <div></div>
            )}
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
