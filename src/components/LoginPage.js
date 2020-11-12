import React from 'react';
import ViewHeadline from './ViewHeadline';
import ViewLabel from './ViewLabel';
import ViewMessageCenter from './ViewMessageCenter';
import EnterStuff from './EnterStuff';
import EnterStuffCenter from './EnterStuffCenter';
import NextButton from './buttonForward';
import LongButtonCenter from './LongButtonCenter';

export default class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.handleUsernameTextChange = this.handleUsernameTextChange.bind(this);
    this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleHitEnter = this.handleHitEnter.bind(this);
    this.state = {
      loginButtonBgColor: "#808080",
      username: null,
      password: null,
      userMessage: null,
    };
  }
  handleUsernameTextChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordTextChange(e){
    this.setState({password: e.target.value});
  }
  handlePasswordTextChange(e){
    this.setState({password: e.target.value});
  }
  handleHitEnter(e){
    if(e.keyCode==13){
      this.handleClickLogin();
    }
  }
  handleClickLogin(){
    let that = this
    //change button color momentarily
    this.setState({loginButtonBgColor: '#fb3621'},()=>{setTimeout(()=>{this.setState({loginButtonBgColor: '#808080'});},100);});
    if(isNaN(parseInt(localStorage.getItem("failed_attempts")))) {
      //If failed attempts is not a number, just set it to 3
      localStorage.setItem("failed_attempts",3);
    }else if(parseInt(localStorage.getItem("failed_attempts")) >= 3){
      //If there are 3 failed attempts in the last three minutes, don't process the login
      let timeSinceLastFailed = Math.round((Date.now() - localStorage.getItem("last_attempt"))/6000)/10;
      if(timeSinceLastFailed < 3){
        let failedMessage = "It has been " + timeSinceLastFailed + " minutes since the last failed attempt";
        this.setState({userMessage: failedMessage});
        return
      }else{
        //If it has been more than 3 minutes since the 3rd failed attempt, reset the counter
        localStorage.setItem("failed_attempts",0);
      }
    }
    //This is where we try to login
    fetch(this.props.baseUrl + "/api/login/" + this.state.username + "/" + this.state.password,{
      method: "GET"
    }).then(function(response){
        return response.json();
      }).then(function(responseToLogin){
        that.loginSuccessOrFail(responseToLogin);
      })
  }
  loginSuccessOrFail(responseToLogin){
    let uMessage = null;
    if(responseToLogin == true){
      //login attempt succeeded
      localStorage.setItem("logged_in", "yes");
      localStorage.setItem("login_date", Date.now());
      localStorage.setItem("failed_attempts",0);
      localStorage.setItem("username", this.state.username);
      localStorage.setItem("password", this.state.password);
      this.setState({userMessage: "Logged in!"})
      //Reload the page and it will go to the app
      setTimeout(()=>{location.reload();},1000);
    }else{
      //If the login attempt fails
      if(parseInt(localStorage.getItem("failed_attempts")) < 3){
        //Record the number and timestamp of the failed login attempt
        localStorage.setItem("failed_attempts",parseInt(localStorage.getItem("failed_attempts")) + 1);
        localStorage.setItem("last_attempt",Date.now());
        uMessage = localStorage.getItem("failed_attempts") + " failed attempts";
        this.setState({userMessage: uMessage});
      }
    }
  }
  render(){
    return(
      <div className="viewWrapper">
        <div className="rowWrapper">
          <ViewHeadline data="Login to Renthousemogul" />
        </div>
        <div className="rowWrapper">
          <EnterStuffCenter placeholderText="Enter your username" controlFunc={this.handleUsernameTextChange}/>
        </div>
        <div className="rowWrapper">
          <EnterStuffCenter placeholderText="Enter your password" hitEnter={this.handleHitEnter} controlFunc={this.handlePasswordTextChange}/>
        </div>
        <div className="rowWrapper">
          <ViewMessageCenter data={this.state.userMessage}/>
        </div>
        <div className="rowWrapper">
          <LongButtonCenter buttonLabel="Submit" bgColor={this.state.loginButtonBgColor} controlFunc={this.handleClickLogin}/>
        </div>
      </div>
    )
  }
}
