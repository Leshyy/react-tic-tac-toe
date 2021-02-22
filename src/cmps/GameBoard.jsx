import { Cell } from "./Cell";

export function GameBoard({ gameBoard, onPlay }) {
    return (
        <section className="game-board">
            {gameBoard.map((row, i) => (
                row.map((cell, j) => (
                    <Cell key={cell + Math.random()} onPlay={onPlay} coord={{ i, j }} symbol={cell} />
                ))
            ))}
        </section>
    )
}
