import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./MyList.css";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import Card from '../../components/TitleCards/Card';
import netflix_spinner from '../../assets/netflix_spinner.gif'

const MyList = () => {
  const { userID } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzRjOTVjMjg3YmNkYzcwYTVhYzdiYjM2YWU3ODgwMCIsInN1YiI6IjY2NGI2NGI2ZjMzMWFhZDhhZThmYWE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GP8YfyEUhCoRqyKzhbeDzW7eowauKLoz8tJntqmZXLY'
    }
  };

  useEffect(() => {
    if (!userID) return;

    const movieDoc = query(collection(db, "mylist"), where("userID", "==", userID));

    const unsubscribe = onSnapshot(movieDoc, async (snapshot) => {
      setLoading(true);
      try {
        const moviePromises = snapshot.docs.map(async (doc) => {
          const movieID = doc.data().movieID;
          const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options);
          if (!movieResponse.ok) {
            throw new Error('Failed to fetch movie data');
          }
          return movieResponse.json();
        });

        const movies = await Promise.all(moviePromises);
        setList(movies);
        setError(null);
      } catch (error) {
        console.error("Error fetching movie list:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [userID]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="mylist-spinner">
          <img src={netflix_spinner} alt="" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="mylist-error_page">
          <p style={{color: "red"}}>{error}</p>
        </div>
      </>
    );
  }

  return (
    <div className='mylist'>
      <Navbar />
      <div className="mylist-list">
        {list.map((movie, index) => (
          <div key={index}>
            <Card card={movie} className={"mylist-card"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyList;
