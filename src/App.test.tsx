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
import { questionData } from "./MockData";

test("Initial attemp value should be 3", () => {
  render(<App />);
  const chanceCount = screen.getByText(/Chances left/i);
  const intialCount = screen.getByTestId("counter");

  expect(chanceCount).toBeInTheDocument();
  expect(intialCount).toHaveTextContent("3");

  const verifyButton = screen.getByRole("button", { name: "Verify" });
  expect(verifyButton).toBeVisible();
  fireEvent.click(verifyButton);
  fireEvent.click(verifyButton);
  fireEvent.click(verifyButton);
  expect(screen.getByTestId("counter")).toHaveTextContent("0");
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
  const alert = await screen.findByRole("alert");
  expect(alert).toBeVisible();
});

test("Test modal opens correctly", () => {
  const handleClose = jest.fn();
  render(<GameOver show={true} setShow={handleClose} />);
  const element = screen.getByRole("button", { name: "Restart" });
  expect(element).toBeInTheDocument();
});
