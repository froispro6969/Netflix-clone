import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import image_not_found from '../../assets/image-not-found.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import { SearchContext } from '../../context/SearchContext';
import { Link } from 'react-router-dom';


const Home = () => {
  const { query } = useContext(SearchContext);
  const [apiData, setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzRjOTVjMjg3YmNkYzcwYTVhYzdiYjM2YWU3ODgwMCIsInN1YiI6IjY2NGI2NGI2ZjMzMWFhZDhhZThmYWE3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GP8YfyEUhCoRqyKzhbeDzW7eowauKLoz8tJntqmZXLY'
    }
  };


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, options)
      .then(response => response.json())
      .then(response => {
        const filteredData = response.results.filter(movie => movie.backdrop_path && movie.id);
        setApiData(filteredData);
      })
      .catch(err => console.error(err));
  }, [query])


  return (
    <div className='home'>
      <Navbar />
      {query == "" ?
        <div>
          <div className="hero">
            <img src={hero_banner} alt="" className='banner-img' />
            <div className="hero-caption">
              <img src={hero_title} alt="" className='caption-img' />
              <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
              <div className="hero-btns">
                <button className='btn'><img src={play_icon} alt="" />Play</button>
                <button className='btn dark-btn'><img src={info_icon} alt="" />More info</button>
              </div>
            </div>
          </div>
          <div className="more-cards">
            <TitleCards />
            <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
            <TitleCards title={"Only on Netflix"} category={"popular"} />
            <TitleCards title={"Upcoming"} category={"upcoming"} />
            <TitleCards title={"Top Pics for You"} category={"now_playing"} />
          </div></div>
        :
        <div className="searched-movies">
          <div className='searched-movie-list'>
            {apiData.map((card, index) => (
              <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={card.backdrop_path ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}` : image_not_found} alt={card.original_title} />
                <div className="card-overlay">
                  <h3>{card.original_title}</h3>
                  <p>Rating: {card.vote_average}</p>
                  <p>Release Date: {card.release_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      }


      <Footer />
    </div>
  )
}

export default Home
