'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ViewProp = require('./components/ViewProp');

var _ViewProp2 = _interopRequireDefault(_ViewProp);

var _LoginPage = require('./components/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BeginHere = function (_React$Component) {
  _inherits(BeginHere, _React$Component);

  function BeginHere(props) {
    _classCallCheck(this, BeginHere);

    return _possibleConstructorReturn(this, (BeginHere.__proto__ || Object.getPrototypeOf(BeginHere)).call(this, props));
  }

  _createClass(BeginHere, [{
    key: 'render',
    value: function render() {
      if (localStorage.getItem("logged_in") == "yes") {
        var daysSinceLoggedIn = (Date.now() - parseInt(localStorage.getItem("login_date"))) / (86400 * 1000);
        if (daysSinceLoggedIn > 3) {
          localStorage.setItem("logged_in", "no");
          return _react2.default.createElement(_LoginPage2.default, { baseUrl: this.props.baseUrl });
        }
        return _react2.default.createElement(_ViewProp2.default, { baseUrl: this.props.baseUrl });
      } else {
        return _react2.default.createElement(_LoginPage2.default, { baseUrl: this.props.baseUrl });
      }
    }
  }]);

  return BeginHere;
}(_react2.default.Component);

//ReactDOM.render(<BeginHere baseUrl = "http://127.0.0.1:5000" />, document.getElementById('viewEditSingleProp'));


_reactDom2.default.render(_react2.default.createElement(BeginHere, { baseUrl: 'http://www.api.heyrental.com' }), document.getElementById('viewEditSingleProp'));