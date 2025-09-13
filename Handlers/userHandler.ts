import { DB } from "../server/dataStore/index.js"
import type * as api from "./api.js"
import { signJwt } from "../server/auth.js";
import crypto from "crypto";





//user API Handlers
export const sinupHandler: api.ExpressHandler<api.sinUpReq, api.signUpRes> = async (req, res) => {

    const { firstName, lastName, username, email, password } = req.body;
    if (firstName && lastName && username && email && password) {
        const existingUserByUsername = await DB.getbyusername(username);
        const existingUserByEmail = await DB.getbyemail(email);
        if (existingUserByUsername || existingUserByEmail) {
            return res.status(400).json({ error: 'Username or email already exists' })  ;
        }

        // Hash the password before storing it
         const hashit = process.env.hashit ?? "default_salt";
         const hashedPassword = crypto.pbkdf2Sync(password, "has", 1000, 64, 'sha512').toString('hex');
        const newuser = {
            firstName,
            lastName,   
            username,
            email,
            password : hashedPassword
        };
        // Insert the new user into the database  
         await DB.createUser(newuser);
         const  existeduser1 = await DB.getbyemail(email) || await DB.getbyusername(username);
         const jwt = signJwt({ userId: String(existeduser1) });
        return res.status(201).json({jwt});
    } else {
        return res.status(400).json({ error: 'Missing required fields' });
    }
};


export const sinInHandler: api.ExpressHandler<api.sinInReq, api.signInResType> = async (req, res) => {
    const {login,password } = req.body;   

    // Hash the password before storing it
         const hashit1 = process.env.hashit ?? "default_salt";
         const hashedPassword1 = crypto.pbkdf2Sync(password ?? "", "has", 1000, 64, 'sha512').toString('hex');
    let existeduser;
    if (typeof login === "string") {
        existeduser = await DB.getbyemail(login) || await DB.getbyusername(login);
    } else {
        existeduser = undefined;
    }


    if (!existeduser || !(existeduser.password === hashedPassword1)) {
        return res.status(400).json({});
    }
    let jwt: string | undefined;
    if (typeof existeduser.id === "number") {
        jwt = signJwt({ userId: String(existeduser.id) });
        return res.status(200).json({
            user: {
                id: existeduser.id,
                username: existeduser.username,
                email: existeduser.email
            },
            Jwt: jwt
        });
    } else {
        return res.status(400).json({});
    }

}

export interface JWTpayload {
  userId: string;
}