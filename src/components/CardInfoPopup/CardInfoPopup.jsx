import React, { useContext, useEffect, useState } from 'react';
import './CardInfoPopup.css';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../context/UserContext';

const CardInfoPopup = ({ movieID, title, rating, release, handleClose, img, description }) => {

  const { userID } = useContext(UserContext)
 
  const addToList = async (id) => {
    try {
      if (!inList) {
        await addDoc(collection(db, "mylist"), {
          userID: userID,
          movieID: movieID
        })
        console.log("Movie added to list successfully!");
        setInList(true);
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  const navigate = useNavigate();
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="popupBtn" onClick={handleClose}>Close</button>
        <div className='card-info-popup-image'>
          <img src={`https://image.tmdb.org/t/p/w500${img}`}></img>
          <button onClick={() => { navigate(`/player/${movieID}`) }}>PLAY</button>
          {inList ? 
          <button onClick={() => {removeFromList(movieID) }}>Remove</button> 
          : 
          <button onClick={() => {addToList(movieID) }}>Add to list</button>
          }
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
