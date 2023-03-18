import React from "react";
import closed from "./assets/closed.png";
import open from "./assets/open.png";
import bomb from "./assets/exploded_bomb.png";
import flag from "./assets/flagged_bomb.png";
import openMine from "./assets/revealed_bomb.png";
import './Cell.css';

export default class Cell extends React.Component {
    getCellStatus(){
        let {value} = this.props;
        
        if(!value.isRevealed){
            return value.isFlagged ? flag : closed;
        }
        else if(value.isMine){
            return bomb;
        }
        else if(value.isRevealed){
            return value.isMine ? openMine : open;
        }


        // default value
        return null;
    }

    render(){
        // const value = this.props;
        // console.log("props", this.props.value);
        return(
            <div 
            className="cell" 
            onClick={this.props.onClick} 
            onContextMenu={this.props.onContextMenu}
            >
                <img className="responsive" src={this.getCellStatus()}/>
            </div>
        );
    }
}