const express = require('express');
const router = express.Router();
const { ModelMethods } = require('./methods');
const verifyToken = require('../../jwtMiddleware'); 

const modelMethods = new ModelMethods();

router.post('/createOffer', async (req, res) => {
    try {
        const { image, title, description, startDate, endDate, startTime, endTime, salaryMin, salaryMax, userId, location } = req.body;

        // Ensure all required fields are provided
        if (!image || !title || !description || !startDate || !endDate || !salaryMin || !salaryMax || !userId || !location) {
            return res.status(400).send({ message: "All fields are required." });
        }

        const data = {
            image,
            title,
            description,
            dateStart: startDate,
            dateEnd: endDate,
            timeStart: startTime,
            timeEnd: endTime,
            salaryMin,
            salaryMax,
            userId,
            location,
            status: 'activa' 
        };

        let result = await modelMethods.create(data);
        res.status(201).send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});
router.get('/', async (req, res) => {
    try {
        const status = req.query.status;

        let filters = {};
        if (status) {
            filters.status = status;
        }

        let result = await modelMethods.getAll(filters);

        result.sort((a, b) => {
            if (a.status === 'activa' && b.status === 'finalizada') return -1;
            if (a.status === 'finalizada' && b.status === 'activa') return 1;
            return 0;
        });

        res.send(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let result = await modelMethods.getById(req.params.id);

        if (!result) {
            return res.status(404).send({ message: 'Offer not found' });
        }

        res.send(result);
    } catch (e) {
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

router.get('/user/:userId/offers', async (req, res) => {
    try {
        let userId = req.params.userId;
        let result = await modelMethods.getByUserId(userId);
        res.send(result);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

router.get('/offer/:offerId/applications', verifyToken, async (req, res) => {
    try {
        let result = await modelMethods.getByOfferId(req.params.offerId);
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