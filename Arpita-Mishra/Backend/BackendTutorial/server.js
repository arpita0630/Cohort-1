const express = require('express');
const app = express();
require('dotenv').config()
const { initDatabase } = require('./controllers/initDb.js');
const db = require('./models/connection.js');
initDatabase(); 

PORT=process.env.PORT;
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to Home page'
    });
});
app.get('/users', async (req, res) => {
    const getUsersQuery = 
    `SELECT * FROM users`;
    try {
        const result = await db.query(getUsersQuery);
        res.status(200).json({
            status: "success",
            message: "All users fetched",
            data: result.rows
        })
    } catch (error) {
        
        return res.status(500).json({
            status: 'failed',
            message: 'Something went wrong'
        });
    }
});
app.listen(PORT, (err) => {
    if (err) console.log(err);

    console.log(`Successfully Connected To Server at PORT: ${process.env.PORT}`);

});    
