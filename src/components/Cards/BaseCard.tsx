import * as React from 'react';
import {theme} from '../../theme/theme';
import {CardBackground, CardBackgroundOutline} from './BaseCard.styles';

interface Props {
  color?: string;
  outline?: boolean;
}

export const BaseCard: React.FC<Props> = ({
  color = theme.COLORS.darker,
  outline = false,
  children,
}) => {
  if (outline) {
    return (
      <CardBackgroundOutline color={color}>{children}</CardBackgroundOutline>
    );
  } else return <CardBackground color={color}>{children}</CardBackground>;
};
