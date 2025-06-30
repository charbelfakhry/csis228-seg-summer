const UserService = require('../services/UserService');

class UserController {
    constructor(){
        this.UserService = new UserService();
    }

    async getAll(req, res){
        const users = await this.UserService.getAll();
        res.json(users);
    }

    async getById(req, res){
        const user = await this.UserService.getById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    async add(req, res){
        const user = req.body;
        await this.UserService.add(user);
        res.status(201).json(user);
    }
}

module.exports = UserController;