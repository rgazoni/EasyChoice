window.onload = ("load", function () {
    loadMovies();
});

async function loadMovies(){
    let display = document.getElementById("display");
    let data = '';
    if(isAuthenticated()){ 
        let userData = [];
        await fetch("/api/users/watched", {
            method: "GET"
        })
        .then((response) => response.json()
        .then((data) => (userData = data.data)));
        
        if(userData.length === 0)
            data += `<h3>Nenhum filme assistido</h3>`
        else{
            userData.map((id) => {
                data += 
                `   <div class="col-4 col-sm-2 pb-5 bg-danger d-flex justify-content-center">
                        <a class="d-flex justify-content-center poster-anchor">
                            <img src="${id.movie.poster_path}" class="rounded poster" alt="">
                        </a>
                    </div>
                `;
            });
        }
        
    }else{
        data += `<h3>Faça login para este recurso</h3>`
    }
    display.innerHTML = data;
}