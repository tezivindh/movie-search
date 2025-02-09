let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");


let getMovie = () => {
  let movieName = movieNameRef.value.trim();
  movieNameRef.value = '';
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (movieName.length === 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
    return;
  }

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.Response === "True") {
        let poster = data.Poster !== "N/A" ? data.Poster : "placeholder.jpg";

        result.innerHTML = `
          <div class="info">
              <img src="${poster}" class="poster">
              <div>
                  <h2>${data.Title} (${data.Year})</h2>
                  <div class="rating">
                      <img src="star-icon.svg" alt="star icon">
                      <h4>${data.imdbRating}</h4>
                  </div>
                  <div class="details">
                      <span>${data.Rated !== "N/A" ? data.Rated : ""}</span>
                      <span>${data.Country}</span>
                      <span>${data.Language}</span>
                      <span>${data.Runtime}</span>
                  </div>
                  <div class="genre">
                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                  </div>
              </div>
          </div>
          <div class="other-info">
            <h4>Released on:</h4>
            <p>${data.Released}</p>  
            
            <h4>Director:</h4>
            <p>${data.Director}</p>
          
            <h4>Writers:</h4>
            <p>${data.Writer}</p>
          
            <h4>Box Office:</h4>
            <p>${data.BoxOffice}</p>
          </div>
          <div class="info-2">
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            <h3>Awards:</h3>
            <p>${data.Awards}</p>
          </div>
        `;
      } else {
        result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
      }
    })
    .catch(() => {
      result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
    });
};

// Event Listeners
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
movieNameRef.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getMovie();
  }
});
