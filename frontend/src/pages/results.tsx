import React from 'react'
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"

function Results() {
  return (
    <>
        <SearchBar />
    <button className = "duration-300 bg-white text-purple-500 to-pink-500 px-6 py-3 font-bold rounded-md hover:scale-110 transition ease-in-out text-3xl">
                <Link to = "/" >go back lol</Link>
            </button>
            </>
    
  )
}

export default Results