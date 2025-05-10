import { getPostData } from '../utils/getPostData.js';
import UserDb from '../database/inMemoryDatabase.js';
import { validate as isUuid } from 'uuid';

export const getAllUsers = async response => {
    try {
        const users = await UserDb.getAll();

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (response, id) => {
    try {
        if (!isUuid(id)) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User nor found', id }));

            return;
        }

        const user = await UserDb.findById(id);

        if (!user) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User nor found', id }));

            return;
        }

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
};

export const createUser = async (request, response) => {
    try {
        const body = await getPostData(request);
        const user = JSON.parse(body);
        const newId = await UserDb.create(user);

        response.writeHead(201, { 'Content-Type': 'application/json' });

        return response.end(JSON.stringify(newId));
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (request, response, id) => {
    try {
        if (!isUuid(id)) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User nor found', id }));

            return;
        }

        const user = await UserDb.findById(id);

        if (!user) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User nor found', id }));

            return;
        }

        const body = await getPostData(request);
        const { username, age, hobbies } = JSON.parse(body);

        const updatedData = {
            username: username ?? user.username,
            age: age ?? user.age,
            hobbies: hobbies ?? user.hobbies,
        };

        const updatedUser = await UserDb.update(id, updatedData);

        response.writeHead(201, { 'Content-Type': 'application/json' });

        return response.end(JSON.stringify(updatedUser));
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (response, id) => {
    try {
        if (!isUuid(id)) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User nor found', id }));

            return;
        }

        const user = await UserDb.findById(id);

        if (!user) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'User nor found', id }));

            return;
        }

        await UserDb.delete(id);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: `User ${id} removed` }));
    } catch (error) {
        console.log(error);
    }
};
