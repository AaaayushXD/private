'use strict';

//API STUFF
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fa4e1a42bdc5a4cd1ed5e86da939918e&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?&api_key=fa4e1a42bdc5a4cd1ed5e86da939918e&page=1&query="';


const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');


//GET intital movies
getMovie(API_URL)
async function getMovie(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results);
}

//show movie
function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        let webUrl = title.split(" ").join("-");

        movieEl.innerHTML = `
            <img src = "${IMG_PATH + poster_path}">
            <div class = "info">
                <h3>${title}</h3>
                <span class ="${rating(vote_average)}">${vote_average}</span>
                <div>
                    <div class="overview">
                        <h3>Overview</h3>
                        ${overview}
                    </div>
                </div>
                <div id = "play">
                <a href="https://www6.f2movies.to/search/${webUrl}" target="_blank"><button class="btn">Play</button> <i class="fas fa-arrow-right"></i></a> </div>
            </div>
            
            `
        
        
        const btn = document.querySelector('.btn');
        main.appendChild(movieEl)

    })
}

//onclick
// console.log(btn);


//rating color 
function rating(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

//search movie 
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        {
            getMovie(SEARCH_URL + searchTerm)
            
            search.value = ''
        } 
    } else {
        window.location.reload();
    }
})

