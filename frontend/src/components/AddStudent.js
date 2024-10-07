// src/components/AddStudent.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddStudent() {
    const { classId } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8081/classes/${classId}/students`, { name })
            .then(() => {
                navigate(`/classes/${classId}/students`);
            })
            .catch(error => {
                console.error('Error adding student:', error);
            });
    };

    return (
        <div>
            <h2>Přidat Nového Studenta</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Jméno Studenta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Přidat</button>
            </form>
            <button onClick={() => navigate(-1)}>Zpět</button>
        </div>
    );
}

export default AddStudent;
