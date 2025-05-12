const FAVORITES_KEY = "favoriteMovies";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(id) {
  const current = getFavorites();
  const updated = current.includes(id)
    ? current.filter((fav) => fav !== id)
    : [...current, id];
  saveFavorites(updated);
  return updated;
}