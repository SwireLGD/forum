export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface RegisterResponse {
    user: User;
    massage: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface Thread {
    _id: string;
    title: string;
    description?: string;
    image?: string | null;
    date: Date;
    author: User;
}

export interface ThreadMutation {
    title: string;
    description?: string;
    image?: string | null;
}