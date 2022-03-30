import * as React from 'react';

import {theme} from '../../../theme/theme';
import {BaseFont} from '../../Font/BaseFont';
import {ErrorMessageContainer} from './AbsoluteErrorMessage.styles';

interface Props {
  error: string;
}

export const AbsoluteErrorMessage: React.FC<Props> = ({error}) => {
  return !error ? null : (
    <ErrorMessageContainer>
      <BaseFont color={theme.COLORS.white} variant="small-paragraph">
        {error}
      </BaseFont>
    </ErrorMessageContainer>
  );
};
