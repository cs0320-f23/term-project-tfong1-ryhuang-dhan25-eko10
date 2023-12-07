import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [doi, setDoi] = useState("");
    
    
    return (
        <>
        <input 
            placeholder="DOI"
            value = {doi}
            onChange={(e) => {setDoi(e.target.value)}}
            onKeyDown={(ev) => {
                if (ev.key == "Enter") {
                    console.log(doi);
                    setDoi("");
                }
            }}
        ></input>
        <button className="bg-black"><Link to = "/recommended" >Find Papers!</Link></button>
        </>
    );
}

export default SearchBar;
 