import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface Props {
  color: string;
  bold?: boolean;
}

export const SmallCaps = styled.Text<Props>`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const BigCaps = styled.Text<Props>`
  font-size: 17px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const Title = styled.Text<Props>`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;
export const ModalTitle = styled.Text<Props>`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const HeaderTitle = styled.Text<Props>`
  font-size: 30px;
  font-weight: 300;
  letter-spacing: 1px;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const Paragraph = styled.Text<Props>`
  font-size: 20px;
  font-weight: normal;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 26px;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const BoldParagraph = styled.Text<Props>`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  line-height: 26px;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const SmallParagraph = styled.Text<Props>`
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.2px;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const SmallBoldParagraph = styled.Text<Props>`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.2px;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const Tagline = styled.Text<Props>`
  color: ${props => (props.color ? props.color : 'white')};
  font-size: 25px;
  letter-spacing: 5px;
  text-transform: uppercase;
  text-align: center;
  font-weight: ${props => (props.bold ? 700 : 500)};
`;

export const SmallTagline = styled.Text<Props>`
  color: ${props => (props.color ? props.color : 'white')};
  font-size: 20px;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-align: center;
  font-weight: ${props => (props.bold ? 700 : 500)};
`;

export const IdText = styled.Text<Props>`
  color: ${theme.COLORS.gray_400};
  font-size: 13px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
`;
