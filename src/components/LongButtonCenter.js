import React from 'react';

export default class LongButtonCenter extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="longButtonCenter"
      onClick={this.props.controlFunc}
      style={{backgroundColor: this.props.bgColor}}
      >{this.props.buttonLabel}
      </div>);
  }
}
