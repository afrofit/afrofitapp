import styled from 'styled-components/native';

interface IPlacerElement {
  left?: any;
  top?: any;
  bottom?: any;
  right?: any;
}

export const Placer = styled.View<IPlacerElement>`
  position: absolute;
  top: ${props => (props.top ? `${props.top}px` : '0%')};
  left: ${props => (props.left ? `${props.left}px` : '0%')};
  bottom: ${props => (props.bottom ? `${props.bottom}px` : '0%')};
  right: ${props => (props.right ? `${props.right}px` : '0%')};
`;
