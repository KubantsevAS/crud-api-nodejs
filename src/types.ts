export interface User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

export interface UserRequestBody {
    username?: string;
    age?: number;
    hobbies?: string[];
}

export interface ErrorResponse {
    statusCode: number;
    message: string;
}
