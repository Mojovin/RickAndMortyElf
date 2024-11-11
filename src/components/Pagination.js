import styled from 'styled-components';
import { useData } from './providers';

export function Pagination({ filters }) {
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const pageClickHandler = (newPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(newPage);

    const URLWithPage = new URL(apiURL);
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        URLWithPage.searchParams.set(key, filters[key]);
      }
    });
    URLWithPage.searchParams.set('page', newPage + 1);
    setApiURL(URLWithPage.toString());
  };

  if (info.pages <= 1) return null;

  return (
    <StyledPagination>
      <PageButton
        disabled={activePage === 0}
        onClick={() => pageClickHandler(activePage - 1)}
      >
        Previous
      </PageButton>
      <PageNumber>
        Page {activePage + 1} of {info.pages}
      </PageNumber>
      <PageButton
        disabled={activePage === info.pages - 1}
        onClick={() => pageClickHandler(activePage + 1)}
      >
        Next
      </PageButton>
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-block: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;

const PageNumber = styled.span`
  font-size: 16px;
  color: #fff;
`;
