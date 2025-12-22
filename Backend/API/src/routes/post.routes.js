import { Router } from 'express';
import { createPost, deletePost, editPost, getPostByID, getPosts, myPosts, search } from '../controller/post.controller.js';
import { authenticateToken } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';


const router = Router();

router.get('/all',  authenticateToken, getPosts);

router.post('/create', authenticateToken, upload.array("images", 5), createPost );

router.get('/view/:id', getPostByID)

router.get('/my-posts', authenticateToken, myPosts);

router.get('/search', search);

router.patch('/edit/:id', authenticateToken, upload.array("images", 5), editPost);

router.delete('/delete/:id', authenticateToken, deletePost)




export default router;