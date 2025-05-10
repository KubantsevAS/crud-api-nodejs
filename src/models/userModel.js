import mockData from '../mockData/mockData.json' with { type: 'json' };

export const getAll = async () => {
    return new Promise(resolve => {
        resolve(mockData);
    });
};

export const getById = async userId => {
    return new Promise(resolve => {
        const user = mockData.find(user => user.id === +userId);

        resolve(user);
    });
};
