  
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const option = require('./lib/queryCalls');

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
            option.showAll()
            // OptionPrompt();
            
        }
        else if(selected.view === 'View All Roles') {
            option.allRoles();
            // OptionPrompt();
        }
        else if(selected.view === 'View All Employees') {
            option.allEmployees();
            // OptionPrompt();
        }
        else if(selected.view === 'Add A Deparment') {
            option.addDepartment();
        }
        else if(selected.view === 'Add A Role') {
            option.addRole();
        }
        else if(selected.view === 'Add An Employee') {
            option.addEmployee();
        }
        else if(selected.view === 'Update A Role') {
            option.updateRole();
        }
    })
}


OptionPrompt()
    .then(choiceData => {
        console.table(choiceData);
});