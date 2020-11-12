import React from 'react';

export default class ForwardButton extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="forwardButton"
      onClick={this.props.controlFunc}
      onMouseDown={this.props.mousedown}
      onMouseUp={this.props.mouseup}
      style={{backgroundColor: this.props.bgColor}}
      >{this.props.buttonLabel}
      </div>);
  }
}
