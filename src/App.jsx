import React, { useContext, useEffect} from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Login/Register.jsx'
import MyList from './pages/MyList/MyList.jsx'
import { UserContext } from './context/UserContext.jsx'

const App = () => {

  const {userID, setUserID} = useContext(UserContext)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user)
        {
          console.log("Logged In")
          setUserID(user.uid);
        }
        else {
         console.log("Logged Out")
         setUserID(null);
        }
    })
  },[])

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/mylist' element={<MyList/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App
