import { validate as isUuid } from 'uuid';
import { UserRequestBody } from '../types';

export const validateUuid = (id: string): boolean => {
    if (!isUuid(id)) {
        throw new Error('Invalid UUID format');
    }

    return true;
};

export const validateUserData = (userData: UserRequestBody): void => {
    const { username, age, hobbies } = userData;

    if (!username || !age || !hobbies) {
        throw new Error('All required properties (username, age, hobbies) must be specified');
    }

    if (typeof username !== 'string') {
        throw new Error('Username must be a string');
    }

    if (typeof age !== 'number' || age < 0) {
        throw new Error('Age must be a positive number');
    }

    if (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')) {
        throw new Error('Hobbies must be an array of strings');
    }
};
