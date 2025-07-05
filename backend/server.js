const express = require("express")
const mongoose = require("mongoose")
const axios = require("axios")
const fs = require("fs")
const Department = require("./models/Department")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
dotenv.config()


app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.log("MongoDB Connection error:",err));



app.post("/api/department", async(req,res) => {
    const {dep_id, dep_name} = req.body;

    try{
        const newDepartment = new Department({ dep_id, dep_name });
        await newDepartment.save();
        res.status(201).json({ message: "Department added Successfully"})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Failde to add department", error});
    }
}) 

app.get("/api/get_department", async (req, res) => {
    try {
        const department = await Department.find().sort({ dep_id: 1 });
        res.status(200).json(department);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ message: "Error fetching departments", error });
    }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
