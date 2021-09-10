const db = require('../db/connection');

const showAll = () => {
    const sql = `SELECT name AS department_name, id as department_id FROM DEPARTMENT` 
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
    })
}

const allRoles = () => {
    const sql = `SELECT role.*, department.name
                AS department_name
                FROM ROLE
                LEFT JOIN department
                ON department.name = role.department_id
                ` ;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
    })
}

const allEmployees = () => {
    const sql = `SELECT employee.* FROM employee
                ` ;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.table(result);
    })
}

module.exports = { showAll, allRoles, allEmployees };