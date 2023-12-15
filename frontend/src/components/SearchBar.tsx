import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [doi, setDoi] = useState("");
  const navigate = useNavigate();
  

  async function getPaper(query: Promise<string>): Promise<string | string[][]> {
    try {
      const response = await fetch("http://127.0.0.1:5000/knn?query="+query+"&k=20");
      const json = await response.json();
      if(json.message) {
        const type = json.type;
          if(type == "success") {
              const result: string[][] = json.result;
              return result;
          }
          else {
              console.log(json.type);
              return("Backend fetch failed");
          }
      }
      else {
        throw new Error("No message found");
      }
    } catch(e) {
      return("Error: Couldn't retrieve backend server");
    }
  }


  async function get_works(doi: string): Promise<string> {
    let url = "https://api.crossref.org/works/" + doi;
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json.message) {
        console.log(json.message.abstract);
        console.log(json.message.title);
        return json.message.title;
      } else {
        throw new Error("No message found");
      }
    } catch (e) {
      return("Error: Couldn't fetch crossref backend");
    }
  }

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
            console.log(doi);
            const title = get_works(doi);
            const paper_details = getPaper(title);
            // let url = "https://api.crossref.org/works/$" + doi;
            // fetch(url).then(response => response.json()).then(json => {
            //     console.log(json.message.abstract);
            //     console.log(json.message.title);
            //     const title: string = json.message.title;
            //     const results: string[] = getPaper(title)!;
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
