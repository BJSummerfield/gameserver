'use client'
import React from 'react';
import Board from './Board';
import styles from './page.module.css';
import { useMancala } from './useMancala'
// import CircularProgress from '@mui/material/CircularProgress'

export default function Mancala() {
  const {
    loading,
    mancalaPits,
    status,
    rows,
    pits,
    selectPit,
    gameLoop,
    totalPits,
  } = useMancala()

  gameLoop()

  return (
    <div className={styles.container}>
      <h1>Mancala</h1>
      <h3>{status}</h3>
      <Board
        pits={pits}
        rows={rows}
        selectPit={selectPit}
        mancalaPits={mancalaPits}
        totalPits={totalPits}
      />
    </div>
  );
};


