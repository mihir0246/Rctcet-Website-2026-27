// SaaFine.js
import { authenticateSheets } from "./auth.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const spreadsheetId = process.env.SPREADSHEET_ID;
const sheetName = "SaaFine!A:G"; // 7 columns

// ---------- READ ----------
async function readSaaFine() {
    const query = `select A,B,C,D,E,F,G`; // id, Name, Date, Amount, Reason, Mail, Status
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?sheet=SaaFine&tq=${encodeURIComponent(
        query
    )}`;

    try {
        const response = await axios.get(url);
        const data = JSON.parse(response.data.substr(47).slice(0, -2));

        if (!data.table.rows.length) {
            console.log("No rows found.");
            return [];
        }

        const rows = data.table.rows.map((row) => ({
            id: row.c[0]?.v || "",
            name: row.c[1]?.v || "",
            date: row.c[2]?.v || "",
            amount: row.c[3]?.v || "",
            reason: row.c[4]?.v || "",
            mail: row.c[5]?.v || "",
            status: row.c[6]?.v || "",
        }));

        return rows;
    } catch (error) {
        console.error("Error reading SaaFine data:", error.message);
        return [];
    }
}

// ---------- APPEND ----------
async function appendSaaFine(newRow) {
    try {
        const sheets = await authenticateSheets();

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: sheetName,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [newRow], // [id, name, date, amount, reason, mail, status]
            },
        });

        return response.data.updates;
    } catch (error) {
        console.error("Error appending SaaFine data:", error.message);
        return null;
    }
}

// ---------- UPDATE ----------
async function updateSaaFine(id, updatedValues) {
    const sheets = await authenticateSheets();

    const allRows = await readSaaFine();
    const rowIndex = allRows.findIndex((row) => row.id == id);

    if (rowIndex === -1) {
        console.log(`SaaFine ID ${id} not found.`);
        return null;
    }

    const range = `SaaFine!A${rowIndex + 2}:G${rowIndex + 2}`;
    // +2 → skip header and 0-based index

    const resource = {
        values: [updatedValues], // [id, name, date, amount, reason, mail, status]
    };

    try {
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            resource,
        });

        console.log(`Row with SaaFine ID ${id} updated.`);
        return result.data;
    } catch (error) {
        console.error("Error updating SaaFine data:", error.message);
        return null;
    }
}

// ---------- DELETE ----------
async function deleteSaaFine(id) {
    const sheets = await authenticateSheets();

    const allRows = await readSaaFine();
    const rowIndex = allRows.findIndex((row) => row.id == id);

    if (rowIndex === -1) {
        console.log(`SaaFine ID ${id} not found.`);
        return null;
    }

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetId = metadata.data.sheets.find(
        (s) => s.properties.title === "SaaFine"
    ).properties.sheetId;

    const request = {
        spreadsheetId,
        resource: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId: sheetId,
                            dimension: "ROWS",
                            startIndex: rowIndex + 1, // +1 header
                            endIndex: rowIndex + 2,
                        },
                    },
                },
            ],
        },
    };

    try {
        const response = await sheets.spreadsheets.batchUpdate(request);
        console.log(`Row with SaaFine ID ${id} deleted.`);
        return response.data;
    } catch (error) {
        console.error("Error deleting SaaFine row:", error.message);
        return null;
    }
}

export { readSaaFine, appendSaaFine, updateSaaFine, deleteSaaFine };