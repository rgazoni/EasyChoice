const type = 0;
const selectedGenders = [];
const selectedProviders = [];

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

function getSelectedValues(select){
    var values = [];
    console.log(select);
    for(const option of select.options) {
        console.log(option);
        if(option.selected){
        }
    }
    console.log(values);
    return values;
}

function getRecommendations(){
    var selectGenres = document.getElementById("selectGenres");
    var selectProviders = document.getElementById("selectProviders");
    
    var selectedGenres = Array.from(selectGenres.selectedOptions).map(x=>x.value??x.text);
    var selectedProviders = Array.from(selectProviders.selectedOptions).map(x=>x.value??x.text);
    // if(type == 0) // movie
    // else //serie
}

