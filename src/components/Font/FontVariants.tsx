import styled from 'styled-components/native';
import {theme} from '../../theme/theme';

interface Props {
  color: string;
  bold?: boolean;
  active?: boolean;
}

export const SmallCaps = styled.Text<Props>`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-align: center;
  color: ${props => (props.color ? props.color : 'white')};
`;

export const NumberLarge = styled.Text<Props>`
  font-size: 45px;
  font-weight: 200;
  text-transform: lowercase;
  letter-spacing: 1px;
  text-align: center;
  margin-right: 5px;
  color: ${props => (props.color ? props.color : theme.COLORS.white)};
`;

export const NumberBigBold = styled.Text<Props>`
  font-size: 55px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  margin-right: 5px;
  color: ${props => (props.color ? props.color : theme.COLORS.white)};
`;

export const NumberSmall = styled.Text<Props>`
  font-size: 30px;
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: 1px;
  text-align: center;
  width: 40%;
  color: ${props => (props.color ? props.color : theme.COLORS.gray_400)};
`;

export const LabelText = styled.Text<Props>`
  font-size: 12px;
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: 1px;
  text-align: center;
  /* width: 40%; */
  color: ${props => (props.color ? props.color : theme.COLORS.gray_400)};
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

export const TagTiny = styled.Text<Props>`
  color: ${props => (props.color ? props.color : 'white')};
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
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
