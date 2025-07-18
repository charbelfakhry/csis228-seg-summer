const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const AppError = require('./utils/AppError');
require('dotenv').config();
const path = require('path');
const { title } = require('process');
const UserService = require('./services/UserService');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/dashboard', async (req, res) =>{
    var userService = new UserService();
    let users = await userService.getAll();
    res.render('dashboard', {title: 'User Dashboard', users: users});
});

// Handle 404 errors
app.all("/*all", (req, res,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    res.status(status).json({
        status: 'error',
        statusCode: status,
        message: err.message || 'Internal Server Error'
    });
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});