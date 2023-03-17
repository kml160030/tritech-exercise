import React from "react";
import closed from "./assets/closed.png";

class Cell extends React.Component {
    getCellStatus(){
        let {value} = this.props;
        
        if(value == "closed"){
            return "src/assets/closed.png";
        }
        // default value
        return null;
    }

    render(){
        // let value = this.props;
        // return(
        //     <div>
        //         {this.getCellStatus}
        //     </div>
        // )
        return(<img src={closed}/>)
    }
}

export default Cell;