import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [doi, setDoi] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const url = "https://api.crossref.org/works/$" + doi;
      const response = await fetch(url);
      const json = await response.json();
      const abstract = json.message.abstract;

      const backendUrl = `http://127.0.0.1:5000/knn?query=${encodeURIComponent(
        abstract
      )}&k=16`;
      const backendResponse = await fetch(backendUrl);
      const responseJSON = await backendResponse.json();

      // Handle the response from the backend
      const recommendedResults = responseJSON.result;

      // Navigate to the "/recommended" route with the data
      navigate("/recommended", { state: { recommendedResults } });
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  return (
    <>
      <input
        className="searchBar"
        placeholder="DOI"
        value={doi}
        onChange={(e) => setDoi(e.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            handleSearch();
          }
        }}
      />
    </>
  );
};

export default SearchBar;
