import type { User } from "../../types.js";

export interface userDoa {
    createUser(user: User): Promise<void>;
    getbyemail(email: string): Promise<User | undefined>;
    getbyusername(username: string): Promise<User | undefined>;
    getUserById(id: number): Promise<User | undefined>;
};