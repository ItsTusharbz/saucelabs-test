import React from "react";
import {
  findByRole,
  fireEvent,
  getNodeText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";
import Question from "./components/Question/Questions";
import userEvent from "@testing-library/user-event";
import GameOver from "./components/GameOver/GameOver";
import { Simulate } from "react-dom/test-utils";

const questionData = [
  {
    answerSha1: "4ffcf321c72e796c8da820e519d0f76f50f701a9",
    question: "Atlantic __________ are able to leap 15 feet high.",
  },
  {
    answerSha1: "0eb1e0d42394f9a22a7ebec5031951cca08856ad",
    question:
      "What Name Was Given To The Period From 1919 To 1933 When Alcohol Was Banned In The USA?",
  },
  {
    answerSha1: "3ae80ce7fa474024ddf7958035c8153e35cf912c",
    question: "In What year did British Honduras become Belize?",
  },
  {
    answerSha1: "fe448224ab8073b39048052a415179f22a455352",
    question:
      "Who was the monarch of The United Kingdom during the time period 1936-1936?",
  },
  {
    answerSha1: "7225764e6b8d309347740bdbb63ed920b8b4ba6e",
    question: "What type of pasta is penne?",
  },
];

test("Initial attemp value should be 3", () => {
  render(<App />);
  const chanceCount = screen.getByText(/Chances left/i);
  const intialCount = screen.getByTestId("counter");

  expect(chanceCount).toBeInTheDocument();
  expect(intialCount).toHaveTextContent("3");
});

test("test input field and button are working", async () => {
  const handleAnswer = (data) => {
    console.log(data);
  };
  render(
    <Question
      question={questionData[0]}
      onAnswer={handleAnswer}
      currentAns=""
    />
  );
  const questionLabel = screen.getByTestId("question");
  expect(questionLabel).toBeInTheDocument();
  expect(questionLabel).toHaveTextContent(questionData[0].question);
  const input = screen.getByTestId("ans-input");

  expect(input).toBeInTheDocument();
});

test("Check if wrong answer label is shown", async () => {
  render(<QuestionContainer questionSet={questionData} />);
  const button = screen.getByRole("button", { name: "Verify" });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  await screen.findByRole("alert");
});

test("Test modal opens correctly", () => {
  // render(<GameOver show={true} />);
  // const element = screen.getByRole("button");
  // expect(element).toBeInTheDocument();
});
