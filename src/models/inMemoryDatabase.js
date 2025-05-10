import { v4 as uuidV4 } from 'uuid';

class InMemoryDatabase {
    constructor() {
        this.data = [];
    }

    create(record) {
        return new Promise(resolve => {
            const newID = uuidV4();
            this.data.push({ id: newID, ...record });
            resolve(newID);
        });
    }

    getAll() {
        return new Promise(resolve => {
            resolve(this.data);
        });
    }

    findById(userId) {
        return new Promise(resolve => {
            const user = this.data.find(user => user.id === userId);
            resolve(user);
        });
    }
}

export default new InMemoryDatabase();
