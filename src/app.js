const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//List all repositories

app.get("/repositories", (request, response) => {
  repos = repositories.map((repo) => repo);
  response.send(repos);
});

//create a repository

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    title,
    url,
    techs,
    id: uuid(),
    likes: 0,
  };

  repositories.push(repo);

  return response.send(repo);
});

//update a repository

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex === -1) {
    response.status(400).json({ error: "Repository that does not exist" });
  }

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes,
  };

  repositories[repoIndex] = repo;

  return response.send(repo);
});

//delete a repository

app.delete("/repositories/:id", (request, respond) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  repoIndex != -1
    ? repositories.splice(repoIndex, 1)
    : respond.status(400).json({ error: "Not a valid repository" });

  respond.status(204).send();
});

//give likes

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex === -1) {
    response.status(400).json({ error: "Repository that does not exist" });
  } else {
    repositories[repoIndex].likes++;
    return response.json(repositories[repoIndex]);
  }
});

module.exports = app;
