import * as User from '../models/userModel.js';

export const getAllUsers = async response => {
    try {
        const users = await User.getAll();

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (response, id) => {
    try {
        const user = await User.getById(id);

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
