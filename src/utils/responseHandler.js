export const sendResponse = (response, statusCode, data) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(data));
};

export const sendError = (response, statusCode, message = {}) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message }));
};
