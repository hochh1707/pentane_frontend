import React from 'react';

export default class EnterStuffCenter extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <input className="enterStuffCenter" type="text" name="addNote" placeholder={this.props.placeholderText} onChange={this.props.controlFunc} onKeyDown={this.props.hitEnter}/>
    );
  }
}
