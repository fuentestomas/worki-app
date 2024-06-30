const express = require('express');
const router = express.Router();
const { ModelMethods } = require('./methods');

const modelMethods = new ModelMethods();

router.post('/', async (req, res) => {
    try {
        let result = await modelMethods.create(req.body);
        res.status(201).send(result);
    } 
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

router.post('/register', async (req, res) => {
    try {
        let result = await modelMethods.register(req.body);
        res.status(201).send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
})

router.post('/login', async (req, res) => {
    try {
        let result = await modelMethods.login(req.body);
        res.status(201).send(result);
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
})

router.get('/', async (req, res) => {
    try {
        let result = await modelMethods.getAll();
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let result = await modelMethods.getById(req.params.id);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let result = await modelMethods.update(req.params.id, req.body);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let result = await modelMethods.delete(req.params.id);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

module.exports = {
    router
};