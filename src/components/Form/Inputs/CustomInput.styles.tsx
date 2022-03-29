import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';

interface Props {
  error?: boolean;
}

export const Field = styled.View<Props>`
  height: 60px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-width: 2px;
  margin-bottom: 15px;
  border-color: ${props =>
    props.error ? theme.COLORS.red : theme.COLORS.dark};
  border-radius: ${theme.BORDER_RADIUS.md};
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Input = styled.TextInput`
  flex: 1;
  color: ${theme.COLORS.white};
  font-weight: 400;
  font-size: 15px;
  height: 100%;
  padding-left: 90px;
  align-self: flex-end;
  letter-spacing: 0.2px;
  /* background-color: red; */
`;

export const LabelText = styled.Text<Props>`
  font-size: 11px;
  color: ${props => (props.error ? theme.COLORS.red : theme.COLORS.yellow)};
  font-weight: 500;
  margin-left: 15px;
  position: absolute;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  top: 40%;
  left: -10px;
  z-index: 100;
  padding-left: 10px;
  padding-right: 10px;
`;
