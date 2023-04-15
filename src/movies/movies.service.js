const knex = require("../db/connection");

function listAll() {
  return knex("movies").select("*");
}

module.exports = {
  listAll,
}