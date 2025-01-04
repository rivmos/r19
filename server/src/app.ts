import express from 'express';
import mongoose from 'mongoose';
import config from './utils/config';
import dotenv from 'dotenv';
import cors from 'cors';
import folderRoutes from './controllers/folderController';
import fileRoutes from './controllers/fileController';
import path from 'path';

dotenv.config();

const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());

app.use('/folders', folderRoutes);
app.use('/files', fileRoutes);

mongoose.connect(config.MONGO_URI as string).then(() => {
    console.log('mongo kissed')
}).catch(() => {
    console.log('mongo not kissed')
})

app.get('/', (req, res) => {
    res.json({message: ''})
})

export default app