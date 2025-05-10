import { getPostData } from '../utils/getPostData.js';
import UserDb from '../database/inMemoryDatabase.js';
import { validateUuid, validateUserData } from '../utils/validation.js';
import { sendResponse, sendError } from '../utils/responseHandler.js';

export const getAllUsers = async (response) => {
    try {
        const users = await UserDb.getAll();

        sendResponse(response, 200, users);
    } catch {
        sendError(response, 500, 'Internal server error');
    }
};

export const getUser = async (response, id) => {
    try {
        validateUuid(id);
        const user = await UserDb.findById(id);

        if (!user) {
            return sendError(response, 404, 'User not found');
        }

        sendResponse(response, 200, user);
    } catch (error) {
        if (error.message === 'Invalid UUID format') {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};

export const createUser = async (request, response) => {
    try {
        const body = await getPostData(request);
        const userData = JSON.parse(body);

        validateUserData(userData);
        const newUser = await UserDb.create(userData);

        sendResponse(response, 201, newUser);
    } catch (error) {
        if (error.message.includes('must be')) {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};

export const updateUser = async (request, response, id) => {
    try {
        validateUuid(id);
        const user = await UserDb.findById(id);

        if (!user) {
            return sendError(response, 404, 'User not found');
        }

        const body = await getPostData(request);
        const updateData = JSON.parse(body);

        const updatedUser = await UserDb.update(id, {
            ...user,
            ...updateData,
        });

        sendResponse(response, 200, updatedUser);
    } catch (error) {
        if (error.message === 'Invalid UUID format') {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};

export const deleteUser = async (response, id) => {
    try {
        validateUuid(id);
        const user = await UserDb.findById(id);

        if (!user) {
            return sendError(response, 404, 'User not found');
        }

        await UserDb.delete(id);

        sendResponse(response, 204);
    } catch (error) {
        if (error.message === 'Invalid UUID format') {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};
