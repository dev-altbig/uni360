import React, { useEffect, useState } from "react";
import axios from "axios";
import apiClient from '../api/axios';
const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add state for error handling

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await apiClient.get("/get_department");
                setDepartments(res.data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch departments:", err);
                setError("Could not retrieve departments. Please ensure the server is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <i className="bi bi-list-ul me-2"></i> {/* Icon for the list */}
                    Department List
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center">
                            <p>Loading departments...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : departments.length === 0 ? (
                        <p>No departments found. You can add one from the 'Add Department' page.</p>
                    ) : (
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Department ID</th>
                                    <th scope="col">Department Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((dept) => (
                                    <tr key={dept._id}>
                                        <td>{dept.dep_id}</td>
                                        <td>{dept.dep_name}</td>
                                        <td>
                                            {/* Placeholder buttons for future functionality */}
                                            <button className="btn btn-sm btn-primary me-2">
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger">
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DepartmentList;