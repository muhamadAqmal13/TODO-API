const User = require('../models/user');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.status(403).send({ msg: 'Token tidak valid' });
        const user = await User.findOne({ refresh_token: refreshToken });
        if (!user) return res.send(403);
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN,
            async (err, decode) => {
                if (err) return res.status(401).send({ error: 1, msg: err });
                const dataEnc = {
                    uid: user.uid,
                    email: user.email,
                    username: user.username,
                    name: user.name
                };
                try {
                    const accessToken = jwt.sign(
                        dataEnc,
                        process.env.ACCESS_TOKEN,
                        {
                            expiresIn: '15s'
                        }
                    );
                    res.json({ accessToken });
                } catch (err) {
                    res.sendStatus(401);
                }
            }
        );
    } catch (err) {
        res.status(500).send({ msg: err });
    }
};

module.exports = refreshToken;
