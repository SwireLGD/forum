import express from 'express';
import auth from '../middleware/auth';
import { ThreadMutation } from '../types';
import Thread from '../models/Thread';
import mongoose, { Types } from 'mongoose';

const threadsRouter = express.Router();

threadsRouter.post('/', auth, async (req, res, next) => {
    try {
        if (!req.body.title) {
            return res.status(422).send({ error: 'Title is required!' });
        }

        if (!req.body.description && !req.body.image) {
            return res.status(422).json({ message: 'Either description or image must be provided.' });
        }

        const threadData: ThreadMutation = {
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };
    
        const thread = new Thread(threadData);
        await thread.save();
    
        return res.send(thread);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
          }
    
          next(e);
    }
});

threadsRouter.get('/', async (req, res, next) => {
    try {
        const threads = await Thread.find();

        res.send(threads);
    } catch (e) {
        next(e);
    }
});

threadsRouter.get('/:id', async (req, res, next) => {
    try {
        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch (e) {
            return res.status(404).send({ error: 'Wrong ObjectId' });
        }

        const thread = await Thread.findOne({ _id });

        if(!thread) {
            return res.status(404).send({ error: 'Not Found!' });
        }

        return res.send(thread);
    } catch (e) {
        next(e);
    }
});

export default threadsRouter;