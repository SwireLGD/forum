import React, { useEffect, useState } from "react";
import { ThreadMutation } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createThread, fetchThreads } from "../threadsThunks";
import { Button, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/FileInput/FileInput";
import { selectUser } from "../../users/usersSlice";

interface Props {
    onSubmit: (mutation: ThreadMutation) => void;
}

const ThreadForm: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [state, setState] = useState<ThreadMutation>({
        title: '',
        description: '',
        image: null,
    });

    useEffect(() => {
        dispatch(fetchThreads());
    }, [dispatch]);

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            console.log("User is not logged in");
            return; 
        }
        dispatch(createThread(state));
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
          setState(prevState => ({
            ...prevState,
            [name]: files[0],
          }));
        }
    };

    return (
        <form
        autoComplete="off"
        onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                    id="title" label="Title"
                    value={state.title}
                    onChange={inputChangeHandler}
                    name="title"
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                    id="description" label="Description"
                    value={state.description}
                    onChange={inputChangeHandler}
                    name="description"
                    />
                </Grid>
                <Grid item xs>
                    <FileInput
                        onChange={fileInputChangeHandler}
                        name="image"
                        label="Image"
                    />
                </Grid>
                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ThreadForm;