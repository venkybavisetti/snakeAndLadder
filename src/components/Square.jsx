import React from 'react';
import { BootstrapTooltip, PlayerImg } from './util';

const Square = ({ value }) => {
  let players = [];
  for (let index = 0; index < value.length; index++) {
    players.push(
      <BootstrapTooltip
        key={index}
        title={value[index].name}
        placement="top"
        arrow
      >
        <PlayerImg
          {...{
            height: 70 / Math.ceil(value.length / 2),
            player: value[index].player,
          }}
        />
      </BootstrapTooltip>
    );
  }

  return (
    <div className="square pure-u-1-6">
      <div className="players">{players}</div>
    </div>
  );
};

export default Square;
