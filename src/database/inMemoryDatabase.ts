import { v4 as uuidV4 } from 'uuid';
import { User, UserRequestBody } from '../types';

class InMemoryDatabase {
    private data: User[];

    constructor() {
        this.data = [];
    }

    create(data: UserRequestBody): Promise<User> {
        return new Promise(resolve => {
            const newID = uuidV4();
            const newDataElem: User = {
                id: newID,
                username: data.username!,
                age: data.age!,
                hobbies: data.hobbies!,
            };

            this.data.push(newDataElem);
            resolve(newDataElem);
        });
    }

    getAll(): Promise<User[]> {
        return new Promise(resolve => {
            resolve(this.data);
        });
    }

    findById(id: string): Promise<User | undefined> {
        return new Promise(resolve => {
            const user = this.data.find(elem => elem.id === id);
            resolve(user);
        });
    }

    update(id: string, data: User): Promise<User> {
        return new Promise(resolve => {
            const index = this.data.findIndex(elem => elem.id === id);
            this.data[index] = data;
            resolve(this.data[index]);
        });
    }

    delete(id: string): Promise<void> {
        return new Promise(resolve => {
            this.data = this.data.filter(elem => elem.id !== id);
            resolve();
        });
    }
}

export default new InMemoryDatabase();
