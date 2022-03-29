import * as React from 'react';
import styled from 'styled-components/native';

interface Props {
  h: number;
}
const SpacerComponent = styled.View<Props>`
  min-height: ${props => `${props.h}px`};
`;

const Spacer = ({h = 20}) => {
  return <SpacerComponent h={h} />;
};

export default Spacer;
