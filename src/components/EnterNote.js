import React from 'react';

export default class EnterNote extends React.Component {
  constructor(props){
    super(props);
  }
  render(){ 
    return(
      <input className="enterNote" type="text" name="addNote" 
      placeholder={"Enter your note here"} 
      onChange={this.props.controlFunc}/>
    );
  }
}
