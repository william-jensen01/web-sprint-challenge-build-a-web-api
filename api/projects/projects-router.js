// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

//middleware
const { validateProjectId, validateProjectBody } = require('../middleware');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})
router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project)
})
router.post('/', validateProjectBody, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})
router.put('/:id', validateProjectId, validateProjectBody, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})
router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(deleted => {
            res.status(200).json({ message: `The project with the id of ${req.params.id} was deleted` })
        })
        .catch(next)
})
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actionsArray => {
            res.status(200).json(actionsArray)
        })
        .catch(next)
})


router.use((error, req, res, next) => {
    res.status(500).json({ info: "There was an error in the router",
    message: error.message,
    stack: error.stack})
})

module.exports = router