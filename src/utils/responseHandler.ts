import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types';

interface ApiErrorResponse {
    status: 'error';
    message: string;
    timestamp: string;
}

export const sendResponse = (
    response: ServerResponse,
    statusCode: number,
    data?: User | User[],
): void | ServerResponse<IncomingMessage> => {
    if (statusCode === 204) {
        response.writeHead(statusCode);

        return response.end();
    }

    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
};

export const sendError = (response: ServerResponse, statusCode: number, message: string): void => {
    const errorResponse: ApiErrorResponse = {
        status: 'error',
        message,
        timestamp: new Date().toISOString(),
    };

    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(errorResponse));
};
