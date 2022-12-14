let genres = JSON.parse(localStorage.getItem("genres"));
let actualMovie;
let userData = [];

window.onload =
  ("load",
  function () {
    insertCarouselItem();
  });

function insertCarouselItem() {
  let carousel = document.getElementById("carousel");
  let indicators = document.getElementById("indicators");
  resultsList = JSON.parse(localStorage.getItem("results"));
  let dataCarousel = "";
  let dataIndicators = "";

  for (let i = 0; i < resultsList.length; i++) {
    if (i == 0) {
      dataCarousel += `<div class="carousel-item h-100 active">`;
      dataIndicators += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
            aria-current="true" aria-label="Slide ${i}"></button>`;
    } else {
      dataCarousel += `<div class="carousel-item h-100">`;
      dataIndicators += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
            aria-current="true" aria-label="Slide ${i}"></button>`;
    }
    dataCarousel += createItem(resultsList[i], i);
  }
  carousel.innerHTML = dataCarousel;
  indicators.innerHTML = dataIndicators;
}

function createItem(result, index) {
  let data = "";
  data +=
    `  <div class="row h-100">
             <div class="col-md-3 offset-2 d-flex justify-content-center">
             <img src="${result.poster_path}" class="rounded poster" alt="">   
             </div>
             <div class="movie-info col-md-5">
               <div class="row title d-flex">
                 <div class="col d-flex align-items-center">
                   <div class="d-flex align-items-end">
                     <h1>${result.title}</h1>
                     <span class="imdb-rate">IMDB ${result.vote_average}</span>
                   </div>  
                   <button class="ms-auto btn watched-btn" id="watchButton${index}" type="button" onclick="watchMovie()">
                   <div class="d-flex align-items-center">
                    <i class="fa-solid fx-xl fa-plus"></i>
                   <h6>Assistir</h6> 
                 </div>
                  </button>
                </div>
              </div>
              <div class="row description">
                <p>${result.overview}</p>
              </div>
              <div class="row tags-container">
                <h3>Tags</h3>
                <div>
                  ` +
    movieTags(result) +
    `
                </div>
              </div>
              <div class="row available-container">
                <h3>Dispon??vel em</h3>
                <div class="providers-container">
                  ` +
    movieProviders(result) +
    `
                </div>
              </div>
            </div>
          </div>
        </div> 
    `;
  movieTags(result);
  return data;
}

function movieTags(result) {
  let tagsIds = result.genre_ids;
  let tagsNames = [];
  let data = "";

  tagsIds.map((item) => {
    for (let i = 0; i < genres.total_results; i++) {
      if (genres.results[i].genre_id == item)
        tagsNames.push(genres.results[i].genre_name);
    }
  });

  tagsNames.map((item) => {
    data += 
    `   <span class="tag-provider badge">
            ${item}
        </span>
    `;
  });
  return data;
}

function movieProviders(result) {
  let data = "";
  for (provider in result.providers) {
    data += 
    `   <span class="tag-provider badge">
            <img class="icon-provider" src="${result.providers[provider].logo_path}" alt="${result.providers[provider].provider_name} logo">
                ${result.providers[provider].provider_name}
        </span>
    `;
  }
  return data;
}

async function watchMovie() {
  let index = $(".active").attr("data-bs-slide-to");
  let button = document.getElementById("watchButton"+index);
  actualMovie = resultsList[index];

  await fetch("/api/users/watched", {
      method: "GET"
  })
  .then((response) => response.json()
  .then((data) => (userData = data.data)));

  if(!JSON.stringify(userData).includes(actualMovie.title))
  {
      post("/api/users/watched");
      button.classList.replace("watched-btn", "watch-btn");
      button.innerHTML = 
      `<div class="d-flex align-items-center">
          <i class="fa-solid fx-xl fa-check"></i>
          <h6>Assistido</h6> 
       </div>`
  }
  else  
  {
      post("/api/users/watched/del");     
      button.classList.replace("watch-btn", "watched-btn");
      button.innerHTML = 
      `<div class="d-flex align-items-center">
          <i class="fa-solid fx-xl fa-plus"></i>
          <h6>Assistir</h6> 
       </div>`
  }
}

async function post(url){ 
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: actualMovie,
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
