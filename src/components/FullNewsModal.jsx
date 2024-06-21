import React from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setFullNews } from "../redux/newsSlice";

const FullNewsModal = ({ news }) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-3 rounded-md w-11/12 md:w-2/3 lg:w-1/2 xl:w-5/12">
        <div className="flex justify-end relative">
          <button
            onClick={() => dispatch(setFullNews(null))}
            className="font-bold absolute -top-6 sm:-right-8 -right-6 bg-white rounded-full text-xl"
          >
            <IoClose />
          </button>
        </div>
        <img
          className="rounded-md w-full max-h-[400px]"
          src={`${
            news.imageUrl !== "None"
              ? news.imageUrl
              : "https://media.istockphoto.com/id/1345527119/video/graphical-modern-digital-world-news-studio-loop-background.jpg?s=640x640&k=20&c=cr1SYYf7Dix-TgBqiYRLquAmi7TgEE3oZcMUExQ25QY="
          }`}
          alt="image"
        />
        <h2 className="text-2xl font-semibold mb-4 text-start">{news.title}</h2>
        <p className="text-start text-lg">{news.description}</p>
      </div>
    </div>
  );
};

export default FullNewsModal;
