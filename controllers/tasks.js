var task = require("../models/task.js") 

exports.getTasks = (req, res, next) => {
    task.find((err, tasks) => {
        if(err) {
            next(new Error(err));
        }
        else {
            res.status(200).send(tasks);
        }
    });
}