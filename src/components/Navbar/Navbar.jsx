import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import hamburger from '../../assets/hamburger.png'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext.jsx';
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const navRef = useRef();
  const [IsVisible, SetIsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { query, setQuery } = useContext(SearchContext);
  const navigate = useNavigate();


  const handleScroll = () => {
    if (navRef.current) {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    if (menuVisible) {
      navRef.current.style.backgroundColor = "#141414";
    } else {
      navRef.current.style.backgroundColor = "";
    }
  }, [menuVisible])

  return (
    <>
      <div ref={navRef} className='navbar'>
        <div className="navbar-left">
          <img src={hamburger} alt="" className='icons hamburger-icon' onClick={() => setMenuVisible(!menuVisible)} />
          <Link to={"/"} onClick={() => setQuery("")}><img src={logo} alt="logo" className='netflix-logo' /></Link>
          <ul className="navbar-links">
            <Link to={"/"} onClick={() => setQuery("")} className='navbar-link'>Home</Link>
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
              <input type="text" placeholder='Title of Movie' onChange={(e) => { setQuery(e.target.value) }} />
              <a className='close-input' onClick={() => { SetIsVisible(false); setQuery("") }}>X</a>
            </div>
            :
            <>
              <img src={search_icon} alt="" className='icons search-icon' onClick={() => { SetIsVisible(true); navigate("/") }} />
            </>
          }
          <p className='children-icon'>Children</p>
          <img src={bell_icon} alt="" className='icons bell_icon' />
          <div className="navbar-profile">
            <img src={profile_img} alt="" className='profile' />
            <img src={caret_icon} alt="" />
            <div className="dropdown">
              <p onClick={() => { signOut; navigate("/login") }}>Sign Out of Netflix</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`side-menu ${menuVisible ? 'visible' : ''}`}>
        <div className="side-menu-profile">
          <img src={profile_img} alt="profile" className='profile' />
          <div>
            <p className="profile-name">Nickname</p>
            <p className="profile-switch">Change profile</p>
          </div>
        </div>
        <div className="side-menu-options">
          <p className="side-menu-link">Konto</p>
          <p className="side-menu-link">Centrum pomocy</p>
          <p className="side-menu-link" onClick={() => { signOut(); navigate("/login") }}>Wyloguj się</p>
        </div>
        <ul>
          <Link to={"/"} onClick={() => setQuery("")} className='side-menu-link'>Strona główna</Link>
          <Link to={"/mylist"} className='side-menu-link'>Moja lista</Link>
          <Link className='side-menu-link'>TV Shows</Link>
          <Link className='side-menu-link'>Movies</Link>
          <Link className='side-menu-link'>New & Popular</Link>
          <Link className='side-menu-link'>Browse by Languages</Link>
        </ul>
      </div>
    </>
  );
}

export default Navbar
