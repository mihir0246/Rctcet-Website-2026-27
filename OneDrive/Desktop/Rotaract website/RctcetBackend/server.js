import axios from 'axios'
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// is Active check
app.get('/', (req, res) => {
    res.send('Hello from Shreevathsa!');
});

/*--------------------------------------------------------------
SaaFine
------------------------------------------------------------------- */
import {
    readSaaFine,
    appendSaaFine,
    updateSaaFine,
    deleteSaaFine,
} from "./src/SaaFine.js";

// READ
app.get("/getSaaFine", async (req, res) => {
    try {
        const data = await readSaaFine();
        res.send(data);
    } catch (err) {
        res.status(500).send("Failed to fetch SaaFine data.");
    }
});

// APPEND
app.post("/addSaaFine", async (req, res) => {
    try {
        const { id, name, date, amount, reason, mail, status } = req.body;
        const result = await appendSaaFine([
            id || Math.floor(Math.random() * 100000),
            name,
            date,
            amount,
            reason,
            mail,
            status,
        ]);
        res.send(result);
    } catch (err) {
        res.status(500).send("Failed to append SaaFine data.");
    }
});

// UPDATE
app.put("/updateSaaFine/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, date, amount, reason, mail, status } = req.body;
        const result = await updateSaaFine(id, [
            id,
            name,
            date,
            amount,
            reason,
            mail,
            status,
        ]);
        if (!result) return res.status(404).send("SaaFine ID not found.");
        res.send(result);
    } catch (err) {
        res.status(500).send("Failed to update SaaFine data.");
    }
});

// DELETE
app.delete("/deleteSaaFine/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteSaaFine(id);
        if (!result) return res.status(404).send("SaaFine ID not found.");
        res.send(result);
    } catch (err) {
        res.status(500).send("Failed to delete SaaFine row.");
    }
});


/*--------------------------------------------------------------
Contact us
------------------------------------------------------------------- */
import {
    readContactUs,
    appendDataContactUs,
    updateDataContactUs,
    deleteRowContactUs
} from "./src/ContactUs.js";
// ---------- READ ALL ----------
app.get("/getContactUs", async (req, res) => {
    try {
        const contacts = await readContactUs();
        res.send(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch ContactUs data.");
    }
});

// ---------- APPEND ----------
app.post("/addContactUs", async (req, res) => {
    try {
        const { id, firstname, lastname, mail, phno, message } = req.body;

        const result = await appendDataContactUs([id || Math.floor(Math.random() * 100000), firstname, lastname, mail, phno, message]);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to append ContactUs data.");
    }
});

// // ---------- UPDATE ----------
// app.put("/updateContactUs/:id", async (req, res) => {
//   try {
//     const contactId = req.params.id;
//     const { firstname, lastname, mail, phno, message } = req.body;

//     const result = await updateDataContactUs(contactId, [
//       contactId, firstname, lastname, mail, phno, message
//     ]);

//     if (!result) return res.status(404).send("Contact not found.");
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Failed to update ContactUs data.");
//   }
// });

// // ---------- DELETE ----------
// app.delete("/deleteContactUs/:id", async (req, res) => {
//   try {
//     const contactId = req.params.id;
//     const result = await deleteRowContactUs(contactId);

//     if (!result) return res.status(404).send("Contact not found.");
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Failed to delete ContactUs row.");
//   }
// });

/*--------------------------------------------------------------
EventsDrive
------------------------------------------------------------------- */
import {
    readEventsDrive,
} from "./src/EventsDrive.js";

// ---------- READ ----------
app.get("/getEventsDrive", async (req, res) => {
    try {
        const events = await readEventsDrive();
        res.send(events);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch EventsDrive data.");
    }
});

/*--------------------------------------------------------------
FeedBack Endpoints
------------------------------------------------------------------- */
import { appendFeedBack } from './src/FeedBack.js';
// APPEND FeedBack
app.post("/addFeedBack", async (req, res) => {
    try {
        const { name, mail, event, feedback, clubname } = req.body;

        if (!name || !event || !feedback || !clubname) {
            return res.status(400).send({
                message: "Missing required fields: name, event, feedback, clubname",
            });
        }

        const result = await appendFeedBack({ name, mail, event, feedback, clubname });
        if (!result) {
            return res.status(500).send({ message: "Failed to append FeedBack data." });
        }

        res.send({ message: "FeedBack added successfully", updates: result });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error while adding FeedBack." });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});