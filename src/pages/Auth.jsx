import React, { useState } from 'react'
import "./auth.scss"

const initializeState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Auth = () => {

    const [state, setState] = useState(initializeState)
    const [signUp, setSignUp] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = state

    const handleInput = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    return (
        <div className="auth">
            <div className="form-container">
                <h2>{!signUp ? "Sign In" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className={`${!signUp ? "sign-in-input" : "sign-up-input"}`}
                            type='text'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <input
                            className={`${!signUp ? "sign-in-input" : "sign-up-input"}`}
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={email}
                            onChange={handleInput}
                        />
                    </div>
                    <div>
                        <button type='submit' className={`${!signUp ? "signIn" : "signUp"}`}>{!signUp ? "Sign In" : "Sign Up"}</button>
                    </div>
                </form>
                <div className="form-message">
                    {!signUp ? (
                        <>
                            <p>Dont have an Account?</p>
                            <p className='sign-in-message' onClick={() => setSignUp(true)}>Sign up</p>
                        </>
                    ) : (
                        <>
                            <p>Already have an account?</p>
                            <p className='sign-up-message' onClick={() => setSignUp(false)}>Sign in</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Auth