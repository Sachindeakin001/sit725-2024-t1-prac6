var express = require("express");
var router = express.Router();
var controller = require('../controllers/controllers');

router.post('/cat', controller.insertCat);
router.get('/cats', controller.getAllCats);
router.delete('/cat/:id', controller.deleteCat);

module.exports = router;