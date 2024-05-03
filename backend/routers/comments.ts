import express from 'express';
import auth from '../middleware/auth';
import { CommentMutation } from '../types';
import mongoose from 'mongoose';
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req, res, next) => {
    try {
        if (!req.body.content) {
            return res.status(422).send({ error: 'content is required!' });
        }

        const commentData: CommentMutation = {
            content: req.body.content
        };
    
        const comment = new Comment(commentData);
        await comment.save();
    
        return res.send(comment);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
          }
    
          next(e);
    }
});

commentsRouter.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.find();

        res.send(comments);
    } catch (e) {
        next(e);
    }
});