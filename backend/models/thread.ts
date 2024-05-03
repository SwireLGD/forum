import mongoose, { Types } from "mongoose";
import { ThreadFields } from "../types";
import User from "./User";

const Schema = mongoose.Schema;

const ThreadSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: async (value: Types.ObjectId) => User.findById(value),
                message: 'User does not exist!',
            }
        },
        title: {
            type: String,
            required: true, 
        },
        description: {
            type: String,
            validate: {
                validator: function(this: ThreadFields) {
                    return !!(this.description || this.image);
                },
                message: () => 'Description or image must be provided.'
            }
        },
        image: {
            type: String,
            validate: {
                validator: function(this: ThreadFields) {
                    return !!(this.image || this.description);
                },
                message: () => 'Image or description must be provided.'
            }
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false,
    }
);

const Thread = mongoose.model('Thread', ThreadSchema);

export default Thread;