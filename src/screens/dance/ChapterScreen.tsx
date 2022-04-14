import * as React from 'react';
import {millisecondsToMinutes} from 'date-fns';

import {BaseButton} from '../../components/Buttons/BaseButton';
import {BaseFont} from '../../components/Font/BaseFont';
import {NotifyScreensHeader} from '../../components/Headers/NotifyScreensHeader/NotifyScreensHeader';
import Spacer from '../../components/Library/Spacer';
import {Page} from '../../components/Page/Page';
import {ChapterType} from '../../models/Chapter';
import {theme} from '../../theme/theme';
import {ScreenMidContainer} from './StoryScreens.styles';
import {ThreeStars} from '../../components/Elements/ThreeStars/ThreeStars';

type ParamsType = {
  params: ChapterType;
};

interface Props {
  route: ParamsType;
}

export const ChapterScreen: React.FC<Props> = ({route}) => {
  console.log('Route Params', route.params);
  const {audioUrl, instruction, targetTimeInMillis, targetBodyMoves} =
    route.params;
  const handleQuitChapter = async () => {};

  return (
    <Page>
      <NotifyScreensHeader title="Ready?" />
      <Spacer />
      <ScreenMidContainer>
        <ThreeStars />
        <Spacer h={30} />
        <BaseFont>
          You've got to record at least {targetBodyMoves} body movements to get
          past this chapter and you've only got{' '}
          {millisecondsToMinutes(targetTimeInMillis)} minutes for to complete
          it! Good luck!
        </BaseFont>
        <Spacer h={30} />
        <ThreeStars />
        <Spacer />

        <Spacer />
        <BaseFont variant="small-tagline" color={theme.COLORS.yellow}>
          Need music?
        </BaseFont>
        <Spacer />
        <BaseFont variant="small-bold-paragraph">
          Optionally, minimize the app to select your preferred your music.
        </BaseFont>
      </ScreenMidContainer>
      <BaseButton variant="red" text="Quit Story" onPress={handleQuitChapter} />
    </Page>
  );
};
