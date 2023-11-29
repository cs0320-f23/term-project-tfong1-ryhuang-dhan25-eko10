import { useState } from "react";

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
        <button>Go</button>
        </>
    );
}

export default SearchBar;
 