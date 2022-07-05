const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const User = new Schema(
    {
        uid: {
            type: Number,
            require: true,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            trim: true
        },
        username: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            minLength: [6, 'Username must be at least 6'],
            maxLength: 15,
            trim: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: [6, 'Password must be at least 8']
        },
        refresh_token: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

User.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});
module.exports = mongoose.model('User', User);
