import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase';
import React, { useState } from 'react'
import "../styles/ForgotPassword.css";

function ForgotPassword() {
    const[email,setEmail]=useState("");
    const[message,setMessage]=useState("");
    const[loading,setLoading]=useState("");
    const[error,setError]=useState("");

    const handleReset=async(e)=>{
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth,email);
            setMessage("Password reset link has been sent to your email.");
        } catch (err) {
            setError("Failed to send reset email. " + err.message);
        }
         finally {
            setLoading(false);
        }

    }
  return (
    <div className='forgot-password'>
        <h2>Forgot Password</h2>
        <form onSubmit={handleReset}>
            <input type='email' placeholder='Enter registered email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button type='submit' disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
        </form>
         {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  )
}

export default ForgotPassword;