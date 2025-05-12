import { fetchMoviesByTopic, fetchMovieById } from "./api.js";
import { getFavorites, toggleFavorite } from "./favorites.js";
import { renderMovieList, renderModal } from "./render.js";
import { openModal, addModalCloseEvents } from "./modal.js";

const topicBtns = document.querySelectorAll(".suggested");
const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");
const filmModal = document.getElementById("movie-modal");
const showFavoritesBtn = document.getElementById("show-favorites-btn");

let allMovies = [];
let filteredMovies = [];
let currentTab = "topic"; 

topicBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    currentTab = "topic";
    topicBtns.forEach((b) => b.classList.remove("active-button"));
    btn.classList.add("active-button");
		showFavoritesBtn.classList.remove('active') // remove favorite highlighting

    const topic = btn.dataset.topic;
    try {
      const movies = await fetchMoviesByTopic(topic);
      allMovies = movies;
      filteredMovies = movies;
      renderMovieList(filteredMovies, moviesContainer);
    } catch (err) {
      moviesContainer.innerHTML = "<p>Error loading movies.</p>";
    }
  });
});

moviesContainer.addEventListener("click", async (e) => {
  const box = e.target.closest("[data-id]");
  if (!box) return;

  const imdbID = box.dataset.id;
  try {
    const data = await fetchMovieById(imdbID);
    renderModal(data, filmModal);
    openModal(filmModal);
    addModalCloseEvents(filmModal, ".close-button");

    const favBtn = document.getElementById("favorite-btn");

    function updateFavBtn() {
      const isFav = getFavorites().includes(imdbID);
      favBtn.classList.toggle("active-favorite", isFav);
      favBtn.textContent = isFav ? "Unmark Favorite ⭐" : "Mark as Favorite ⭐";
    }

    updateFavBtn();

    favBtn.onclick = () => {
      toggleFavorite(imdbID);
      updateFavBtn();

      if (currentTab === "favorites") {
        const favIDs = getFavorites();
        const favoriteMovies = allMovies.filter((m) => favIDs.includes(m.imdbID));
        renderMovieList(favoriteMovies, moviesContainer);
      } else {
        renderMovieList(filteredMovies, moviesContainer);
      }
    };
  } catch (err) {
    alert("Error loading movie details.");
  }
});

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  filteredMovies = allMovies.filter((m) =>
    m.Title.toLowerCase().includes(query)
  );
  renderMovieList(filteredMovies, moviesContainer);
});

showFavoritesBtn.addEventListener("click", () => {
  currentTab = "favorites";
  topicBtns.forEach((b) => b.classList.remove("active-button")); // remove topic highlighting
	showFavoritesBtn.classList.add('active');
  const favIDs = getFavorites();
  const favoriteMovies = allMovies.filter((m) => favIDs.includes(m.imdbID));
  renderMovieList(favoriteMovies, moviesContainer);
});

// Initial Fetch 
(async function () {
  try {
    const movies = await fetchMoviesByTopic("star");
    allMovies = movies;
    filteredMovies = movies;
    renderMovieList(movies, moviesContainer);
  } catch (err) {
    moviesContainer.innerHTML = "<p>Error loading movies.</p>";
  }
})();
