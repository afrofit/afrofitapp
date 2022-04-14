import * as React from 'react';
import {BaseFont} from '../../components/Font/BaseFont';

interface Props {
  mode: 'fail' | 'pass';
}
export const DanceResultsScreen: React.FC<Props> = ({mode}) => {
  return <BaseFont>Dance Results Screen</BaseFont>;
};
