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
  });
});
