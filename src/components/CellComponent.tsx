import React from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  changeSelectedCell: (cell: Cell) => void;
}

export default function CellComponent({cell, selected, changeSelectedCell}: CellProps) {
  return (
    <div className='higherCell'>
      <div className={['cell', cell.color, selected ? "selected" : ""].join(' ')}
        onClick={() => changeSelectedCell(cell)}
        style={{background: cell.available && cell.figure ? "green" : ""}}
      >
        {cell.available && !cell.figure && <div className="available"></div>}
        {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}/>}
      </div>
        {cell.x === 7 && <div className={`number ${cell.color}`}>{7 - cell.y + 1}</div>}
        {cell.y === 7 && <div className={`letter ${cell.color}`}>{String.fromCharCode(cell.x + 97)}</div>}
    </div>
  )
}
