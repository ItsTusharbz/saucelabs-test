import sha1 from "crypto-js/sha1";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { GameContext } from "../../App";
import { questionSetType } from "../../util/Types";
import GameOver from "../GameOver/GameOver";
import Question from "../Question/Questions";
import "./questionContainer.css";

type props = {
  questionSet: questionSetType;
};

export default function QuestionContainer({ questionSet }: props) {
  const [currentQuestionId, setcurrentQuestionId] = useState(0);
  const [currentAns, setCurrentAns] = useState("");
  const [showGameOverModal, setshowGameOverModal] = useState(false);
  const { wrongAnswerCount, setWrongAnswersCount, setStreak, streak } =
    useContext(GameContext);

  const handleAnswer = (ans: string) => {
    ans.toLowerCase();
    setCurrentAns(ans.toLowerCase());
  };

  const renderQuestion = (questionSet: questionSetType) => {
    return (
      <Question
        question={questionSet[currentQuestionId]}
        onAnswer={handleAnswer}
        currentAns={currentAns}
      />
    );
  };

  useEffect(() => {
    if (wrongAnswerCount === 3) {
      setshowGameOverModal(true);
    }
  }, [wrongAnswerCount]);

  const submit = () => {
    const answer = sha1(currentAns).toString();
    if (questionSet[currentQuestionId].answerSha1 === answer) {
      setcurrentQuestionId((prev) =>
        prev === questionSet.length - 1 ? prev : prev + 1
      );
      setCurrentAns("");
      setStreak(streak + 1);
    } else {
      setWrongAnswersCount(wrongAnswerCount + 1);
    }
  };

  return (
    <div className="questionContianer">
      <div className="questioncard">
        {renderQuestion(questionSet)}
        <div className="verifyButton">
          <Button variant="primary" onClick={submit}>
            Verify
          </Button>
        </div>
      </div>
      <GameOver show={showGameOverModal} />
    </div>
  );
}