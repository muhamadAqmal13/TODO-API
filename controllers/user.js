const User = require('../models/user');
const Todo = require('../models/todo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dataUser = async (req, res) => {
    const findData = await User.find({}, [
        'email',
        'name',
        'username',
        'createdAt'
    ]);
    res.send(findData);
};
const encTexttoNum = (text) => {
    let num = 0;
    for (let i = 0; i < text.length; i++) {
        num += parseInt(text.charCodeAt(i));
    }
    return num;
};

const Login = async (req, res) => {
    const checkEmail = await User.findOne({ email: req.body.email });
    try {
        if (checkEmail == null) {
            return res.status(404).send({
                error: 1,
                message: "Email or Password isn't valid"
            });
        }
        const matchPas = await bcrypt.compare(
            req.body.password,
            checkEmail.password
        );
        if (!matchPas) {
            return res.status(404).send({
                error: 1,
                message: "Email or Password isn't valid"
            });
        }
        const dataUser = await User.findOne({ email: req.body.email });
        const dataEnc = {
            uid: dataUser.uid,
            email: dataUser.email,
            username: dataUser.username,
            name: dataUser.name
        };
        const accessToken = jwt.sign(dataEnc, process.env.ACCESS_TOKEN, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign(dataEnc, process.env.REFRESH_TOKEN, {
            expiresIn: '1d'
        });
        await User.updateMany(
            { uid: dataUser.uid },
            { refresh_token: refreshToken }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
        });
        res.send({ error: 0, message: 'Berhasil Login', accessToken });
    } catch (err) {
        res.status(500).send({ error: 1, message: err.message });
    }
};

const Registration = async (req, res) => {
    const checkUser = await User.findOne({
        email: req.body.email,
        username: req.body.username
    });
    if (checkUser) {
        return res.status(400).json({
            error: 1,
            message: 'Email or username has been registered'
        });
    }
    try {
        const uid = `${encTexttoNum(req.body.username)}${encTexttoNum(
            req.body.email
        )}`;
        const addUser = new User({
            uid: parseInt(uid),
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            password: req.body.password
        });
        const saveUser = await addUser.save();
        const getData = await User.findOne({ uid: parseInt(uid) });
        const data = {
            uid: getData.uid,
            email: getData.email,
            username: getData.username,
            name: getData.name,
            createdAt: getData.createdAt
        };
        const dt = new Date();
        const tid = `
        ${encTexttoNum(uid)}${('0' + (dt.getMonth() + 1)).slice(-2)}${(
            '0' + dt.getDate()
        ).slice(-2)}${('0' + dt.getHours()).slice(-2)}${(
            '0' + dt.getMinutes()
        ).slice(-2)}${('0' + dt.getSeconds()).slice(-2)}`;
        const createDocumentTodo = await new Todo({
            uid: parseInt(uid),
            todos: [
                {
                    id: parseInt(tid),
                    tittle: `Hello ${getData.name}`,
                    description: `Let's create Todo List for today`,
                    createTime: new Date().getTime(),
                    updateTime: new Date().getTime(),
                    idDone: false
                }
            ]
        });
        await createDocumentTodo.save();

        res.status(201).send({
            error: 0,
            message: 'Registration successfull',
            data
        });
    } catch (err) {
        res.status(400).send({ error: 1, message: err.message });
    }
};

const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await User.find({ refresh_token: refreshToken });
    if (!user) return res.send(204);
    await User.updateOne({ _id: user.id }, { refresh_token: null });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
};
module.exports = { Login, Registration, dataUser, Logout };
