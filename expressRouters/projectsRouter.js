const express = require("express");

const db = require("../data/helpers/projectModel");
const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    sendUserError(
      400,
      "Please provide a name and description for the project",
      res
    );
    return;
  }
  db.insert({
    name,
    description
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      sendUserError(
        500,
        `{ error: "There was an error while saving the project to the database." }`,
        res
      );
      return;
    });
});

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.json({ projects });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The projects information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(projects => {
      res.json({ projects });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The projects information could not be retrieved."
      });
    });
});

router.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id)
    .then(projects => {
      res.json({ projects });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The projects information could not be retrieved."
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name || !description) {
    sendUserError(
      400,
      "Please provide a name and description for the project",
      res
    );
    return;
  }
  db.update(id, { name, description })
    .then(projects => {
      res.json({ projects });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error in updating the project."
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(projects => {
      res.json({
        success: `Project with the id: ${id} has been removed`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The projects information could not be retrieved."
      });
    });
});

module.exports = router;
