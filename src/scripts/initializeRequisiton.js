window.addEventListener = ('load', function () {
    let providers = getRequest("/providers");
    let genres = getRequest("/genres");

    console.log(providers);
    console.log(genres);

    localStorage.setItem("providers",JSON.stringify(providers));
    localStorage.setItem("genres", genres);

    console.log(localStorage.getItem("providers"));

})

async function getRequest(url) {
    let data = await fetch('http://localhost:4000' + url)
        .then((response) => response.json())
        .then((data) => {return data});

    console.log(data);
    return data;
}

