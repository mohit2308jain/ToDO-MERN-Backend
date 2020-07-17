const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userid: { type: String, required: true},
  category: { type: String, required: true },
  task: { type: String, required: true },
  status: { type: String, default: 'New'},
  remarks: { type: String, required: true },
  duedate: { type: String, required: true },
  archived: { type: Boolean, default: false }
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;