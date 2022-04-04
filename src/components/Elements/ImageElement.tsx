import styled from 'styled-components/native';

interface Props {
  size: number;
}

export const ImageElement = styled.Image<Props>`
  width: ${props => (props.size ? `${props.size}px` : `60px`)};
  height: ${props => (props.size ? `${props.size}px` : `60px`)};
  resize-mode: contain;
  margin-bottom: 20px;
`;
