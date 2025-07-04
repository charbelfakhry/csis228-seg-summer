const db = require('../db/connection');
class UserRepository {

    constructor() {

    }

    /**
     * @returns {Promise<Array>} - Returns a promise that resolves to an array of user objects.
     * @throws {Error} - Throws an error if the database query fails.
     */
    async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error('Error fetching all users:', error);
            // propagate the error to be handled by the 
            // caller
            throw error;
        }
    }

    /**
     *
     * @param {*} id
     * @returns {Promise<Object>} - Returns a promise that resolves to a user object.
     * @throws {Error} - Throws an error if the database query fails.
     */
    async getById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            // propagate the error to be handled by the caller
            throw error;
        }
    }

    async add(user) {
        try {
            const [result] = await db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
            console.log(result.insertId);
            return { id: result.insertId, ...user };
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async update(id, user) {
        try {
            await db.query(
                'UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?', [user.name, user.email, user.password, id]);
            return { id, ...user };
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            await db.query('DELETE FROM users WHERE id = ?', [id]);
            return { id };

        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

}

module.exports = UserRepository;