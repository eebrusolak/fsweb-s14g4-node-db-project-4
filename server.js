const express = require("express");

const server = express();

server.use(express.json());

const recipesRouter = require("./api/recipes/recipes-router");

server.use("/api/recipes", recipesRouter);

module.exports = server;