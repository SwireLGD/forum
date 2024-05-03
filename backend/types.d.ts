export interface ThreadFields {
    title: string;
    description?: string;
    image?: string | null;
    date: Date;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}
  
interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}
  
export type UserModel = Model<UserFields, unknown, UserMethods>;