require('dotenv').config();
const mongoose = require('mongoose');

//mongodb connection
mongoose.connect(
    process.env.MONGO_DB, {
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err) {
            console.log('MONGO_DB connected');
        } else {
            console.log('Could not connect to mongo db' + err)
        }
    });