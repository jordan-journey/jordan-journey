import { useState, useEffect } from 'react';
import '../assets/style/Profile.css'; 
import axios from 'axios';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

            axios.get(`https://tickets-73a3c-default-rtdb.firebaseio.com/orders.json`)
                .then(response => {
                    const ordersData = response.data;
                    const userOrders = [];
                    console.log(ordersData);

                    for (let key in ordersData) {
                        if (ordersData[key].userId === userId) {
                            userOrders.push({ id: key, ...ordersData[key] });
                        }
                    }
                    setOrders(userOrders);
                    setLoading(false);
                    
                    saveOrdersToFirebase(userOrders);
                })
                .catch(error => {
                    console.error("Error fetching orders from Firebase:", error);
                    setError("Error fetching orders. Please try again.");
                    setLoading(false);
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

    const saveOrdersToFirebase = async (orders) => {
        try {
            await axios.put(`https://tickets-73a3c-default-rtdb.firebaseio.com/userOrders/${id}.json`, orders);
            console.log('Orders saved to Firebase successfully');
        } catch (error) {
            console.error("Error saving orders to Firebase:", error);
            alert("Error saving orders. Please try again.");
        }
    };

    return (
        <div className='mainProfileOrdersNew'>
        <div className='mainProfileOrders p-4'>
            <div className="profile-container">
                <form className="form" onSubmit={handleUpdate}>
                    <h2>Edit Profile Information</h2>
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
            <div className="orders-container">
                <h2>Orders</h2>
                {loading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="orders-list">
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <div key={order.id} className="order-item">
                                    <h3>Order ID: {order.id}</h3>
                                    <p>User ID: {order.userId}</p>
                                    <p>Order Details: {JSON.stringify(order.details)}</p>
                                </div>
                            ))
                        ) : (
                            <p className='no-order-found'>No orders found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default Profile;
