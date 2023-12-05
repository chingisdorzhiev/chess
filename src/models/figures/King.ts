import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "./../../assets/black-king.svg";
import whiteLogo from "./../../assets/white-king.svg"

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    };

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        };

        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        if ((dx === 1 && dy <= 1) || (dx <= 1 && dy === 1)) {
            for (let i = 0; i < target.board.cells.length; i++) {
                const row = target.board.cells[i];
                for (let j = 0; j < row.length; j++) {
                    const insideCell = row[j];
                    if (insideCell.figure?.color !== this.color) {

                        if (insideCell.figure?.canMove(target)) {
                            return false;
                        };

                        if (insideCell.figure?.name === FigureNames.ROOK
                            && ((insideCell.x === target.x && insideCell.isEmptyVertical(this.cell))
                            || (insideCell.y === target.y && insideCell.isEmptyHorizontal(this.cell)))
                            ) {
                                return false;
                        };

                        if (insideCell.figure?.name === FigureNames.BISHOP) {
                            const dx = Math.abs(insideCell.x - target.x);
                            const dy = Math.abs(insideCell.y - target.y);
                            if (dx === dy && insideCell.isEmptyDiagonal(this.cell)) {
                                return false;
                            }
                        };

                        if (insideCell.figure?.name === FigureNames.QUEEN) {
                            if ((insideCell.x === target.x && insideCell.isEmptyVertical(this.cell))
                            || (insideCell.y === target.y && insideCell.isEmptyHorizontal(this.cell))) {
                                return false;
                            }
                            const dx = Math.abs(insideCell.x - target.x);
                            const dy = Math.abs(insideCell.y - target.y);
                            if (dx === dy && insideCell.isEmptyDiagonal(this.cell)) {
                                return false;
                            }
                        };
                    }
                };
            };
            return true;
        }

        return false;
    }
}