import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thread, ThreadMutation } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";

export const fetchThreads = createAsyncThunk<Thread[]>(
    'threads/fetchThreads',
    async () => {
        const threadsResponse = await axiosApi.get<Thread[]>('/threads');
        return threadsResponse.data
    }
);

export const createThread = createAsyncThunk(
    'threads/createThread',
    async (threadData: ThreadMutation, { getState }) => {
        try {
            const { user } = (getState() as RootState).users;
            if (!user) {
                throw new Error("No user logged in");
            }
            const formData = new FormData();
            formData.append('title', threadData.title);
            if (threadData.description) formData.append('description', threadData.description);
            if (threadData.image) {
                formData.append('image', threadData.image);
            }
            formData.append('user', user._id);

            const response = await axiosApi.post('/threads', formData, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            });
            return response.data;
        } catch (e) {
            console.error(e); 
        }
    }
);