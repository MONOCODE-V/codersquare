import type { User } from "../types.ts";

export interface userDoa {
    createUser(user:User): void;
    getbyemail(email:string ): User|undefined;
    getbyusername(username:string): User|undefined;
};