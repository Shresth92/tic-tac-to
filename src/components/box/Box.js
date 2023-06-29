import { useCallback } from "react";
import "./box.css";

export const Box = (props) => {
  const { cellState, setCellState, prevChance, setPrevChance, refreshGame } =
    props;

  const declareWinner = useCallback(
    (winnerName) => {
      setTimeout(function () {
        alert(winnerName + " is winner");
        refreshGame();
      }, 500);
    },
    [refreshGame]
  );

  const checkWinner = useCallback(
    (currCellState) => {
      let winner;
      for (let i = 0; i < 3; i++) {
        let cellNum = 3 * i;
        if (
          currCellState[cellNum] !== 0 &&
          currCellState[cellNum] === currCellState[cellNum + 1] &&
          currCellState[cellNum] === currCellState[cellNum + 2]
        ) {
          winner = currCellState[cellNum] === 1 ? "X" : "O";
          declareWinner(winner);
          break;
        } else if (
          currCellState[i] !== 0 &&
          currCellState[i] === currCellState[i + 3] &&
          currCellState[i] === currCellState[i + 6]
        ) {
          winner = currCellState[i] === 1 ? "X" : "O";
          declareWinner(winner);
          break;
        }
      }
      if (
        currCellState[0] !== 0 &&
        currCellState[0] === currCellState[4] &&
        currCellState[0] === currCellState[8]
      ) {
        winner = currCellState[0] === 1 ? "X" : "O";
        declareWinner(winner);
      } else if (
        currCellState[2] !== 0 &&
        currCellState[2] === currCellState[4] &&
        currCellState[2] === currCellState[6]
      ) {
        winner = currCellState[2] === 1 ? "X" : "O";
        declareWinner(winner);
      }
    },
    [declareWinner]
  );

  const checkGameOver = useCallback(
    (currCellState) => {
      let haveZero = false;
      currCellState.forEach((val) => {
        if (val === 0) {
          haveZero = true;
        }
      });
      if (!haveZero) {
        setTimeout(function () {
          alert("Game Over");
          refreshGame();
        }, 500);
      }
    },
    [refreshGame]
  );

  const addZeroCross = useCallback(
    (event) => {
      let tempCellState = [...cellState];
      let key = event.target.id;
      if (tempCellState[key] !== 1 && tempCellState[key] !== -1) {
        let lastChance = prevChance === 1 ? -1 : 1;
        setPrevChance(lastChance);
        tempCellState[key] = lastChance;
        setCellState(tempCellState);
        checkWinner(tempCellState);
        checkGameOver(tempCellState);
      }
    },
    [
      cellState,
      checkGameOver,
      checkWinner,
      prevChance,
      setCellState,
      setPrevChance,
    ]
  );

  return (
    <div className="box">
      {cellState.map((val, index) => {
        let value = val === 1 ? "X" : val === -1 ? "O" : "";
        return (
          <div
            key={index}
            id={index}
            className="box-item"
            onClick={(event) => addZeroCross(event)}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};
