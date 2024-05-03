import mongoose, { Types } from "mongoose";
import User from "./User";
import Thread from "./Thread";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: async (id: Types.ObjectId) => {
                const user = await User.findById(id);
                return Boolean(user);
                },
                message: 'User does not exist!',
            },
        },
        thread: {
            type: Schema.Types.ObjectId,
            ref: 'Thread',
            required: true,
            validate: {
                validator: async (id: Types.ObjectId) => {
                const thread = await Thread.findById(id);
                return Boolean(thread);
                },
                message: 'Thread does not exist!',
            },
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;