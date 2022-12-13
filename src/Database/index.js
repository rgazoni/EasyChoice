const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

try {
    // Connect to the MongoDB cluster
    mongoose.set('strictQuery', false);
    mongoose.connect(
        mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log("Mongoose is connected")
    );
}catch(e) {
    console.log("Could not connect");
}

db = mongoose.connection;

module.exports = { 
    db: db
};