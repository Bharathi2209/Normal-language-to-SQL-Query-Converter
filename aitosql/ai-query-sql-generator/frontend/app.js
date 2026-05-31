async function generateSQL() {

    document.getElementById("historyContainer").innerHTML = "";

    const question =
        document.getElementById("question").value.trim();

    if (!question) {
        alert("Please enter a question");
        return;
    }

    document.getElementById("loader").style.display = "block";

    try {

        const response = await fetch(
            "http://localhost:5000/api/query/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question
                })
            }
        );

        const data = await response.json();

        console.log("Backend Response:", data);

        document.getElementById("loader").style.display = "none";

        if (!data.success) {

            alert(data.message || "Something went wrong");

            document.getElementById("sqlOutput").innerText = "";

            document.getElementById("tableContainer").innerHTML = "";

            return;
        }

        document.getElementById("sqlOutput").innerText =
            data.sql || "No SQL returned";

        createTable(data.results);

    }
    catch (error) {

        document.getElementById("loader").style.display = "none";

        console.error(error);

        alert("Failed to connect to backend");
    }
}

function createTable(data) {

    const container =
        document.getElementById("tableContainer");

    container.innerHTML = "";

    if (!data || data.length === 0) {

        container.innerHTML =
            "<p>No Results Found</p>";

        return;
    }

    let html = "<table>";

    html += "<tr>";

    Object.keys(data[0]).forEach(key => {

        html += `<th>${key}</th>`;

    });

    html += "</tr>";

    data.forEach(row => {

        html += "<tr>";

        Object.values(row).forEach(value => {

            html += `<td>${value}</td>`;

        });

        html += "</tr>";

    });

    html += "</table>";

    container.innerHTML = html;
}

async function loadHistory() {

    const historyContainer =
        document.getElementById("historyContainer");

    if (historyContainer.innerHTML !== "") {

        historyContainer.innerHTML = "";

        return;
    }

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/history"
            );

        const data =
            await response.json();

        let html =
            "<div class='card'><h2>Query History</h2>";

        data.forEach(item => {

            html += `
                <div
                style="
                border:1px solid #ddd;
                padding:10px;
                margin-top:10px;
                border-radius:10px;">

                    <b>Question:</b>
                    <p>${item.question}</p>

                    <b>SQL:</b>

                    <pre>${item.generated_sql}</pre>

                    <small>${item.created_at}</small>

                </div>
            `;
        });

        html += "</div>";

        historyContainer.innerHTML = html;

    }
    catch (error) {

        console.error(error);

        alert("Failed to load history");
    }
}

function copySQL() {

    const sql =
        document.getElementById("sqlOutput")
        .innerText;

    if (!sql || sql === "No SQL returned") {

        alert("No SQL available");

        return;
    }

    navigator.clipboard.writeText(sql);

    alert("SQL Copied");
}

function clearAll() {

    document.getElementById("question").value = "";

    document.getElementById("sqlOutput").innerText =
        "SQL query will appear here...";

    document.getElementById("tableContainer").innerHTML = "";

    document.getElementById("historyContainer").innerHTML = "";
}

function toggleTheme() {

    document.body.classList.toggle("dark");
}