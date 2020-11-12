import React from 'react';
import ApiCalls from './ApiCalls';
import ReactDOM from 'react-dom';
import EnterStuffLeft from './EnterStuffLeft';
import ButtonForward from './buttonForward';
import ButtonBackward from './buttonBackward';
import SmallButton from './SmallButton';
import ViewData from './ViewData';
import ViewLabel from './ViewLabel';
import ViewList from './ViewList';
import Failed from './Failed';
import LoginPage from './LoginPage';
import Logout from './Logout';

export default class ViewProp extends React.Component {
  constructor(rprops){
    super(rprops);
    this.state = {
      baseUrl: this.props.baseUrl,
      noteText: '',
      startRecord: 0,
      recordIndexThisPage: 0,
      recordNum: 0,
      recordCount: 0,
      recordCountTotal: 0,
      waitingForUpdate: 0,
      myJson: '',
      forwardButtonBgColor: '#808080',
      backwardButtonBgColor: '#808080',
      addNoteButtonBgColor: '#808080',
      filter1ButtonBgColor: '#808080',
      filter2ButtonBgColor: '#808080',
      searchButtonBgColor: '#808080',
      clearSearchButtonBgColor: '#808080',
      logoutButtonBgColor: '#3d3d3d',
      okToRender: 0,
      filter1: 'all',
      filter2Field: 'property_address_contains',
      filter2SearchString: '',
      filter2ActiveSearchString: '',
      filter2Highlight: ""
    };
    this.handleNoteTextChange = this.handleNoteTextChange.bind(this);
    this.handleChangeFilter2SearchString = this.handleChangeFilter2SearchString.bind(this);
    this.hitEnter = this.hitEnter.bind(this);
    this.handleMouseDownForward = this.handleMouseDownForward.bind(this);
    this.handleMouseUpForward = this.handleMouseUpForward.bind(this);
    this.handleMouseDownBackward = this.handleMouseDownBackward.bind(this);
    this.handleMouseUpBackward = this.handleMouseUpBackward.bind(this);
    this.handleClickPaginator = this.handleClickPaginator.bind(this);
    this.handleClickAddNote = this.handleClickAddNote.bind(this);
    this.handleClickFilter1 = this.handleClickFilter1.bind(this);
    this.handleClickFilter2 = this.handleClickFilter2.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleClickClearSearch = this.handleClickClearSearch.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.receiveFromApi = this.receiveFromApi.bind(this);
    this.getFromApi = this.getFromApi.bind(this);
  }
  componentDidMount(){
    this.getFromApi();
  }
  receiveFromApi(objReturnApiData){
    this.setState({
      myJson: objReturnApiData.myJson,
      recordCount: objReturnApiData.recordCount,
      recordCountTotal: objReturnApiData.recordCountTotal,
      okToRender: objReturnApiData.okToRender,
      waitingForUpdate: objReturnApiData.waitingForUpdate
    });
  }
  getFromApi(){
    let objApiCalls = new ApiCalls();
    objApiCalls.getPropertyRecords(this.receiveFromApi,this.state);
  }
  handleClickPaginator(newStartRecord,e){
    this.setState({
      waitingForUpdate: 1,
      recordIndexThisPage: 0,
      startRecord: newStartRecord,
    },()=>this.getFromApi());
  }
  handleNoteTextChange(e){
    this.setState({noteText: e.target.value});
  }
  handleChangeFilter2SearchString(e){
    this.setState({filter2SearchString: e.target.value});
  }
  handleMouseDownForward(e){
    // change background color of button momentarily
    this.setState({forwardButtonBgColor: '#fb3621'},()=>{setTimeout(()=>{this.setState({forwardButtonBgColor: '#808080'});},100);});
    // if user clicks once, advance by one record
    if(this.state.recordIndexThisPage >= this.state.recordCount-1){
      this.setState({recordIndexThisPage: 0});
    }else{
      this.setState({recordIndexThisPage: this.state.recordIndexThisPage + 1});
    }
    // if user holds down button, advance records really fast
    this.forwardTimer = setTimeout(()=>{
      this.forwardInterval = setInterval(()=>{
        if(this.state.recordIndexThisPage >= this.state.recordCount-1){
          this.setState({recordIndexThisPage: 0});
        }else{
          this.setState({recordIndexThisPage: this.state.recordIndexThisPage + 1});
        }
      },15);
    },700)
  }
  handleMouseUpForward(e){
    // stop advancing records when user releases button
    clearTimeout(this.forwardTimer);
    clearInterval(this.forwardInterval);
  }
  handleMouseDownBackward(e){
    // change background color of button momentarily
    this.setState({backwardButtonBgColor: '#fb3621'},()=>{setTimeout(()=>{this.setState({backwardButtonBgColor: '#808080'});},100);});
    // if user clicks once, go back by one record
    if(this.state.recordIndexThisPage > 0){
      this.setState({recordIndexThisPage: this.state.recordIndexThisPage - 1});
    }else{
      this.setState({recordIndexThisPage: this.state.recordCount-1});
    }
    // if user holds down button, go backwards really fast
    this.forwardTimer = setTimeout(()=>{
      this.forwardInterval = setInterval(()=>{
        if(this.state.recordIndexThisPage > 0){
          this.setState({recordIndexThisPage: this.state.recordIndexThisPage - 1});
        }else{
          this.setState({recordIndexThisPage: this.state.recordCount - 1});
        }    
      },15);
    },700)
  }
  handleMouseUpBackward(e){
    // stop advancing records when user releases button
    clearTimeout(this.forwardTimer);
    clearInterval(this.forwardInterval);
  }
  handleClickAddNote(e){
    //if we are waiting on the api to update, don't do anything except change button color for a moment
    if(this.state.waitingForUpdate == 1){
      this.setState({addNoteButtonBgColor: '#404040'},()=>{setTimeout(()=>{this.setState({addNoteButtonBgColor: '#808080'});},100);});
      return
    }
    const urlForApi = this.props.baseUrl + "/api/add_note/" + this.state.myJson[this.state.recordIndexThisPage]['pid'];
    fetch(urlForApi,{
      method: "POST",
      body: JSON.stringify(
        {
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          note: this.state.noteText,
        }
      )
    }).then(()=>{this.getFromApi();})
    //change button color momentarily
    this.setState({addNoteButtonBgColor: '#fb3621'},()=>{setTimeout(()=>{this.setState({addNoteButtonBgColor: '#808080'});},100);});
  }
  handleClickFilter1(e){
    if(this.state.waitingForUpdate == 1){
      //if we are waiting on the api to update, don't do anything except change button color for a moment
      this.setState({filterButtonBgColor: '#404040'},()=>{setTimeout(()=>{this.setState({filterButtonBgColor: '#808080'});},100);});
      return
    }
    this.setState({filterButtonBgColor: '#fb3621'},()=>{
      setTimeout(()=>{this.setState({filterButtonBgColor: '#808080'});},100);});
    if(this.state.filter1 == "all"){
      this.setState({filter1: "mailings",waitingForUpdate:1,recordIndexThisPage:0,startRecord:0},()=>this.getFromApi());
    }else if(this.state.filter1 == "mailings"){
      this.setState({filter1: "notes",waitingForUpdate:1,recordIndexThisPage:0,startRecord:0},()=>this.getFromApi());
    }else{
      this.setState({filter1: "all",waitingForUpdate:1,recordIndexThisPage:0,startRecord:0},()=>this.getFromApi());
    }
  }
  handleClickFilter2(e){
    if(this.state.waitingForUpdate == 1){
      //if we are waiting on the api to update, don't do anything except change button color momentarily
      this.setState({filter2ButtonBgColor: '#404040'},()=>{setTimeout(()=>{this.setState({filter2ButtonBgColor: '#808080'});},100);});
      return
    }
    if(this.state.filter2Field == "property_address_contains"){
      this.setState({filter2Field: "property_address_does_not_contain"});
    }else if(this.state.filter2Field == "property_address_does_not_contain"){
      this.setState({filter2Field: "owner_name_contains"});
    }else if(this.state.filter2Field == "owner_name_contains"){
      this.setState({filter2Field: "owner_name_does_not_contain"});
    }else if(this.state.filter2Field == "owner_name_does_not_contain"){
      this.setState({filter2Field: "owner_address_contains"});
    }else if(this.state.filter2Field == "owner_address_contains"){
      this.setState({filter2Field: "owner_address_does_not_contain"});
    }else if(this.state.filter2Field == "owner_address_does_not_contain"){
      this.setState({filter2Field: "property_address_contains"});
    }else{
      this.setState({filter2Field: "property_address_contains"});
    }
    //change button color momentarily
    this.setState({filter2ButtonBgColor: '#fb3621'},()=>{setTimeout(()=>{this.setState({filter2ButtonBgColor: '#808080'});},100);});
  }
  hitEnter(type,e){
    if(e.keyCode==13 && type=="filter2"){
      this.handleClickSearch();
    }else if(e.keyCode==13 && type=="enter_note"){
      this.handleClickAddNote();
    }
  }
  handleClickSearch(e){
    //if we are waiting on the api, don't do anything except turn the button gray for a moment
    if(this.state.waitingForUpdate == 1){
      this.setState({searchButtonBgColor: '#404040'},()=>{setTimeout(()=>{this.setState({searchButtonBgColor: '#808080'});},100);});
      return
    }
    //figure out which field to highlight
    let highlight="";
    if(this.state.filter2Field=="property_address_contains" || this.state.filter2Field=="property_address_does_not_contain"){
      highlight = "Property address"
    }else if(this.state.filter2Field=="owner_address_contains" || this.state.filter2Field=="owner_address_does_not_contain"){
      highlight = "Owner address"
    }else if(this.state.filter2Field=="owner_name_contains" || this.state.filter2Field=="owner_name_does_not_contain"){
      highlight = "Owner name"
    }
    this.setState({
      filter2Highlight: highlight,
      searchButtonBgColor: '#fb3621',
      filter2ActiveSearchString: this.state.filter2SearchString,
      waitingForUpdate: 1,
      recordIndexThisPage: 0,
      startRecord: 0
    },()=>{setTimeout(()=>{
      this.setState({searchButtonBgColor: '#808080'});
      this.getFromApi();
    },100);});
  }
  handleClickClearSearch(e){
    //if we are waiting on the api, don't do anything except turn the button gray for a moment
    if(this.state.waitingForUpdate == 1){
      this.setState({clearSearchButtonBgColor: '#404040'},()=>{setTimeout(()=>{this.setState({clearSearchButtonBgColor: '#808080'});},100);});
      return
    }
    this.setState({
      clearSearchButtonBgColor: '#fb3621',
      waitingForUpdate: 1,
      startRecord: 0,
      recordIndexThisPage: 0,
      filter2ActiveSearchString: "",
      filter2Highlight: ""
    },()=>{
      this.getFromApi();
      setTimeout(()=>{this.setState({clearSearchButtonBgColor: '#808080'});},100);});
  }
  handleClickLogout(){
    //change button color momentarily
    this.setState({logoutButtonBgColor: '#fb3621'},()=>{setTimeout(()=>{this.setState({logoutButtonBgColor: '#3d3d3d'});},100);});
    localStorage.setItem("logged_in","no");
    localStorage.setItem("username","");
    localStorage.setItem("password","");
    setTimeout(()=>{location.reload();},1000);
  }
  renderViewSingleProp(){
    return(
        <div className="viewWrapper">
          <div className="rowWrapper">
            <ViewLabel label="Record Count"/>
            <ViewData data={this.state} type="counter" click={this.handleClickPaginator}/>
          </div>
          <div className="rowWrapper">
            <ViewLabel label={"PID"}/>
            <ViewData data={this.state} type="pid"/>
          </div>
          <div className="rowWrapper">
            <ViewLabel highlight={this.state.filter2Highlight} label={"Property address"}/>
            <ViewData data={this.state} type="property_address"/>
          </div>
          <div className="rowWrapper">
            <ViewLabel label={"Improvement type"}/>
            <ViewData data={this.state} type="improvement_type"/>
          </div>
          <div className="rowWrapper">
            <ViewLabel label={"Improvement size(sf)"}/>
            <ViewData data={this.state} type="improvement_size"/>
          </div>
          <div className="rowWrapper">
            <ViewLabel highlight={this.state.filter2Highlight} label={"Owner name"}/>
            <ViewData data={this.state} type="owner_name"/>
          </div>
          <div className="rowWrapper">
            <ViewLabel highlight={this.state.filter2Highlight} label={"Owner address"}/>
            <ViewData data={this.state} type="owner_address"/>
          </div>
          <div className="rowWrapper">
            <ViewLabel label={"Mailing dates"}/>
            <ViewList data={this.state} type="mailings" update={()=>{this.getFromApi()}}/>
          </div>
          <div className="rowWrapper">
            <ViewLabel label={"Notes"}/>
            <ViewList data={this.state} update={()=>{this.getFromApi()}} type="notes"/>
          </div>
          <div className="rowWrapper">
            <ButtonForward buttonLabel="Forward" bgColor={this.state.forwardButtonBgColor} mousedown={this.handleMouseDownForward} mouseup={this.handleMouseUpForward}/>
          </div>
          <div className="rowWrapper">
            <ButtonBackward buttonLabel="Backward" bgColor={this.state.backwardButtonBgColor} mousedown={this.handleMouseDownBackward} mouseup={this.handleMouseUpBackward}/>
          </div>
          <div className="rowWrapper">
            <ButtonForward buttonLabel={"Filter 1: " + this.state.filter1} bgColor={this.state.filterButtonBgColor} controlFunc={this.handleClickFilter1}/>
          </div>
          <div className="rowWrapper">
            <ButtonForward buttonLabel={"Filter 2: " + this.state.filter2Field} bgColor={this.state.filter2ButtonBgColor} controlFunc={this.handleClickFilter2}/>
          </div>
          <div className="rowWrapper">
            <EnterStuffLeft 
                  data={this.state} 
                  type={"filter2"}
                  controlFunc={this.handleChangeFilter2SearchString} 
                  hitEnter={this.hitEnter}/>
            <SmallButton caption={"Search"} bgColor={this.state.searchButtonBgColor} controlFunc={this.handleClickSearch}/>
            <SmallButton caption={"Clear Search"} bgColor={this.state.clearSearchButtonBgColor} controlFunc={this.handleClickClearSearch}/>
          </div>
          <div className="rowWrapper">
            <EnterStuffLeft 
                  type={"enter_note"}
                  placeholderText="Enter your note here" 
                  controlFunc={this.handleNoteTextChange}
                  hitEnter={this.hitEnter}/>
            <SmallButton
                  caption="Add note"
                  bgColor={this.state.addNoteButtonBgColor}
                  controlFunc={this.handleClickAddNote}
                  pid={this.state.myJson['pid']}
                  noteText={this.state.noteText}/>
            </div>
          <div className="rowWrapper">
            <Logout bgColor={this.state.logoutButtonBgColor} controlFunc={this.handleClickLogout}/>
          </div>
        </div>
    );
  }
  render(){
    if(this.state.okToRender == 1){
      return(
          this.renderViewSingleProp()
      )
    }else{
      return(
        <div className="viewWrapper">
          <div className="rowWrapper">
            <Failed data="No data available" />
          </div>
        </div>
      );
    }
  }
}
