import React, { useState, useEffect } from "react";
import axios from "axios";
import apiClient from '../api/axios';
const Add_professor = () => {
    // 1. State to hold the list of departments fetched from the API
    const [departments, setDepartments] = useState([]);

    // 2. Update formData state to use 'dep_id' instead of 'subject'
    const [formData, setFormData] = useState({
        professor_name: "",
        dep_id: "", // Changed from 'subject'
        password: ""
    });

    // 3. useEffect hook to fetch departments when the component mounts
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await apiClient.get("/get_department");
                setDepartments(response.data); // Store departments in state
            } catch (error) {
                console.error("Failed to fetch departments", error);
                alert("Could not load departments for selection.");
            }
        };

        fetchDepartments();
    }, []); // Empty dependency array means this runs only once on mount

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/add_professor", formData);
            alert("Professor added successfully!");
            
            // 4. Reset the form
            setFormData({
                professor_name: "",
                dep_id: "", // Reset dep_id
                password: ""
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error adding professor";
            alert(errorMessage);
            console.error(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="card card-primary">
                    <div className="card-header">
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Add Professor
                    </div>
                    <div className="card-body">
                        {/* Professor Name Field (Unchanged) */}
                        <div className="form-group mb-3">
                            <label htmlFor="professor_name">Professor Name</label>
                            <input
                                name="professor_name"
                                id="professor_name"
                                className="form-control"
                                type="text"
                                value={formData.professor_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* 5. Replace Subject input with Department dropdown */}
                        <div className="form-group mb-3">
                            <label htmlFor="dep_id">Department</label>
                            <select
                                name="dep_id"
                                id="dep_id"
                                className="form-control"
                                value={formData.dep_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>--Select a Department--</option>
                                {departments.map(dep => (
                                    <option key={dep.dep_id} value={dep.dep_id}>
                                        {dep.dep_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Password Field (Unchanged) */}
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                id="password"
                                className="form-control"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
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

export default Add_professor;