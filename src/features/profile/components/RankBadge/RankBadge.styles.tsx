import styled from 'styled-components/native';

interface Props {
  margin?: number;
  size?: number;
}

export const RankLogo = styled.Image<Props>`
  width: ${props => (props.size ? `${props.size}px` : `60px`)};
  height: ${props => (props.size ? `${props.size}px` : `60px`)};
  resize-mode: contain;
`;

export const RankBadgeContainer = styled.View<Props>`
  align-items: center;
  justify-content: center;
  margin: ${props => (props.margin ? `${props.margin}px` : 0)};
`;
