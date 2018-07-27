var user = require('../models/user');

exports.getUsers = (req, res, next) => {
  user.find((err, users) => {
  if (err) {
    next(new Error(err));
  }
  else {
    res.status(200).send(users);
  }
  });
}

exports.createUser = (req, res, next) => {
  let newUser = new user(req.body);
  newUser.save((err, user) => {
  if (err) {
    next(new Error(err));
  }
  else {
    res.status(201).send(user);
  }
  });
}

exports.getUser = (req, res, next) => {
  let id = req.params.id
  user.findOne({_id: id}, (err, user) => {
  if (err) {
    next(new Error(err));
  }
  else {
    res.status(200).send(user);
  }
  });
}

exports.updateUser = (req, res, next) => {
  let id = req.params.id;
  user.findOne({_id: id}, (err, user) => {
  if (err) {
    next(new Error(err));
  }
  else {
    let updatedUser = new user(req.body);
    user.userName = updatedUser.userName;
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.save();
    res.status(200).send(user);
  }
  });
}

exports.deleteUser = (req, res, next) => {
  let id = req.params.id;
  user.findOne({_id: id}, (err, user) => {
  if (err) {
    next(new Error(err));
  }
  else {
    user.remove();
    res.status(204).send("Deleted");
  }
  });
}