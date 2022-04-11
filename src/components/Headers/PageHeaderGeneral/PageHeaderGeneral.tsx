import * as React from 'react';
import {Squigly} from '../../Elements/Squigly';
import {
  HeaderContainer,
  TitleText,
} from '../PageHeaderSmall/PageHeaderSmall.styles';

interface Props {
  title: string;
}

const PageHeaderGeneral: React.FC<Props> = ({title}) => {
  return (
    <HeaderContainer>
      <TitleText>{title}</TitleText>
      <Squigly float />
    </HeaderContainer>
  );
};

export default PageHeaderGeneral;
