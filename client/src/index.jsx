import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
// import AnyComponent from './components/filename.jsx'
import Search from "./components/Search.jsx";
import Movies from "./components/Movies.jsx";
const axios = require("axios");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        {
          vote_average: 0,
          title: "A Night at the Garden",
          poster_path: "/tcRlfW4PzBBdcLk2a8T038VNRQ3.jpg",
          release_date: "2019-06-30",
          id: 480429
        }
      ],
      favorites: [],
      showFaves: false
    };

    /*
{"vote_count":29,"id":480429,"video":false,"vote_average":0,"title":"A Night at the
Garden","popularity":4.542,"poster_path":"/tcRlfW4PzBBdcLk2a8T038VNRQ3.jpg","original_language":"en","original_title":"A
Night at the Garden","genre_ids":[99],"backdrop_path":"/8ggcUYg8SHNjyaADqF2UcqCp2cc.jpg","adult":false,"overview":"This
montage film is made from previously unknown archival materials. It was nominated for an Oscar in 2019 in the Best
Documentary Short Subject category (and was a part of the Short Film Program at the Sundance Film Festival), and shows
us an almost forgotten meeting that took place in the Madison Square Garden, New York’s most famous arena - the meeting
that was held by the German American Bund, a Nazi organization. It is 1939, and in the giant square Americans are making
statements about white supremacy, not yet knowing into what horrors for Europe and the entire world will the Nazi regime
turn into in just seven months when it invades Poland. A Night at the Garden turns out to be a chillingly relevant film
for a divided America that recently saw yet another splash of race-based
violence.","release_date":"2019-06-30"}
    */

    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    // you might have to do something important here!
  }

  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
    axios
      .get("/movies/search")
      .then(({ results }) => this.setState({ movies: results }));
  }

  saveMovie(movie) {
    // same as above but do something diff
    let movieDBid = movie.id;
    axios
      .post("/movies/save", { movieDBid })
      .then(results => {
        let favorites = [movie];
        this.state.favorites.reduce(
          (acc, curr) => (curr.id === movieDBid ? acc : acc.concat([curr])),
          favorites
        );
        this.setState({ favorites });
      })
      .catch(err => console.log(err));
  }

  deleteMovie(movie) {
    // same as above but do something diff
    console.log(movie);
    let movieDBid = movie.id;
    axios
      .delete(`/movies/delete/${movieDBid}`)
      .then(results => {
        let favorites = [];
        this.state.favorites.reduce(
          (acc, curr) => (curr.id === movieDBid ? acc : acc.concat([curr])),
          favorites
        );
        this.setState({ favorites });
      })
      .catch(err => console.log(err));
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render() {
    return (
      <div className="app">
        <header className="navbar">
          <h1>Bad Movies</h1>
        </header>

        <div className="main">
          <Search
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
          />
          <Movies
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
            addToFavorites={this.saveMovie}
            removeFromFavorites={this.deleteMovie}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
