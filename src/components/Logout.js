import React from 'react';

export default class Logout extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="logout"
      onClick={this.props.controlFunc}
      style={{backgroundColor: this.props.bgColor}}
      >Logout</div>
    );
  }
}
