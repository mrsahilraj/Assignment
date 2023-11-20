import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 200px; /* Initial width */
  transition: width 0.3s ease-in-out;

  &:focus {
    width: 300px; /* Expanded width on focus */
  }
`;

const SearchButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background: none;
  border: none;
`;

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search city..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Handle search on Enter key press
      />
      <SearchButton onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;