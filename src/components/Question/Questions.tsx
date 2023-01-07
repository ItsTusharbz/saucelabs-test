import React from "react";
import { Form } from "react-bootstrap";
import { questionType } from "../../util/Types";
import "./question.css";
type props = {
  question: questionType;
  onAnswer: Function;
  currentAns: string;
};

export default function Question({ question, onAnswer, currentAns }: props) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    onAnswer(e.target.value);
  };

  return (
    <div className="questionSet">
      <Form.Label htmlFor="answer" className="label" data-testid="question">
        Q. {question?.question}
      </Form.Label>
      <Form.Control
        type="text"
        data-testid="ans-input"
        id="answer"
        value={currentAns}
        onChange={handleInput}
        placeholder="Answer"
        aria-describedby="passwordHelpBlock"
      />
    </div>
  );
}
