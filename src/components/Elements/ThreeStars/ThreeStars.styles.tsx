import styled from 'styled-components/native';

interface ElementProps {
  deg?: number;
  height?: number;
}

export const AssetElement = styled.Image<ElementProps>`
  height: ${props => (props.height ? `${props.height}px` : `20px`)};
  width: 300px;
  resize-mode: contain;
  transform: ${props => (props.deg ? `rotate(${props.deg}deg)` : '')};
`;

export const ElementContainer = styled.View<ElementProps>`
  /* background-color: red; */
  justify-content: center;
`;
