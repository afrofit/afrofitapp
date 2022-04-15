import styled from 'styled-components/native';

interface ElementProps {
  deg?: number;
  height?: number;
}

export const OneStarAssetElement = styled.Image<ElementProps>`
  height: ${props => (props.height ? `${props.height}px` : `20px`)};
  width: 60px;
  resize-mode: contain;
  transform: ${props => (props.deg ? `rotate(${props.deg}deg)` : '')};
`;

export const OneStarElementContainer = styled.View<ElementProps>`
  /* background-color: red; */
  /* justify-content: center; */
`;
