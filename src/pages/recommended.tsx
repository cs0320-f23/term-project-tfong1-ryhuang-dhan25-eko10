import React from 'react'
import { Link } from "react-router-dom";

function Recommended() {
  const divs = [];

  for (let i = 0; i < 15; i++) {
    divs.push(
      <div key={i} style={{border: '1px solid black', padding: '10px'}}>
        Author: {i + 1}
        <button id="title"><Link to = "/research_display">Title!</Link></button>
        <button id="bookmark">Bookmark!</button>
      </div>
    );
  }

  return (
    <div id="mainContent" className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(200px, auto)'}}>
      {divs}

    </div>
  );
}

export default Recommended