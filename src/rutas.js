const express = require('express');
const router = express.Router();
const controlPeticiones = require('./lib/peticiones.js');

router.get('/', (req, res)=>{
    res.render('partials/index');
});

router.get('/venta', (req, res)=>{
    res.render('partials/venta');
});

router.post('/agregar', controlPeticiones.agregar);
router.post('/consultar', controlPeticiones.consultar);
router.post('/solicitar', controlPeticiones.solicitar);

module.exports = router;