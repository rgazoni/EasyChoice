let providers;
let genres;

window.addEventListener = ('load', function () {
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
    // console.log(providers);
    console.log(genres);
    
})

async function getRequest(url) {
    let data = await fetch('http://localhost:4000' + url)
        .then((response) => response.json())
        .then((data) => {return data});

    console.log(data);
    return data;
}



