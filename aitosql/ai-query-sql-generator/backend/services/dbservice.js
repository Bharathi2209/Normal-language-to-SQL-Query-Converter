const db = require("../db");

function executeQuery(sql) {

    return new Promise((resolve, reject) => {

        db.query(sql, (err, results) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(results);
        });

    });

}

module.exports = executeQuery;