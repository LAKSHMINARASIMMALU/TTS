import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);  // Track whether it's a sign-up or login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission (either for login or sign-up)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign up logic
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign-up successful!');
      } else {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
      }
    } catch (err) {
      setError(err.message);  // Set error message in case of failure
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <div>
        <span onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account?      Login' : "Don't have an account? Sign up"}
        </span>
      </div>
    </div>
  );
}

export default AuthPage;
