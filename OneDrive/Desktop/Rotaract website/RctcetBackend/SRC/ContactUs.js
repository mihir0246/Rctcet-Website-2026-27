// ContactUs
import { authenticateSheets } from './auth.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const spreadsheetId = process.env.SPREADSHEET_ID;
const sheetName = 'ContactUs!A:F'; // only columns A–F

// ---------- READ ----------
async function readContactUs() {
    const query = `select A,B,C,D,E,F`; // id, firstname, lastname, mail, phno, message
    const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?sheet=ContactUs&tq=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url);
        const data = JSON.parse(response.data.substr(47).slice(0, -2));

        if (!data.table.rows.length) {
            console.log('No rows found matching the criteria.');
            return [];
        }

        const rows = data.table.rows.map(row => ({
            id: row.c[0]?.v || '',
            firstname: row.c[1]?.v || '',
            lastname: row.c[2]?.v || '',
            mail: row.c[3]?.v || '',
            phno: row.c[4]?.v || '',
            message: row.c[5]?.v || '',
        }));

        return rows;
    } catch (error) {
        console.error('Error reading data:', error.message);
        return [];
    }
}

// ---------- APPEND ----------
async function appendDataContactUs(newRow) {
    try {
        const sheets = await authenticateSheets();

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: sheetName,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [newRow], // [id, firstname, lastname, mail, phno, message]
            },
        });

        return response.data.updates;

    } catch (error) {
        console.error('Error appending data:', error.message);
        return null;
    }
}

// ---------- UPDATE ----------
async function updateDataContactUs(contactId, updatedValues) {
    const sheets = await authenticateSheets();

    const allRows = await readContactUs();
    const rowIndex = allRows.findIndex(row => row.id == contactId);

    if (rowIndex === -1) {
        console.log(`ContactUs ID ${contactId} not found.`);
        return null;
    }

    const range = `ContactUs!A${rowIndex + 2}:F${rowIndex + 2}`;
    // +2 because rowIndex is 0-based and row 1 is header

    const resource = {
        values: [updatedValues],
        // must be [id, firstname, lastname, mail, phno, message]
    };

    try {
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            resource,
        });

        console.log(`Row with ContactUs ID ${contactId} updated.`);
        return result.data;

    } catch (error) {
        console.error('Error updating data:', error.message);
        return null;
    }
}

// ---------- DELETE ----------
async function deleteRowContactUs(contactId) {
    const sheets = await authenticateSheets();

    const allRows = await readContactUs();
    const rowIndex = allRows.findIndex(row => row.id == contactId);

    if (rowIndex === -1) {
        console.log(`ContactUs ID ${contactId} not found.`);
        return null;
    }

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetId = metadata.data.sheets.find(s => s.properties.title === 'ContactUs').properties.sheetId;

    const request = {
        spreadsheetId,
        resource: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId: sheetId,
                            dimension: 'ROWS',
                            startIndex: rowIndex + 1, // +1 for header row
                            endIndex: rowIndex + 2,
                        },
                    },
                },
            ],
        },
    };

    try {
        const response = await sheets.spreadsheets.batchUpdate(request);
        console.log(`Row with ContactUs ID ${contactId} deleted.`);
        return response.data;

    } catch (error) {
        console.error('Error deleting row:', error.message);
        return null;
    }
}

export {
    readContactUs,
    appendDataContactUs,
    updateDataContactUs,
    deleteRowContactUs
}