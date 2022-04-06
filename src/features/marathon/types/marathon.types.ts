export type UserMarathonTypes = {
  id: string;
  userId: string;
  username: string;
  email: string;
  marathonId: string;
  bodyMoves: number;
  createdAt: string;
  updatedAt: string;
};

export type MarathonDataType = {
  bodyMoves: number;
  marathonId: string;
  userMarathonScoreId: string;
};
