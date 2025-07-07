const UserService = require('../services/UserService');
const AppError = require('../utils/AppError');

class UserController {
    constructor(){
        this.UserService = new UserService();
    }

    async getAll(req, res, next){
        try{
            const users = await this.UserService.getAll();
            res.status(200).json(users);
        }catch(error) {
            // console.error('Error fetching all users:', error);
            // return res.status(500).send('Internal Server Error ' + error.message);
            next(error);
        }
    }

    async getById(req, res, next) {
        // error first handling
        if (!req.params.id) {
            return res.status(400).send('User ID is required');
        }
        try {
            const user = await this.UserService.getById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            next(error);
        }
    }

    async add(req, res, next) {
        try {
            const user = req.body;
            console.log(user);
            if (!user.name || !user.email || !user.password) {
                return res.status(400).send('Name, email, and password are required');
            }
            const response = await this.UserService.add(user);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }


    async update(req, res, next) {
        if (!req.params.id) {
            return res.status(400).send('User ID is required');
        }
        try {
            const user = req.body;
            if (!user.name || !user.email || !user.password) {
                return res.status(400).send('Name, email, and password are required');
            }
            const updatedUser = await this.UserService.update(req.params.id, user);
            res.status(201).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        if (!req.params.id) {
            return res.status(400).send('User ID is required');
        }
        try {
            await this.UserService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;