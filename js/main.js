$(document).ready(() => {
    $('#search-form').on('submit', (e) => {
        let searchText = $('#search-text').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

// make axios http request to omdb api depending on user search
function getMovies(searchText) {
    axios.get(`http://www.omdbapi.com/?apikey=e3059d5b&s=` + encodeURI(searchText))
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => { 
                 output += `
                    <div class="col-md-3">
                        <div class="card-deck">
                            <div class="card text-center bg-dark my-3">
                                <img src="${movie.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5>${movie.Title}</h5>
                                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                 `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

