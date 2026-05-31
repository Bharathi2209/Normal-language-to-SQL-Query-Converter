const db = require("../db");

function saveHistory(question, sql) {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO query_history
            (question, generated_sql)
            VALUES (?, ?)
        `;

        db.query(
            query,
            [question, sql],
            (err, result) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            }
        );
    });
}

module.exports = saveHistory;