import React from 'react';

export default class EnterStuffLeft extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let value = ""
    let placeholder = ""
    if(this.props.type=="filter2"){
      value = this.props.data.filter2SearchString;
      placeholder = "Enter search text"
    }if(this.props.type=="enter_note"){
      value = ""
      placeholder = "Enter your note here"
    }
    return(
      <input className="enterStuffLeft" type="text" name="addNote"
      placeholder={placeholder}
      onKeyDown={this.props.hitEnter.bind(null,this.props.type)}
      onChange={this.props.controlFunc}/>
    );
  }
}