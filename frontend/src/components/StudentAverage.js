// src/components/StudentAverage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentAverage() {
    const { studentId } = useParams();
    const [average, setAverage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/students/${studentId}/average`)
            .then(response => {
                setAverage(response.data.average);
            })
            .catch(error => {
                console.error('Error fetching average:', error);
            });
    }, [studentId]);

    return (
        <div>
            <h2>Průměr Studenta</h2>
            {average !== null ? (
                <p>Průměr: {average.toFixed(2)}</p>
            ) : (
                <p>Žádné známky k výpočtu průměru.</p>
            )}
            <button onClick={() => navigate(-1)}>Zpět</button>
        </div>
    );
}

export default StudentAverage;
