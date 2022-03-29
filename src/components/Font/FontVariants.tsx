import styled from 'styled-components/native';

interface Props {
  color: string;
  bold?: boolean;
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
export const ModalTitle = styled.Text<Props>`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const HeaderTitle = styled.Text<Props>`
  font-size: 30px;
  font-weight: 300;
  letter-spacing: 1px;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const Paragraph = styled.Text<Props>`
  font-size: 20px;
  font-weight: normal;
  letter-spacing: 0.5px;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const Tagline = styled.Text<Props>`
  color: ${props => (props.color ? props.color : 'white')};
  font-size: 25px;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-weight: ${props => (props.bold ? 700 : 500)};
`;
