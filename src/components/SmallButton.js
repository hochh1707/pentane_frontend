import React from 'react';

export default class SmallButton extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div
      style={{backgroundColor: this.props.bgColor}}
      className="smallButton"
      onClick={this.props.controlFunc}
      >{this.props.caption}</div>);
  }
}
