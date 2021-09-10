const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const Option = require('./lib/Department');

db.connect(err => {
    if(err) throw err;
    console.log('Database connected.');
});

const OptionPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'view',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees',
                    'Add A Deparment','Add A Role', 'Add An Employee', 'Update A Role']
        }
    ])
    .then(selected => {
        if (selected.view === 'View All Departments') {
            console.log('all dep');
            // return Option.departments;
            showAll();
        }
        else if(selected.view === 'View All Roles') {
            console.log('roles');
        }
        // console.log(selected.view);
    })
}

const showAll = () => {
    const sql = `SELECT name AS department_name, id as department_id FROM DEPARTMENT` 
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
    })
}

OptionPrompt()
    .then(choiceData => {
        console.log(choiceData);
    });