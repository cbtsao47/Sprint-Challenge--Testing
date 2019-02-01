const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

afterEach(async () => {
  await db("games").truncate();
});

describe("server.js", () => {
  describe("GET/games endpoint", () => {
    it("should respond with status code 200 ok", async () => {
      let res = await request(server).get("/games");
      expect(res.status).toBe(200);
    });
    it("should respond with an empty array if empty", async () => {
      let res = await request(server).get("/games");
      expect(res.body).toEqual([]);
    });
    it("should respond with an array of objects if not empty", async () => {
      let expected = {
        id: 1,
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      };
      let res = await request(server)
        .post("/games")
        .send(expected);
      res = await request(server).get("/games");
      expect(res.body).toEqual([expected]);
    });
    it("should respond with a game object", async () => {
      let expected = {
        id: 1,
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      };
      let res = await request(server)
        .post("/games")
        .send(expected);
      res = await request(server).get(`/games/1`);
      expect(res.body).toEqual(expected);
    });
  });
  describe("POST/games endpoint", () => {
    it("should respond with status code 422 if incomplete", async () => {
      let body = {
        title: "Pacman" // required
      };
      let res = await request(server)
        .post("/games")
        .send(body);
      expect(res.status).toBe(422);
      res = await request(server)
        .post("/games")
        .send({ genre: "action" });
      expect(res.status).toBe(422);
    });
    it("should respond with status code 405 if game already exists", async () => {
      let body = {
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      };
      let res = await request(server)
        .post("/games")
        .send(body);
      res = await request(server)
        .post("/games")
        .send(body);
      expect(res.status).toBe(405);
    });
    it("should respond with the id of the created game", async () => {
      let body = {
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      };
      let res = await request(server)
        .post("/games")
        .send(body);
      expect(res.body).toEqual([1]);
    });
  });
});
