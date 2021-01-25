// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

// middleware
const { validateActionId, validateActionBody } = require('../middleware');

// router for /api/actions
const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})
router.get('/:id', validateActionId, (req, res, next) => {
    const { id } = req.params;
    Actions.get(id)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Sorry, the specified ID does not exist" })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(next)
})
router.post('/', validateActionBody, (req, res, next) => {
    Actions.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
})
router.put('/:id', validateActionId, validateActionBody, (req, res, next) => {
    const { id } = req.params
    Actions.update(id, req.body)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
})
router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(deleted => {
            if (deleted ===1) {
                res.status(200).json({ message: `The action with the id of ${req.params.id} was deleted.` })
            } else {
                res.status(404).json({ message: `The action with the id of ${req.params.id} was not found.` })
            }
        })
        .catch(next)
})

router.use((error, req, res, next) => {
    res.status(500).json({ info: "There was an error in the router", message: error.message, stack: error.stack })
})

module.exports = router;