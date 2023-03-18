import React from "react";
import Cell from "./Cell";
import './GameBoard.css';

export default class GameBoard extends React.Component {

    state = {
        mines: 10,
        board: this.initializeBoard(10), // hard coded for 10 mines currently
    };
    
    initializeBoard(mines){
        let board = [];
        board = this.createEmptyBoard();
        board = this.placeMines(board, mines);

        return board;
    }

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

    placeMines(board, mines){
        // console.log();
        let plantedMines = 0;
        while(plantedMines < mines){
            plantedMines++;
            let firstDigit = this.getRandomNum();
            let secondDigit = this.getRandomNum();
            
            // console.log("first digit " + firstDigit);
            // console.log("second digit " + secondDigit);
            board[firstDigit][secondDigit].isMine = true;
            // console.log("thing ", board[firstDigit][secondDigit]);
        }

        return board;
    }

    getRandomNum(){
        let min = Math.ceil(0);
        let max = Math.floor(9);
        
        // let returnValue = Math.floor(Math.random() * (max - min + 1) + min);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    renderBoard(board){
        // document.addEventListener("contextmenu", (event) => {this.handleContextMenu(event)})
        return board.map( row => {
            return row.map(cell => {
                // console.log("right click from board", this.rightClick(event, cell.x, cell.y));
                return(
                    <div key = {cell.x * row.length + cell.y}> 
                        <Cell 
                        value = {cell} 
                        onClick={() => this.click(cell.x, cell.y)}
                        onContextMenu={(event) => this.handleContextMenu(event, cell.x, cell.y)}
                        /> 
                        {(row[row.length - 1] === cell) ? (<div className="clear" />) : ""}
                    </div>
                );
            });
        });
    }

    click(x, y){
        // only allow action if unknown tile
        // console.log(this.state.board[x][y]);
        // console.log(event);
        // if(event.type === 'click'){
        if(this.state.board[x][y].isMine){
            // this.state.board.isRevealed = true;
            this.setState({board: this.state.board});
        }

        if(!this.state.board[x][y].isRevealed){
            this.state.board[x][y].isRevealed = true;

            // console.log("cell", this.state.board[x][y]);
            this.setState({board: this.state.board});
        }
        // }
        // else if(event.type === 'contextmenu') {
        //     event.preventDefault();
        //     console.log("RIGHT CLICK");
        // }


    }


    handleContextMenu(event, x, y){
        event.preventDefault();

        // console.log("this", this.state.board[x][y]);

        if((!this.state.board[x][y].isFlagged) && !this.state.board[x][y].isRevealed){
            this.state.board[x][y].isFlagged = true;
        }
        else if(this.state.board[x][y].isFlagged){
            this.state.board[x][y].isFlagged = false;
        }
        // console.log("RIGHT CLICK");
        // alert("right click");

        this.setState({board: this.state.board});
    }

    render(){
        return(
            <div className="board">
                {this.renderBoard(this.state.board)}
            </div>
        );
    }
}
