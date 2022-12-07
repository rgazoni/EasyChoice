const mongoose = require('mongoose');

const mongoUri = `mongodb+srv://ecdb:${process.env.MONGO_KEY}@easychoicedb.66uzpwp.mongodb.net/?retryWrites=true&w=majority`;

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