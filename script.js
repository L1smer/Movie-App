const filmFragment = document.createDocumentFragment();

const moviesContainer = document.getElementById("movies-container");
const topicBtns = document.querySelectorAll(".suggested");
const searchInput = document.getElementById("search-input");
const filmModal = document.getElementById("movie-modal");

let moviesData = [];
let filteredMoviesData = [];
let filmDescription = [];

function removeModal() {
  filmModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function openModal() {
  filmModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function formatYear(yearStr) {
  if (!yearStr) return "Unknown";

  const cleanStr = yearStr.replace("–", "-");

  const parts = cleanStr.split("-");

  if (parts.length === 2) {
    const [start, end] = parts;

    if (!end || end.trim() === "") {
      return `${start} – present`;
    }

    return `${start} – ${end}`;
  }

  return yearStr;
}

function renderList(data) {
  moviesContainer.innerHTML = "";

  if (filteredMoviesData.length === 0) {
    const noMatch = document.createElement("p");
    noMatch.textContent = "No result for your search";
    moviesContainer.append(noMatch);
  }

  data.forEach((film) => {
    const filmBox = document.createElement("div");
    const filmTitle = document.createElement("h4");
    const filmYear = document.createElement("p");
    const filmBoxSpan = document.createElement("span");
    const filmPoster = document.createElement("img");

    filmTitle.textContent = film.Title;
    filmYear.textContent = formatYear(film.Year);
    filmPoster.setAttribute("src", film.Poster);

    filmBoxSpan.append(filmTitle, filmYear);
    filmBox.append(filmBoxSpan, filmPoster);

    filmBox.addEventListener("click", (e) => {
      let filmDescriptionID = film.imdbID;

      fetch(`https://www.omdbapi.com/?apikey=564727fa&i=${filmDescriptionID}`)
        .then((response) => response.json())
        .then((data) => {
          filmDescription = data;

          filmModal.innerHTML = `
						<div class="modal-content">
							<span class="close-button">&times;</span>

							<div class="modal-details">
								<img src="${filmDescription.Poster}" alt="${filmDescription.Title} Poster">

								<div class="modal-info">
									<h2>${filmDescription.Title} (${filmDescription.Year})</h2>
									<p><strong>Genre:</strong> ${filmDescription.Genre}</p>
									<p><strong>Runtime:</strong> ${filmDescription.Runtime}</p>
									<p><strong>IMDB:</strong> ${filmDescription.imdbRating} ⭐</p>
									<p><strong>Director:</strong> ${filmDescription.Director}</p>
									<p><strong>Actors:</strong> ${filmDescription.Actors}</p>
									<p><strong>Plot:</strong> ${filmDescription.Plot}</p>
								</div>
							</div>
						</div>
					`;

          filmModal.addEventListener("click", (e) => {
            if (e.target === filmModal) {
              removeModal();
            }
          });

          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !filmModal.classList.contains("hidden")) {
              removeModal();
            }
          });

          const closeBtn = document.querySelector(".close-button");

          closeBtn.addEventListener("click", (e) => {
            removeModal();
          });
          openModal();
        })
        .catch((error) => {
          throw new Error(error);
        });
    });

    filmFragment.append(filmBox);
  });

  moviesContainer.append(filmFragment);
}

function fetchData(type = `star`) {
  fetch(`https://www.omdbapi.com/?apikey=564727fa&s=${type}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        searchInput.value = "";
        moviesData = data.Search;
        filteredMoviesData = data.Search;
        renderList(filteredMoviesData);
      } else {
        moviesContainer.innerHTML = "No results found";
      }
    })
    .catch((error) => {
      moviesContainer.innerHTML = "Error loading movies";
      throw new Error(error);
    });
}

topicBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    topicBtns.forEach((btn) => btn.classList.remove("active-button"));
    e.target.classList.add("active-button");

    const topic = e.target.dataset.topic;
    moviesContainer.innerHTML = "";
    fetchData(topic);
  });
});

searchInput.addEventListener("input", (e) => {
  if (e.target.value.trim() !== "") {
    filteredMoviesData = moviesData.filter((film) => {
			moviesContainer.innerHTML = '';
      return film.Title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    renderList(filteredMoviesData);
  } else {
    renderList(moviesData);
  }
});

fetchData();
