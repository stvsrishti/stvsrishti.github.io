let imdbID = localStorage.getItem("imdbID");
const apiKey = "898bc1cb";
let apiURl = "https://www.omdbapi.com/?apikey="+apiKey+"&i=";
const movieDetailEle = document.getElementById("movieDetail");
const loader = document.getElementById("loader");
fetchMovieDetails();

//dunction to get movie details
async function fetchMovieDetails() {
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
  function displayMovieDetails(data){
    let movie = `<div id="movie-header">
        <div class="header-left">
          <h1>${data.Title}</h1>
          <div id="movie-sec-details">
            <span>${data.Year}</span>
            <i class="fa-solid fa-circle"></i>
            <span>${data.Rated}</span>
            <i class="fa-solid fa-circle"></i>
            <span>${data.Runtime}</span>
          </div>
        </div>
        <div class="header-right">
          <h4>IMDb Rating</h4>
          <div class="rating-div">
            <i class="fa-solid fa-star"></i>
            <div>
              <p><span>${data.imdbRating}</span><span>/10</span></p>
              <span>${data.imdbVotes}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-sec">
        <div id="movie-thumbnail">
          <img
            src=${data.Poster}
            alt=${data.Title}
          />
        </div>
        <div id="movie-info">
          <table>
            <tbody>
              <tr><td>Directors</td><td>${data.Director}</td></tr>
              <tr><td>Writer</td><td>${data.Writer}</td></tr>
              <tr><td>Stars</td><td>${data.Actors}</td></tr>
              <tr><td>Genre</td><td>${data.Genre}</td></tr>
              <tr><td>Languages</td><td>${data.Language}</td></tr>              
            </tbody>
          </table>
          <p>${data.Plot}</p>
        </div>
      </div>`;
      loader.style.visibility = "hidden";
      movieDetailEle.insertAdjacentHTML("beforeend", movie);
  }