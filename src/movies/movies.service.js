const knex = require("../db/connection");

function listAll() {
  return knex("movies").select("*");
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true})
}

module.exports = {
  listAll,
  listShowing
}