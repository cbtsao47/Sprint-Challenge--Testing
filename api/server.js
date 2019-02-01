const express = require("express");
const configMiddleware = require("../config/middleware");
const server = express();
const db = require("../data/dbConfig");

configMiddleware(server);
server.get("/games", async (req, res) => {
  try {
    const games = await db("games");
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: "failed" });
  }
});
server.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const game = await db("games").where({ id });
    res.status(200).json(game[0]);
  } catch (err) {
    res.status(500).json({ message: "failed" });
  }
});
server.post("/games", async (req, res) => {
  const newGame = req.body;
  try {
    if (newGame.title && newGame.genre) {
      const id = await db("games").insert(newGame);
      res.status(201).json(id);
    } else {
      res.status(422).json({ message: "incomplete form" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed" });
  }
});
module.exports = server;
