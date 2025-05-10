import http from 'node:http';
import dotenv from 'dotenv';
import process from 'node:process';
import { apiUsersUuidRegex } from './utils/apiUserUuidRegex.js';
import { sendError } from './utils/responseHandler.js';
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from './controllers/userController.js';

dotenv.config();

const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getAllUsers(res);

        return;
    }

    if (req.url.match(apiUsersUuidRegex) && req.method === 'GET') {
        const id = req.url.split('/').pop();
        getUser(res, id);

        return;
    }

    if (req.method === 'POST' && req.url === '/api/users') {
        createUser(req, res);

        return;
    }

    if (req.url.match(apiUsersUuidRegex) && req.method === 'PUT') {
        const id = req.url.split('/').pop();
        updateUser(req, res, id);

        return;
    }

    if (req.url.match(apiUsersUuidRegex) && req.method === 'DELETE') {
        const id = req.url.split('/').pop();
        deleteUser(res, id);

        return;
    }

    sendError(res, 404, 'Page not found');
});

const PORT = process.env.PORT ?? 5000;

server.listen(PORT, () => {});
