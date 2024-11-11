import styled from 'styled-components';
import { useState } from 'react';
import { Pagination, ItemsGrid, useData, Header, AppState } from './components';

export function App() {
  const { isFetching, isError } = useData();
  const [appliedFilters, setAppliedFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });

  return (
    <Main>
      <Header
        onFilterChange={setAppliedFilters}
        appliedFilters={appliedFilters}
      />

      <AppState />

      {!isFetching && !isError && (
        <>
          <ItemsGrid appliedFilters={appliedFilters} />
        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  ${window.screen.width < 1200 && 'max-width: 95%'};
  ${window.screen.width < 930 && 'max-width: 85%'};
  ${window.screen.width < 600 && 'max-width: 90%'};
`;
