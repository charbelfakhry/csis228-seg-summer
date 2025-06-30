const UserRepository = require('../repositories/UserRepository');

class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async getAll() {
        return this.UserRepository.getAll();
    }

    async getById(id) {
        return this.UserRepository.getById(id);
    }

    async add(user) {
        this.UserRepository.add(user);
        return user;
    }
}

module.exports = UserService;