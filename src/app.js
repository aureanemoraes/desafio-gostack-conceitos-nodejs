const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Middlewares
function validateId(request, response, next) {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    repository => repository.id === id
  );

  if(repositoryIndex < 0) {
    return response.status(400).send('ID not found.');
  }

  request.repositoryIndex = repositoryIndex;

  return next();
}

app.use('/repositories/:id', validateId);

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.send(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = repositories[request.repositoryIndex];

  if(repository.title !== title) 
    repository.title = title;
  if(repository.url !== url) 
    repository.url = url;
  if(repository.techs !== techs) 
    repository.techs = techs;

  return response.send(repository);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  repositories.splice(request.repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  repositories[request.repositoryIndex].likes += 1;
  return response.status(204).send();
});

module.exports = app;
