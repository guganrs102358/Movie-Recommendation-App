import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { registerUser } = useContext(UserContext);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        if (!validatePhone(phone)) {
            toast.error('Please enter a valid 10-digit mobile number.');
            return;
        }

        try {
            const result = await axios.post('http://localhost:3001/register', { name, email, phone, password });
            if (result.status === 200) {
                toast.success('Registration successful. Redirecting to login...');
                registerUser({ name, email });
                setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
            }
        } catch (err) {
            console.log(err);
            toast.error('Registration failed');
        }
    };

    return (
        <div className='contact'>
            <div className='container'>
                <div className='form'>
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='box'>
                            <div className='label'>
                                <h4>Name</h4>
                            </div>
                            <div className='input'>
                                <input 
                                    type='text' 
                                    placeholder='Enter Your Name' 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className='box'>
                            <div className='label'>
                                <h4>Email</h4>
                            </div>
                            <div className='input'>
                                <input 
                                    type='email' 
                                    placeholder='Enter Your Email' 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className='box'>
                            <div className='label'>
                                <h4>Mobile Number</h4>
                            </div>
                            <div className='input'>
                                <input 
                                    type='text' 
                                    placeholder='Enter Your Mobile Number' 
                                    onChange={(e) => setPhone(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className='box'>
                            <div className='label'>
                                <h4>Password</h4>
                            </div>
                            <div className='input'>
                                <input 
                                    type='password' 
                                    placeholder='Enter Your Password' 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <button type='submit'>Register</button>
                    </form>
                    <p>Already have an account?</p>
                    <Link to='/login'>
                        <button type='button'>Login</button>
                    </Link>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Register;
