const express = require('express');
const router = express.Router();    
const { ModelMethods } = require('./methods');
const verifyToken = require('../../jwtMiddleware'); 
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const modelMethods = new ModelMethods();

router.post('/apply', async (req, res) => {
    try {
        const data = req.body;
        let result = await modelMethods.create(data);
        res.status(201).send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/getUserApplication', async (req, res) => {
    try {
        const data = req.body;
        let result = await modelMethods.getApplication(data.userId, data.offerId);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/user/applications', async (req, res) => {
    try {
        let result = await modelMethods.getByUserId(req.body.userId);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

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

router.put('/:id', upload.single('cv'), async (req, res) => {
    try {
        const data = {
            ...req.body,
            cv: req.file ? req.file.path : undefined // Update the CV file path if a new file is uploaded
        };
        let result = await modelMethods.update(req.params.id, data);
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
