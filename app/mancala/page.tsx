'use client'
import React from 'react';
import Board from './Board';
import styles from './page.module.css';

export default function Mancala() {
  return (
    <div className={styles.container}>
      <h1>Mancala</h1>
      <Board />
    </div>
  );
};


