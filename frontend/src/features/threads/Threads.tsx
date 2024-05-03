import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFetchLoading, selectThreads } from "./threadsSlice";
import { Grid, CircularProgress } from "@mui/material";
import ThreadItem from './components/ThreadItem';
import { fetchThreads } from './threadsThunks';

const Threads: React.FC = () => {
    const dispatch = useAppDispatch();
    const threads = useAppSelector(selectThreads);
    const loading = useAppSelector(selectFetchLoading);

    useEffect(() => {
        dispatch(fetchThreads());
    }, [dispatch]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={2}>
            {threads.map(thread => (
                <Grid item xs={12} sm={6} md={4} key={thread._id}>
                    <ThreadItem
                        id={thread._id}
                        title={thread.title}
                        image={thread.image || null}
                        date={thread.date}
                        authorName={thread.author ? thread.author.username : 'Unknown Author'}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Threads;
