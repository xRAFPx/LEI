const express = require('express');
const router = express.Router();
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Pedidos de Intervenção' });
});

router.post('/', function(req, res, next) {
    // console.log(req.query.screenshot)
    return res.send(req.query);
});

module.exports = router;