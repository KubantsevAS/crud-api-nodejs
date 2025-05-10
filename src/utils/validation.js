import { validate as isUuid } from 'uuid';

export const validateUuid = (id) => {
    if (!isUuid(id)) {
        throw new Error('Invalid UUID format');
    }

    return true;
};

export const validateUserData = (userData) => {
    const { username, age, hobbies } = userData;

    if (username && typeof username !== 'string') {
        throw new Error('Username must be a string');
    }

    if (age && (typeof age !== 'number' || age < 0)) {
        throw new Error('Age must be a positive number');
    }

    if (hobbies && (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string'))) {
        throw new Error('Hobbies must be an array of strings');
    }
};
