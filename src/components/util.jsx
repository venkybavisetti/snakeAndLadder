import React from 'react';
import { Tooltip } from '@material-ui/core';
import bluePlayer from '../images/blue-player.png';
import greenPlayer from '../images/green-player.png';
import pinkPlayer from '../images/pink-player.png';
import redPlayer from '../images/red-player.png';
import yellowPlayer from '../images/yellow-player.png';
import { makeStyles } from '@material-ui/core/styles';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} className="pointer" />;
}

const playerImg = {
  1: bluePlayer,
  2: greenPlayer,
  3: pinkPlayer,
  4: redPlayer,
  5: yellowPlayer,
};

const PlayerImg = React.forwardRef((props, ref) => {
  const {
    height,
    player: { playerNum, hue },
  } = props;

  return (
    <img
      ref={ref}
      {...props}
      src={playerImg[playerNum]}
      alt="player"
      style={{
        height: height,
        filter: `hue-rotate(${hue}deg)`,
      }}
    />
  );
});

export { BootstrapTooltip, PlayerImg };
