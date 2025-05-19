import React, { useContext, useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/Exploremenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import SearchBar from '../../components/SearchBar/SearchBar';

import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const { food_list } = useContext(StoreContext);

  const [category, setCategory] = useState('All');
  const [searchResults, setSearchResults] = useState([]);

  // Callback to get filtered items from SearchBar
  const handleSearchResults = (filteredItems) => {
    setSearchResults(filteredItems);
  };

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />

      {/* Pass callback to SearchBar */}
      <SearchBar onSearch={handleSearchResults} />

      {/* Pass either search results or full list */}
      <FoodDisplay
        category={category}
        foodList={searchResults.length > 0 ? searchResults : food_list}
      />

      <AppDownload />
    </div>
  );
};

export default Home;
