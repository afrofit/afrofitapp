import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BaseButton} from '../../components/Buttons/BaseButton';
import {BaseFont} from '../../components/Font/BaseFont';
import PageHeaderGeneral from '../../components/Headers/PageHeaderGeneral/PageHeaderGeneral';
import {StoryScreenHeader} from '../../components/Headers/StoryScreenHeader/StoryScreenHeader';
import {Page} from '../../components/Page/Page';
import {PageImaged} from '../../components/Page/PageImaged';
import {ChapterCard} from '../../features/game/components/ChapterCard/ChapterCard';
import ChapterListSection from '../../features/game/components/ChapterList/ChapterList';
import {
  getCurrentStory,
  getCurrentStoryChapters,
} from '../../features/game/slices/content.slice';
import {fetchAllStories} from '../../features/game/thunks/fetch-all-stories-thunk';
import {fetchStoryDetails} from '../../features/game/thunks/fetch-story-details-thunk';
import {ChapterType} from '../../models/Chapter';
import {GameNavigationType} from '../../types/navigation-types';

interface Props {}

type ParamsType = {
  params: {contentStoryId: string};
};

interface Props {
  route: ParamsType;
}

export const StoryScreen: React.FC<Props> = ({route}) => {
  console.log('Route Params', route.params);
  const {contentStoryId} = route.params;
  const navigation = useNavigation<GameNavigationType>();
  const dispatch = useDispatch();

  const currentStory = useSelector(getCurrentStory);
  const chapters = useSelector(getCurrentStoryChapters);

  React.useEffect(() => {
    dispatch(fetchStoryDetails(contentStoryId));
  }, []);

  React.useEffect(() => {
    console.log('chapters', chapters);
  }, [chapters]);

  const goToChapter = async (chapter: ChapterType) => {
    return navigation.navigate('ChapterScreen', {...chapter});
  };

  const handleQuitStory = async () => {
    navigation.goBack();
  };

  return (
    <PageImaged>
      <StoryScreenHeader currentStory={currentStory} />
      <ChapterListSection chapters={chapters} triggerNavigate={goToChapter} />
      <BaseButton variant="red" text="Quit Story" onPress={handleQuitStory} />
    </PageImaged>
  );
};
