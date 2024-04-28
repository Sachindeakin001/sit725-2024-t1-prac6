let collection = require('../models/cat');

exports.insertCat = (req, res) => {
    let cat = req.body;
    collection.insertCat(cat, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'success' });
        } else {
            res.json({ statusCode: 500, message: 'server error' });
        }
    });
}


exports.getAllCats = (req, res) => {
    collection.getAllCats((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'success' });
        } else {
            res.json({ statusCode: 500, message: 'server error' });
        }
    });
}

exports.deleteCat = (req, res) => {
    let id = req.params.id; 
    collection.deleteCat(id, (err, result) => {
        if (err) {
            res.json({ statusCode: 500, message: 'server error' });
        } else {
            res.json({ statusCode: 200, data: result, message: 'success' });
        }
    });
}