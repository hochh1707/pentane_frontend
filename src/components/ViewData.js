import React from 'react';

export default class ViewData extends React.Component {
  constructor(props){
    super(props);
    this.click = this.click.bind(this);
    this.expandSize = this.expandSize.bind(this);
    this.reduceSize = this.reduceSize.bind(this);
    this.state = {maxHeight:'60px'}
  }




  click(){
    if(this.state.maxHeight == '60px'){
      this.expandSize();
    }else if(this.state.maxHeight == 'none'){
      this.reduceSize();
    }
  }
  expandSize(){
    this.setState({maxHeight:'none'});
  }
  reduceSize(){
    this.setState({maxHeight:'60px'});
  }




  renderDataNonCounter(){
    let renderData = "[none]";
    if(this.props.data.waitingForUpdate == 1){
      renderData = "Updating ...";
    }else{
      try{
        // Props.type can be property_address, owner_name, etc. This line will render whichever type of data it needs to.
        renderData = this.props.data.myJson[this.props.data.recordIndexThisPage][this.props.type];
      }catch(e){
        //console.log('error displaying data');
      }
    }
    return renderData;
  }




  recordCounter(){
    let renderData = "";
    if(this.props.data.recordCount == 0){
      renderData = "No search results!";
    }else{
      renderData = "Record no. " + (this.props.data.recordIndexThisPage + this.props.data.startRecord) + 
      " in " + this.props.data.startRecord + "..." + (this.props.data.startRecord + this.props.data.recordCount - 1) + 
      " (total: " + this.props.data.recordCountTotal + ")";
    }
    return renderData;
  }




  paginator(){
    let arrayOfPages = [];
    if(this.state.maxHeight == "none"){
      if(this.props.data.recordCountTotal<1000 || this.props.data.recordCount == 0){return arrayOfPages;}
      let i=0;
      while(i<this.props.data.recordCountTotal){
        if(i+1000>this.props.data.recordCountTotal){
          arrayOfPages.push(<p onClick={this.props.click.bind(null,i)}>{i}{"..."}{this.props.data.recordCountTotal}</p>);
        }else{
          arrayOfPages.push(<p onClick={this.props.click.bind(null,i)}>{i}{"..."}{i+999}</p>);
        }
        i+=1000;
      }
    }
    return arrayOfPages;
  }




  render(){
    let arrayOfPages = [];
    let renderData = "";
    if(this.props.type == "counter"){
      arrayOfPages = this.paginator();
      renderData = this.recordCounter();
    }else{
      renderData = this.renderDataNonCounter();
    }
    return(<div className="viewData" onClick={this.click} style={{maxHeight: this.state.maxHeight}}>{renderData}{arrayOfPages}</div>);
    }





  }
