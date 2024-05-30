import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string().required("Your Full Name is Required!"),
  email: yup.string().email("Your email is incorrect!").required("Your email is incorrect!"),
  password: yup.string().min(6, "Password must be at least 6 characters").max(12, "Password must be at most 12 characters").required("Your password is incorrect!"),
});

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userSchema)
  });

  const signUp = async (data) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: data.name,
        authProvider: "local",
        email: data.email,
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
        <img src={netflix_spinner} alt="Loading..." />
      </div>
      :
      <div className='login'>
        <img src={logo} className='login-logo' alt="Logo" />
        <div className="login-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(signUp)}>
            <input
              type="text"
              placeholder='Name'
              {...register("name")}
            />
            {errors.name && <p className="error" style={{color: "red"}}>{errors.name.message}</p>}
            
            <input
              type="email"
              placeholder='Email'
              {...register("email")}
            />
            {errors.email && <p className="error" style={{color: "red"}}>{errors.email.message}</p>}
            
            <input
              type="password"
              placeholder='Password'
              {...register("password")}
            />
            {errors.password && <p className="error" style={{color: "red"}}>{errors.password.message}</p>}
            
            <button type='submit'>Sign Up</button>
          </form>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
          <div className="form-switch">
            <p>Already have an account? <span onClick={() => navigate("/login")}>Sign In Now</span></p>
          </div>
        </div>
      </div>
  )
}

export default Register;
