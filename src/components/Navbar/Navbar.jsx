import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext.jsx';
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const navRef = useRef();
  const  [IsVisible, SetIsVisible] = useState(false);
  const { query, setQuery } = useContext(SearchContext);
  const navigate = useNavigate();


  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark')
      }
      else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  }, [])

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <Link to={"/"}><img src={logo} alt="logo"/></Link>
        <ul>
          <Link to={"/"} className='navbar-link'>Home</Link>
          <Link className='navbar-link'>TV Shows</Link>
          <Link className='navbar-link'>Movies</Link>
          <Link className='navbar-link'>New & Popular</Link>
          <Link to={"/mylist"} className='navbar-link'>My List</Link>
          <Link className='navbar-link'>Browse by Languages</Link>
        </ul>
      </div>
      <div className="navbar-right">
        {IsVisible ?
          <div className="search-box">
            <input type="text" placeholder='Title of Movie' onChange={(e) => {setQuery(e.target.value)}}/>
            <a className='close-input' onClick={() => {SetIsVisible(false)}}>X</a>
          </div>
          :
          <img src={search_icon} alt="" className='icons' onClick={() => {SetIsVisible(true)}}/>}
        <p>Children</p>
        <img src={bell_icon} alt="" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p onClick={() => {signOut;navigate("/login")}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
