let providers;
let genres;

window.addEventListener = ('load', function () {
    getRequest("/providers")
        .then((response) => {
            localStorage.setItem("providers", JSON.stringify(response));})
        .then(console.log(localStorage.getItem("providers")));

    console.log(localStorage.getItem("providers"));

})

async function getRequest(url) {
    let data = await fetch('http://localhost:4000' + url)
        .then((response) => response.json())
        .then((data) => {return data});

    console.log(data);
    return data;
}

