const express = require('express');
const router = express.Router();
const { ModelMethods } = require('./methods');

const modelMethods = new ModelMethods();

router.post('/', async (req, res) => {
    try {
        let data = [
            {
                title: 'Se busca mozo',
                description: 'necesito mozo para el restaurante',
                payRate: '$1-$100',
            },
            {
                title: 'Necesito barman',
                description: 'necesito barman para atender la barra',
                payRate: '$1-$100',
            },
            {
                title: 'Busco recepcionista',
                description: 'el hotel esta falto de recepcionistas para la temporada',
                payRate: '$1-$100',
            },
            {
                title: 'Asistente de cocina',
                description: 'busco asistente de cocina para cubrir una ausencia',
                payRate: '$1-$100',
            },
            {
                title: 'Atencion al cliente',
                description: 'busco empleado para el local',
                payRate: '$1-$100',
            },
        ]
        toReturn = [];
        for (i = 0; i < data.length; i++) {
            let result = await modelMethods.create(data[i])
            toReturn.push(result)
        }
        //let result = await modelMethods.create(req.body);
        console.log('Dummy data inserted')
        res.status(201).send(toReturn);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
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