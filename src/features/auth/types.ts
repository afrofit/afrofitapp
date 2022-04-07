export type PasswordResetStages = {
  REQUEST_LINK: string;
  VERIFY: string;
  RESET: string;
};

export const passwordResetStages: PasswordResetStages = Object.freeze({
  REQUEST_LINK: 'REQUEST_LINK',
  VERIFY: 'VERIFY',
  RESET: 'RESET',
});
