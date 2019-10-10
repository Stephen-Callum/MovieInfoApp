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

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`http://www.omdbapi.com/?apikey=e3059d5b&i=` + encodeURI(movieId))
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="img-thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Release date:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Starring:</strong> ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Country:</strong> ${movie.Country}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="card mt-5 p-5" id="movie-plot">
                        <h3>Plot:<h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-block btn-primary">View IMDb page</a>
                        <a href="index.html" class="btn btn-block btn-light">Back To Search</a>
                    </div>
                </div>
            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}