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
      <Form.Label htmlFor="question">{question?.question}</Form.Label>
      <Form.Control
        type="text"
        id="question"
        onChange={handleInput}
        aria-describedby="passwordHelpBlock"
      />
    </div>
  );
}
