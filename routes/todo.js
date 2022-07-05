const express = require('express');
const router = express.Router();

const {
    list,
    addTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todo');
const verifyToken = require('../middleware/auth');

router.get('/', list);

router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.patch('/', updateTodo);

module.exports = router;
