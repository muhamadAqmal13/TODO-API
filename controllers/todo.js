const Todo = require('../models/todo');
const jwt_decode = require('jwt-decode');

const decodeToken = (req) => {
    const getCookies = req.cookies.refreshToken;
    const decode = jwt_decode(getCookies);
    return decode;
};
const notLogin = {
    error: 1,
    message: 'Silahkan login terlebih dahulu'
};
const encTexttoNum = (text) => {
    let num = 0;
    for (let i = 0; i < text.length; i++) {
        num += parseInt(text.charCodeAt(i));
    }
    return num;
};

const list = async (req, res) => {
    try {
        const decode = decodeToken(req);
        console.log(decode);
        const findUserTodo = await Todo.findOne({ uid: decode.uid });
        res.send({
            uid: findUserTodo.uid,
            name: decode.name,
            username: decode.username,
            todos: findUserTodo.todos
        });
    } catch (error) {
        res.status(401).send(notLogin);
    }
};

const addTodo = async (req, res) => {
    try {
        const decode = decodeToken(req);
        const dt = new Date();
        const tid = `
        ${encTexttoNum(decode.uid.toString())}${(
            '0' +
            (dt.getMonth() + 1)
        ).slice(-2)}${('0' + dt.getDate()).slice(-2)}${(
            '0' + dt.getHours()
        ).slice(-2)}${('0' + dt.getMinutes()).slice(-2)}${(
            '0' + dt.getSeconds()
        ).slice(-2)}`;
        const todos = {
            id: parseInt(tid),
            tittle: req.body.tittle,
            description: req.body.description,
            createTime: new Date().getTime(),
            updateTime: new Date().getTime(),
            isDone: false
        };
        const updateTodo = await Todo.updateOne(
            { uid: decode.uid },
            {
                $push: { todos }
            }
        );
        if (updateTodo.matchedCount == 0 && updateTodo.modifiedCount == 0) {
            return res.status(403).send({
                error: 1,
                message:
                    'Tidak ada data yang di tambahkan atau akun tidak di temukan'
            });
        }
        res.send({ error: 0, message: 'Sukses menambahkan TODO', todos });
    } catch (err) {
        res.status(401).send(notLogin);
    }
};

const deleteTodo = async (req, res) => {
    try {
        const decode = decodeToken(req);
        try {
            const findUser = await Todo.findOneAndUpdate(
                { 'todos.id': parseInt(req.params.id) },
                { $pull: { todos: { id: parseInt(req.params.id) } } },
                { safe: true, multi: false }
            );
            if (findUser == null) {
                return res.status(404).send({
                    error: 1,
                    message: 'Tidak dapat menemuka id TODO'
                });
            }
            res.send({
                error: 0,
                message: 'Berhasil menghapus data',
                data: updateTodo
            });
        } catch (err) {
            res.send(500).send(err.message);
        }
    } catch (err) {
        res.status(401).send(notLogin);
    }
};

const updateTodo = async (req, res) => {
    try {
        const decode = decodeToken(req);
        try {
            const findUser = await Todo.findOneAndUpdate(
                {
                    'todos.id': req.body.id
                },
                {
                    'todos.$.id': req.body.id,
                    'todos.$.tittle': req.body.tittle,
                    'todos.$.description': req.body.description,
                    'todos.$.updateTime': new Date().getTime(),
                    'todos.$.isDone': req.body.isDone
                }
            );
            if (findUser == null) {
                return res.status(404).send({
                    error: 1,
                    message: 'Tidak dapat menemuka id TODO'
                });
            }
            const user = await Todo.findOne({ 'todos.id': req.body.id }, [
                'todos'
            ]);
            res.send({
                error: 0,
                message: 'Berhasil mengupdate TODO',
                data: user.todos.find((el) => el.id == req.body.id)
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    } catch (err) {
        res.status(401).send(notLogin);
    }
};

module.exports = { list, addTodo, deleteTodo, updateTodo };
