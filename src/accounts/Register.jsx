import React, { useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import './accounts.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullname,
                    },
                },
            });
            if (error) throw error;
            alert('Check your email for a verification link!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='acc-form'>
            <form onSubmit={handleSubmit}>
                <input
                    className='form-group'
                    placeholder='Full Name'
                    name='fullname'
                    onChange={handleChange}
                />

                <input
                    className='form-group'
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />

                <input
                    className='form-group'
                    placeholder='Password'
                    name='password'
                    type='password'
                    onChange={handleChange}
                />

                <button type='submit'>Submit</button>
            </form>
            <div className='alternative-acc'>
                Already have an account? <Link to='/login'>Login</Link>
            </div>
        </div>
    );
};

export default Register;
