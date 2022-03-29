import * as React from 'react';
import styled from 'styled-components/native';

/** LOGO */
const LogoElement = styled.Image`
  width: 100px;
  height: 50px;
  resize-mode: contain;
`;
export const Logo = () => {
  return (
    <LogoElement
      source={require('../../assets/images/elements/logo_white.png')}
    />
  );
};

/** SQUIGLY */

interface ISquiglyElement {
  marginV: string;
  deg: number;
  width: any;
}
