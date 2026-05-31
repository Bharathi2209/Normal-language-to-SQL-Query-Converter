const express = require("express");

const router = express.Router();

const generateSQL =
require("../services/aiservice");

const executeQuery =
require("../services/dbservice");

const saveHistory =
require("../services/historyService");

router.post(
    "/generate",
    async (req, res) => {

        try {

            const { question } =
            req.body;

            const sql =
            await generateSQL(question);

            const cleanSql =
            sql
            .replace(/```sql/g, "")
            .replace(/```/g, "")
            .trim();

            // SAFETY VALIDATION

            const forbiddenKeywords = [
                "drop",
                "truncate",
                "delete",
                "alter"
            ];

            const lowerSql =
            cleanSql.toLowerCase();

            const isUnsafe =
            forbiddenKeywords.some(
                keyword =>
                lowerSql.includes(keyword)
            );

            if (isUnsafe) {

                return res.status(400).json({
                    success: false,
                    message:
                    "Unsafe SQL blocked"
                });

            }

            const results =
            await executeQuery(
                cleanSql
            );

            await saveHistory(
                question,
                cleanSql
            );

            res.json({
                success: true,
                sql: cleanSql,
                results
            });

        }
        catch (error) {

            res.status(500).json({

                success: false,

                message:
                error.message

            });

        }

    }
);

module.exports = router;