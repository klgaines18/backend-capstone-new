const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");

const addCritic = reduceProperties("review_id", {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  created_at: ["critic", "created_at"],
  updated_at: ["critic", "updated_at"]
})

const mapCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at"
})


function list(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId})
    .then(addCritic);
    
}


function read(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.*", 
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as c_created_at",
      "c.updated_at as c_updated_at"
      )
    .where({ "r.review_id": review_id})
    .first()
    .then(mapCritic)
}


function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}


module.exports = {
  list,
  update,
  read,
  delete: destroy
}