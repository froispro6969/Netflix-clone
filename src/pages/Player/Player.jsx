import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });
  const [countdown, setCountdown] = useState(3);


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzRjOTVjMjg3YmNkYzcwYTVhYzdiYjM2YWU3ODgwMCIsInN1YiI6IjY2NGI2NGI2ZjMzMWFhZDhhZThmYWE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GP8YfyEUhCoRqyKzhbeDzW7eowauKLoz8tJntqmZXLY'
    }
  };


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0])
        }
        else {
          setError("No video data available")
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError("Failed to fetch video data");
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            navigate('/');
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [error]);


  if (loading) {
    return <div className="player-spinner">
      <img src={netflix_spinner} alt="" />
    </div>;
  }

  if (error) {
    return <div className="error-page">
      {error}
      <div>Redirecting to home page in {countdown} seconds.</div>
    </div>
  }

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => navigate("/")} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
