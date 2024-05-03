import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Thread from "./models/Thread";
import Comment from "./models/Comment";

const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const Collections = ['threads', 'comments', 'users'];

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    for (const collection of Collections) {
        await dropCollection(db, collection);
    }

    const [user1, user2] = await User.create(
        {
            username: 'Swire',
            password: '123Qwerty%',
            token: crypto.randomUUID(),
        },
        {
            username: 'LiliWeiss',
            password: '321Qwerty%',
            token: crypto.randomUUID(),
        }
    );

    const [thread1, thread2] = await Thread.create(
        {
            title: 'First Thread',
            description: 'This is first thread',
            user: user1._id
        },
        {
            title: 'Second Thread',
            description: 'This is second thread',
            user: user2._id
        },
    );

    const [comment1, comment2, comment3, comment4] = await Comment.create(
        {
            user: user1._id,
            thread: thread1._id,
            content: 'Post from user1',
        },
        {
            user: user1._id,
            thread: thread2._id,
            content: 'another post from user1',
        },
        {
            user: user2._id,
            thread: thread1._id,
            content: 'Post from user2'
        },
        {
            user: user2._id,
            thread: thread2._id,
            content: 'another post from user2'
        },
    );

    await db.close();
};

void run();