'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ViewHeadline = require('./ViewHeadline');

var _ViewHeadline2 = _interopRequireDefault(_ViewHeadline);

var _ViewLabel = require('./ViewLabel');

var _ViewLabel2 = _interopRequireDefault(_ViewLabel);

var _ViewMessageCenter = require('./ViewMessageCenter');

var _ViewMessageCenter2 = _interopRequireDefault(_ViewMessageCenter);

var _EnterStuff = require('./EnterStuff');

var _EnterStuff2 = _interopRequireDefault(_EnterStuff);

var _EnterStuffCenter = require('./EnterStuffCenter');

var _EnterStuffCenter2 = _interopRequireDefault(_EnterStuffCenter);

var _NextButton = require('./NextButton');

var _NextButton2 = _interopRequireDefault(_NextButton);

var _LongButtonCenter = require('./LongButtonCenter');

var _LongButtonCenter2 = _interopRequireDefault(_LongButtonCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPage = function (_React$Component) {
  _inherits(LoginPage, _React$Component);

  function LoginPage(props) {
    _classCallCheck(this, LoginPage);

    var _this = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));

    _this.handleUsernameTextChange = _this.handleUsernameTextChange.bind(_this);
    _this.handlePasswordTextChange = _this.handlePasswordTextChange.bind(_this);
    _this.handleClickLogin = _this.handleClickLogin.bind(_this);
    _this.state = {
      loginButtonBgColor: "#808080",
      username: null,
      password: null,
      userMessage: null
    };
    return _this;
  }

  _createClass(LoginPage, [{
    key: 'handleUsernameTextChange',
    value: function handleUsernameTextChange(e) {
      this.setState({ username: e.target.value });
    }
  }, {
    key: 'handlePasswordTextChange',
    value: function handlePasswordTextChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: 'handlePasswordTextChange',
    value: function handlePasswordTextChange(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: 'handleClickLogin',
    value: function handleClickLogin() {
      var that = this;
      //change button color momentarily
      that.setState({ loginButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          that.setState({ loginButtonBgColor: '#808080' });
        }, 100);
      });
      if (isNaN(parseInt(localStorage.getItem("failed_attempts")))) {
        //If failed attempts is not a number, just set it to 3
        localStorage.setItem("failed_attempts", 3);
      } else if (parseInt(localStorage.getItem("failed_attempts")) >= 3) {
        //If there are 3 failed attempts in the last three minutes, don't process the login
        var timeSinceLastFailed = Math.round((Date.now() - localStorage.getItem("last_attempt")) / 6000) / 10;
        if (timeSinceLastFailed < 3) {
          var failedMessage = "It has been " + timeSinceLastFailed + " minutes since the last failed attempt";
          that.setState({ userMessage: failedMessage });
          return;
        } else {
          //If it has been more than 3 minutes since the 3rd failed attempt, reset the counter
          localStorage.setItem("failed_attempts", 0);
        }
      }
      //This is where we try to login
      var urlForStuff = this.props.baseUrl + "/api/login/" + that.state.username + "/" + that.state.password;
      console.log("ddd53");
      fetch(urlForStuff, {
        method: "GET"
      }).then(function (response) {
        console.log(response.headers);
        return response.json();
      }).then(function (responseToLogin) {
        that.loginSuccessOrFail(responseToLogin);
      });
    }
  }, {
    key: 'loginSuccessOrFail',
    value: function loginSuccessOrFail(responseToLogin) {
      var that = this;
      var uMessage = null;
      if (responseToLogin == true) {
        //Yay! The login attempt succeeded!
        localStorage.setItem("logged_in", "yes");
        localStorage.setItem("login_date", Date.now());
        localStorage.setItem("failed_attempts", 0);
        localStorage.setItem("username", that.state.username);
        localStorage.setItem("password", that.state.password);
        that.setState({ userMessage: "Logged in!" });
        //Reload the page and it will go to the app
        setTimeout(function () {
          location.reload();
        }, 1000);
      } else {
        //If the login attempt fails
        if (parseInt(localStorage.getItem("failed_attempts")) < 3) {
          //Record the number and timestamp of the failed login attempt
          localStorage.setItem("failed_attempts", parseInt(localStorage.getItem("failed_attempts")) + 1);
          localStorage.setItem("last_attempt", Date.now());
          uMessage = localStorage.getItem("failed_attempts") + " failed attempts";
          that.setState({ userMessage: uMessage });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'viewWrapper' },
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewHeadline2.default, { data: 'Login to Renthousemogul' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_EnterStuffCenter2.default, { placeholderText: 'Enter your usernameeee', controlFunc: this.handleUsernameTextChange })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_EnterStuffCenter2.default, { placeholderText: 'Enter your password', controlFunc: this.handlePasswordTextChange })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewMessageCenter2.default, { data: this.state.userMessage })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_LongButtonCenter2.default, { buttonLabel: 'Submit', bgColor: this.state.loginButtonBgColor, controlFunc: this.handleClickLogin })
        )
      );
    }
  }]);

  return LoginPage;
}(_react2.default.Component);

exports.default = LoginPage;