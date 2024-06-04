import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./MyList.css"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { UserContext } from '../../context/UserContext'
import Card from '../../components/TitleCards/Card'

const MyList = () => {

  const { userID } = useContext(UserContext);
  const [list, setList] = useState([]);
  const movieDoc = query(collection(db, "mylist"), where("userID", "==", userID));


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzRjOTVjMjg3YmNkYzcwYTVhYzdiYjM2YWU3ODgwMCIsInN1YiI6IjY2NGI2NGI2ZjMzMWFhZDhhZThmYWE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GP8YfyEUhCoRqyKzhbeDzW7eowauKLoz8tJntqmZXLY'
    }
  };


  const getList = async () => {
    const data = await getDocs(movieDoc);
    const movieList = [];

    for (const doc of data.docs) {
      const movieID = doc.data().movieID;
      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options);
      const movieData = await movieResponse.json();
      movieList.push({...movieData});
    }
    setList(movieList);
  }

  useEffect(() => {
    getList();
  }, [list]);


  return (
    <div className='mylist'>
      <Navbar />
      <div className="mylist-list">
        {list.map((movie, index) => (
          <div key={index}>
              <Card card={movie} key={index}/>
          </div>
        ))}

      </div>
    </div>
  )
}

export default MyList
