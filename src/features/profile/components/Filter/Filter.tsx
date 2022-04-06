import * as React from 'react';
import {profilePages} from '../../data-models';
import {ProfilePagesEnum} from '../../types';
import {FilterContainer, FilterPressable} from './Filter.styles';

interface Props {
  currentPage: string;
  onSwitchPage: (page: ProfilePagesEnum) => void;
}

export const Filter: React.FC<Props> = ({currentPage, onSwitchPage}) => {
  return (
    <FilterContainer>
      {profilePages.map(page => (
        <FilterPressable
          key={page}
          onPress={() => onSwitchPage(page)}
          active={currentPage === page}
          text={page}
        />
      ))}
    </FilterContainer>
  );
};
