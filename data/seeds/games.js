exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        {
          title: "Pacman", // required
          genre: "Arcade", // required
          releaseYear: 1980 // not required
        },
        {
          title: "KH3", // required
          genre: "ARPG", // required
          releaseYear: 2019 // not required
        },
        {
          title: "BDO", // required
          genre: "MMO", // required
          releaseYear: 2018 // not required
        }
      ]);
    });
};
