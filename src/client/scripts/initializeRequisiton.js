let providers;
let genres;

window.onload = ('load', function () {
    getRequest("/providers")
        .then((response) => {
            localStorage.setItem("providers", JSON.stringify(response));})
        // .then(console.log(localStorage.getItem("providers")));

    getRequest("/genres")
        .then((response) => {
            localStorage.setItem("genres", JSON.stringify(response));})
        // .then(console.log(localStorage.getItem("providers")));

    providers = JSON.parse(localStorage.getItem("providers"));
    genres = JSON.parse(localStorage.getItem("genres"));
    
    updateSelect();
})

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

async function getRequest(url) {
    let data = await fetch('http://localhost:4000' + url)
        .then((response) => response.json())
        .then((data) => {return data});

    return data;
}



