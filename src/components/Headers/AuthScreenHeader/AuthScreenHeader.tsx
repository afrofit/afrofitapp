import * as React from 'react';
import styled from 'styled-components/native';
import {theme} from '../../../theme/theme';
import {Squigly} from '../../Elements/Squigly';
import {BaseFont} from '../../Font/BaseFont';
import Spacer from '../../Library/Spacer';

import {AuthHeaderContainer} from './AuthScreenHeader.styles';
// import SquiglyFloater from './SquiglyFloater';

interface Props {
  title: string;
}

export const AuthScreensHeader: React.FC<Props> = ({
  title = 'Screen Title',
}) => {
  return (
    <AuthHeaderContainer>
      <BaseFont variant="header-title">{title}</BaseFont>
      <Squigly float />
      <Spacer h={40} />
    </AuthHeaderContainer>
  );
};
