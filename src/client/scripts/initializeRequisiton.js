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

async function getRequest(url) {
    let data = await fetch('http://localhost:4000' + url)
        .then((response) => response.json())
        .then((data) => {return data});

    return data;
}



