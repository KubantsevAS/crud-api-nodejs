import { validateUuid, validateUserData } from '../utils/validation';
import { sendResponse, sendError } from '../utils/responseHandler';
import { ServerResponse, IncomingMessage } from 'http';
import { getPostData } from '../utils/getPostData';
import UserDb from '../database/inMemoryDatabase';
import { User, UserRequestBody } from '../types';

export const getAllUsers = async (response: ServerResponse): Promise<void> => {
    try {
        const users: User[] = await UserDb.getAll();

        sendResponse(response, 200, users);
    } catch {
        sendError(response, 500, 'Internal server error');
    }
};

export const getUser = async (response: ServerResponse, id: string): Promise<void> => {
    try {
        validateUuid(id);
        const user: User | undefined = await UserDb.findById(id);

        if (!user) {
            return sendError(response, 404, 'User not found');
        }

        sendResponse(response, 200, user);
    } catch (error) {
        if (
            error instanceof Error
            && error.message === 'Invalid UUID format'
        ) {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};

export const createUser = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
        const body: string = await getPostData(request);
        const userData: UserRequestBody = JSON.parse(body);

        validateUserData(userData);
        const newUser: User = await UserDb.create(userData);

        sendResponse(response, 201, newUser);
    } catch (error) {
        if (
            error instanceof Error
            && error.message.includes('must be')
        ) {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};

export const updateUser = async (request: IncomingMessage, response: ServerResponse, id: string): Promise<void> => {
    try {
        validateUuid(id);
        const user: User | undefined = await UserDb.findById(id);

        if (!user) {
            return sendError(response, 404, 'User not found');
        }

        const body: string = await getPostData(request);
        const updateData: UserRequestBody = JSON.parse(body);

        validateUserData(updateData);
        const updatedUser: User = await UserDb.update(id, {
            ...user,
            ...updateData,
        });

        sendResponse(response, 200, updatedUser);
    } catch (error) {
        if (
            error instanceof Error
            && (error.message === 'Invalid UUID format' || error.message.includes('must be'))
        ) {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};

export const deleteUser = async (response: ServerResponse, id: string): Promise<void> => {
    try {
        validateUuid(id);
        const user: User | undefined = await UserDb.findById(id);

        if (!user) {
            return sendError(response, 404, 'User not found');
        }

        await UserDb.delete(id);

        sendResponse(response, 204);
    } catch (error) {
        if (
            error instanceof Error
            && error.message === 'Invalid UUID format'
        ) {
            return sendError(response, 400, error.message);
        }

        sendError(response, 500, 'Internal server error');
    }
};
