import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

function Login() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        if(!email || !password){
            setError("All fields are required");
            return;
        }

        try {
            const userCredential=await signInWithEmailAndPassword(auth,email,password);
            const token=await userCredential.user.getIdToken();
            localStorage.setItem("token",token);
            console.log("User has successfully logged in");
            navigate("/welcome");
        } catch (error) {
            setError("Invalid email or password");
        }
        
    }

  return (
    <div className='login'>
        <form className='login-form' onSubmit={handleSubmit}>
             <h2 className="login-page-title">Login Page</h2>
            <input type='email' placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit'>Login</button>
            <a href="">Forgot Password?</a>
            <p>Don't have an account? <a href="/signUp">Sign Up</a></p>
        </form>
    </div>
  )
}

export default Login;