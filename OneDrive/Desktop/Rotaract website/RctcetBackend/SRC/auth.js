import 'dotenv/config'; // loads .env automatically in ES modules

import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname workaround in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEY_FILE_PATH = path.join(__dirname, '../servicekey.json');
// console.log(KEY_FILE_PATH)

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
// console.log(SPREADSHEET_ID)

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// console.log(SCOPES)

async function authenticateSheets() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE_PATH,
            scopes: SCOPES,
        });

        const authClient = await auth.getClient();

        const sheets = google.sheets({ version: 'v4', auth: authClient });

        console.log('Successfully authenticated with Google Sheets API.');

        return sheets;

    } catch (error) {
        console.error('Error during authentication or API setup:');
        console.error('  - Make sure your servicekey.json path is correct.');
        console.error('  - Verify the content of servicekey.json is valid JSON.');
        console.error('  - Check your internet connection.');
        console.error('  - Ensure the Google Sheets API is enabled in your GCP project.');
        console.error('  - Error details:', error.message);
        process.exit(1);
    }
}

export {
    authenticateSheets,
};