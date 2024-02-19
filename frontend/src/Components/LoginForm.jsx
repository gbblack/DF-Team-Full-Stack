// import './css/loginsignupform.css';
import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const LoginForm = ({ setMessage }) => {
    let navigate = useNavigate();
    const url = `${process.env.REACT_APP_DB_URI}/auth/login`;
    const [responseMsg, setResponseMsg] = useState();
    const [user, setUser] = useState({
        email: ``,
        password: ``
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(url, user)
            .then(response => {
                if (response?.data?.payload) {
                    localStorage.setItem(`user`, JSON.stringify(response.data.payload));
                    navigate("../spotlight", { replace: true });
                    setMessage(<div className="confirm-msg"></div>)
                } else {
                    throw new Error("Data is in invalid format.");
                }
            })
            .catch(err => {
                setMessage(<div className="confirm-msg"></div>)
                setResponseMsg(<div className='error-msg'>Wrong email or password</div>)
            })
    }

    return (
        <div>
            <form className="login" onSubmit={handleSubmit}>
                <div className="field">
                    <input type="text" data-testid="email" value={user.email} placeholder='Email Address' name="email" onChange={handleChange} required />
                </div>
                <div className="field">
                    <input type="password" data-testid="password" value={user.password} placeholder='Password' name="password" onChange={handleChange} required />
                </div>
                {responseMsg}
                <div className="field btn">
                    <div className="btn-layer"></div>
                    <input type="submit" data-testid="submit" value="Login" />
                </div>
            </form>
        </div >
    )
}

export default LoginForm;