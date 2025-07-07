const db = require('../db/connection');
const AppError = require('../utils/AppError');
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
            throw new AppError('Database Error fetching all users', 500);
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
            //throw new AppError(`Database Error fetching user with ID ${id}`, 500);
        }
    }

    async add(user) {
        try {
            const [result] = await db.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
            console.log(result.insertId);
            return { id: result.insertId, ...user };
        } catch (error) {
            throw new AppError('Database Error adding user', 500);
        }
    }

    async update(id, user) {
        try {
            await db.query(
                'UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?', [user.name, user.email, user.password, id]);
            return { id, ...user };
        } catch (error) {
            throw new AppError('Database Error updating user', 500);
        }
    }

    async delete(id) {
        try {
            await db.query('DELETE FROM users WHERE id = ?', [id]);
            return { id };

        } catch (error) {
            throw new AppError('Database Error deleting user', 500);
        }
    }

}

module.exports = UserRepository;