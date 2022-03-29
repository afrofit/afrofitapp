import * as React from 'react';
import styled from 'styled-components/native';

interface ISquiglyElement {
  marginV?: string;
  deg?: number;
  width?: any;
  top?: any;
}

const SquiglyElement = styled.Image<ISquiglyElement>`
  width: ${props => (props.width ? `${props.width}px` : `100px`)};
  height: 100px;
  resize-mode: contain;
  margin-top: ${props => (props.marginV ? `${props.marginV}px` : `-15px`)};
  margin-bottom: ${props => (props.marginV ? `${props.marginV}px` : `-15px`)};
  transform: ${props => (props.deg ? `rotate(${props.deg}deg)` : '')};
`;

const PlaceSquiqly = styled.View<ISquiglyElement>`
  position: absolute;
  top: ${props => (props.top ? `${props.top}px` : '20%')};
`;

interface Props {
  width?: string;
  marginV?: string;
  deg?: number;
  float?: boolean;
  top?: any;
}

export const Squigly: React.FC<Props> = ({
  width = '100',
  marginV = '-15',
  deg = 0,
  float = false,
  top,
}) => {
  const imageSrc = require('../../assets/images/elements/squigly_yellow.png');

  const element = (
    <SquiglyElement
      width={width}
      deg={deg}
      source={imageSrc}
      marginV={marginV}
    />
  );
  if (!float) return element;
  return <PlaceSquiqly top={top}>{element}</PlaceSquiqly>;
};
