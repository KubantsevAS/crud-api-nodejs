import http from 'node:http';
import dotenv from 'dotenv';
import process from 'node:process';
import { getAllUsers, getUser } from './controllers/userController.js';

dotenv.config();

const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getAllUsers(res);

        return;
    }

    if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/').pop();
        getUser(res, id);

        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error', url: `${req.url}`, method: `${req.method}` }));
});

server.listen(process.env.PORT, () => {});
