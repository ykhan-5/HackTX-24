import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                if (password === confirmPassword) {
                    await doCreateUserWithEmailAndPassword(email, password);
                    navigate('/home');
                } else {
                    setErrorMessage("Passwords do not match.");
                }
            } catch (error) {
                setErrorMessage("Failed to create account. Please try again.");
            }
            setIsRegistering(false);
        }
    };

    return (
        <div className="register-page">
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <main className="register-container">
                <h3 className="register-title">Create a New Account</h3>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <form onSubmit={onSubmit} className="register-form">
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            autoComplete="new-password"
                            required
                            disabled={isRegistering}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            autoComplete="off"
                            required
                            disabled={isRegistering}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`submit-button ${isRegistering ? 'button-disabled' : 'button-active'}`}
                    >
                        {isRegistering ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <p className="login-link">
                        Already have an account?{' '}
                        <Link to={'/login'}>Continue</Link>
                    </p>
                </form>
            </main>
        </div>
    );
};

export default Register;
