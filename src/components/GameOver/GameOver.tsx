import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { GameContext } from "../../App";
import "./GameOver.css";

type props = {
  show: boolean;
  setShow: Function;
};

export default function GameOver({ show, setShow }: props) {
  const { restartGame, streak, isDark } = useContext(GameContext);

  return (
    <Modal show={show} onHide={() => setShow()}>
      <Modal.Header className="header" closeButton>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`modalBody`}>
          <div>
            Thank you for playing quizz! <br />
            Your streak : <strong>{streak}</strong>
          </div>
          <Button
            variant="primary"
            className="restart"
            onClick={() => restartGame()}
          >
            Restart
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
