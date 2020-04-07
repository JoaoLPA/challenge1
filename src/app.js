const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  repos = repositories.map((repo) => repo);
  response.send(repos);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const id = uuid();
  const likes = 0;

  const repo = {
    title,
    url,
    techs,
    id,
    likes,
  };

  repositories.push(repo);

  return response.send(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repo = repositories.findIndex((repository) => repository, id === id);

  return response.send(repositories[repo]);
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
