const router = require('express').Router();
let Request = require('../models/request');


router.route('/').get((req, res) => {
  // return res.status(200).json({
  //     success:true,
  //     redirectUrl: '/'
  // })
  // const screenshot = req.query.screenshot;
  // console.log(req.query.screenshot)
  return res.send(req.query)
});


module.exports = router;