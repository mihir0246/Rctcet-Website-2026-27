// FeedBack.js
import { authenticateSheets } from "./auth.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const spreadsheetId = process.env.SPREADSHEET_ID;
const sheetName = "FeedBack!A:F"; // 6 columns

// ---------- APPEND ----------
async function appendFeedBack({ name, mail, event, feedback, clubname }) {
    try {
        const sheets = await authenticateSheets();

        const datetime = new Date().toLocaleDateString(); // Auto timestamp

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: sheetName,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            resource: {
                values: [[datetime, name, mail || "", event, feedback, clubname]],
            },
        });

        return response.data.updates;
    } catch (error) {
        console.error("Error appending FeedBack data:", error.message);
        return null;
    }
}


export { appendFeedBack };