export const getPostData = request => {
    return new Promise((resolve, reject) => {
        try {
            let body ='';

            request.on('data', chunk => {
                body += chunk;
            });

            request.on('end', async () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
};
