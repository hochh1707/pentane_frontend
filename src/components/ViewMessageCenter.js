import React from 'react';

export default class ViewMessageCenter extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="viewMessageCenter">{this.props.data}</div>
    );    
  }
}
