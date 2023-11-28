import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <div className = "min-h-screen flex flex-col p-5 justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white ">
          <div className="flex-grow">
            <Outlet/>
          </div>
        <footer className = "p-2">
            <div className = "flex">
              <p className = "m">Made by Ryan, Tim, Eric, David</p> 
            </div>
        </footer>      
      </div>
    )
  }