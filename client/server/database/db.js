import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME =process.env.DB_USERNAME;
const PASSWORD =process.env.DB_PASSWORD;

const Connection = async () => {
    const URL = `mongodb://${USERNAME}:${PASSWORD}@chatify-chatapp-shard-00-00.ym6il.mongodb.net:27017,chatify-chatapp-shard-00-01.ym6il.mongodb.net:27017,chatify-chatapp-shard-00-02.ym6il.mongodb.net:27017/?ssl=true&replicaSet=atlas-137qv5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Chatify-ChatApp`;

    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting with the database:', error.message);
    }
}

export default Connection;
