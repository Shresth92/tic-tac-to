import { useState } from "react";
import "./App.css";
import { Box } from "./components/box/Box";

const App = () => {
  const [cellState, setCellState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [prevChance, setPrevChance] = useState(0);

  const refreshGame = () => {
    setCellState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setPrevChance(0);
  };
  return (
    <div className="App">
      <div className="tic-tac">
        <h1 id="heading">Tic Tac Toe</h1>
        <div id="line"></div>
        <Box
          cellState={cellState}
          setCellState={setCellState}
          setPrevChance={setPrevChance}
          prevChance={prevChance}
          refreshGame={refreshGame}
        />
        <button id="new-game-button" onClick={() => refreshGame()}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default App;
