const loader = document.getElementById("loader");
const moviesListEle = document.getElementById("moviesList");
let movieListArr = localStorage.getItem("favMovieList");
const apiKey = "898bc1cb";
let apiURl = "https://www.omdbapi.com/?apikey=" + apiKey + "&i=";
if (movieListArr !== null && movieListArr.length > 0) {
  movieListArr = [...new Set(movieListArr.split(","))];
}

getMovieDetailList();
function getMovieDetailList() {
  movieListArr.forEach((item) => {
    fetchMovieDetails(item);
  });
}

//function to fetch each movie details
async function fetchMovieDetails(imdbID) {
  try {
    const response = await fetch(apiURl + imdbID);
    if (!response.ok) {
      throw new Error("No Data Available");
    }
    const moviesData = await response.json();
    //console.log(moviesData);
    displayMovieDetails(moviesData);
  } catch (err) {
    console.log(err);
  }
}

//function to display movie details
function displayMovieDetails(element) {
  let movieItem = `<div id=${element.imdbID} class="list-item">
        <div class="list-item-thumbnail">
          <img src=${element.Poster} alt=${element.Title} />
        </div>
        <div class="list-item-info">
            <h3>${element.Title}</h3>
            <p>${element.Year}</p>
            <button id="btn${element.imdbID}" type="button" title="Remove from Favourites"><i class="fa-solid fa-heart-circle-minus"></i></button>

        </div>
      </div>`;
  loader.style.visibility = "hidden";
  moviesListEle.insertAdjacentHTML("beforeend", movieItem);
  let removeFromFavoriteEle = document.getElementById("btn" + element.imdbID);
  removeFromFavoriteEle.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    movieListArr = movieListArr.filter(function (item) {
      return item !== element.imdbID;
    });
    localStorage.setItem("favMovieList", movieListArr);
    console.log(localStorage.getItem("favMovieList"));
    location.reload();
  });
}
