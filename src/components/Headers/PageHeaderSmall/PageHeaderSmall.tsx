import * as React from 'react';
import {User} from '../../../models/User';
import {Squigly} from '../../Elements/Squigly';

import {HeaderContainer, TitleText} from './PageHeaderSmall.styles';

interface Props {
  user: User | null;
}

const PageHeaderSmall: React.FC<Props> = ({user}) => {
  console.log(user);
  return (
    <HeaderContainer>
      <TitleText>Hello! {user?.username}</TitleText>
      <Squigly float />
    </HeaderContainer>
  );
};

export default PageHeaderSmall;
