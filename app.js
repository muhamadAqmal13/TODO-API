require('dotenv').config();
require('./config/db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');

const routesV1User = require('./routes/user');
const routesV1Todo = require('./routes/todo');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
        credentials: true,
        origin: process.env.HOST
    })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/TodoListUser', routesV1User);
app.use(`/api/v1/TodoList/Todo`, routesV1Todo);

app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
});
