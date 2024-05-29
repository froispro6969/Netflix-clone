import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signUp = async (name, email, password) => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error(error.code.split('/')[1].split("-").join(" "));
        } finally {
            setLoading(false);
        }
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
          <h1>Sign Up</h1>
            <input type="text" placeholder='Name' value={name} onChange={(e) => {setName(e.target.value)}}/>
            <input type="email" placeholder='Email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" placeholder='Password' value={password}  onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={() => {signUp(name,email,password)}} type='submit'>Sign Up</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          <div className="form-switch">
           <p>Already have account? <span onClick={() => navigate("/login")}>Sign In Now</span></p>
          </div>
        </div>
    </div>
  )
}

export default Register
