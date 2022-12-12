window.onload = ("load", function () {
    loadMovies();
});

async function loadMovies(){
    let display = document.getElementById("display");
    let data = '';

    if(userData.length === 0)
        data += `<h3>Nenhum filme assistido</h3>`
    else{
        userData.map((movie) => {
            data += 
            `   <div class="col-4 col-sm-2 pb-5 bg-danger d-flex justify-content-center">
                    <a class="d-flex justify-content-center poster-anchor" href="./mediainfo.html">
                        <img src="${movie.logo_path}" class="rounded poster" alt="">
                    </a>
                </div>
            `;
        });
    }
    display.innerHTML = data;
}