import React from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';

const Dice = ({ disable, handleRoll }) => {
  return (
    <ReactDice
      numDice={1}
      rollDone={handleRoll}
      defaultRoll={6}
      disableIndividual={disable}
    />
  );
};

export default Dice;
