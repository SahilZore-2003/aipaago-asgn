import React from 'react'
import "./HomeLoader.scss"

const HomeLoader = () => {
  return (
    <div className='home-loader'>
        <div className="searchbox"> </div>
        <span className="icon"></span>
        <span className="searchbox"></span>
        <span className="searchbox"></span>
        <div className="flex">
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default HomeLoader
