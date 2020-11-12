import React from 'react';

export default class ViewHeadline extends React.Component {
  render(){
    let headlineText = this.props.data;
    return(
      <div className="viewHeadline">{headlineText}</div>
    );
  }
}
