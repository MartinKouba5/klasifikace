// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentList() {
    const { classId } = useParams();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/classes/${classId}/students`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, [classId]);

    const handleDelete = (studentId) => {
        if (window.confirm('Opravdu chcete smazat tohoto studenta?')) {
            axios.delete(`http://localhost:8081/students/${studentId}`)
                .then(() => {
                    setStudents(students.filter(s => s.id !== studentId));
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                });
        }
    };

    return (
        <div>
            <h2>Seznam Studentů</h2>
            <button onClick={() => navigate(`/classes/${classId}/add-student`)}>Přidat Studenta</button>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.name}
                        {' '}
                        <Link to={`/students/${student.id}/add-grade`}>Přidat Známku</Link>
                        {' | '}
                        <Link to={`/students/${student.id}/average`}>Průměr</Link>
                        {' | '}
                        <button onClick={() => handleDelete(student.id)}>Smazat</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/')}>Zpět na Třídy</button>
        </div>
    );
}

export default StudentList;
