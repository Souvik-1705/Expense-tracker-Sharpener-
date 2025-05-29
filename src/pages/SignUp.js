import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../Firebase';
import "../styles/SignUp.css";

function SignUp() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[error,setError]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!email || !password || !confirmPassword){
            setError("All fields are required");
            return;
        }
        if(password!==confirmPassword){
            setError("Passwords do not match.");
            return;
        }

        try {
            const userCredential= await createUserWithEmailAndPassword(auth,email,password);
            console.log("User has successfully signed up.");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }
  return (
    <div className='sign-up'>
        <h2 className='signUp-title'>Sign Up</h2>
        {error && <alert>{error}</alert>}
        <form className='signUp-form' onSubmit={handleSubmit}>
            <input type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Enter your password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type='password' placeholder='Enter your confirm password'value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <button className='signUp-btn'>Sign Up</button>
            <p>Have an Account? <a href='/login'>Login</a></p>
        </form>
    </div>
  )
}

export default SignUp;