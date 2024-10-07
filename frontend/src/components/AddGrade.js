// src/components/AddGrade.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddGrade() {
    const { studentId } = useParams();
    const [grade, setGrade] = useState(1);
    const [weight, setWeight] = useState(1);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8081/students/${studentId}/grades`, { grade, weight, description })
            .then(() => {
                navigate(-1);
            })
            .catch(error => {
                console.error('Error adding grade:', error);
            });
    };

    return (
        <div>
            <h2>Přidat Známku</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Známka (1-5): </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Váha (1-10): </label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Popis: </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Přidat</button>
            </form>
            <button onClick={() => navigate(-1)}>Zpět</button>
        </div>
    );
}

export default AddGrade;
