const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;



// Starts the server 3000 
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});

// Express and json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Create ID 
const createID = () => {
    let id = [];
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const numbers = "0123456789".split("");
    while (id.length < 6) {
        id.push(letters[Math.floor(Math.random() * letters.length)]);
        id.push(numbers[Math.floor(Math.random() * numbers.length)]);
    };
    id = id.join("");
    db.forEach(note => {
        if (note.id === id) {
            createID();
        };
    });
    return id;
};

// Routes for the app 

app.get("/", (req, res) => {
    res.sendFile(path,join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
    let noteID = createID();
    const newNote = req.body;
    newNote.id = noteID;
    db.push(newNote);
    writeDb();
    res.end(JSON.stringify(db));
});

app.delete("/api/notes/:id", (req, res) => {
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            db.splice(i, 1);
        };
    };
    writeDb();
    res.json(db);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});