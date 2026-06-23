const express = require('express');

const cors = require('cors'); //handling requests from different origin 

const app = express(); // This is a app instance


app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // pass the control to the next middleware or route handler
});

let users = [];

app.get('/users', (req,res)=>{
    res.json(users);  // so this is defining a route 
});

app.post('/users', (req,res) => { // /users is a endpoint.
    const user = {
        id: users.length + 1,
        username: req.body.username
    };
    users.push(user); // This line is to push the created username in to users array 
    res.json({
        message: 'User is created successfully',
        user: user
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

