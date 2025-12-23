import express from 'express';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/uploads', express.static('uploads'));



export default app;
