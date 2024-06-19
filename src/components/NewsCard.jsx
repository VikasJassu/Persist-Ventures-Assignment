import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../utils/localStorage";

const NewsCard = ({ news }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    if (favorites.includes(news.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [isLiked]);

  return (
    <div className="mx-auto p-5 ">
      <div className="bg-[#f8f1e7] flex flex-col sm:flex-row gap-8 justify-center border-1 border-gray-200 shadow-md p-3 rounded-md">
        <div className="">
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
        <div className="w-7/12 max-sm:w-full flex flex-col items-start font-serif text-lg ">
          <h3 className="font-bold text-2xl text-start sm:my-3">
            {`${
              news.title.length >= 95
                ? news.title.slice(0, 95) + "..."
                : news.title
            }`}
          </h3>
          <p className="font-medium my-2 text-start hidden sm:block">
            {`${
              news.description.length >= 250
                ? news.description.slice(0, 250) + "..."
                : news.description
            }`}
          </p>
        </div>
        <div
          className="flex self-end text-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked((prev) => !prev);
            isLiked ? removeFavorite(news.id) : addFavorite(news.id);
          }}
        >
          {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
