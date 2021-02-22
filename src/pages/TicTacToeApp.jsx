import { useState } from "react"
import { GameBoard } from "../cmps/GameBoard"

export function TicTacToeApp() {
    const [board, setBoard] = useState(
        [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    )
    const [gameIsOn, setGameIsOn] = useState(true)
    const [isMyTurn, setIsMyTurn] = useState(true)
    const [playCount, setPlayCount] = useState(0)
    const [isDraw, setIsDraw] = useState(false)

    const onPlay = (cellCoord) => {
        if (gameIsOn && isMyTurn) {
            const copyBoard = [...board]
            copyBoard[cellCoord.i][cellCoord.j] = 'X'
            setBoard(copyBoard)
            if (!checkWin(cellCoord, true)) {
                setIsMyTurn(false)
                pcPlay()
                setPlayCount(playCount + 1)
            }
        }
    }

    const pcPlay = () => {
        setTimeout(() => {
            const pcPlayCoord = getEmptySpot()
            const copyBoard = [...board]
            setPlayCount(playCount + 1)
            copyBoard[pcPlayCoord.i][pcPlayCoord.j] = 'O'
            checkWin(pcPlayCoord, false)
            setIsMyTurn(true)
        }, 1000);
    }

    const getEmptySpot = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                const cell = board[i][j]
                if (cell === '') {
                    return { i, j }

                }
            }
        }
        return false

    }


    const checkWin = (cellCoord, didPlayerPlay) => {
        const row = []
        const col = []

        for (let i = 0; i < board.length; i++) {
            row.push(board[cellCoord.i][i])
            col.push(board[i][cellCoord.j])
        }

        // check row col and diagonal and tie
        if (row.every(cell => cell === 'X') || row.every(cell => cell === 'O')) {
            endGame(didPlayerPlay)
            return true
        } else if (col.every(cell => cell === 'X') || col.every(cell => cell === 'O')) {
            endGame(didPlayerPlay)
            return true
        } else if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
            endGame(didPlayerPlay)
            return true
        } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
            endGame(didPlayerPlay)
            return true
        } else if (!getEmptySpot()) {
            setIsDraw(true)
            endGame()
            return true
        } else return false
    }

    const endGame = (didPlayerPlay) => {
        setGameIsOn(false)
        let gameDoneMsg
        if (!isDraw) {
            gameDoneMsg = didPlayerPlay ? 'You Won!!' : 'You Lost :('
        } else gameDoneMsg = 'Its a Draw!!!'
        alert(gameDoneMsg)
        restartGame()
    }


    const restartGame = () => {
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
        )
        setPlayCount(0)
        setIsMyTurn(true)
        setGameIsOn(true)
    }

    return (

        <section className="tic-tac-toe-app">
            <h1>TicTacToe</h1>
            <GameBoard gameBoard={board} onPlay={onPlay} />

        </section>
    )
}
