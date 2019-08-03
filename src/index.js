import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className={this.props.winning ? "square winner" : "square"} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i, val) {
        let winningSquare = this.props.winningSet && this.props.winningSet.indexOf(i) > -1;

        return <Square key={i} value={val} winning={winningSquare} onClick={() => this.props.onClick(i) }/>;
    }

    render() {

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

    for (let rowNum = 0; rowNum < rows.length; rowNum++) {
        let row = rows[rowNum];

        for (let colNum = 0; colNum < row.length; colNum++) {
            let value = row[colNum];

            if (value) {

                let coord = `${rowNum}-${colNum}`;

                //diagonal check
                if (rowNum === 0 && rowNum === colNum) {
                    let tmp = [coord];

                    for (let i = 1; i < size; i++) {
                        let thisBox = rows[rowNum + i][colNum + i];
                        if (thisBox === value) {
                            tmp.push(`${rowNum + i}-${colNum + i}`);

                            if (tmp.length === size) {
                                return tmp;
                            }
                        } else {
                            break;
                        }
                    }

                }

                // reverse diagonal check
                if (rowNum === 0 && colNum === size - 1) {
                    let tmp = [coord];
                    for (let i = 1; i < size; i++) {
                        let thisBox = rows[i][colNum - i];
                        if (thisBox === value) {
                            tmp.push(`${i}-${colNum - i}`);

                            if (tmp.length === size) {
                                return tmp;
                            }
                        } else {
                            break;
                        }
                    }
                }

                //row check
                if (colNum === 0) {
                    let tmp = [coord];

                    for (let i = 1; i < size; i++) {
                        let thisBox = row[i];
                        if (thisBox === value) {
                            tmp.push(`${rowNum}-${i}`);

                            if (tmp.length === size) {
                                return tmp;
                            }
                        } else {
                            break;
                        }
                    }
                }

                //column check
                if (rowNum === 0) {
                    let tmp = [coord];

                    for (let i = 1; i < size; i++) {
                        let thisBox = rows[i][colNum];
                        if (thisBox === value) {
                            tmp.push(`${i}-${colNum}`);

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
// When no one wins, display a message about the result being a draw.
// Add RESET Button