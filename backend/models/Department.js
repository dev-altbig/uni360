const mongoose = require("mongoose");
const Counter = require("./Counter");

const departmentSchema = new mongoose.Schema({
    dep_id: {
        type: Number,
        unique: true
    },
    dep_name: {
        type: String,
        required: true
    }
});

// Pre-save hook to auto-increment dep_id
departmentSchema.pre("save", async function (next) {
    const doc = this;
    if (doc.isNew) {
        try {
            const counter = await Counter.findOneAndUpdate(
                { id: "department" },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            doc.dep_id = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("Department", departmentSchema);
