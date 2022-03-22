import * as React from 'react';
import styled from 'styled-components/native';
import {theme} from '../../theme/theme';
import {Paragraph, SmallCaps, Title} from './FontVariants';

interface Props {
  children: React.ReactNode;
  color?: FontColorVariants;
  variant?: FontSizeVariants;
  width?: string;
}

type FontSizeVariants = 'title' | 'small-caps' | 'paragraph';

type FontColorVariants =
  | 'primary'
  | 'secondary'
  | 'highlight'
  | 'error'
  | 'dead'
  | 'warning';

export const BaseFont: React.FC<Props> = ({
  children,
  color = theme.COLORS.white,
  variant,
}) => {
  if (variant === 'title') return <Title color={color}>{children}</Title>;
  if (variant === 'small-caps')
    return <SmallCaps color={color}>{children}</SmallCaps>;

  return <Paragraph color={color}>{children}</Paragraph>;
};
