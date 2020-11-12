import React from 'react';

export default class Failed extends React.Component {
  render(){
    let labelText = "failed";
    if(this.props.data) {
       labelText = this.props.data;
     }
    return(
      <div className="ViewLabel">{labelText}</div>
    );
  }
}
