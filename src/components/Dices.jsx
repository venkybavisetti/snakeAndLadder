import React, { useState } from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';

const Dice = () => {
  const handleRoll = (num) => {
    console.log(num);
  };

  return (
    <ReactDice
      numDice={1}
      rollDone={handleRoll}
      defaultRoll={6}
      disableIndividual={false}
    />
  );
};

export default Dice;
