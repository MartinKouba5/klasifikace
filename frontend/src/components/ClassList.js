// src/components/ClassList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ClassList() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/classes')
            .then(response => {
                setClasses(response.data);
            })
            .catch(error => {
                console.error('Error fetching classes:', error);
            });
    }, []);

    return (
        <div>
            <h1>Seznam Tříd</h1>
            <ul>
                {classes.map(cls => (
                    <li key={cls.id}>
                        <Link to={`/classes/${cls.id}/students`}>{cls.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClassList;
