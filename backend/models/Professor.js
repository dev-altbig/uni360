const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
    professor_name: {
        type: String,
        required: true,
    },
    professor_id: {
        type: Number,
        unique: true,
    },
    // 1. Replaced 'subject' with 'dep_id' which will store the number from the Department model.
    dep_id: {
        type: Number,
        required: true,
        ref: 'Department',
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Professor", professorSchema);