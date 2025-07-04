const UserService = require('../services/UserService');

class UserController {
    constructor(){
        this.UserService = new UserService();
    }

    async getAll(req, res){
        try{
            const users = await this.UserService.getAll();
            res.status(200).json(users);
        }catch(error) {
            console.error('Error fetching all users:', error);
            return res.status(500).send('Internal Server Error ' + error.message);
        }
    }

    async getById(req, res) {
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
            console.error('Error fetching user by ID:', error);
            return res.status(500).send('Internal Server Error ' + error.message );
        }
    }

    async add(req, res) {
        try {
            const user = req.body;
            console.log(user);
            if (!user.name || !user.email || !user.password) {
                return res.status(400).send('Name, email, and password are required');
            }
            const response = await this.UserService.add(user);
            res.status(201).json(response);
        } catch (error) {
            console.error('Error adding user:', error);
            return res.status(500).send('Internal Server Error ' + error.message);
        }
    }


    async update(req, res) {
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
            console.error('Error updating user:', error);
            return res.status(500).send('Internal Server Error ' + error.message);
        }
    }

    async delete(req, res) {
        if (!req.params.id) {
            return res.status(400).send('User ID is required');
        }
        try {
            await this.UserService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).send('Internal Server Error ' + error.message);
        }
    }
}

module.exports = UserController;