import * as React from 'react';
import {Squigly} from '../../Elements/Squigly';
import {BaseFont} from '../../Font/BaseFont';
import Spacer from '../../Library/Spacer';
import {NotifyScreenHeaderContainer} from './NotifyScreensHeader.styles';

interface Props {
  title: string;
}

export const NotifyScreensHeader: React.FC<Props> = ({
  title = 'Screen Title',
}) => {
  return (
    <NotifyScreenHeaderContainer>
      <BaseFont variant="header-title">{title}</BaseFont>
      <Squigly float />
      <Spacer h={40} />
    </NotifyScreenHeaderContainer>
  );
};
