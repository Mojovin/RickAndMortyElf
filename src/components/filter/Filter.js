import styled from 'styled-components';
import { useState, useEffect } from 'react';

export function Filter({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filtersFromUrl = {
      name: urlParams.get('name'),
      status: urlParams.get('status'),
      species: urlParams.get('species'),
      type: urlParams.get('type'),
      gender: urlParams.get('gender')
    };
    setLocalFilters(filtersFromUrl);
    onFilterChange(filtersFromUrl);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(localFilters);
    window.history.replaceState(null, '', `?${urlParams.toString()}`);
    onFilterChange(localFilters);
  }, [localFilters]);

  const handleInputChange = (field) => (e) => {
    setLocalFilters({ ...localFilters, [field]: e.target.value });
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>Name:</FilterLabel>
        <FilterInput
          type="text"
          name="name"
          value={localFilters.name}
          onChange={handleInputChange('name')}
          placeholder="Write name"
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Status:</FilterLabel>
        <FilterSelect
          name="status"
          value={localFilters.status}
          onChange={handleInputChange('status')}
        >
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Species:</FilterLabel>
        <FilterSelect
          name="species"
          value={localFilters.species}
          onChange={handleInputChange('species')}
        >
          <option value="">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Mythological Creature">Mythological Creature</option>
          <option value="Animal">Animal</option>
          <option value="Robot">Robot</option>
          <option value="Cronenberg">Cronenberg</option>
          <option value="Disease">Disease</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Type:</FilterLabel>
        <FilterInput
          type="text"
          name="type"
          value={localFilters.type}
          onChange={handleInputChange('type')}
          placeholder="Write type"
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Gender:</FilterLabel>
        <FilterSelect
          name="gender"
          value={localFilters.gender}
          onChange={handleInputChange('gender')}
        >
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unknown">Genderless</option>
        </FilterSelect>
      </FilterGroup>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 10px;
  color: #fff;
  border-radius: 8px;

  @media (max-width: 890px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 470px) {
    display: flex;
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const FilterInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #fff;
  color: #333;
`;

const ApplyButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
