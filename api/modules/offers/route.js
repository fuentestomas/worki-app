const express = require('express');
const router = express.Router();
const { ModelMethods } = require('./methods');

const modelMethods = new ModelMethods();

router.post('/', async (req, res) => {
    try {
        let data = [
            {
                title: 'Mozo',
                description: 'Estamos en busqueda de un Mozo para cubrir en sede Nueva Córdoba. Para aplicar al puesto se solicita 2 años de experiencia comprobable (excluyente).',
                payRate: '$2k - $5k',
            },
            {
                title: 'Barman',
                description: 'Estas en búsqueda de tu primer experiencia como Barman? Cadiz Club te abre las puertas. Buscamos una persona apasionada por aprender y trabajar.',
                payRate: '$2k - $3k',
            },
            {
                title: 'Recepcionista',
                description: 'Te ofrecemos la oportunidad de trabajar en una de las cadenas de  hoteles más grandes de Argentina. Luxor Hotel está en búsqueda de un/a recepcionista. Puesto fulltime de Luneas a Viernes 09:00hs a 18:00hs.',
                payRate: '$1.5k - $2k',
            },
            {
                title: 'Asistente de Cocina',
                description: 'Nos encontramos en búsqueda de un asistente de cocina con ganas de aprender y crecer en el rubro. Somos un restaurante con mas de 100 años. ',
                payRate: '$3k - $3.5k',
            },
            {
                title: 'Atencion al Cliente',
                description: 'Tenemos una oportunidad dentro de la Dirección de Negocios y Tecnología, ya que buscamos un Category Manager Sr que va a trabajar en:\n\nTenemos una oportunidad dentro de la Dirección de Negocios y Tecnología, ya que buscamos un Category Manager Sr que va a trabajar en:\n\nTenemos una oportunidad para vos! Postulate como atención al cliente y unite a una empresa que busca el crecimiento profesional de nuestros trabajadores.',
                payRate: '$2k - $2.5k',
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