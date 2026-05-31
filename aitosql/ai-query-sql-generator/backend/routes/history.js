const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", (req, res) => {

    const query = `
        SELECT *
        FROM query_history
        ORDER BY id DESC
    `;

    db.query(query, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json(results);
    });
});

module.exports = router;