import { createContext, useEffect, useState } from "react";
import "./App.css";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";
import { gameContextType, questionSetType, questionType } from "./util/Types";
import "bootstrap/dist/css/bootstrap.min.css";

export const GameContext = createContext<gameContextType>(null);

function App() {
  const [questionSet, setQuestionSet] = useState<questionSetType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wrongAnswerCount, setWrongAnswersCount] = useState(0);
  const [streak, setStreak] = useState(0);

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
        <h1>Chances left {3 - wrongAnswerCount}/3</h1>
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
