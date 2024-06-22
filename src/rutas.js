const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('principal/index.hbs');
});

router.get('/venta', (req, res)=>{
    res.render('venta/venta.hbs');
});

module.exports = router;