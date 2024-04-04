const mongoose = require('mongoose')

const string = 'mongodb+srv://shailendra:Flikt123@cluster0.yzhdp00.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(string)
        console.log(`Connected to MongoDB Database ${conn.connection.host}`);
    } catch (err) {
        console.log(`Error in MongoDB ${err}`);
    }
}

module.exports = connectDB;