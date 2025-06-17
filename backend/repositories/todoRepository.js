const Todo = require('../models/Todo');

exports.create = (data) => Todo.create(data);
exports.findAll = () => Todo.find();
exports.findById = (id) => Todo.findById(id);
exports.update = (id, data) => Todo.findByIdAndUpdate(id, data, { new: true });
exports.remove = (id) => Todo.findByIdAndDelete(id);