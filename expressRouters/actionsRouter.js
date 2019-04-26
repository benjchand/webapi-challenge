const express = require("express");

const db = require("../data/helpers/actionModel");
const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.post("/:id", (req, res) => {
  //   const { id } = req.params;
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    sendUserError(
      400,
      "Please provide a project_id, description, and notes for the project",
      res
    );
    return;
  }

  db.insert({
    project_id,
    description,
    notes
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      sendUserError(404, "The action identifier does not exist.", res);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  //   if (!project_id || !description || !notes) {
  //     sendUserError(
  //       400,
  //       "Please provide a project_id, description, and notes for the project",
  //       res
  //     );
  //     return;
  //   }
  db.update(id, { project_id, description, notes })
    .then(action => {
      res.json({ action });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error in updating the action."
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(projects => {
      res.json({
        success: `Action with the id: ${id} has been removed`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The Action information could not be retrieved."
      });
    });
});

module.exports = router;
