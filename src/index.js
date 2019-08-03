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
    renderSquare(i, val) {
        return <Square key={i} value={val} onClick={() => this.props.onClick(i) }/>;
    }

    render() {

        //TODO style wins

        let squares = this.props.squares.slice().map((item, idx) =>
            {
                return (
                    <div className={`board-row`} key={idx}>
                        {item.map((box, id) => this.renderSquare(`${idx}-${id}`, box))}
                    </div>
                )
            }
        );

        return (
            <div>
                {squares}
            </div>
        );
    }
}

class Game extends React.Component {

    size;

    constructor(props) {
        super(props);
        this.size = 3;

        let board = [];
        for (let i = 0; i < this.size; i++) {
            board[i] = new Array(3).fill(null)
        }

        this.state = {
            squares: board,
            xIsNext: true
        }
    }

    render() {
        const squares = this.getSquares();
        const winner = calculateWinner(squares, this.size);
        let status = winner ? `Winner: ${!this.state.xIsNext ? 'X' : 'O'}` : `Next player: ${this.getPlayer()}`;

        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)} squares={squares} winningSet={winner} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                </div>
            </div>
        );
    }

    handleClick(i) {
        let coords = i.split('-'),
            row = coords[0],
            col = coords[1];

        let squares = this.getSquares();

        if (squares[row][col]) {
            alert('This square already has a value!');
            return;
        }

        let winning = calculateWinner(squares, this.size);

        if (winning) {
            alert(`${winning[0]} already won!`);
            return;
        }

        squares[row][col] = this.getPlayer();

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

function calculateWinner(rows, size) {

    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        for (let j = 0; j < row.length; j++) {
            let value = row[j];

            if (value) {

                let coord = {row: i, col: j};

                //diagonal check
                if (i === 0 && i === j) {
                    console.log('checking diagonal');
                    let tmp = [coord];

                    for (let k = 1; k < size; k++) {
                        let thisBox = rows[i + k][j + k];
                        if (thisBox === value) {
                            tmp.push({row: i + k, col: j + k});

                            if (tmp.length === size) {
                                return tmp;
                            }
                        } else {
                            break;
                        }
                    }

                }

                //TODO fix
                // reverse diagonal check
                if (i === size - 1 && i === j) {
                    console.log('checking reverse diagonal');
                    let tmp = [coord];
                    for (let k = 1; k < size; k++) {
                        let thisBox = rows[i + k][j - k];
                        if (thisBox === value) {
                            tmp.push({row: i + k, col: j - k});

                            if (tmp.length === size) {
                                return tmp;
                            }
                        } else {
                            break;
                        }
                    }
                }

                //row check
                if (j === 0) {
                    console.log('checking row');
                    let tmp = [coord];

                    for (let k = 1; k < size; k++) {
                        let thisBox = row[k];
                        if (thisBox === value) {
                            tmp.push({row: i, col: k});

                            if (tmp.length === size) {
                                return tmp;
                            }
                        } else {
                            break;
                        }
                    }
                }

                //column check
                if (i === 0) {
                    console.log('checking column');
                    let tmp = [coord];

                    for (let k = 1; k < size; k++) {
                        let thisBox = rows[k][j];
                        if (thisBox === value) {
                            tmp.push({row: k, col: j});

                            if (tmp.length === size) {
                                return tmp;
                            }
                        } else {
                            break;
                        }

                    }
                }

            }
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
// Rewrite Board to loop to make the squares instead of hardcoding them.
// Rewrite calculateWinner
// When someone wins, highlight the three squares that caused the win.
// When no one wins, display a message about the result being a draw.
// Add RESET Button