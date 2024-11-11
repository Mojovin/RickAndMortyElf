import styled from 'styled-components';
import { Logo } from './Logo';
import { Filter } from '../filter/Filter';

export function Header({ appliedFilters, onFilterChange }) {
  return (
    <HeaderContainer>
      <Logo />
      <Filter filters={appliedFilters} onFilterChange={onFilterChange} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;
