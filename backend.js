const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "myguider.db");

const connectDb = async () => {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        return db;
    } catch (error) {
        console.error("Database error:", error.message);
        throw error;
    }
};

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "myguider.html"));
});

app.post("/business/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if username and password are provided
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const db = await connectDb();
        await db.run("INSERT INTO businesslogin (email_id, password) VALUES (?, ?)", [username, password]);
        res.status(200).json({ message: "Business account created successfully" });
    } catch (error) {
        console.error("Error creating business account:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});