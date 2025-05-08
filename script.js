const filmFragment = document.createDocumentFragment();
const moviesContainer = document.getElementById("movies-container");
const topicBtns = document.querySelectorAll(".suggested");
const searchInput = document.getElementById("search-input");
let moviesData = [];
let filteredMoviesData = [];
function renderList(data) {
	moviesContainer.innerHTML = '';

	if (filteredMoviesData.length === 0) {
		const noMatch = document.createElement('p');
		noMatch.textContent = 'No result for your search';
		moviesContainer.append(noMatch);
	}

  data.forEach((film) => {
    const filmBox = document.createElement("div");
    const filmTitle = document.createElement("h4");
    const filmYear = document.createElement("p");
    const filmPoster = document.createElement("img");



    filmTitle.textContent = film.Title;
    filmYear.textContent = film.Year;
    filmPoster.setAttribute("src", film.Poster);

    filmBox.append(filmTitle, filmYear, filmPoster);
    filmFragment.append(filmBox);

  });

  moviesContainer.append(filmFragment);
}

function fetchData(type = `star`) {
  fetch(`https://www.omdbapi.com/?apikey=564727fa&s=${type}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
				searchInput.value = '';
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
    const topic = e.target.dataset.topic;
    moviesContainer.innerHTML = "";
    fetchData(topic);
  });
});

searchInput.addEventListener("input", (e) => {
  if (e.target.value.trim() !== "") {
    filteredMoviesData = moviesData.filter((film) => {
      return film.Title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    renderList(filteredMoviesData);
	} else {
    renderList(moviesData);
  }
});

fetchData()
