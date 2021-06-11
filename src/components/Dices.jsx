import React, { useState, useEffect } from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';

const Dice = ({ diceValue, disable, handleRoll }) => {
  const [disableImmediate, setDisableImmediate] = useState(true);

  useEffect(() => {
    setDisableImmediate(disable);
  }, [disable]);

  return (
    <div className="dices">
      <div className="dice-board">{diceValue}</div>
      <div
        className={disable ? 'disable-dice' : 'active-dice'}
        onClick={() => setDisableImmediate(true)}
      >
        <ReactDice
          numDice={1}
          rollDone={handleRoll}
          defaultRoll={6}
          disableIndividual={disableImmediate}
          rollTime={1.5}
        />
      </div>
    </div>
  );
};

export default Dice;
