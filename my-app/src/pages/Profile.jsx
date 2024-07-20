import React, { useState, useEffect } from 'react';
import '../assets/style/Profile.css'; 
import axios from 'axios';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {

      const userId = localStorage.getItem('id');
        if (userId) {
            setId(userId);

            axios.get(`https://tickets-73a3c-default-rtdb.firebaseio.com/users/${userId}.json`)
                .then(response => {
                    const userData = response.data;
                    setName(userData.name);
                    setEmail(userData.email);
                })
                .catch(error => {
                    console.error("Error fetching user data from Firebase:", error);
                    alert("Error fetching user data. Please try again.");
                });
        }
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://tickets-73a3c-default-rtdb.firebaseio.com/users/${id}.json`, {
                name: name,
                email: email
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Please try again.");
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="edit-button">Update</button>
            </form>
        </div>
    );
};

export default Profile;
