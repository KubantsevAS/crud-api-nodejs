import http from 'node:http';
import dotenv from 'dotenv';
import process from 'node:process';
import mockData from './mockData/mockData.json' with { type: 'json' };

dotenv.config();

const server = http.createServer((req, res) => {
    if (req.url === 'api/users') {
        console.log('getUsers');
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockData));
});

server.listen(process.env.PORT, () => {});
