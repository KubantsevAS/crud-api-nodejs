import http, { IncomingMessage, ServerResponse } from 'http';
import process from 'process';
import dotenv from 'dotenv';
import { apiUsersIdRegex } from './utils/apiUserUuidRegex';
import { sendError } from './utils/responseHandler';
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from './controllers/userController';

dotenv.config();

export const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getAllUsers(res);

        return;
    }

    if (req.url?.match(apiUsersIdRegex) && req.method === 'GET') {
        const id = req.url.split('/').pop() as string;
        getUser(res, id);

        return;
    }

    if (req.method === 'POST' && req.url === '/api/users') {
        createUser(req, res);

        return;
    }

    if (req.url?.match(apiUsersIdRegex) && req.method === 'PUT') {
        const id = req.url.split('/').pop() as string;
        updateUser(req, res, id);

        return;
    }

    if (req.url?.match(apiUsersIdRegex) && req.method === 'DELETE') {
        const id = req.url.split('/').pop() as string;
        deleteUser(res, id);

        return;
    }

    sendError(res, 404, 'Page not found');
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

server.listen(PORT, () => {});
