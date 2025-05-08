const filmFragment = document.createDocumentFragment();
const moviesContainer = document.getElementById("movies-container");
const topicBtns = document.querySelectorAll(".suggested");
let moviesData = [];
function renderList(data) {
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

function fetchData(type = `man`) {
  fetch(`https://www.omdbapi.com/?apikey=564727fa&s=${type}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        moviesData = data.Search;
        renderList(moviesData);
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
