import React, { useEffect, useState } from "react";
import { FaBookOpen, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  getfavourites,
} from "../utils/localStorage";
import { setFullNews } from "../redux/newsSlice";
import { Link } from "react-router-dom";

const NewsCard = ({ news, setFavouriteNews }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [msg, setMsg] = useState(false);
  const dispatch = useDispatch();

  //function to dispatch data for modal to show detailed news
  const handleShowModal = () => {
    dispatch(
      setFullNews({
        imageUrl: news.image,
        title: news.title,
        description: news.description,
        isLiked: isLiked,
      })
    );
  };

  //handle favourite news here
  const handleAddFavourite = (e) => {
    e.stopPropagation();
    if (isLiked) {
      removeFavorite(news.id);
    } else {
      addFavorite(news.id);
    }
    setIsLiked((prev) => !prev);
    const updatedFavourites = getfavourites();
    setFavouriteNews((prev) =>
      prev.filter((item) => updatedFavourites.includes(item.id))
    );
  };

  //instantly handle favorite icon color by getting the like's status
  useEffect(() => {
    const favourites = getfavourites();
    setIsLiked(favourites.includes(news.id));
  }, [news.id]);

  return (
    <div className="mx-auto sm:p-5 py-3">
      <div
        onClick={() => handleShowModal()}
        className="bg-[#f8f1e7] flex flex-col sm:flex-row sm:gap-8 gap-3 justify-center border-1 border-gray-200 shadow-md p-3 rounded-md cursor-pointer relative"
      >
        <div>
          <img
            src={`${
              news.image !== "None"
                ? news.image
                : "https://media.istockphoto.com/id/1345527119/video/graphical-modern-digital-world-news-studio-loop-background.jpg?s=640x640&k=20&c=cr1SYYf7Dix-TgBqiYRLquAmi7TgEE3oZcMUExQ25QY="
            }`}
            alt="Image not found"
            loading="lazy"
            width={400}
            className="rounded-md h-56 hover:scale-95 hover:transition-all"
          />
        </div>
        <div className="sm:w-7/12 flex flex-col items-start font-serif text-lg mb-2">
          <h3 className="font-bold text-2xl text-start sm:my-3 sm:block hidden">
            {news.title.length >= 95
              ? news.title.slice(0, 95) + "..."
              : news.title}
          </h3>
          <p className="font-medium my-2 text-start break-words break-all sm:block hidden">
            {news.description.length >= 250
              ? news.description.slice(0, 250) + "..."
              : news.description}
          </p>
          <h3 className="font-bold text-2xl text-start sm:my-3 sm:hidden">
            {news.title.length >= 55
              ? news.title.slice(0, 55) + "..."
              : news.title}
          </h3>
          <p className="font-medium my-2 text-start break-words break-all sm:hidden">
            {news.description.length >= 200
              ? news.description.slice(0, 200) + "..."
              : news.description}
          </p>
        </div>
        <div className="flex absolute text-xl cursor-pointer gap-2 bottom-2 right-2">
          <Link
            onClick={(e) => e.stopPropagation()}
            to={news.url}
            target="_blank"
            onMouseEnter={() => setMsg(true)}
            onMouseLeave={() => setMsg(false)}
          >
            <FaBookOpen />
          </Link>
          <p onClick={(e) => handleAddFavourite(e)}>
            {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
          </p>
          {msg && (
            <p className="bg-orange-500 text-xs rounded-lg p-1 absolute right-7 bottom-6 transition-all hidden sm:block">
              Original Article
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
