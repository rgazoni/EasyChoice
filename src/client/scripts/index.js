const type = 0;
var selectedGenres = [];
var selectedProviders = [];

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

async function getRecommendations(){
    var selectGenres = document.getElementById("selectGenres");
    var selectProviders = document.getElementById("selectProviders");
 
    selectedGenres = Array.from(selectGenres.selectedOptions).map(x=>x.value??x.text);
    selectedProviders = Array.from(selectProviders.selectedOptions).map(x=>x.value??x.text);

    let url = '/api/movies?' + new URLSearchParams({
        providerId : selectedProviders,
        genreId : selectedGenres
    });

    const results = await getRequest(url)
    .then((response) => {
        return response;
    });
}