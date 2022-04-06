import {ProfilePagesEnum} from './types';

export type ProfilePageTypes = 'you' | 'stats' | 'subscription';

export const profilePages: [
  ProfilePagesEnum,
  ProfilePagesEnum,
  ProfilePagesEnum,
] = [
  ProfilePagesEnum.you,
  ProfilePagesEnum.stats,
  ProfilePagesEnum.subscription,
];
