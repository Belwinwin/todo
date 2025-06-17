const todoRepository = require('../repositories/todoRepository');

exports.createTodo = (data) => todoRepository.create(data);
exports.getTodos = () => todoRepository.findAll();
exports.updateTodo = (id, data) => todoRepository.update(id, data);
exports.deleteTodo = (id) => todoRepository.remove(id);