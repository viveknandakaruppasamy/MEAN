const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

let employees = [];

app.post('/employees', ( req, res) => {

    const employee =  {
        id : employees.length + 1,
        Name : req.body.Name,
        Email : req.body.Email,
        phone : req.body.phone,
        Department : req.body.Department,
        designation : req.body.designation,
        salary : req.body.salary,
    };

    employees.push(employee);

    res.json({
        message: 'User Created Successfully',
        employee
        
    });
});

app.get('/employees', (req, res) => {
    res.json(employees);
});


    app.put('/employees/:id', (req, res) => {

        console.log('ID:', req.params.id);
        console.log('BODY:', req.body);
        
        const employee = employees.find(
        employees => employees.id === Number(req.params.id)
        );

        console.log('FOUND USER:', employee);


        if(!employee)
        {
            return res.json({
            message: "User not found"
        });
        }


    employee.Name = req.body.Name;

    employee.phone = req.body.phone;

    employee.Email = req.body.Email;

    employee.Department = req.body.Department;

    employee.designation = req.body.designation;

    employee.salary = req.body.salary;

    console.log('UPDATED USER:', employee);

    res.json({
        message: 'User updated successfully',
        employee : employee
    });

});

app.delete('/employees/:id', (req, res) => {

        console.log('Id from URL:', req.params.id);
        

    employees = employees.filter(
        employee => employee.id !== Number(req.params.id)
        );


    console.log('Employees after delete:', employees);

    res.json({
        message: 'User deleted Successfully'
    });

    });

app.listen(3000, () => {
    console.log("The server running on port 3000");
});
