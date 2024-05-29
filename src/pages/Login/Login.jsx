import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMessage = error.code
        ? error.code.split('/')[1].split("-").join(" ")
        : 'An unexpected error occurred';
      toast.error(errorMessage);
    }
    setLoading(false);
  };


  
  return (
    loading ?
    <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>
    :
    <div className='login'>
        <img src={logo} className='login-logo' alt="" />
        <div className="login-form">
          <h1>Sign in</h1>
            <input type="email" placeholder='Email'  value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" placeholder='Password' value={password}  onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={() => {signIn(email,password)}} type='submit'>Sign In</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          <div className="form-switch">
            <p>New to Netflix? <span onClick={() => navigate("/register")}>Sign Up Now</span></p>
          </div>
        </div>
    </div>
  )
}

export default Login