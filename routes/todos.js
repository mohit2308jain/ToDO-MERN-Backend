const router = require('express').Router();
let Todo = require('../models/todo.model');

router.route('/').get((req, res) => {
  console.log(req.query.archived);
  Todo.find({ userid: req.query.userid, archived: req.query.archived})
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userid = req.body.userid;
  const category = req.body.category;
  const task = req.body.task;
  const remarks = req.body.remarks;
  const duedate = req.body.duedate;

  const newTodo = new Todo({
    userid,
    category,
    task,
    remarks,
    duedate
  });
  console.log(newTodo);

  newTodo.save()
  .then(() => res.json('Todo added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Todo deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      todo.userid = req.body.userid;
      todo.category = req.body.category;
      todo.task = req.body.task;
      todo.status = req.body.status;
      todo.remarks = req.body.remarks;
      todo.duedate = req.body.duedate;
      todo.archived = req.body.archived;

      todo.save()
        .then(() => res.json('Todo updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => {console.log(err.response.request._response); res.status(400).json('Error: ' + err)});
});

module.exports = router;