const express = require("express");
const actionsRouter = require("./expressRouters/actionsRouter.js");
const projectsRouter = require("./expressRouters/projectsRouter.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h2> This is the sprint Project and it is running </h2>");
});

server.use("/actions/", actionsRouter);

server.use("/projects/", projectsRouter);

module.exports = server;
