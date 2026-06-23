const express = require('express'); // this line is used to create a express instance.
const cors = require('cors');
const app = express();// we use this app object to define routes, middleware, and start server
// app.get('/products', (req, res) => {
//     res.json([
//    {
//     "id": 1,
//     "name": "Laptop",
//     "price": 50000
//   },
//   {
//     "id": 2,
//     "name": "Mobile",
//     "price": 20000
//   }
// ])
// });

app.use(cors());
app.use(express.json());

let users = [];


app.get('/users', (req, res) => {  // here the app.get('/') defines a GET route. When a user visits the root url (/), express executes the function associated with the route like the res.send("..")
   res.json(users);
});

app.post('/users', (req, res) => {

    const user = {
        id: users.length + 1,
        username: req.body.username
    };

    users.push(user);

    res.json({
        message: 'User Created Successfully',
        user: user
    });
    });

    app.put('/users/:id', (req, res) => {

        console.log('ID:', req.params.id);
        console.log('BODY:', req.body);
        
        const user = users.find(
        user => user.id === Number(req.params.id)
        );

        console.log('FOUND USER:', user);


        if(!user)
        {
            return res.json({
            message: "User not found"
        });
        }


    user.username = req.body.username;

    console.log('UPDATED USER:', user);

    res.json({
        message: 'User updated successfully',
        user: user
    });

});

    app.delete('/users/:id', (req, res) => {

        console.log('Id from URL:', req.params.id);
        console.log('Users before delete:', users);

    users = users.filter(
        user => user.id !== Number(req.params.id)
    );

    console.log('Users after delete:', users);

    res.json({
        message: 'User deleted Successfully'
    });

    });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});