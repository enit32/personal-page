const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('principal/index.hbs');
});

module.exports = router;