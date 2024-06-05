import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./MyList.css";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import Card from '../../components/TitleCards/Card';

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
    try {
      const data = await getDocs(movieDoc);

      const moviePromises = data.docs.map(async (doc) => {
        const movieID = doc.data().movieID;
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options);
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie data');
        }
        return movieResponse.json();
      });

      const movies = await Promise.all(moviePromises);
      setList(movies);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      getList();
    }
  }, [userID]);

  return (
    <div className='mylist'>
      <Navbar />
      <div className="mylist-list">
        {list.map((movie, index) => (
          <div key={index}>
            <Card card={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyList;
