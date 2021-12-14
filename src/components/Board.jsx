import React, { useState, useEffect } from 'react';
import Table from './Table';
import PlayerList from './PlayerList';
import Dices from './Dices';
import { useTimer } from './customHook';
import Popup from './popUp';
import { api } from './api';
import { BootstrapTooltip, PlayerImg } from './util';
import Notification from './Notification';

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
  const apiData = useTimer({ type: 'board-data' }, 4);
  const [inPlayList, setInPlayList] = useState([]);
  const [winnersList, setWinnersList] = useState([]);
  const [playersWallet, setPlayersWallet] = useState([]);
  const [turn, setTurn] = useState(false);
  const [boardData, setBoardData] = useState({});
  const [currentPlayerId, setCurrentPlayer] = useState({});
  const [enableDice, setEnableDice] = useState(true);

  useEffect(() => {
    setBoardData(apiData);
  }, [apiData]);

  useEffect(() => {
    setEnableDice(true);
  }, [boardData]);

  useEffect(() => {
    if (boardData.players) {
      setTurn(boardData.turn);
      setHost(boardData.isHost);
      setPopup(boardData.gameStatus === 'start');
      const inPlay = boardData.players.filter(
        (player) => player.playerPosition !== 100
      );
      const winners = boardData.winners.map(
        (index) => boardData.players[index]
      );
      const playersWallet = boardData.players.filter(
        (player) => player.playerPosition === 0
      );

      setPlayersWallet(playersWallet);
      setInPlayList(inPlay);
      setCurrentPlayer(boardData.currentPlayer.playerId);
      setWinnersList(winners);
      setTimeout(() => {
        insertPlayers(boardData.players);
      }, 1000);
    }
  }, [boardData]);

  const insertPlayers = (players) => {
    const cells = getInitCells(10);
    for (let index = 0; index < players.length; index++) {
      const [row, column] = ('0' + (players[index].playerPosition - 1)).slice(
        -2
      );
      if (players[index].playerPosition !== 0) {
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

  const handleRoll = async () => {
    setEnableDice(false);
    setTurn(false);
    await api({ type: 'dice' }).then((data) => {
      setBoardData(data);
    });
  };

  const handlePlayerRemove = (removePlayerId) => {
    setTurn(false);
    setHost(false);
    api({ type: 'remove-player', data: { removePlayerId } }).then(setBoardData);
  };

  const handleChangeHost = (changeHost) => {
    setTurn(false);
    setHost(false);
    console.log(changeHost);
    api({ type: 'change-host', data: { changeHost } }).then(setBoardData);
  };

  return (
    <div className="board-page">
      {boardData.notification && (
        <Notification notification={boardData.notification} />
      )}
      <div className="board-page-status">
        {(boardData.currentPlayer && boardData.currentPlayer.name) || 'player'}
        <span>'s turn</span>
      </div>
      <div className="dash-board">
        <PlayerList
          header="Participants"
          players={inPlayList}
          currentPlayer={currentPlayerId}
          isHost={isHost}
          hostId={boardData.hostId}
          handlePlayerRemove={handlePlayerRemove}
          handleChangeHost={handleChangeHost}
        />
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
                    <BootstrapTooltip title={player.name} placement="top" arrow>
                      <PlayerImg
                        {...{
                          height: 70,
                          player: player.player,
                          isCurrentPlayer: currentPlayerId === player.playerId,
                        }}
                      />
                    </BootstrapTooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Table table={table} currentPlayerId={currentPlayerId} />
        </div>
        <PlayerList
          header="Winners"
          players={winnersList}
          isHost={isHost}
          hostId={boardData.hostId}
          handlePlayerRemove={handlePlayerRemove}
          handleChangeHost={handleChangeHost}
        />
      </div>
      {enableDice && (
        <Dices
          diceValue={boardData.dice || 6}
          handleRoll={handleRoll}
          disable={!turn}
        />
      )}
      <Popup
        popup={popup}
        handleStart={handleStart}
        isHost={isHost}
        isGameCompleted={boardData.gameStatus === 'completed'}
      />
    </div>
  );
};

export default Board;
