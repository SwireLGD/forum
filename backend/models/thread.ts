import mongoose from "mongoose";
import { ThreadFields } from "../types";

const Schema = mongoose.Schema;

const ThreadSchema = new Schema(
    {
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
        },
    },
    {
        versionKey: false,
    }
);

const Thread = mongoose.model('Thread', ThreadSchema);

export default Thread;