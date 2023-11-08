import React, { useState, useEffect } from "react";
import axios from "axios";
import GridCreation from "./Components/GridCreation";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [images, setImages] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  
  useEffect(() => {
    fetchData("recent");
  }, []);

  const fetchData = async (searchText) => {
    let url;
    if (searchText === "recent") {
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=94fdd14a300113aff95a76b9c8996483&format=json&nojsoncallback=1`;
    } else {
      url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=94fdd14a300113aff95a76b9c8996483&text=${searchText}&safe_search=2`;
    }

    try {
      const { data } = await axios.get(url);
      setImages(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      fetchData("recent");
    } else {
      fetchData(value);
      
      // Update the search history
      setSearchHistory((prevHistory) => {
        if (!prevHistory.includes(value)) {
          return [...prevHistory, value];
        }
        return prevHistory;
      });
    }
  }

  const clearHistory = () => {
    setSearchHistory([]);
  }

  return (
    <div className="relative">
      <input
        type="text"
        name="form"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Example: Bing"
        className="p-3 text-xl z-10 rounded-lg fixed top-2 left-0 w-full bg-gray-100 shadow-md"
      />
      {images && <GridCreation imagesData={images} />}
      <div className="search-history z-10 p-10 bg-gray-200 text-gray-700 text-xl">
        <button onClick={clearHistory} className="bg-red-500 text-xs text-black p-2 mt-12 rounded-lg">
          Clear History
        </button>
        <ul>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
