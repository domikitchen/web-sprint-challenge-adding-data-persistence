const express = require('express');

const Projects = require('./project_model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while grabbing your projects" });
        });
});

router.post('/', (req, res) => {
    const newProject = req.body;

    Projects.addNewProject(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while adding this project" });
        })
})

router.get('/resources', (req, res) => {
    Projects.getResources()
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while getting the resources" });
        });
});

router.post('/resources', (req, res) => {
    const newResource = req.body;

    Projects.addResource(newResource)
        .then(resource => {
            res.status(201).json(resource);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while adding this resource" });
        });
});

router.get('/tasks', (req, res) => {
    Projects.getTasks()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while getting the tasks" });
        })
})

router.get('/:id', (req, res) => {
    const projectId = req.params.id;

    Projects.getProjectById(projectId)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while grabbing this project" });
        });
});

router.get('/:id/tasks', (req, res) => {
    const projectId = req.params.id;

    Projects.getProjectTasks(projectId)
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while getting these tasks" });
        });
});

router.post('/:id/tasks', (req, res) => {
    const newTask = req.body;
    const projectId = req.params.id;

    Projects.addNewTask(newTask, projectId)
        .then(task => {
            res.status(201).json(task);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while adding this task" });
        });
});

router.get('/:id/resources', (req, res) => {
    const projectId = req.params.id;

    Projects.getProjectResourcesById(projectId)
        .then(resources => {
            res.status(200).json(resources);
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while retreiving the list of resources" });
        });
})

router.post('/:id/resources', (req, res) => {
    const projectId = req.params.id;
    const newResource = req.body;

    
})

module.exports = router;