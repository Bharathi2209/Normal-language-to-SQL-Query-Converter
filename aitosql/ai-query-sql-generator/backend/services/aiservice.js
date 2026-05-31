const axios = require("axios");

async function generateSQL(question) {

    const prompt = `
Convert the following natural language question into a MySQL query.

Table: employees
Columns:
id, name, department, salary

Return ONLY the SQL query.

Question:
${question}
`;

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {

        console.log("OpenRouter Error:");

        if (error.response) {
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        throw error;
    }
}

module.exports = generateSQL;