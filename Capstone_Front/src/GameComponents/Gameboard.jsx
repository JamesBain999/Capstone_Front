import React, { useState, useEffect } from "react";
import { movePlayer } from "./MovementLogic";

const tileSize = 100;
const rows = ["1", "2", "3", "4", "5", "6"];
const columns = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const playerRadius = 20;

export default function GameboardAndGameplay() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [diceNumber, setDiceNumber] = useState(0);

  useEffect(() => {
    movePlayer(
      playerPos,
      diceNumber,
      setPlayerPos,
      setDiceNumber,
      columns,
      rows
    );
  }, [diceNumber, playerPos]);

  const handleRollDice = () => {
    const number = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(number);
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < columns.length; j++) {
        const tileId = `${rows[i]}${columns[j]}`;
        const isPlayerOnTile = playerPos.x === j && playerPos.y === i;
        board.push(
          <div
            key={tileId}
            id={tileId}
            className={`tile ${isPlayerOnTile ? "player-tile" : ""}`}
            style={{
              width: tileSize,
              height: tileSize,
              top: i * tileSize,
              left: j * tileSize,
              border: "1px solid black",
            }}
          ></div>
        );
      }
    }
    return board;
  };

  return (
    <div className="App">
      <button onClick={handleRollDice}>Roll Dice</button>
      <div
        className="game-board"
        style={{
          width: columns.length * tileSize,
          height: rows.length * tileSize,
        }}
      >
        {renderBoard()}
        <div
          className="player"
          style={{
            width: playerRadius * 2,
            height: playerRadius * 2,
            borderRadius: "50%",
            backgroundColor: "blue",
            position: "absolute",
            top: playerPos.y * tileSize + (0.5 * tileSize - playerRadius),
            left: playerPos.x * tileSize + (0.5 * tileSize - playerRadius),
          }}
        ></div>
      </div>
    </div>
  );
}
