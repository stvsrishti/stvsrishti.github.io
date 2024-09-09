const apiKey = "898bc1cb";
const navEle = document.getElementById("nav-icon");
const navDivEle = document.getElementById("nav-div");
const searchBoxEle = document.getElementById("movie-search-box");
const searchListEle = document.getElementById("search-list");
const movieGridEle = document.getElementById("movie-grid");
let apiUrl = "https://www.omdbapi.com/?apikey=" + apiKey + "&s=";
let topPicksArr = [
  {
    Title: "Laila Majnu",
    Year: "2018",
    imdbID: "tt8011276",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZWZjODA1MmUtYmU0My00M2JiLTk2ODEtYzMxODJmMTM5MzY1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
  },
  {
    Title: "Rehnaa Hai Terre Dil Mein",
    Year: "2001",
    imdbID: "tt0299108",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmVjOTY1NjUtMjVkYS00YjE4LTk5N2YtMWU2MTA4NmJjM2I1XkEyXkFqcGdeQXVyOTk3NTc2MzE@._V1_SX300.jpg",
  },
  {
    Title: "Kalki 2898 AD",
    Year: "2024",
    imdbID: "tt12735488",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    Title: "Chandu Champion",
    Year: "2024",
    imdbID: "tt27470893",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZDAxMmU3NGUtMGEyZC00ZGQ5LTk1ZjEtZGU2YmI0MjUzNWVmXkEyXkFqcGc@._V1_SX300.jpg",
  },
];
//fetching already existing favourite list of movies
let favouriteMovieList = localStorage.getItem("favMovieList");
if (favouriteMovieList !== null && favouriteMovieList.length > 0) {
  favouriteMovieList = [...new Set(favouriteMovieList.split(","))];
} else {
  favouriteMovieList = [];
}
//localStorage.clear();
//display top picks
displayTopPicks();
//added event listener to menu icon
navEle.addEventListener("click", function () {
  if (navDivEle.style.display === "block") {
    navDivEle.style.display = "none";
  } else {
    navDivEle.style.display = "block";
  }
});

//added event listener to search box
searchBoxEle.addEventListener("keyup", (event) => {
  //alert('key pressed' + searchBoxEle.value);
  var searchText = searchBoxEle.value;
  if (searchText.length > 2) {
    searchListEle.innerHTML = "";
    //console.log(apiUrl+searchText)
    fetchMovies(searchText);
  }
  if(searchText.length == 0){
    searchListEle.style.display = 'none';
  }
});
//function to display topPicks list
function displayTopPicks() {
  topPicksArr.forEach((element) => {
    let isFavourite = favouriteMovieList.includes(element.imdbID);
    let addToFavBtnClass = isFavourite ? "display-none": "";
    let movieItem = `<div id=${element.imdbID} class="list-item">
        <div class="list-item-thumbnail">
          <img src=${element.Poster} alt=${element.Title} />
        </div>
        <div class="list-item-info">
            <h3>${element.Title}</h3>
            <p>${element.Year}</p>
            <button id="btn${element.imdbID}" type="button" title="Add to Favourites" class=${addToFavBtnClass}><i class="fa-solid fa-heart-circle-plus"></i></button>

        </div>
      </div>`;

    movieGridEle.insertAdjacentHTML("beforeend", movieItem);
    let movieItemEle = document.getElementById(element.imdbID);
    movieItemEle.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.setItem("imdbID", element.imdbID);
      window.open("movie.html", "_blank").focus();
    });
    let addToFavoriteEle = document.getElementById("btn" + element.imdbID);
    addToFavoriteEle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      addToFavoriteEle.style.display = 'none';
      favouriteMovieList.push(element.imdbID);
      //console.log(favouriteMovieList);
      localStorage.setItem("favMovieList", favouriteMovieList);
      console.log(localStorage.getItem("favMovieList"));
    });
  });
}

// function to fetch movies based on search text
async function fetchMovies(searchText) {
  try {
    const response = await fetch(apiUrl + searchText);
    if (!response.ok) {
      throw new Error("No Data Available");
    }
    const moviesData = await response.json();
    //console.log(moviesData.Search);
    displaySearchResult(moviesData.Search);
  } catch (err) {
    console.log(err);
  }
}
// function to display the search results
function displaySearchResult(movieData) {
  movieData.forEach((element) => {
    let isFavourite = favouriteMovieList.includes(element.imdbID);
    let addToFavBtnClass = isFavourite ? "display-none": "";
    let movieItem = `<div id=${element.imdbID} class="search-list-item">
        <div class="item-thumbnail">
          <img src=${element.Poster} alt=${element.Title} />
        </div>
        <div class="item-info">
            <h3>${element.Title}</h3>
            <p>${element.Year}</p>
            <button id="btn${element.imdbID}" type="button" title="Add to Favourites" class=${addToFavBtnClass}><i class="fa-solid fa-heart-circle-plus"></i></button>

        </div>
      </div>`;
    searchListEle.insertAdjacentHTML("beforeend", movieItem);
    let searchItemEle = document.getElementById(element.imdbID);
    searchItemEle.addEventListener("click", function (event) {
      event.preventDefault();
      localStorage.setItem("imdbID", element.imdbID);
      window.open("movie.html", "_blank").focus();
    });
    let addToFavoriteEle = document.getElementById("btn" + element.imdbID);
    addToFavoriteEle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      addToFavoriteEle.style.display = 'none';
      favouriteMovieList.push(element.imdbID);
      //console.log(favouriteMovieList);
      localStorage.setItem("favMovieList", favouriteMovieList);
      console.log(localStorage.getItem("favMovieList"));
    });
  });
  searchListEle.style.display = "block";
}
