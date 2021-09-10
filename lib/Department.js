const db = require('../db/connection');

class Option {
    constructor(departments){
        this.departments = `SELECT name AS department_name, id as department_id FROM DEPARTMENT `;
    }

    getDepartments() {
        return this.departments;
    }
    // , roles, employees, addDepartment, addRole, addEmployee
}

module.exports = Option;