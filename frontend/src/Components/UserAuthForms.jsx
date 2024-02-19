import React from 'react'
import { useState } from 'react'
import './css/FormStyling.css'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const UserAuthForms = () => {

    const [onLogin, setOnLogin] = useState(true);

    const [message, setMessage] = useState(<div></div>)


    const handleChange = () => setOnLogin(!onLogin);

    let form = <SignupForm switchPage={handleChange} setMessage={setMessage} />
    let title = <div className="title signup">DFX Signup</div>;
    let signUpCol = "white"
    if (onLogin) {
        form = <LoginForm setMessage={setMessage} />
        title = <div className="title login">DFX Login</div>;
        signUpCol = "black"
    }


    return (
        <div className='UserAuthForms'>
            <div className="wrapper">
                <div className="title-text">
                    {title}
                </div>
                {message}
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name='slider' checked={onLogin} id='login' onChange={handleChange} data-testid="login-switch" />
                        <input type="radio" name='slider' checked={!onLogin} id='signup' onChange={handleChange} data-testid="signup-switch" />
                        <label htmlFor='login' className="slide login">Login</label>
                        <label htmlFor="signup" className='slide signup' style={{ "color": signUpCol }}>Signup</label>
                        <div className="slider-tab"></div>
                    </div>

                    <div className="form-inner">
                        {form}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserAuthForms