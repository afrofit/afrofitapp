import * as React from 'react';
import {theme} from '../../theme/theme';
import {
  BoldParagraph,
  HeaderTitle,
  IdText,
  ModalTitle,
  Paragraph,
  SmallBoldParagraph,
  SmallCaps,
  SmallParagraph,
  SmallTagline,
  Tagline,
  Title,
} from './FontVariants';

interface Props {
  // children: React.ReactNode;
  color?: string;
  variant?: FontSizeVariants;
  width?: string;
  bold?: boolean;
}

type FontSizeVariants =
  | 'title'
  | 'header-title'
  | 'modal-title'
  | 'small-caps'
  | 'big-caps'
  | 'paragraph'
  | 'small-paragraph'
  | 'small-bold-paragraph'
  | 'tagline'
  | 'bold-paragraph'
  | 'small-tagline'
  | 'id-text';

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
  bold,
}) => {
  if (variant === 'title') return <Title color={color}>{children}</Title>;
  if (variant === 'modal-title')
    return <ModalTitle color={color}>{children}</ModalTitle>;
  if (variant === 'header-title')
    return <HeaderTitle color={color}>{children}</HeaderTitle>;
  if (variant === 'tagline')
    return (
      <Tagline bold={bold} color={color}>
        {children}
      </Tagline>
    );
  if (variant === 'small-tagline')
    return (
      <SmallTagline bold={bold} color={color}>
        {children}
      </SmallTagline>
    );
  if (variant === 'small-caps')
    return <SmallCaps color={color}>{children}</SmallCaps>;
  if (variant === 'id-text') return <IdText color={color}>{children}</IdText>;
  if (variant === 'big-caps')
    return <SmallCaps color={color}>{children}</SmallCaps>;
  if (variant === 'small-paragraph')
    return <SmallParagraph color={color}>{children}</SmallParagraph>;
  if (variant === 'bold-paragraph')
    return <BoldParagraph color={color}>{children}</BoldParagraph>;
  if (variant === 'small-bold-paragraph')
    return <SmallBoldParagraph color={color}>{children}</SmallBoldParagraph>;

  return <Paragraph color={color}>{children}</Paragraph>;
};
