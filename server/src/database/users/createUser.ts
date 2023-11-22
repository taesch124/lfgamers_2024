import { QueryResult } from 'pg';
import { UserDTO, DatabaseResponse } from '../../types';
import { pool } from '../database';

export const createUser = async (user: UserDTO): Promise<DatabaseResponse<UserDTO>> => {
    try {
        const client = await pool.connect();
        const queryText = 'INSERT INTO users (uuid, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const queryValues = [user.uuid, user.username, user.email, user.password]
        const dbResult: QueryResult<any> = await client.query(queryText, queryValues);
        client.release();

        if (dbResult.rowCount === 1) {
            return { data: dbResult.rows[0] };
        } else {
            return {
                error: true,
                errorMessage: `Unexpexted result, found rows ${dbResult.rowCount}`,
            }
        }
    } catch (error) {
        console.error(error);
    }
    return {
        error: true,
        errorMessage: 'Code not ready',
    }

    
}