import React, { useState, useEffect } from 'react';
import Table from './Table';
import PlayerList from './PlayerList';
import playerImg from '../images/gamePlayer.png';
import Dices from './Dices';
import { useTimer } from './customHook';
import Popup from './popUp';
import { api } from './api';

const getInitCells = (dimension) => {
  let rows = [];
  for (let rowIndex = 0; rowIndex < dimension; rowIndex++) {
    rows[rowIndex] = [];

    for (let columnIndex = 0; columnIndex < dimension; columnIndex++) {
      rows[rowIndex][columnIndex] = [];
    }
  }
  return rows;
};

const Board = () => {
  const [table, setTable] = useState(getInitCells(10));
  const [isHost, setHost] = useState(false);
  const [popup, setPopup] = useState(true);
  const apiData = useTimer({ type: 'board-data' }, 2);
  const [inPlayList, setInPlayList] = useState([]);
  const [winnersList, setWinnersList] = useState([]);
  const [playersWallet, setPlayersWallet] = useState([]);
  const [turn, setTurn] = useState(false);
  const [boardData, setBoardData] = useState({});

  useEffect(() => {
    setBoardData(apiData);
  }, [apiData]);

  useEffect(() => {
    if (boardData.players) {
      setHost(boardData.isHost);
      setTurn(boardData.turn);
      setPopup(boardData.gameStatus === 'start');
      const inPlay = boardData.players.filter(
        (player) => player.playerPosition !== 100
      );
      const winners = boardData.players.filter(
        (player) => player.playerPosition === 100
      );
      const playersWallet = boardData.players.filter(
        (player) => player.playerPosition === 0
      );

      setPlayersWallet(playersWallet);
      setInPlayList(inPlay);
      setWinnersList(winners);
      insertPlayers(boardData.players);
    }
  }, [boardData]);

  const insertPlayers = (players) => {
    const cells = getInitCells(10);
    for (let index = 0; index < players.length; index++) {
      const [row, column] = ('0' + (players[index].playerPosition - 1)).slice(
        -2
      );
      if (players[index].playerPosition !== 0) {
        console.log(row, column, players[index].playerPosition);
        cells[+row][+column].push(players[index]);
      }
    }
    setTable(cells);
  };

  const getWalletSquareSide = () => {
    if (playersWallet.length < 9) return 74;
    return 280 / Math.ceil(playersWallet.length / 2);
  };

  const handleStart = () => {
    if (boardData.players.length > 1) {
      setPopup(false);
      api({ type: 'start' }).then(setBoardData);
    }
  };

  const handleRoll = (num) => {
    setTurn(false);
    api({ type: 'dice', data: { dice: num } }).then(setBoardData);
  };

  return (
    <div>
      <div className="board-status">{`${
        boardData.currentPlayer || 'player'
      }'s turn`}</div>
      <div className="dash-board">
        <PlayerList header="Participants" players={inPlayList} />
        <div className="page">
          <div className="player-wallet">
            <div className="player-wallet-box">
              {playersWallet.map((player, index) => (
                <div
                  key={index}
                  style={{
                    height: getWalletSquareSide(),
                    width: 74,
                  }}
                  className="square pure-u-1-6"
                >
                  <div className="players">
                    <img
                      src={playerImg}
                      alt="player"
                      style={{
                        height: 70,
                        filter: `hue-rotate(${player.hue}deg)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Table table={table} />
        </div>
        <PlayerList header="Winners" players={winnersList} />
      </div>
      <div className="dices">
        <div>
          <div className="dice-board">{boardData.dice || 6}</div>
          <Dices handleRoll={handleRoll} disable={!turn} />
        </div>
      </div>
      <Popup popup={popup} handleStart={handleStart} isHost={isHost} />
    </div>
  );
};

export default Board;
