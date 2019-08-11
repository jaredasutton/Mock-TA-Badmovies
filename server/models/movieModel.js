//SELECT one db to work with
//For SQL
const sqlDb = require("../../db/sql");
//For Mongo
//const mongoDb = require('../../db/mongodb')

module.exports = {
  getFavoriteWithId: id => {
    return new Promise((resolve, reject) => {
      let preparedQuery = `select * from favorites where movieDBid=?`;
      sqlDb.query(preparedQuery, [id], (err, results, fields) => {
        if (err || !results.length) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  addFavorite: id => {
    return new Promise((resolve, reject) => {
      let preparedQuery = `insert into favorites (movieDBid) values (?)`;
      sqlDb.query(preparedQuery, [id], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  removeFavorite: id => {
    return new Promise((resolve, reject) => {
      let preparedQuery = `delete from favorites where movieDBid = ?`;
      sqlDb.query(preparedQuery, [id], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
};
