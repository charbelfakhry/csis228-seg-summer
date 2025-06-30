const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});