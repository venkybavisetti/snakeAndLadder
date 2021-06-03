import React from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';

const Dice = () => {
  const handleRoll = (num) => {
    console.log(num);
  };

  return (
    <div>
      <ReactDice numDice={1} rollDone={handleRoll} />
    </div>
  );
};

export default Dice;
