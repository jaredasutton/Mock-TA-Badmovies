import React from "react";
const axios = require("axios");

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      selected: 0
    };
    this.getGenres = this.getGenres.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get("/movies/genres").then(({ data }) => {
      let [...genres] = data.results;
      this.setState({ genres, selected: genres[0] });
    });
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select
          onChange={e => {
            this.setState({ selected: e.target.value });
          }}
          value={this.state.selected}
        >
          {this.state.genres.map(genre => {
            return (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />

        <button
          onClick={() => {
            //console.log(`selected: ${this.state.selected}`);
            this.props.getMoviesForGenre(this.state.selected);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
