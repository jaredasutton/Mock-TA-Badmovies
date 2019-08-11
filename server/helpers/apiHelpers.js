const request = require("request");
const axios = require("axios");
const { API_KEY } = require("../../config.js");

// write out logic/functions required to query TheMovieDB.org
module.exports.requestMovieDB = (endpoint, query) => {
  query = query === undefined ? [] : query;
  let url = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-us${query.reduce(
    (acc, curr) => acc + `&${curr}`,
    ""
  )}`;
  console.log(url);
  return axios.get(url).then(({ data }) => {
    console.log(`\n\nresponse:\n\n${data}\n\n`);
    return JSON.stringify(data);
  });
};

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
