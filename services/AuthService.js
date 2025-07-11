const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/UserRepository');
const AppError = require('../utils/AppError');

class AuthService {
    constructor() {
        this.UserRepository = new UserRepository();
    }

    async register(userData) {
        const existingUser = await this.UserRepository.getByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        return this.UserRepository.add(userData);
    }

    async login(email, password) {

        const user = await this.UserRepository.getByEmail(email);
        console.log(user);
        const pwOK = await bcrypt.compare(password, user.password);

        if (!pwOK || !user) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = jwt.sign(
            { id: user.user_id, role: user.role || 'user'}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRES_IN || '1h'}
        );

        const {password: _, ...userSafe} = user; // Exclude password from the returned user object
        // const userSafe = {
        //     user_id: user.user_id,
        //     name: user.name,
        //     email: user.email,
        //     role: user.role || 'user'
        // };

        return { user: userSafe, token };
    }
} 

module.exports = AuthService;