import * as React from 'react';
import {theme} from '../../theme/theme';
import {CardBackground, CardBackgroundOutline} from './BaseCard.styles';

interface Props {
  color?: string;
  outline?: boolean;
  mb?: number;
}

export const BaseCard: React.FC<Props> = ({
  color = theme.COLORS.darker,
  outline = false,
  children,
  mb,
}) => {
  if (outline) {
    return (
      <CardBackgroundOutline mb={mb} color={color}>
        {children}
      </CardBackgroundOutline>
    );
  } else
    return (
      <CardBackground mb={mb} color={color}>
        {children}
      </CardBackground>
    );
};
