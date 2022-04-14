import styled from 'styled-components/native';

const PADDING = '20px';

interface Props {
  alignment?: 'space-between' | 'space-around' | 'flex-end' | 'flex-start';
}

export const OverVideoContainer = styled.View<Props>`
  padding-bottom: ${PADDING};
  padding-left: ${PADDING};
  padding-right: ${PADDING};
  background-color: none;
  justify-content: ${props =>
    props.alignment ? props.alignment : 'flex-start'};
  height: 100%;
  width: 100%;
`;

export const ButtonsContainer = styled.View<Props>`
  /* justify-self: flex-end; */
  margin-top: 20px;
`;

export const VideoContentsContainer = styled.View<Props>`
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const ScreenMidContainer = styled.View<Props>`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;
