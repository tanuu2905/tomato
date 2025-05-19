import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./SearchBar.css";
import { StoreContext } from '../../context/StoreContext';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  const { food_list } = useContext(StoreContext);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems([]);
      onSearch([]); // Clear search results in parent
      return;
    }

    const filtered = food_list.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredItems(filtered);
    onSearch(filtered); // Send filtered items up to parent
  }, [searchTerm, food_list]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (itemId) => {
    navigate(`/product/${itemId}`);
    setSearchTerm("");
    setFilteredItems([]);
    onSearch([]); // Clear search results after selection
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search food items..."
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off"
      />
      {filteredItems.length > 0 && (
        <ul className="search-results">
          {filteredItems.map(item => (
            <li
              key={item._id}
              onClick={() => handleSelect(item._id)}
              style={{ cursor: 'pointer' }}
            >
              {item.name} ({item.category})
            </li>
          ))}
        </ul>
      )}
      {searchTerm && filteredItems.length === 0 && <div>No results found</div>}
    </div>
  );
};

export default SearchBar;
