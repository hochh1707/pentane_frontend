'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewList = function (_React$Component) {
  _inherits(ViewList, _React$Component);

  function ViewList(props) {
    _classCallCheck(this, ViewList);

    var _this = _possibleConstructorReturn(this, (ViewList.__proto__ || Object.getPrototypeOf(ViewList)).call(this, props));

    _this.toggleSize = _this.toggleSize.bind(_this);
    _this.state = { big: false };
    return _this;
  }

  _createClass(ViewList, [{
    key: 'toggleSize',
    value: function toggleSize() {
      this.state.big ? this.setState({ big: false }) : this.setState({ big: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var that = this;
      var viewSize = { maxHeight: '60px' };
      var countData = 0;
      var dataText = "[none]";
      if (this.props.type == "mailings" || this.props.type == "notes") {
        try {
          countData = that.props.data.myJson[that.props.data.recordNum][this.props.type].length;
          if (that.state.big && countData > 1) {
            dataText = that.props.data.myJson[that.props.data.recordNum][this.props.type].map(function (i) {
              return _react2.default.createElement(
                'p',
                null,
                i
              );
            });
            viewSize = { maxHeight: '600px' };
          } else if (countData > 1) {
            dataText = that.props.data.myJson[that.props.data.recordNum][this.props.type][0] + " ... [plus " + (countData - 1) + " more]";
          } else if (countData == 1) {
            dataText = dataText = that.props.data.myJson[that.props.data.recordNum][this.props.type][0];
          }
        } catch (e) {}
      }
      return _react2.default.createElement(
        'div',
        { className: 'viewData', style: viewSize,
          onMouseEnter: this.toggleSize,
          onMouseLeave: this.toggleSize
        },
        _react2.default.createElement(
          'p',
          null,
          dataText
        )
      );
    }
  }]);

  return ViewList;
}(_react2.default.Component);

exports.default = ViewList;