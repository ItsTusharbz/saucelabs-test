import { createContext, useEffect, useState } from "react";
import "./App.css";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";
import { gameContextType, questionSetType, questionType } from "./util/Types";
import "bootstrap/dist/css/bootstrap.min.css";

export const GameContext = createContext<gameContextType>({
  wrongAnswerCount: 0,
  setWrongAnswersCount: () => {},
  streak: 0,
  setStreak: () => {},
  restartGame: () => {},
});

function App() {
  const [questionSet, setQuestionSet] = useState<questionSetType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongAnswerCount, setWrongAnswersCount] = useState(0);
  const [streak, setStreak] = useState(0);

  const totalAttemp = 3;
  const fetchQuestions = async (): Promise<void> => {
    setIsLoading(true);
    const resp = await fetch("https://eok9ha49itquif.m.pipedream.net");
    const { questions } = await resp.json();
    const UniqueQuestions = filterQuestions(questions);
    setQuestionSet(UniqueQuestions);
    setIsLoading(false);
  };

  const filterQuestions = (questions: questionSetType): questionSetType => {
    let getUniqueQuestions = {};
    questions?.forEach((i: questionType) =>
      Object.assign(getUniqueQuestions, { [i.question]: i.answerSha1 })
    );
    const UniqueQuestions = Object.entries(getUniqueQuestions).map(
      ([key, value]) => ({ question: `${key}`, answerSha1: `${value}` })
    );
    return UniqueQuestions;
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const restartGame = () => {
    setQuestionSet(null);
    setWrongAnswersCount(0);
    setStreak(0);
    fetchQuestions();
  };

  return (
    <GameContext.Provider
      value={{
        wrongAnswerCount,
        setWrongAnswersCount,
        streak,
        setStreak,
        restartGame: restartGame,
      }}
    >
      <div className="App">
        <div className="heading">
          <h1>Welcome to GK game</h1>
          <div>
            <h2 className={`${wrongAnswerCount === 2 ? "danger" : ""}`}>
              Chances left :
              <span data-testid="counter">
                {totalAttemp - wrongAnswerCount}
              </span>
            </h2>
            <h5>Streak :{streak}</h5>
          </div>
        </div>
        {!isLoading ? (
          <QuestionContainer questionSet={questionSet} />
        ) : (
          <i>Loading...</i>
        )}
      </div>
    </GameContext.Provider>
  );
}

export default App;
