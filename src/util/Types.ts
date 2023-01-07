export type questionType = {
  question: string;
  answerSha1: string;
};

export type questionSetType = questionType[];

export type gameContextType = {
  wrongAnswerCount: number;
  setWrongAnswersCount: Function;
  streak: number;
  setStreak: Function;
  restartGame: Function;
};
