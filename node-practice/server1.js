const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const app = express();

mongoose.connect(
    'mongodb://127.0.0.1:27017/employeedb'
)
.then(() => {
    console.log('MongoB  Connected');
})
.catch((err) => {
    console.log(err);
});


app.use(cors());
app.use(express.json());

app.post('/employees', async ( req, res) => {

    try {

    const employee = new Employee ({
        Name : req.body.Name,
        Email : req.body.Email,
        phone : req.body.phone,
        Department : req.body.Department,
        designation : req.body.designation,
        salary : req.body.salary,
    });

    await employee.save();

    res.json({
        message: 'User Created Successfully',
        employee
    });
} catch(error) {

    res.status(500).json({
        message: error.message
    });

}

});

app.get('/employees', async (req, res) => {

    try {
        
        const employees = await Employee.find();
        
        res.json(employees);
    }
    catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
});


    app.put('/employees/:id', async  (req, res) => {

        try {

            const employee = await Employee.findByIdAndUpdate(

                req.params.id,

                {
                    Name : req.body.Name,
                    Email : req.body.Email,
                    phone : req.body.phone,
                    Department : req.body.Department,
                    designation : req.body.designation,
                    salary : req.body.salary

                },

                { new : true }

            );

            if(!employee){

                return res.json({
                    message : 'User not found'
                });

            }

            res.json({
                message : 'User updated successfully',

                employee
            });

        } catch(error){

            res.status(500).json({
                message: error.message
            });
        }

});

app.delete('/employees/:id', async  (req, res) => {

    try {

        await Employee.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message : 'User deleted Successfully'
        });

    } catch(error){

        res.status(500).json({
            message : error.message
    });

}

});

app.listen(3000, () => {
    console.log("The server running on port 3000");
});
