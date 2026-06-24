const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

    Name : String,

    Email: String,

    phone: String,

    Department: String,

    designation: String,

    salary: String

});

module.exports = mongoose.model(
    'Employee',
    EmployeeSchema
);