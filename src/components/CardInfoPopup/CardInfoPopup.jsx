import React, { useContext, useEffect, useState } from 'react';
import './CardInfoPopup.css';
import close_icon from '../../assets/close_icon.png'
import play_icon from '../../assets/play_icon.png'
import list_add from '../../assets/list-add.svg'
import list_remove from '../../assets/list_remove.png'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';


const CardInfoPopup = ({ movieID, title, rating, release, handleClose, img, description }) => {

  const { userID } = useContext(UserContext)
  const [inList, setInList] = useState(false);


  const checkInList = async (id) => {
    try {
      const q = query(collection(db, "mylist"), where("movieID", "==", id));
      const snapshot = await getDocs(q);

      const alreadyAdded = snapshot.docs.length > 0;
      setInList(alreadyAdded);
    } catch (err) {
      console.error("Error checking movie in list:", err);
    }
  };


  const addToList = async (id) => {
    try {
      if (!inList) {
        await addDoc(collection(db, "mylist"), {
          userID: userID,
          movieID: movieID
        })
        setInList(true);
        toast.success("Movie added to list successfully!");
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const removeFromList = async (id) => {
    try {
      const movieToDeleteQuery = query(collection(db, "mylist"), where("movieID", "==", id));
      const movieToDeleteData = await getDocs(movieToDeleteQuery);

      const movieToDelete = doc(db, "mylist", movieToDeleteData.docs[0].id);
      await deleteDoc(movieToDelete)
      setInList(false);
      toast.error("Movie removed from the list!");
    } catch (error) {
      console.log(error)
    }
  }

  const handlePopupContentClick = (event) => {
    event.stopPropagation();
  };


  useEffect(() => {
    checkInList(movieID);
  }, [movieID]);

  const navigate = useNavigate();
  return (
    <div className="popup">
      <div className="popup-content" onClick={handlePopupContentClick}>
        <a className="popupBtn" onClick={handleClose}><img src={close_icon} className="close_icon" alt="" /></a>
        <div className='card-info-popup-image'>
          <img src={`https://image.tmdb.org/t/p/w500${img}`}></img>
          <div className="list-buttons">
            <button className='btn' onClick={() => { navigate(`/player/${movieID}`) }}><img src={play_icon} alt="" />PLAY</button>
            {inList ?
              <button className='list-btn' onClick={() => { removeFromList(movieID) }}><img src={list_remove} className='list-icons'></img></button>
              :
              <button className='list-btn' onClick={() => { addToList(movieID) }}><img src={list_add} className='list-icons'></img></button>
            }
          </div>
        </div>
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        <p style={{ color: "lightgreen" }}>Rating: {rating}</p>
        <p>Release Date: {release}</p>
        <h2 style={{ marginTop: "20px", marginLeft: "0px" }}>Description</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CardInfoPopup;
