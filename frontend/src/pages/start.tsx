import SearchBar from "../components/SearchBar";
import BookmarkButton from "../components/BookmarkButton";
import { useState } from "react";
import '../assets/paper.css';

export default function Start() {
  const [message, setMessage] = useState("Enter a DOI to find paper recommendations!")

  return (
    <div>
      <div className="flex-col flex justify-between items-center mt-52 h-screen main-section">
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
      <div id='info'>
        <div className='color-bar about-section'>
          <h2 className='titling'>
            How it works
          </h2>
          <div className='info-section'>
            <div>
              <div className='info-col'>Paper Pilot recommends papers to you using a natural language processing (NLP) model
               to convert the paper you input into a vector that can be used to lookup
               similar papers in our database.
              </div>              
              <img src='src/assets/vector-search-image.jpeg' className='start-image'></img>
            </div>
            <div>
              <div className='info-col'>Our database consists of papers from 2023 available on 
              PubMed, a free archive of biomedical and life science articles maintained by the 
              National Library of Medicine.
              </div>
              <img src='src/assets/pubmed-image.jpeg' className='start-image'></img>
            </div>
            
          </div>
          <div className='info-algo'>
            We utilized our own implementation of the approximate nearest neighbors (ANN) algorithm to find the 
            similarity between papers in our database and in the search query. 
          </div>

        </div>

      </div>


  </div>
  );
}
