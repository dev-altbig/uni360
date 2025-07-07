const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Import Models
const Department = require("./models/Department");
const Professor = require("./models/Professor");
const Counter = require("./models/Counter");

// Import Middleware and Routes
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection error:", err));

// --- Authentication Route ---
// This route is public and does not need authentication
app.use('/api', authRoutes);

// --- Department Routes (Now Protected) ---
// Only an 'admin' can add a department
app.post("/api/department", authMiddleware(['admin']), async (req, res) => {
    // ... (rest of the code is unchanged)
    const { dep_id, dep_name } = req.body;
    try {
        const newDepartment = new Department({ dep_id, dep_name });
        await newDepartment.save();
        res.status(201).json({ message: "Department added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add department", error });
    }
});

// Both 'admin' and 'professor' can view departments
app.get("/api/get_department", authMiddleware(['admin', 'professor']), async (req, res) => {
    // ... (rest of the code is unchanged)
    try {
        const department = await Department.find().sort({ dep_id: 1 });
        res.status(200).json(department);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ message: "Error fetching departments", error });
    }
});

// --- Professor Routes (Now Protected) ---
// Only an 'admin' can add a professor
app.post("/api/add_professor", authMiddleware(['admin']), async (req, res) => {
    // ... (rest of the code is unchanged)
    const { professor_name, dep_id, password } = req.body;
    if (!professor_name || !dep_id || !password) {
        return res.status(400).json({ message: "Professor name, department, and password are required" });
    }
    try {
        const counter = await Counter.findOneAndUpdate(
            { id: 'professor_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true }
        );
        const newProfessor = new Professor({
            professor_name,
            professor_id: counter.seq,
            dep_id,
            password,
        });
        await newProfessor.save();
        res.status(201).json({ message: "Professor added successfully", professor: newProfessor });
    } catch (error) {
        console.error("Error adding professor:", error);
        res.status(500).json({ message: "Failed to add professor", error });
    }
});

// Both 'admin' and 'professor' can view professors
app.get("/api/get_professor", authMiddleware(['admin', 'professor']), async (req, res) => {
    // ... (rest of the code is unchanged)
    try {
        const professors = await Professor.find()
            .populate({ path: 'dep_id', model: 'Department', select: 'dep_name', foreignField: 'dep_id', localField: 'dep_id' })
            .sort({ professor_id: 1 });
        res.status(200).json(professors);
    } catch (error) {
        console.error("Error Fetching Professors:", error);
        res.status(500).json({ message: "Error fetching professors" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});