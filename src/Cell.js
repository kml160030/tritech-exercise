import React from "react";
import closed from "./assets/closed.png";
import open from "./assets/open.png";
import './Cell.css';

export default class Cell extends React.Component {
    getCellStatus(){
        let {value} = this.props;
        if(!value.isRevealed){
            return closed;
        }
        if(value.isRevealed){
            return open;
        }
        // default value
        return null;
    }

    render(){
        // const value = this.props;
        return(
            <div className="cell" onClick={this.props.onClick}>
                <img class="responsive" src={this.getCellStatus()}/>
            </div>
        );
    }
}