import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv'


dotenv.config();

const USERNAME =process.env.DB_USERNAME;
const PASSWORD =process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url:`mongodb://${USERNAME}:${PASSWORD}@chatify-chatapp-shard-00-00.ym6il.mongodb.net:27017,chatify-chatapp-shard-00-01.ym6il.mongodb.net:27017,chatify-chatapp-shard-00-02.ym6il.mongodb.net:27017/?ssl=true&replicaSet=atlas-137qv5-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Chatify-ChatApp`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1) 
            return`${Date.now()}-file-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-file-${file.originalname}`
        }
    }
})

export default multer({storage}); 