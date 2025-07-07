const express = require('express');
const userRoutes = require('./routes/userRoutes');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);


// Handle 404 errors
// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });


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