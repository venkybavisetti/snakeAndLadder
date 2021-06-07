import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core';

function getModalStyle() {
  return {
    top: `${30}%`,
    left: `${36}%`,
    transform: `translate(-${10}%, -${10}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Popup({ popup, handleStart, isHost }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {isHost ? (
        <>
          <h2 id="simple-modal-title">Let's start the Game</h2>
          <Button variant="outlined" color="primary" onClick={handleStart}>
            Start
          </Button>
        </>
      ) : (
        <h2 id="simple-modal-title">Waiting for the host to start the Game</h2>
      )}
    </div>
  );

  return (
    <Modal
      open={popup}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
