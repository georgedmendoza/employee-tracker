const db = require('../db/connection');
const inquirer = require('inquirer');

db.connect(err => {
        if(err) throw err;
        console.log('Database connected.');
});

const showAll = () => {
    const sql = `SELECT name AS department_name, id as department_id FROM DEPARTMENT` 
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
    })
};

const allRoles = () => {
    const sql = `SELECT role.*, department.id
                FROM ROLE
                JOIN department
                ON department.id = role.department_id
                ` ;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
    })
};

const allEmployees = () => {
    // including employee ids, first names, last names, job titles, departments, salaries, 
    // and managers that the employees report to
    const sql = `SELECT id, first_name, last_name, role.title, department.name, role.salary
                FROM employee
                JOIN DEPARTMENT ON department.id = role.department_id
                JOIN ROLE ON role.id = employee.role_id
                ` ;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the new Department? (Required)',
        }
    ])
    .then(result => {
        console.log(result);
        const sql = `INSERT INTO department(name)
        VALUES (${result})`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.table(result);
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the new Role? (Required)',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary amount? (Required)',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Please select a department from the list? (Required)',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        }
    ])
    .then(result => {
        console.log(result);
        const sql = `INSERT INTO role(title, salary, department_id)
        VALUES (?,?,?)`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.table(result);
        })
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the name employees first name? (Required)',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the name employees last name? (Required)',
        },
        {
            type: 'input',
            name: '',
            message: 'What is the name ? (Required)',
        }
    ])
    .then(result => {
        console.log(result);
        const sql = `INSERT INTO department(name)
        VALUES (?,?)`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.table(result);
        })
    })
};

const updateRole = () => {
  

        const sql = `SELECT * FROM EMPLOYEE`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.table(result);
        })
}



module.exports = { showAll, allRoles, allEmployees, addDepartment, addRole, addEmployee, updateRole};