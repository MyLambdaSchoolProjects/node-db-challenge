const express = require("express");

const tasks = require("./taskdb-model");

const router = express.Router();

router.post("/resources", (req, res) => {
  tasks
    .addResource(req.body)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Failed to insert Resource" });
    });
});

router.get("/resources", (req, res) => {
  tasks
    .getResources()
    .then(resource => {
      res.status(200).json(resource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Failed to find any Resources" });
    });
});

router.post("/projects", (req, res) => {
  tasks
    .addProject(req.body)
    .then(proj => {
      res.status(201).json(proj);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Failed to insert Project" });
    });
});

router.post("/addto", (req, res) => {
  tasks
    .addToProject(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).json({ msg: "Failed to insert" });
    });
});

router.get("/projects/:id", (req, res) => {
  tasks
    .getProjectInfo(req.params.id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      console.error("error", err);
      res.status(404).json({ msg: "Not found" });
    });
});

router.get("/projects", (req, res) => {
  tasks
    .getProjects()
    .then(proj => {
      const boolToString = proj.map(proj => {
        if (proj.completed === 0) {
          return { ...proj, completed: false };
        } else {
          return { ...proj, completed: true };
        }
      });
      res.status(200).json(boolToString);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Failed to find any Projects" });
    });
});

router.post("/", (req, res) => {
  tasks
    .addTask(req.body)
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Failed to insert Task" });
    });
});

router.get("/:id", (req, res) => {
  tasks
    .getTasks(req.params.id)
    .then(task => {
      const boolToString = task.map(task => {
        if (task.completed === 0) {
          return { ...task, completed: false };
        } else {
          return { ...task, completed: true };
        }
      });
      res.status(200).json(boolToString);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "Failed to find any Tasks" });
    });
});
module.exports = router;
