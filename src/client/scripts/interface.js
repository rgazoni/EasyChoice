const type = 0;
var selectedGenres = [];
var selectedProviders = [];
let resultsList;

function changeType(){
    var textMovie = document.getElementById("textMovie");
    var textSerie = document.getElementById("textSerie");

    if(document.getElementById("switch-shadow").checked){
        textMovie.classList.replace("selected", "unselected");
        textSerie.classList.replace("unselected", "selected");
        type = 0;
    }
    else{
        textMovie.classList.replace("unselected", "selected");
        textSerie.classList.replace("selected", "unselected");
        type = 1
    }
}

function updateSelect(){
    const selectProviders = document.getElementById("selectProviders");
    const selectGenres = document.getElementById("selectGenres");

    let dataProvides = '';
    let dataGenres = '';

    for(let i=0; i<providers.total_results; i++)
    {
        dataProvides += `<option value="${providers.results[i].provider_id}">
        ${providers.results[i].provider_name}</option>`;
    }
    selectProviders.innerHTML = dataProvides;

    for(let i=0; i<genres.total_results; i++)
    {
        dataGenres += `<option value="${genres.results[i].genre_id}">
        ${genres.results[i].genre_name}</option>`;
    }
    selectGenres.innerHTML = dataGenres;
}

async function getRecommendations(){
    var selectGenres = document.getElementById("selectGenres");
    var selectProviders = document.getElementById("selectProviders");
 
    selectedGenres = Array.from(selectGenres.selectedOptions).map(x=>x.value??x.text);
    selectedProviders = Array.from(selectProviders.selectedOptions).map(x=>x.value??x.text);

    let url = '/api/movies?' + new URLSearchParams({
        providerId : selectedProviders,
        genreId : selectedGenres
    });

    await getRequest(url)
    .then((response) => {
        localStorage.setItem("results", JSON.stringify(response));
        location.href = "./suggestion.html";
    });
}

function insertCarouselItem(){
    let carousel = document.getElementById("carousel");
    let indicators = document.getElementById("indicators");
    resultsList = JSON.parse(localStorage.getItem("results"));
    let dataCarousel = '';
    let dataIndicators = '';

    for(let i=0; i< resultsList.length; i++){
        if(i==0){
            dataCarousel += `<div class="carousel-item h-100 active">`;
            dataIndicators += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
            aria-current="true" aria-label="Slide ${i}"></button>`;
        }
        else {
            dataCarousel += `<div class="carousel-item h-100">`;
            dataIndicators += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
            aria-current="true" aria-label="Slide ${i}"></button>`;
        }
        dataCarousel += createItem(resultsList[i]);
    }
    carousel.innerHTML = dataCarousel;
    indicators.innerHTML = dataIndicators;
}

function createItem(result){
    let data = '';
    data += 
    
    `  <div class="row h-100">
             <div class="col-md-3 offset-2 bg-success d-flex justify-content-center">
             <img src="${result.poster_path}" class="rounded poster" alt="">   
             </div>
             <div class="movie-info col-md-5 bg-danger ">
               <div class="row title d-flex">
                 <div class="col d-flex align-items-center">
                   <div class="d-flex align-items-end">
                     <h1>${result.title}</h1>
                     <span class="imdb-rate">IMDB 5.1</span>
                   </div>  
                   <button class="ms-auto btn watched-btn" type="button" data-bs-target="#carouselExampleIndicators" data-bs>
                    <i class="fa-solid fx-xl fa-plus"></i>
                    &nbsp;
                    Assistir
                  </button>
                </div>
              </div>
              <div class="row description">
                <p>${result.overview}</p>
              </div>
              <div class="row tags-container">
                <h3>Tags</h3>
                <div>
                  <span class="tag-provider badge">
                    Terror
                  </span>
                  <span class="tag-provider badge">
                    Suspense
                  </span>
                </div>
              </div>
              <div class="row available-container">
                <h3>Disponivel em</h3>
                <div class="providers-container">
                  <span class="tag-provider badge">
                    <img class="icon-provider" src="./misc/imgs/Netflix_logo.svg" alt="">
                    Netflix
                  </span>
                  <span class="tag-provider badge">
                    <img class="icon-provider" src="./misc/imgs/Netflix_logo.svg" alt="">
                    Prime Video
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> 
    `
    return data;
}
