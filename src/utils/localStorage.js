import toast from "react-hot-toast";

// Function to add a news ID to favourites
export const addFavorite = (newsId) => {
  const existingfavourites =
    JSON.parse(window.localStorage.getItem("favourites")) || [];

  const updatedfavourites = [...existingfavourites, newsId];
  window.localStorage.setItem("favourites", JSON.stringify(updatedfavourites));
  toast.success("Added to favourites");
};

// Function to remove a news ID from favourites
export const removeFavorite = (newsId) => {
  const existingfavourites =
    JSON.parse(window.localStorage.getItem("favourites")) || [];

  const updatedfavourites = existingfavourites.filter((id) => id !== newsId);
  window.localStorage.setItem("favourites", JSON.stringify(updatedfavourites));
  toast.error("Removed from favourites");
};

// Get existing favourites from local storage
export const getfavourites = () => {
  const favourites =
    JSON.parse(window.localStorage.getItem("favourites")) || [];
  return favourites;
};
