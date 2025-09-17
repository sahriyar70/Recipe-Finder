import React, { useState } from 'react';

const Minepage = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <div className="container">  
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="enter recipe name"
          value={searchText}
          onChange={handleInputChange}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Minepage;