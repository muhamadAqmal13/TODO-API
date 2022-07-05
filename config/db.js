const mongoose = require('mongoose');

mongoose.connect(process.env.URI);

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => {
    console.log('MongoDB id Connected');
});
