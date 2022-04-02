import * as React from 'react';

import {HeaderContainer, HeaderTitleText} from './PageHeaderLarge.styles';
import {Squigly} from '../../Elements/Squigly';

interface Props {
  title: string;
}

const PageHeaderLarge: React.FC<Props> = ({title = `Page Title`}) => {
  return (
    <HeaderContainer>
      <HeaderTitleText>{title}</HeaderTitleText>
      <Squigly top={15} float />
    </HeaderContainer>
  );
};

export default PageHeaderLarge;
