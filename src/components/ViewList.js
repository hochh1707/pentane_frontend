import React from 'react';

export default class ViewList extends React.Component {
  constructor(props){
    super(props);
    this.expandSize = this.expandSize.bind(this);
    this.reduceSize = this.reduceSize.bind(this);
    this.handleClickNotesOptions = this.handleClickNotesOptions.bind(this);
    this.handleClickAddMailing = this.handleClickAddMailing.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState(){
    return {
      pidToAddMailing: this.props.data.myJson[this.props.data.recordIndexThisPage]['pid'],
      viewHeight: 60,
      showOptionsForNoteId: 0,
      mailingBgColor: "#afeeee",
      confirmAddMailing: 0          
    };
  }

  expandSize(){
    this.setState({viewHeight: 600});
  }
  reduceSize(){
    this.setState({viewHeight: 60});
  }

  handleClickNotesOptions(noteId,action){
    this.setState({showOptionsForNoteId: noteId});
    if(action=="delete"){
      fetch(this.props.data.baseUrl + "/api/delete_note/" + noteId,{
        method: "POST",
        body: JSON.stringify(
          {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
          }
        )
      }).then(()=>{this.props.update();})
    }
  }

  notesData(){
    let countData = 0;
    let dataText = "[none]";
    try{
      // find out how many notes there are for current property
      countData = this.props.data.myJson[this.props.data.recordIndexThisPage]['notes'].length;
    }catch(e){}
    if(countData>1 && this.state.viewHeight > 60){
      //allows user to click to delete a note
      dataText = this.notesWithOptions();
    }else if(countData>1){
      //if the notes box is minimized but there are multiple notes, the user must maximize it before being able to delete notes
      dataText = this.props.data.myJson[this.props.data.recordIndexThisPage]['notes'][0]['note'];
      dataText += " [plus " + (countData-1) + " more...]";
    }else if(countData==1){
      //allows user to click to delete a note
      dataText = this.notesWithOptions();
    }
    return dataText;
  }

  notesWithOptions(){
    return this.props.data.myJson[this.props.data.recordIndexThisPage]['notes'].map(i=>{
      if(i['noteId']==this.state.showOptionsForNoteId){
        return <div><p onClick={()=>this.handleClickNotesOptions(i['noteId'])}>{i['note']}</p>
        <div style={{listStyle: "none",display: "inline-flex"}}>
          <li onClick={()=>this.handleClickNotesOptions(i['noteId'],"delete")}>| delete |</li>
          </div>
        </div>;
      }else{
        return <p onClick={()=>this.handleClickNotesOptions(i['noteId'],"expand")}>{i['note']}</p>;
      }
    });
  }

  handleClickAddMailing(action,pid){
    if(action=="ask_to_confirm"){
      this.setState({mailingBgColor: "#cc7a00", confirmAddMailing: 1, pidToAddMailing: this.props.data.myJson[this.props.data.recordIndexThisPage]['pid']});
    }else if(action=="confirm"){
      fetch(this.props.data.baseUrl + "/api/add_mailing/" + pid,{
        method: "POST",
        body: JSON.stringify(
          {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
          }
        )
      }).then(
        ()=>{
          this.props.update();
          this.setState(this.getInitialState);
        }
      )
    }else if(action=="cancel"){
      this.setState({mailingBgColor: "#afeeee", confirmAddMailing: 0});
    }
  }

  confirmAddMailing(){
    try{
      //if user clicks forward or back when confirm add mailing is displayed, then reset the component
      if(this.state.pidToAddMailing != this.props.data.myJson[this.props.data.recordIndexThisPage]['pid']){this.setState(this.getInitialState);}
    }catch(e){}
    let objDate = new Date();
    let dd = String(objDate.getDate()).padStart(2,"0");
    let mmm = objDate.toLocaleString('default', { month: 'short' });
    let yy = objDate.getFullYear().toString().substr(2,2);
    return "Confirm add mailing: " + dd + "-" + mmm + "-" + yy;;
  }

  mailingData(){
    let mailingText = "[none]";
    let countMailings = 0;
    try{
      countMailings = this.props.data.myJson[this.props.data.recordIndexThisPage]['mailings'].length;
    }catch(e){}
    if(countMailings>1 && this.state.viewHeight == 600){
      mailingText = this.props.data.myJson[this.props.data.recordIndexThisPage]['mailings'].map(i=>{return <p>{i}</p>;})
    }else if(countMailings>1){
      mailingText = this.props.data.myJson[this.props.data.recordIndexThisPage]['mailings'][0];
      mailingText += " [plus " + (countMailings-1) + " more...]";
    }else if(countMailings==1){
      mailingText = this.props.data.myJson[this.props.data.recordIndexThisPage]['mailings'].map(i=>{return <p>{i}</p>;})
    }
    return mailingText;
  }

  render(){
    let dataText = "[none]";
    if(this.props.data.waitingForUpdate == 1){
      dataText = "Updating...";
      return(
        <div className="viewList" 
            style={{maxHeight: this.state.viewHeight + 'px'}}
            onMouseEnter={this.expandSize}
            onMouseLeave={this.reduceSize}>
            <p>{dataText}</p></div>
      );  
    }else if(this.props.type == "notes"){
      return(
        <div className="viewList" 
            style={{maxHeight: this.state.viewHeight + 'px'}}
            onMouseEnter={this.expandSize}
            onMouseLeave={this.reduceSize}>
            <p>{this.notesData()}</p></div>
      );
    }else if(this.props.type == "mailings" && this.state.confirmAddMailing == 1){
      return(
        <div className="viewList" style={{maxHeight: '200px', backgroundColor: this.state.mailingBgColor}}>
            <p>{this.confirmAddMailing()}</p>
            <div style={{listStyle: "none",display: "inline-flex"}}>
              <li onClick={()=>this.handleClickAddMailing("confirm",this.props.data.myJson[this.props.data.recordIndexThisPage]['pid'])}>| Yes &nbsp;</li>
              <li onClick={()=>this.handleClickAddMailing("cancel")}>| Cancel |</li>
            </div>
            </div>
      );
    }else if(this.props.type == "mailings"){
      return(
        <div className="viewList"
            style={{maxHeight: this.state.viewHeight + 'px', backgroundColor: this.state.mailingBgColor}}
            onClick={()=>{this.handleClickAddMailing("ask_to_confirm")}}
            onMouseEnter={this.expandSize}
            onMouseLeave={this.reduceSize}>
            <p>{this.mailingData()}</p></div>
      );
    }
  }
}