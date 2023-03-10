import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import GameOver from "./components/GameOver/GameOver";
import Question from "./components/Question/Questions";
import QuestionContainer from "./components/QuestionContainer/QuestionContainer";
import { questionData } from "./MockData";

test("Initial attemp value should be 3", async () => {
  render(<App />);
  const chanceCount = screen.getByText(/Chances left/i);
  const intialCount = screen.getByTestId("counter");

  expect(chanceCount).toBeInTheDocument();
  expect(intialCount).toHaveTextContent("3");
});

test("test input field and button are working", async () => {
  const handleAnswer = (data) => {};
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

test("Check Empty validation is visible", async () => {
  render(<QuestionContainer questionSet={questionData} />);
  const button = screen.getByRole("button", { name: "Verify" });
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  const alert = await screen.findByRole("alert");
  expect(alert).toBeVisible();
  expect(alert).toHaveTextContent("Answer is required");
});

test("Test modal opens correctly", () => {
  const handleClose = jest.fn();
  render(<GameOver show={true} setShow={handleClose} />);
  const element = screen.getByRole("button", { name: "Restart" });
  expect(element).toBeInTheDocument();
});
