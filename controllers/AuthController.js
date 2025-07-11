const AuthService = require('../services/AuthService');

class AuthController {
    constructor() {
        this.AuthService = new AuthService();
    }

    async register(req, res, next) {
        try {
            const userData = req.body;
            const user = await this.AuthService.register(userData);
            res.status(201).json({
                status: 'success',
                data: { user }
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.AuthService.login(email, password);
            res.status(200).json({
                status: 'success',
                data: { user, token }
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = AuthController;