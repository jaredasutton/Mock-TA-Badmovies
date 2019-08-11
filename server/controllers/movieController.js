const movieModel = require("../models/movieModel.js");
const apiHelpers = require("../helpers/apiHelpers.js");

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    let { genre } = req.query;
    // get the search genre
    //console.log(req.query.genre);
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    let queryParams = ["sort_by=vote_average.asc", "include_adult=false"];
    genre ? queryParams.push(`with_genres=${genre}`) : null;
    // use this endpoint to search for movies by genres, you will need an API key
    apiHelpers
      .requestMovieDB("discover/movie", queryParams)
      .then(data =>
        res.send(JSON.stringify({ results: JSON.parse(data).results }))
      )
      .catch(err => {
        console.log(err);
        res.status(500).send();
      });
    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres

    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    apiHelpers
      .requestMovieDB("genre/movie/list")
      .then(data =>
        res.send(JSON.stringify({ results: JSON.parse(data).genres }))
      )
      .catch(err => {
        console.log(err);
        res.status(500).send();
      });

    // send back
  },
  saveMovie: (req, res) => {
    //console.log(req.body);
    let { movieDBid } = req.body;
    if (movieDBid === undefined) {
      res.status(400).send();
    } else {
      movieModel
        .getFavoriteWithId(movieDBid)
        .then(results => res.status(201).send(results))
        .catch(err =>
          movieModel
            .addFavorite(movieDBid)
            .then(results => {
              res.status(201).send();
            })
            .catch(err => res.status(500).send())
        );
    }
  },
  deleteMovie: (req, res) => {
    let movieDBid = req.params.movieDBid;
    if (movieDBid === undefined) {
      res.status(400).send();
    } else {
      movieModel
        .removeFavorite(movieDBid)
        .then(results => {
          res.status(204).send();
        })
        .catch(err => res.status(500).send());
    }
  }
};
