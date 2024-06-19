// Function to add a news ID to favorites
export const addFavorite = (newsId) => {
  const existingFavorites =
    JSON.parse(window.localStorage.getItem("favorites")) || [];

  const updatedFavorites = [...existingFavorites, newsId];
  window.localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// Function to remove a news ID from favorites
export const removeFavorite = (newsId) => {
  const existingFavorites =
    JSON.parse(window.localStorage.getItem("favorites")) || [];

  const updatedFavorites = existingFavorites.filter((id) => id !== newsId);
  window.localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// Get existing favorites from local storage
export const getFavorites = () => {
  const favorites = JSON.parse(window.localStorage.getItem("favorites")) || [];
  return favorites;
};
