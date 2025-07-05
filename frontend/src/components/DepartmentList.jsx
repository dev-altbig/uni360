import React, { useEffect, useState } from "react";
import axios from "axios";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/get_department");
                setDepartments(res.data);
            } catch (error) {
                console.error("Failed to fetch departments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div className="container mt-4">
            <h4>Department List</h4>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Department ID</th>
                            <th>Department Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept) => (
                            <tr key={dept._id}>
                                <td>{dept.dep_id}</td>
                                <td>{dept.dep_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DepartmentList;
