import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { ThreadMutation } from "../../types";
import { createThread } from "./threadsThunks";
import { Typography } from "@mui/material";
import ThreadForm from "./components/ThreadForm";

const NewThread = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFormSubmit = async (threadMutation: ThreadMutation) => {
        try {
            await dispatch(createThread(threadMutation)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Typography variant="h4">New thread</Typography>
            <ThreadForm onSubmit={onFormSubmit} /> 
        </>
    );
};

export default NewThread;