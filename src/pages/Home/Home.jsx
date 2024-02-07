import React, { useState, useEffect } from 'react'
import "./Home.scss"
import { CiSearch } from "react-icons/ci";
import clear from "../../assets/clear.png"
import rain from "../../assets/rain.png"
import drizzle from "../../assets/drizzle.png"
import cloud from "../../assets/cloud.png"
import snow from "../../assets/snow.png"
import humidity from "../../assets/humidity.png"
import wind from "../../assets/wind.png"
import { WiDegrees } from "react-icons/wi";
import HomeLoader from '../../components/HomeLoader/HomeLoader';
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {
  const [city, setCity] = useState("mumbai")
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [icon, setIcon] = useState(clear)
  const apikey = "20815633326021ec1512903b19d2b5bc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
  const [search, setSearch] = useState(city)

  const icons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  }

  const handleSearch = () => {
    setSearch(city)
  }
  const fetchData = async () => {

    try {
      setLoading(true)
      const res = await fetch(url);
      const data = await res.json()
      setIcon(icons[data.weather[0].icon] || clear)
      setData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("city is not availabel")

    }
  }
  useEffect(() => {
    fetchData()
  }, [search])

  return (
    <header>
      <Toaster />
      {
        loading ? <HomeLoader /> : <div className="weather-container">
          <div className="user-input">
            <input onChange={(e) => {
              setCity(e.target.value);
            }}
              onKeyUp={(e) => {
                if (e.key === "Enter" && city !== "") {
                  fetchData()
                }
              }}

              type="search" placeholder='Search City' name="" id="" />
            <button onClick={handleSearch}><CiSearch /></button>
          </div>
          <div className="img-container">
            <img src={icon} alt="" />
          </div>
          <div className="temperature">
            <div>
              {Math.floor(data?.main?.temp - 273)} <WiDegrees /> c
            </div>
          </div>
          <div className="location">
            {data?.name}
          </div>
          <div className="bottom">
            <div className="left">
              <img src={humidity} alt="" />
              <div>
                <p>{data?.main?.humidity} %</p>
                <small>Humidity</small>
              </div>
            </div>
            <div className="right">
              <img src={wind} alt="" />
              <div>
                <p>{data?.wind?.speed} km/h</p>
                <small>wind speed</small>
              </div>
            </div>
          </div>
        </div>
      }

    </header>
  )
}

export default Home
