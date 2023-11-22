import { QueryResult } from 'pg';
import { UserDTO, DatabaseResponse } from '../../types';
import { pool } from '../database';

export const getUser = async (user: { id?: string, username?: string }): Promise<DatabaseResponse<UserDTO>> => {
    if (!user.id && !user.username) {
        return {
            error: true,
            errorMessage: 'No user id or username provided',
        };
    }

    try {
        const client = await pool.connect();
        let queryText: string = '';
        let queryValues: [string] = [''];
        if (user.id) {
            queryText = 'SELECT * FROM users WHERE uuid = $1';
            queryValues = [user.id];
        } else if (user.username) {
            queryText = 'SELECT * FROM users WHERE username = $1';
            queryValues = [user.username];
        }

        const dbResult: QueryResult<UserDTO> = await client.query(queryText, queryValues);
        client.release();

        if (dbResult.rowCount === 1) {
            return { data: dbResult.rows[0] };
        }

        throw new Error(`Could not find user with ${user.id ? 'user id' : 'username'} ${user.id || user.username}`);
        
    } catch (error) {
        console.error(error);
    }
    

    return {
        error: true,
        errorMessage: 'Could not retrieve user',
    }
}

export const checkIfUserExists = async (user: { id?: string, username?: string}): Promise<DatabaseResponse<boolean>> => {
    if (!user.id && !user.username) {
        return {
            error: true,
            errorMessage: 'No user id or username provided',
        };
    }

    try {
        const client = await pool.connect();
        let queryText: string = '';
        let queryValues: [string] = [''];
        if (user.id) {
            queryText = 'SELECT * FROM users WHERE uuid = $1';
            queryValues = [user.id];
        } else if (user.username) {
            queryText = 'SELECT * FROM users WHERE username = $1';
            queryValues = [user.username];
        }

        const dbResult: QueryResult<UserDTO> = await client.query(queryText, queryValues);
        client.release();

        if (dbResult.rowCount === 0) {
            return {data: false};
        }
        
        if (dbResult.rowCount === 1) {
            return { data: true};
        }

        throw new Error(`Unexpected result, found ${dbResult.rowCount} users`);
    } catch (error) {
        console.error(error);
        return {
            error: true,
            errorMessage: `${error}`,
        }
    }
}