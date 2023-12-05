import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';
import { Player } from '../models/Player';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export default function BoardComponent ({board, setBoard, currentPlayer, swapPlayer}: BoardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function changeSelectedCell(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  };

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className='boardContainer'>
      <div className='turn'>Turn: {currentPlayer?.color}</div>
      <div className='board'>
        {board.cells.map((row: Cell[], index: number) => 
        <React.Fragment key={index}>
          {
            row.map(cell => <CellComponent
              cell={cell}
              key={cell.id}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              changeSelectedCell={changeSelectedCell}
              />)
          }
        </React.Fragment>)}
      </div>
    </div>
    
  )
}
