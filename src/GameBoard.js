import React from "react";
import Cell from "./Cell";
import './GameBoard.css';

export default class GameBoard extends React.Component {

    state = {
        mines: 10,
        board: this.createEmptyBoard(),
    };
    
    createEmptyBoard(){
        let board = [];
        for(let n = 0; n < 10; n++){
            board.push([]);
            for(let m = 0; m < 10; m++){
                board[n][m] = {
                    x: n,
                    y: m,
                    isMine: false,
                    isFlagged: false,
                    isRevealed: false,
                };
            }
        }
        return board;
    }

    renderBoard(board){
        return board.map( row => {
            return row.map(cell => {
                return(
                    <div key = {cell.x * row.length + cell.y}> 
                        <Cell value = {cell} onClick={() => this.click(cell.x, cell.y)} /> 
                        {/* in the future above line will use cell for value */}
                        {(row[row.length - 1] === cell) ? (<div className="clear" />) : ""}
                    </div>
                );
            });
        });
    }

    click(x, y){
        // only allow action if unknown tile
        console.log(this.state.board[x][y]);
        if(!this.state.board[x][y].isRevealed){
            this.state.board[x][y].isRevealed = true;

            this.setState({board: this.state.board});
        }
    }

    render(){
        return(
            <div className="board">
                {this.renderBoard(this.state.board)}
            </div>
        );
    }
}
