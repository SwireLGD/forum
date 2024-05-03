import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../types";
import { createThread, fetchThreads } from "./threadsThunks";
import { RootState } from "../../app/store";

interface ThreadState {
    items: Thread[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: ThreadState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
}

export const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchThreads.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchThreads.fulfilled, (state, {payload: threads}) => {
            state.fetchLoading = false;
            state.items = threads;
        });
        builder.addCase(fetchThreads.rejected, (state) => {
            state.fetchLoading = false;
        });
        builder.addCase(createThread.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createThread.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createThread.rejected, (state) => {
            state.createLoading = false;
        });
    }
});

export const threadsReducer = threadsSlice.reducer;

export const selectThreads = (state: RootState) => state.threads.items;
export const selectFetchLoading = (state: RootState) => state.threads.fetchLoading;