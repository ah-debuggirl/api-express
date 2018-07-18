var user = require('../models/user.js');

exports.getUsers = (req, res, next) => {
    user.find((err, users) => {
        if(err) {
            next(new Error(err));
        }
        else {
            res.status(200).send(users);
        }
    });
}

