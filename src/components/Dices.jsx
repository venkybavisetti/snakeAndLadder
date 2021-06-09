import React from 'react';
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';

const Dice = ({ disable, handleRoll }) => {
  return (
    <div className={disable ? 'disable-dice' : 'active-dice'}>
      <ReactDice
        numDice={1}
        rollDone={handleRoll}
        defaultRoll={6}
        disableIndividual={disable}
      />
    </div>
  );
};

export default Dice;
