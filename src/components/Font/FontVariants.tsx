import styled from 'styled-components/native';

interface Props {
  color: string;
}

export const SmallCaps = styled.Text<Props>`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const Title = styled.Text<Props>`
  font-size: 30px;
  font-weight: bold;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const Paragraph = styled.Text<Props>`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: ${props => (props.color ? props.color : 'white')};
`;
