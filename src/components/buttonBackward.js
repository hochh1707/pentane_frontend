import React from 'react';

export default class BackwardButton extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="backwardButton"
      onMouseDown={this.props.mousedown}
      onMouseUp={this.props.mouseup}
      style={{backgroundColor: this.props.bgColor}}
      >{this.props.buttonLabel}
      </div>);
  }
}
