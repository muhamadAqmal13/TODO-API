const { Schema, model } = require('mongoose');

const schemaTodo = new Schema(
    {
        uid: {
            type: Number,
            required: true
        },
        todos: {
            type: Array,
            default: [
                {
                    id: {
                        type: Number,
                        required: true
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String
                    },
                    createTime: {
                        type: Date,
                        default: new Date().getTime()
                    },
                    updateTime: {
                        type: Date,
                        default: new Date().getTime()
                    },
                    isDone: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Todo = new model('Todo', schemaTodo);

module.exports = Todo;
