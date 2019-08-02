import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i) }/>;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            stepNumber: 0
        }
    }

    render() {
        const squares = this.getSquares();
        const winner = calculateWinner(squares);
        let status = winner ? `Winner: ${winner}` : `Next player: ${this.getPlayer()}`;

        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)} squares={squares} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                </div>
            </div>
        );
    }

    handleClick(i) {
        let squares = this.getSquares(),
            winner = calculateWinner(squares);

        if (winner) {
            alert(`${winner} already won!`);
            return;
        }
        if (squares[i]) {
            alert('This square already has a value!');
            return;
        }

        squares[i] = this.getPlayer();

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    getSquares() {
        return this.state.squares.slice();
    }

    getPlayer() {
        return this.state.xIsNext ? 'X' : 'O';
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);



//TODO
// Rewrite Board to use two loops to make the squares instead of hardcoding them.
// When someone wins, highlight the three squares that caused the win.
// When no one wins, display a message about the result being a draw.