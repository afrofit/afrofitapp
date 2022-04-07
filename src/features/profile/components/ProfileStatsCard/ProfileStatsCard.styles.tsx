import * as React from 'react';
import styled from 'styled-components/native';
import {BaseCard} from '../../../../components/Cards/BaseCard';
import {BaseFont} from '../../../../components/Font/BaseFont';
import {theme} from '../../../../theme/theme';

export const StatsBox = styled.View`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StatsLine = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const StatsRectElement = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  flex-direction: row;
`;

export const StatsRectContent = styled.View`
  width: 40%;
  align-items: flex-end;
  margin-right: 20px;
`;

interface Props {
  label: string;
  value: string | number;
}

export const StatsRect: React.FC<Props> = ({label, value}) => {
  return (
    <BaseCard mb={10}>
      <StatsRectElement>
        <StatsRectContent>
          <BaseFont variant="number-large" color={theme.COLORS.yellow}>
            {value}
          </BaseFont>
        </StatsRectContent>
        <BaseFont variant="paragraph" color={theme.COLORS.gray_300}>
          {label}
        </BaseFont>
      </StatsRectElement>
    </BaseCard>
  );
};
