import Router from 'express';
import {filterPosts} from '../Controller/PostFilter.js';

const router = Router();
// Route to get comments for a post
router.post('/search',filterPosts);       

export default router;