import React from 'react';

export default class ViewLabel extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let highlight = "";
    if(this.props.highlight == this.props.label){highlight = "5px solid orange";}
    return(<div className="viewLabel" style={{boxSizing: "border-box", border: highlight, backgroundColor: "#333333"}}>{this.props.label}</div>);
  }
}
