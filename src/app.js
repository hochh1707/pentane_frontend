import React from 'react';
import ReactDOM from 'react-dom';
import ViewProp from './components/ViewProp';
import LoginPage from './components/LoginPage';

class BeginHere extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(localStorage.getItem("logged_in") == "yes"){
      let daysSinceLoggedIn = (Date.now() - parseInt(localStorage.getItem("login_date")))/(86400*1000);
      if(daysSinceLoggedIn < 3){
        return(<ViewProp baseUrl={this.props.baseUrl}/>);
      }else{
        localStorage.setItem("logged_in","no");
      }
    }
    return(<LoginPage baseUrl={this.props.baseUrl}/>);
  }
}

ReactDOM.render(<BeginHere baseUrl = "http://127.0.0.1:5000" />, document.getElementById('viewEditSingleProp'));
//ReactDOM.render(<BeginHere baseUrl="http://www.api.heyrental.com" />, document.getElementById('viewEditSingleProp'));
