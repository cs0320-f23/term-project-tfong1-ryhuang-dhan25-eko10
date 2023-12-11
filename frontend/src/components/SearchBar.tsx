import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [doi, setDoi] = useState("");
  const navigate = useNavigate();
  
  return (
    <>
      <input
        className="searchBar"
        placeholder="DOI"
        value={doi}
        onChange={(e) => {
          setDoi(e.target.value);
        }}
        onKeyDown={(ev) => {
          if (ev.key == "Enter") {
            // console.log(doi);
            // let url = "https://api.crossref.org/works/$" + doi;
            // fetch(url).then(response => response.json()).then(json => {
            //     console.log(json.message.abstract);
            //     console.log(json.message.title)
            // })

            //fetch backend for results, then pass into navigate
            navigate("/recommended");
            // setDoi("");
          }
        }}
      ></input>
      {/* <button className="bg-black"><Link to = "/recommended" >Find Papers!</Link></button> */}
    </>
  );
};

export default SearchBar;
