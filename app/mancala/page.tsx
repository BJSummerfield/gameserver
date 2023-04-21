'use client'
import React from 'react';
import Board from './Board';
import styles from './page.module.css';
import { useMancala } from './useMancala'

export default function Mancala() {
  const {
    mancalaPits,
    status,
    rows,
    pits,
    selectPit,
    totalPits,
  } = useMancala()

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

