import React, { useState } from 'react'
import "./auth.scss"
import { auth } from '../firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const initializeState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Auth = (props) => {

    const { setActive } = props
    const navigate = useNavigate()

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
        if (!signUp) {
            if (email && password) {
                const { user } = await signInWithEmailAndPassword(auth, email, password)
                setActive("home")
            } else {
                alert("All fields are mandatory to fill")
            }
        } else {
            if (password != confirmPassword) {
                alert("Passwords dont match")
            }
            if (email && password && firstName && lastName) {
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(user, { displayName: `${firstName} ${lastName}` })
            } else {
                alert("All fields are mandatory to fill")
            }
        }
        navigate("/")
    }

    return (
        <div className="auth">
            <div className="form-container">
                <h2>{!signUp ? "Sign In" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {signUp && (
                        <>
                            <div>
                                <input
                                    className={`${!signUp ? "sign-in-input" : "sign-up-input"}`}
                                    type='text'
                                    placeholder='First name'
                                    name='firstName'
                                    value={firstName}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <input
                                    className={`${!signUp ? "sign-in-input" : "sign-up-input"}`}
                                    type='text'
                                    placeholder='Last name'
                                    name='lastName'
                                    value={lastName}
                                    onChange={handleInput}
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <input
                            className={`${!signUp ? "sign-in-input" : "sign-up-input"}`}
                            type='email'
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
                            value={password}
                            onChange={handleInput}
                        />
                    </div>
                    {signUp && (
                        <>
                            <div>
                                <input
                                    className={`${!signUp ? "sign-in-input" : "sign-up-input"}`}
                                    type='password'
                                    placeholder='Confirm password'
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handleInput}
                                />
                            </div>
                        </>
                    )}
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