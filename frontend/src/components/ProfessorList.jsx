import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../api/axios';

const Professor = () => {
    // State to store the list of professors
    const [professors, setProfessors] = useState([]);
    
    // State to handle the loading status
    const [loading, setLoading] = useState(true);
    
    // State to handle any potential errors during the API call
    const [error, setError] = useState(null);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                // Make the API call to your backend endpoint
                const response = await apiClient.get("/get_professor");
                setProfessors(response.data); // Store the fetched data in state
                setError(null); // Clear any previous errors
            } catch (err) {
                // If an error occurs, store the error message
                console.error("Error fetching professors:", err);
                setError("Failed to fetch professors. Please try again later.");
            } finally {
                // Set loading to false once the request is complete (whether it succeeded or failed)
                setLoading(false);
            }
        };

        fetchProfessors();
    }, []); // The empty dependency array [] ensures this effect runs only once

    // Conditional rendering based on the component's state
    
    // 1. Show a loading message while data is being fetched
    if (loading) {
        return <div className="text-center mt-5">Loading professors...</div>;
    }

    // 2. Show an error message if the API call failed
    if (error) {
        return <div className="alert alert-danger mt-3">{error}</div>;
    }

    // 3. Render the list of professors in a table
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <i className="bi bi-people-fill me-2"></i>
                    Professor List
                </div>
                <div className="card-body">
                    {professors.length === 0 ? (
                        <p>No professors found.</p>
                    ) : (
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Department</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professors.map((prof) => (
                                    <tr key={prof.professor_id}>
                                        <td>{prof.professor_id}</td>
                                        <td>{prof.professor_name}</td>
                                        <td>
                                            {/* 
                                              Access the populated department name.
                                              The ?. (optional chaining) prevents an error if dep_id is null or undefined.
                                            */}
                                            {prof.dep_id?.dep_name || 'N/A'}
                                        </td>
                                        <td>{prof.password}</td>
                                        <td>
                                            {/* Placeholder for future action buttons */}
                                            <button className="btn btn-sm btn-primary me-2">Edit</button>
                                            <button className="btn btn-sm btn-danger">Delete</button>
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

export default Professor;