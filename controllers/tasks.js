var task = require('../models/task');

exports.getTasks = (req, res, next) => {
  task.find((err, tasks) => {
  if (err) {
    next(new Error(err));
  }
  else {
    res.status(200).send(tasks);
  }
  });
}

exports.createTask = (req, res, next) => {
  let newTask = new task(req.body);
  newTask.save((err, task) => {
  if (err) {
    next(new Error(err));
  }
  else {
    res.status(201).send(task);
  }
  });
}

exports.getTask = (req, res, next) => {
  let id = req.params.id
  task.findOne({_id: id}, (err, task) => {
  if (err) {
    next(new Error(err));
  }
  else {
    res.status(200).send(task);
  }
  });
}

exports.updateTask = (req, res, next) => {
  let id = req.params.id;
  task.findOne({_id: id}, (err, newtask) => {
  if (err) {
    next(new Error(err));
  }
  else {
    let updatedTask = new task(req.body);
    newtask.title = updatedTask.title;
    newtask.description = updatedTask.description;
    newtask.save();
    res.status(200).send(newtask);
  }
  });
}

exports.deleteTask = (req, res, next) => {
  let id = req.params.id;
  task.findOne({_id: id}, (err, newtask) => {
  if (err) {
    next(new Error(err));
  }
  else {
    newtask.remove();
    res.status(204).send("Deleted");
  }
  });
}