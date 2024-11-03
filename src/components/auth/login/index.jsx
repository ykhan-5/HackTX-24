import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import './Login.css';

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage("Failed to sign in. Please check your credentials.");
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            doSignInWithGoogle().catch(() => {
                setErrorMessage("Google sign-in failed. Please try again.");
                setIsSigningIn(false);
            });
        }
    };

    return (
        <div className="login-page">
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <main className="login-container">
                <h3 className="login-title">Welcome Back</h3>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <form onSubmit={onSubmit} className="login-form">
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
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSigningIn}
                        className={`submit-button ${isSigningIn ? 'button-disabled' : 'button-active'}`}
                    >
                        {isSigningIn ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="sign-up-link">
                    Don’t have an account?{' '}
                    <Link to={'/register'}>Sign up</Link>
                </p>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                    className={`google-button ${isSigningIn ? 'button-disabled' : 'button-active'}`}
                >
                    <svg className="google-icon" viewBox="0 0 48 48">
                        <g clipPath="url(#clip0)">
                            <path d="M47.532 24.553c0-1.632-.132-3.272-.414-4.877H24.48v9.242h12.964c-.538 2.98-2.266 5.616-4.797 7.292v6.007h7.734C44.922 38.028 47.532 31.855 47.532 24.553z" fill="#4285F4" />
                            <path d="M24.48 48.002c6.473 0 11.932-2.126 15.909-5.795L32.655 36.211c-2.152 1.464-4.93 2.292-8.166 2.292-6.262 0-11.571-4.224-13.476-9.904H3.033v6.182C7.107 42.887 15.406 48.002 24.48 48.002z" fill="#34A853" />
                            <path d="M11.005 28.601c-1.006-2.98-1.006-6.207 0-9.188V13.23H3.033C-.371 20.011-.371 28 3.033 34.783l7.972-6.182z" fill="#FBBC04" />
                            <path d="M24.48 9.5c3.422-.053 6.73 1.234 9.207 3.598L40.539 6.245c-4.338-4.075-10.096-6.314-16.058-6.244C15.406 0 7.107 5.116 3.033 13.23l7.972 6.182c1.896-5.688 7.213-9.912 13.475-9.912z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>
            </main>
        </div>
    );
};

export default Login;
