import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {BaseFont} from '../../components/Font/BaseFont';
import PageHeaderGeneral from '../../components/Headers/PageHeaderGeneral/PageHeaderGeneral';
import {StoryScreenHeader} from '../../components/Headers/StoryScreenHeader/StoryScreenHeader';
import {Page} from '../../components/Page/Page';
import {PageImaged} from '../../components/Page/PageImaged';
import {ChapterCard} from '../../features/game/components/ChapterCard/ChapterCard';
import {GameNavigationType} from '../../types/navigation-types';

interface Props {}

export const StoryScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation<GameNavigationType>();

  const goToChapter = () => {
    //Handle user traversal to chapter screen here
  };

  return (
    <PageImaged>
      <StoryScreenHeader />
      <ChapterCard />
      <ChapterCard />
    </PageImaged>
  );
};
