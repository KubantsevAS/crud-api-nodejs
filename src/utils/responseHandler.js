export const sendResponse = (response, statusCode, data) => {
    if (statusCode === 204) {
        response.writeHead(statusCode);

        return response.end();
    }

    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
};

export const sendError = (response, statusCode, message) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({
        status: 'error',
        message,
        timestamp: new Date().toISOString(),
    }));
};
