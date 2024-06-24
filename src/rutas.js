const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('partials/index');
});

router.get('/venta', (req, res)=>{
    res.render('partials/venta');
});

module.exports = router;