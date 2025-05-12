import { formatYear } from "./utils.js";
import { getFavorites } from "./favorites.js";

export function renderMovieList(movies, container) {
  container.innerHTML = "";
  if (!movies.length) {
    const p = document.createElement("p");
    p.textContent = "No result for your search";
    container.append(p);
    return;
  }

  const fragment = document.createDocumentFragment();
  movies.forEach((movie) => {
    const box = document.createElement("div");
    const title = document.createElement("h4");
    const year = document.createElement("p");
    const span = document.createElement("span");
    const img = document.createElement("img");

    box.classList.add("movie-card");
    img.classList.add("movie-poster");
    title.classList.add("movie-title");
    year.classList.add("movie-year");

    title.textContent = movie.Title;
    year.textContent = formatYear(movie.Year);
    img.src = movie.Poster;

    span.append(title, year);
    box.append(span, img);

    const favorites = getFavorites();
    if (favorites.includes(movie.imdbID)) {
      const favIcon = document.createElement("span");
      favIcon.textContent = "⭐";
      favIcon.classList.add("card-fav-icon");
      title.prepend(favIcon);
    }

    box.dataset.id = movie.imdbID;
    fragment.append(box);
  });
  container.append(fragment);
}

export function renderModal(data, modalEl) {
  modalEl.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <div class="modal-details">
        <img src="${data.Poster}" alt="${data.Title} Poster">
        <button id="favorite-btn" class="favorite-btn">Mark as favorite ⭐</button>
        <div class="modal-info">
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Runtime:</strong> ${data.Runtime}</p>
          <p><strong>IMDB:</strong> ${data.imdbRating} ⭐</p>
          <p><strong>Director:</strong> ${data.Director}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
        </div>
      </div>
    </div>
  `;
}
