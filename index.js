  
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
});

function OptionPrompt() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'view',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees',
                    'Add A Deparment','Add A Role', 'Add An Employee', 'Update A Role','NOTHING']
        }
    ])
    .then(selected => {
        if (selected.view === 'View All Departments') {
            showAll()
        }
        else if(selected.view === 'View All Roles') {
            allRoles();
        }
        else if(selected.view === 'View All Employees') {
            allEmployees();
        }
        else if(selected.view === 'Add A Deparment') {
            addDepartment();
        }
        else if(selected.view === 'Add A Role') {
            addRole();
        }
        else if(selected.view === 'Add An Employee') {
            addEmployee();
        }
        else if(selected.view === 'Update A Role') {
            updateRole();
        }
        else if(selected.view === 'NOTHING'){
            return;
        }
    })
}

// functions below to get specific query
const showAll = () => {
    const sql = `SELECT name AS department_name, id as department_id FROM DEPARTMENT` 
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
        
        OptionPrompt()
        
    })
    // console.log(OptionPrompt)
};

const allRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name FROM ROLE
                LEFT JOIN department
                ON role.department_id = department.id
                ` ;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
        OptionPrompt();
    })
};


const allEmployees = () => {
    // including employee ids, first names, last names, job titles, departments, salaries, 
    // and managers that the employees report to
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, CONCAT (manager.first_name, ' ', manager.last_name) AS manager, role.title, role.salary, department.name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id 
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON manager.id = employee.manager_id
                ` ;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
        OptionPrompt();
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
        // console.log(result);
        const sql = `INSERT INTO department(name)
        VALUES ('${result.department}')`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log('success');
            OptionPrompt();
        })
     })
};

const addRole = () => {
    db.query('SELECT * FROM DEPARTMENT', (err, result) => {
        if(err) throw err;
        // console.log(result);
        const departments = result.map(dep => ({
            value: dep.id,
            name: dep.name
        }))
        console.log(departments);
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
                choices: departments
            }
        ])
        .then(result => {
            console.log(result);
            const sql = `INSERT INTO role(title, salary, department_id)
            VALUES ('${result.title}','${result.salary}', ${result.department_id})`;
            db.query(sql, (err, result) => {
                if(err) throw err;
                console.log('Success');
                OptionPrompt();
            })
        })
    })  
};

const addEmployee = () => {
    db.query('SELECT * FROM ROLE', (err, result) => {
        if(err) throw err;
        // console.log(result)
        const roles = result.map(rol => ({
            value: rol.id,
            name: rol.title
        }))
        // console.log(roles);
        const sql = `SELECT * FROM EMPLOYEE`
    
        db.query(sql, (err, result) => {
            if(err) throw err;
            // console.log(result);
            const employees = result.map(emp => ({
                value: emp.id,
                name: emp.first_name+' '+emp.last_name,
                // manager: emp.manager
            }))
            // console.log(employees);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the new Employee? (Required)',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the new Employee? (Required)',
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Please select a role from the list? (Required)',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Please select a manager from the list? (Required)',
                    choices: employees
                }
                ])
                .then(result => {
                    // console.log(result);
                    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
                    VALUES ('${result.first_name}','${result.last_name}', ${result.role_id}, ${result.manager_id})`;
                    db.query(sql, (err, result) => {
                        if(err) throw err;
                        console.log('Success');
                        OptionPrompt();
                    })
                })
        })
    })
};

const updateRole = () => {
        db.query('SELECT * FROM EMPLOYEE', (err, result) => {
            if(err) throw err;
            // console.log(result)
            const employees = result.map(emp => ({
                value: emp.id,
                role: emp.role_id,
                name: emp.first_name+' '+emp.last_name
            }))
            // console.log(employees);
            // console.log(employees[0].value);
        
            db.query('SELECT * FROM ROLE', (err, result) => {
                if(err) throw err;
                // console.log(result);
                const roles = result.map(rol => ({
                    value: rol.id,
                    name: rol.title
                }))
                // console.log(roles);
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee_list',
                        message: 'Please select an Employee to update their Role. (Required)',
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'role_list',
                        message: 'Please select a new role for the Employee. (Required)',
                        choices: roles
                    }
                    ])
                    .then(result => {
                        console.log(result);
                        const sql = `UPDATE employee SET role_id = ${result.role_list} 
                        WHERE id = ${result.employee_list}`;
                        db.query(sql, (err, result) => {
                            if(err) throw err;
                            console.log('Success');
                            OptionPrompt();
                        })
                    })
            })
        })
}

// call inquirer prompt to init
OptionPrompt()