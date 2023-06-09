import React from "react";
import Cell from "./Cell";
import './GameBoard.css';

export default class GameBoard extends React.Component {

    state = {
        mines: 10,
        board: this.initializeBoard(10), // hard coded for 10 mines currently
        cells: 100,
        flagedCells: 0,
    };
    
    initializeBoard(mines){
        let board = [];
        board = this.createEmptyBoard();
        board = this.placeMines(board, mines);
        board = this.findMines(board);

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
                    adjacentMines: 0,
                };
            }
        }
        return board;
    }

    placeMines(board, mines){
        let plantedMines = 0;
        while(plantedMines < mines){
            plantedMines++;
            let firstDigit = this.getRandomNum();
            let secondDigit = this.getRandomNum();
            board[firstDigit][secondDigit].isMine = true;
        }

        return board;
    }

    findMines(board){
        for(let i = 0; i < 10; i++){
            for(let j=0; j < 10; j++){
                let nearbyMines = 0;
                // dont do the calculation for if cell itself is a mine
                if(!board[i][j].isMine){
                    // holds an array of nearby cells
                    let nearbyCells = this.findAjacentCells(board, board[i][j].x, board[i][j].y);
                    nearbyCells.map(cell =>{
                        if(cell.isMine){
                            nearbyMines++;
                            this.setState({board: board[i][j].adjacentMines = nearbyMines});
                        }
                    });
                }
            }
        }
        return board;
    }

    findAjacentCells(board, x, y){

        let cells = [];

        // left
        if(y > 0){
            cells.push(board[x][y-1]);
        }
        //right
        if(y < 9){
            cells.push(board[x][y+1]);
        }
        // up
        if(x > 0){
            cells.push(board[x-1][y]);
        }
        //down     
        if(x < 9){
            cells.push(board[x+1][y]);
        } 
        // top left
        if(x > 0 && y > 0){
            cells.push(board[x-1][y-1]);
        }
        // top right
        if(x > 0 && y < 9){
            cells.push(board[x-1][y+1]);
        }
        // bottom left
        if(x < 9 && y > 0){
            cells.push(board[x+1][y-1]);
        }
        // bottom right
        if(x < 9 && y < 9){
            cells.push(board[x+1][y+1]);
        }
        return cells;
    }

    getRandomNum(){
        let min = Math.ceil(0);
        let max = Math.floor(9);
        
        // let returnValue = Math.floor(Math.random() * (max - min + 1) + min);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    renderBoard(board){
        return board.map( row => {
            return row.map(cell => {
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

    // reveals all the cells
    showBoard(){
        this.state.board.map( row => {
            row.map( cell => {
                cell.isRevealed = true;
            });
        });
        this.setState({board: this.state.board});
    }

    showEmptyCells(board, x, y){
        if(board[x][y].adjacentMines == 0){
            let nearbyCells = this.findAjacentCells(board, x, y);
            nearbyCells.map(cell => {
                if(!cell.isFlagged && !cell.isRevealed && !cell.isMine ){
                    board[cell.x][cell.y].isRevealed = true;
                    this.state.cells = this.state.cells-1;
                    this.showEmptyCells(this.state.board,cell.x,cell.y);
                }
            });
        }
    }

    click(x, y){
        // logic for clicking mine
        if(this.state.board[x][y].isMine){
            this.showBoard();
            alert("You lose!");
        }
        // logic for clicking closed square
        if(!this.state.board[x][y].isRevealed){
            this.state.board[x][y].isRevealed = true;
            this.state.cells = this.state.cells-1;
            this.showEmptyCells(this.state.board, x, y);
            this.setState({board: this.state.board});            
        }

        if(this.state.cells == this.state.mines){
            this.showBoard();
            alert("You Win!");
        }

        if(this.state.cells == this.state.mines){

        }

    }


    handleContextMenu(event, x, y){
        event.preventDefault();

        if((!this.state.board[x][y].isFlagged) && !this.state.board[x][y].isRevealed){
            this.state.board[x][y].isFlagged = true;

            // check if cell flagged is a mine
            if(this.state.board[x][y].isMine){
                this.state.flagedCells++;
                if(this.state.flagedCells == this.state.mines){
                    this.showBoard();
                    alert("You Win!");
                }
            }
        }
        else if(this.state.board[x][y].isFlagged){
            this.state.board[x][y].isFlagged = false;
        }

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
