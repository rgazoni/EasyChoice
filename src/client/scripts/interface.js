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
    url = url.replaceAll('%2C','|');
    console.log(url);
    await getRequest(url)
    .then((response) => {
        localStorage.setItem("results", JSON.stringify(response));
        location.href = "./suggestion.html";
    });
}