import React from "react";
import closed from "./assets/closed.png";
import open from "./assets/open.png";
import bomb from "./assets/exploded_bomb.png";
import flag from "./assets/flagged_bomb.png";
import openMine from "./assets/revealed_bomb.png";
import one from "./assets/one.png";
import two from "./assets/two.png";
import three from "./assets/three.png";
import four from "./assets/four.png";
import five from "./assets/five.png";
import six from "./assets/six.png";
import seven from "./assets/seven.png";
import eight from "./assets/eight.png";

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
            if (value.isMine){
                return openMine;
            }
            else { // show the correct number image depending on number of mines nearby
                switch(value.adjacentMines){
                    case 1: return one;
                    case 2: return two;
                    case 3: return three;
                    case 4: return four;
                    case 5: return five;
                    case 6: return six;
                    case 7: return seven;
                    case 8: return eight;

                    default: return open;
                }
            }
        }



        // default value
        return null;
    }

    render(){
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