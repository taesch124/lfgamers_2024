import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { pool } from '../../database/database';
import { checkIfUserExists, createUser } from '../../database/users';
import { ServerError } from '../../types';

const authRouter = Router();

authRouter.get('/login', async (req: Request, res: Response) => {
    try {
        const client = await pool.connect();
        const dbResult = await client.query('SELECT * FROM users');
        client.release();

        return res.status(200).json({ users: dbResult.rows });
    } catch (error: any) {
        console.error('Error finding user in database', error.stack);
    }
});

authRouter.post('/register', async (req: Request, res: Response) => {
    console.log('Received register request');
    console.log(req.body.username);
    try {
        const userExistsResponse = await checkIfUserExists({ username: req.body.username });
        if (userExistsResponse.error) {
            throw new Error(userExistsResponse.errorMessage);
        }

        if (userExistsResponse.data) {
            return res.status(500).json({ error: 'User already exists' });
        }

        const createUserResponse = await createUser({
            uuid: uuid(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            last_login: '',
        });

        if (createUserResponse.error) {
            throw new Error(userExistsResponse.errorMessage);
        }

        if (createUserResponse.data?.username === req.body.username) {
            return res.status(200).json({ success: true, user: createUserResponse.data });
        }

        return res.status(500).json({ error: 'Code not ready yet' });
    } catch (error) {
        console.log(error);
    }
    
    
});

export { authRouter };