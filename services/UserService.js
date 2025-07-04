const UserRepository = require('../repositories/UserRepository');

class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }

    async getAll() {
        try{
            return this.UserRepository.getAll();
        }catch(error) {
            console.error('Error fetching all users:', error);
         
            // propagate the error to be handled by the caller
            throw error;
        }
    }

    async getById(id) {
        try{
            return this.UserRepository.getById(id);
        }catch (error) {
            console.error('Error fetching user by ID:', error);
         
            // propagate the error to be handled by the caller
            throw error;
        }
    }

    async add(user) {
        try {
            const response = await this.UserRepository.add(user);
            return response;
        } catch (error) {
            console.error('Error adding user:', error);

            // propagate the error to be handled by the caller
            throw error;
            
        }
    }

    async update(id, user) {
        try{
            return this.UserRepository.update(id, user);
        }catch (error) {
            console.error('Error updating user:', error);
         
            // propagate the error to be handled by the caller
            throw error;
        }
    }

    async delete(id) {
        try{
            return this.UserRepository.delete(id);
        }catch (error) {
            console.error('Error deleting user:', error);
         
            // propagate the error to be handled by the caller
            throw error;
        }
    }
}

module.exports = UserService;