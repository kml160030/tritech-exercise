import React from "react";
import Cell from "./Cell";
import './GameBoard.css';

class GameBoard extends React.Component {
    constructor(){
        super();
        // hard coded values for board size
        this.rows = 10;
        this.cols = 10;

        this.board = this.createEmptyBoard();
    }
    state = {
        mines: 10,

    };
    
    createEmptyBoard(){
        let board = [];
        for(let n = 0; n < 10; n++){
            board[n] = [];
            for(let m = 0; m < 10; m++){
                // console.log("empty cell");
                board[n][m] = {
                    x: n,
                    y: m,
                    isMine: false,
                    isFlagged: false
                }; // a cell
            }
        }
        
        return board;
    }

    renderBoard(board){
        return board.map( row => {
            return row.map(cell => {
                return(
                    <div className="board" >
                    {/* <div key = {board.x * board.length + board.y}>  */}
                        <Cell value = {"closed"} /> 
                        {console.log(cell)}
                        {/* in the future above line will use cell for value */}
                    </div>
                )
            })
        })
    }

    render(){
        return(
            <div className="container">
                <div className="Board">
                    {this.renderBoard(this.board)}
                </div>  
            </div>
        )
    }
    
}

export default GameBoard;
