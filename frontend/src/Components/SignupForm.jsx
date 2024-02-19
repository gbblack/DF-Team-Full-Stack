import axios from 'axios';
import { useState } from 'react';

const SignupForm = ({ switchPage, setMessage }) => {
    const url = `${process.env.REACT_APP_DB_URI}/auth/signup`;

    const [responseMsg, setResponseMsg] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [user, setUser] = useState({
        email: ``,
        companyName: ``,
        password: ``,
    });

    const onChange = event => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const register = () => {
        axios.post(url, user)
            .then(response => {
                setMessage(<div className="confirm-msg">Account created! Please login</div>)
                switchPage();
            })
            .catch(err => {
                setResponseMsg(<div className='error-msg' data-testid="error">This email already exists</div>)
            });
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (user.password !== confirmPassword) {
            setResponseMsg(<div className='error-msg' data-testid="error"> Password and confirm password are not equal </div>)
        }
        if (user.email && user.password && user.companyName && user.password === confirmPassword) {
            register();

            setUser({
                email: ``,
                companyName: ``,
                password: ``
            });
            setConfirmPassword(``);
        }
    }

    return (

        <form action="/industryPartner" className="signup" onSubmit={handleSubmit} >

            <div className="field">
                <input type="email" data-testid="email" value={user.email} placeholder='Email Address' name="email" onChange={onChange} required />
            </div>
            <div className="field">
                <input type="text" data-testid="company" value={user.companyName} placeholder='Associate company name' name="companyName" onChange={onChange} required />
            </div>
            <div className="field">
                <input type="password" data-testid="password" value={user.password} placeholder='Password' name="password" onChange={onChange} required minLength={8} />
            </div>
            <div className="field">
                <input type="password" data-testid="confirm-password" placeholder='Confirm password' value={confirmPassword} name="confirm-password" onChange={event => setConfirmPassword(event.target.value)} required minLength={8} />
            </div>
            <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" data-testid="submit" value="Signup" />
            </div>
            {responseMsg}
        </form >
    )
}

export default SignupForm;