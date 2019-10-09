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
                        <div class="card card-body text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
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