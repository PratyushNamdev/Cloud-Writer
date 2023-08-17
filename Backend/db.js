const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/admin'


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/local');
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = main;