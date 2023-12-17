import SearchBar from "../components/SearchBar";
import BookmarkButton from "../components/BookmarkButton";
import { useState } from "react";

export default function Start() {
  const [message, setMessage] = useState("Enter a DOI to find paper recommendations!")

  return (
    <div className="flex-col flex justify-between items-center mt-52 h-screen">
      <div>
        <h1 className="text-8xl font-bold mb-5">Paper Pilot</h1>
        <div>
          <p>{message}</p>
          <SearchBar message={message} setMessage={setMessage}/>
        </div>
        <div style={{ marginBottom: "20px" }}></div>
        <div>
          <BookmarkButton />
        </div>
      </div>
      <div>
        <h4>Made by Eric, David, Ryan, and Tim</h4>
      </div>
    </div>
  );
}
