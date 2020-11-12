import React from 'react';

export default class EnterStuff extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <input className="enterStuff" type="text" name="addNote" placeholder={this.props.placeholderText} onChange={this.props.controlFunc}/>
    );
  }
}
