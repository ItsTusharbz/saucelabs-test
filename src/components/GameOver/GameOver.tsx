import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { GameContext } from "../../App";
import "./GameOver.css";

type props = {
  show: boolean;
};

export default function GameOver({ show }: props) {
  const { restartGame } = useContext(GameContext);

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Game Overe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalBody">
          <div>Thank you for playing</div>
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
