import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './card';
import { Pagination } from './Pagination';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid({ appliedFilters }) {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    let filteredList = [...characters];

    if (appliedFilters.name) {
      filteredList = filteredList.filter((character) =>
        character.name.toLowerCase().includes(appliedFilters.name.toLowerCase())
      );
    }

    if (appliedFilters.status) {
      filteredList = filteredList.filter(
        (character) => character.status === appliedFilters.status
      );
    }

    if (appliedFilters.species) {
      filteredList = filteredList.filter(
        (character) => character.species === appliedFilters.species
      );
    }

    if (appliedFilters.type) {
      filteredList = filteredList.filter(
        (character) => character.type === appliedFilters.type
      );
    }

    if (appliedFilters.gender) {
      filteredList = filteredList.filter(
        (character) => character.gender === appliedFilters.gender
      );
    }

    setFilteredCharacters(filteredList);
  }, [appliedFilters, characters]);

  function cardOnClickHandler(props) {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }

  if (!characters.length) {
    return null;
  }

  return (
    <>
      <Container>
        {filteredCharacters.map((props) => (
          <Card
            key={props.id}
            onClickHandler={() => cardOnClickHandler(props)}
            {...props}
          />
        ))}

        <Popup settings={popupSettings} setSettings={setPopupSettings} />
      </Container>
      <Pagination filters={appliedFilters} />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
