import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ChapterType} from '../../../models/Chapter';
import {StoryType} from '../../../models/Story';

import {RootState} from '../../../store/store';

export interface ContentState {
  currentStory: StoryType | null;
  currentChapter: ChapterType | null;
  currentChapters: ChapterType[] | [];
  stories: StoryType[] | [];
}

const initialState: ContentState = {
  currentStory: null,
  currentChapter: null,
  currentChapters: [],
  stories: [],
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setStories(state, action: PayloadAction<StoryType[]>) {
      state.stories = action.payload;
    },
    setCurrentStory(state, action: PayloadAction<StoryType>) {
      state.currentStory = action.payload;
    },
    setCurrentChapters(state, action: PayloadAction<ChapterType[]>) {
      state.currentChapters = action.payload;
    },
    setCurrentChapter(state, action: PayloadAction<ChapterType>) {
      state.currentChapter = action.payload;
    },

    updateCurrentStory(state, action: PayloadAction<StoryType>) {
      const {payload} = action;
      state.currentStory = {...state.currentStory, ...payload};
    },
    updateCurrentChapters(state, action: PayloadAction<ChapterType>) {
      const {payload} = action;
      if (payload) {
        const currentChapters = state.currentChapters;

        const filterQuery = payload.contentChapterId;

        const chapterToUpdate = currentChapters.find(
          chapter => chapter.contentChapterId === filterQuery,
        );

        const updatedChapter = {...chapterToUpdate, ...payload};

        const remainingChapters = state.currentChapters.filter(
          chapter => chapter.contentChapterId != filterQuery,
        );

        const newArray = [...remainingChapters, updatedChapter].sort((a, b) =>
          a.chapterOrder < b.chapterOrder
            ? -1
            : Number(a.chapterOrder > b.chapterOrder),
        );

        state.currentChapters = newArray;
      } else {
        state.currentChapters = state.currentChapters;
      }
    },
    updateCurrentChapter(state, action: PayloadAction<ChapterType>) {
      const {payload} = action;
      state.currentChapter = {...state.currentChapter, ...payload};
    },
    unsetCurrentStory(state) {
      state.currentStory = null;
    },
    unsetCurrentChapters(state) {
      state.currentChapters = [];
    },
    unsetCurrentChapter(state) {
      state.currentChapters = [];
    },
  },
});

export const {
  setStories,
  setCurrentStory,
  setCurrentChapters,
  setCurrentChapter,
  updateCurrentStory,
  updateCurrentChapters,
  updateCurrentChapter,
  unsetCurrentStory,
  unsetCurrentChapters,
  unsetCurrentChapter,
} = contentSlice.actions;

export const getCurrentUser = (state: RootState) => state.user.currentUser;

export const getAllStories = (state: RootState) => state.content.stories;
export const getCurrentStory = (state: RootState) => state.content.currentStory;
export const getCurrentStoryChapter = (state: RootState) =>
  state.content.currentChapter;
export const getCurrentStoryChapters = (state: RootState) =>
  state.content.currentChapters;

/** Reducers */

export default contentSlice.reducer;
