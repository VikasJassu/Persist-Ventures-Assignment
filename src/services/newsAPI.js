import axios from "axios";
import { setAllNews, setLoading } from "../redux/newsSlice";
import toast from "react-hot-toast";

export const fetchNews = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios(
        "https://api.currentsapi.services/v1/latest-news?language=en&apiKey=q0vJ7nWllMgbalBcomg8ACNt6NU3ieeZCH_qUqbHoRplm3up"
      );
      dispatch(setAllNews(response.data.news));
    } catch (error) {
      console.log("Error in api", error);
      toast.error("Error in API", {
        id: "error",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
};
