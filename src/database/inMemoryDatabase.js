import { v4 as uuidV4 } from 'uuid';

class InMemoryDatabase {
    constructor() {
        this.data = [];
    }

    create(data) {
        return new Promise(resolve => {
            const newID = uuidV4();
            const newDataElem = { id: newID, ...data };

            this.data.push(newDataElem);

            resolve(newDataElem);
        });
    }

    getAll() {
        return new Promise(resolve => {
            resolve(this.data);
        });
    }

    findById(id) {
        return new Promise(resolve => {
            const user = this.data.find(elem => elem.id === id);
            resolve(user);
        });
    }

    update(id, data) {
        return new Promise(resolve => {
            const index = this.data.findIndex(elem => elem.id === id);

            this.data[index] = { id, ...data };

            resolve(this.data[index]);
        });
    }

    delete(id) {
        return new Promise(resolve => {
            this.data = this.data.filter(elem => elem.id !== id);
            resolve();
        });
    }
}

export default new InMemoryDatabase();
