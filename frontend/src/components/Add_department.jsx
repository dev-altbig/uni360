import React, { useState } from "react";
import axios from "axios";

const Add_department = () => {
    const [formData, setFormData] = useState({
        dep_name: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/department", formData);
            alert("Department added successfully!");
            setFormData({ dep_name: "" }); // Reset form
        } catch (error) {
            alert("Error adding department");
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="card card-primary">
                    <div className="card-header">
                        <i className="bi bi-plus me-2"></i>
                        Add Department
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="dep_name">Department Name</label>
                            <input
                                name="dep_name"
                                className="form-control"
                                type="text"
                                value={formData.dep_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-success">
                            <i className="bi bi-save"></i> Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Add_department;
