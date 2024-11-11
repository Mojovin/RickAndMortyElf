import { useEffect } from 'react';
import styled from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  function togglePopup(e) {
    if (e.currentTarget !== e.target) return;

    setSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSettings((prevState) => ({
          ...prevState,
          visible: false
        }));
      }
    }

    if (visible) {
      document.body.classList.add('no-scroll');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, setSettings]);

  return (
    <PopupContainer visible={visible} onClick={togglePopup}>
      <StyledPopup>
        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />

        <PopupInfo origin={origin} location={location} />

        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;

  ${({ visible }) =>
    visible &&
    `
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 95%;
  }
`;

document.head.insertAdjacentHTML(
  'beforeend',
  '<style> .no-scroll { overflow: hidden; } </style>'
);
