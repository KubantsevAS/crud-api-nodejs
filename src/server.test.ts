import { validateUuid, validateUserData } from './utils/validation';
import UserDb from './database/inMemoryDatabase';
import { v4 as uuidV4 } from 'uuid';
import request from 'supertest';
import { server } from './index';
import http from 'http';

jest.mock('./database/inMemoryDatabase');
jest.mock('./utils/validation');

describe('Server API', () => {
    let serverInstance: http.Server;

    beforeAll(() => {
        serverInstance = server;
    });

    afterAll((done) => {
        serverInstance.close(done);
    });

    describe('Get all records with a GET api/users request', () => {
        test('should return all users', async () => {
            const mockUsers = [
                {
                    id: '1',
                    username: 'John',
                    age: 30,
                    hobbies: ['reading', 'gaming']
                },
                {
                    id: '2',
                    username: 'Jane',
                    age: 25,
                    hobbies: ['swimming']
                }
            ];

            (UserDb.getAll as jest.Mock).mockResolvedValue(mockUsers);

            const response = await request(serverInstance)
                .get('/api/users')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(mockUsers);
        });

        test('should handle server error', async () => {
            (UserDb.getAll as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(serverInstance)
                .get('/api/users')
                .expect('Content-Type', /json/)
                .expect(500);

            expect(response.body).toEqual({
                status: 'error',
                message: 'Internal server error',
                timestamp: expect.any(String)
            });
        });
    });

    describe('A new object is created by a POST /api/users request', () => {
        test('should return new user', async () => {
            const mockUser ={
                id: '3',
                username: 'John',
                age: 30,
                hobbies: ['reading', 'gaming']
            };

            (UserDb.create as jest.Mock).mockResolvedValue(mockUser);

            const response = await request(serverInstance)
                .post('/api/users')
                .send({
                    username: 'Rob',
                    age: 31,
                    hobbies: ['football'],
                })
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toEqual(mockUser);
        });

        test('should handle body validation error', async () => {
            (validateUserData as jest.Mock).mockImplementation(() => {
                throw new Error('All required properties (username, age, hobbies) must be specified');
            });

            const response = await request(serverInstance)
                .post('/api/users')
                .send({})
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toEqual({
                status: 'error',
                message: 'All required properties (username, age, hobbies) must be specified',
                timestamp: expect.any(String)
            });
        });
    });

    describe('Get record by a GET /api/users/{userId} request', () => {
        test('should return user by id', async () => {
            const newID = uuidV4();
            const mockUser = {
                id: newID,
                username: 'John',
                age: 30,
                hobbies: ['reading', 'gaming']
            };

            (UserDb.findById as jest.Mock).mockResolvedValue(mockUser);

            const response = await request(serverInstance)
                .get(`/api/users/${newID}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(mockUser);
        });

        test('should handle id uuid format validation error', async () => {
            (validateUuid as jest.Mock).mockImplementation(() => {
                throw new Error('Invalid UUID format');
            });
            
            const response = await request(serverInstance)
                .get('/api/users/invalid-uuid-format')
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toEqual({
                status: 'error',
                message: 'Invalid UUID format',
                timestamp: expect.any(String)
            });

            expect(validateUuid).toHaveBeenCalledWith('invalid-uuid-format');
        });

        test('should handle error on getting deleted user', async () => {
            const userId = uuidV4();
            (UserDb.findById as jest.Mock).mockImplementation(undefined);

            const responseFormatGet = await request(serverInstance)
                .get(`/api/users/${userId}`)
                .expect('Content-Type', /json/)
                .expect(404);

            expect(responseFormatGet.body).toEqual({
                status: 'error',
                message: 'User not found',
                timestamp: expect.any(String)
            });
        });
    });

    describe('Update record by a PUT /api/users/{userId} request', () => {
        test('should return user with updated data', async () => {
            const userId = uuidV4();
            const mockUser = {
                id: userId,
                username: 'John',
                age: 32,
                hobbies: ['reading', 'gaming']
            };
            const mockRefreshedUser = {
                id: userId,
                username: 'Gale',
                age: 25,
                hobbies: ['hockey', 'ski']
            };

            (UserDb.findById as jest.Mock).mockResolvedValue(mockUser);
            (UserDb.update as jest.Mock).mockResolvedValue(mockRefreshedUser);

            const response = await request(serverInstance)
                .put(`/api/users/${userId}`)
                .send({
                    username: 'Gale',
                    age: 25,
                    hobbies: ['hockey', 'ski']
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toEqual(mockRefreshedUser);
        });
    });

    describe('Delete record by a DELETE /api/users/{userId} request', () => {
        test('should resolve delete user with code 204', async () => {
            const userId = uuidV4();
            const mockUser = {
                id: userId,
                username: 'John',
                age: 32,
                hobbies: ['reading']
            };
            
            (UserDb.findById as jest.Mock).mockResolvedValue(mockUser);
            (UserDb.delete as jest.Mock).mockImplementation(() => {});

            await request(serverInstance)
                .delete(`/api/users/${userId}`)
                .expect(204);
        });
    });
});