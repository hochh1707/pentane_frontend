'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _EnterStuff = require('./EnterStuff');

var _EnterStuff2 = _interopRequireDefault(_EnterStuff);

var _EnterStuffLeft = require('./EnterStuffLeft');

var _EnterStuffLeft2 = _interopRequireDefault(_EnterStuffLeft);

var _NextButton = require('./NextButton');

var _NextButton2 = _interopRequireDefault(_NextButton);

var _SmallButton = require('./SmallButton');

var _SmallButton2 = _interopRequireDefault(_SmallButton);

var _ViewData = require('./ViewData');

var _ViewData2 = _interopRequireDefault(_ViewData);

var _ViewLabel = require('./ViewLabel');

var _ViewLabel2 = _interopRequireDefault(_ViewLabel);

var _ViewList = require('./ViewList');

var _ViewList2 = _interopRequireDefault(_ViewList);

var _Failed = require('./Failed');

var _Failed2 = _interopRequireDefault(_Failed);

var _LoginPage = require('./LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _Logout = require('./Logout');

var _Logout2 = _interopRequireDefault(_Logout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewProp = function (_React$Component) {
  _inherits(ViewProp, _React$Component);

  function ViewProp(rprops) {
    _classCallCheck(this, ViewProp);

    var _this = _possibleConstructorReturn(this, (ViewProp.__proto__ || Object.getPrototypeOf(ViewProp)).call(this, rprops));

    _this.state = {
      noteText: '',
      recordNum: 555,
      recordCount: 0,
      myJson: '',
      nextButtonBgColor: '#808080',
      previousButtonBgColor: '#808080',
      addNoteButtonBgColor: '#808080',
      filterButtonBgColor: '#808080',
      filter2ButtonBgColor: '#808080',
      searchButtonBgColor: '#808080',
      logoutButtonBgColor: '#3d3d3d',
      okToRender: false,
      filter: 'all',
      filter2Field: 'none',
      filter2Text: ''
    };
    _this.handleNoteTextChange = _this.handleNoteTextChange.bind(_this);
    _this.handleFilter2TextChange = _this.handleFilter2TextChange.bind(_this);
    _this.handleClickNext = _this.handleClickNext.bind(_this);
    _this.handleClickPrevious = _this.handleClickPrevious.bind(_this);
    _this.handleClickAddNote = _this.handleClickAddNote.bind(_this);
    _this.handleClickFilter = _this.handleClickFilter.bind(_this);
    _this.handleClickFilter2 = _this.handleClickFilter2.bind(_this);
    _this.handleClickSearch = _this.handleClickSearch.bind(_this);
    _this.handleClickLogout = _this.handleClickLogout.bind(_this);
    _this.getFromApi = _this.getFromApi.bind(_this);
    _this.getFromApi();
    return _this;
  }

  _createClass(ViewProp, [{
    key: 'getFromApi',
    value: function getFromApi() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "next";

      var that = this;
      var newRecordCount = 0;
      var urlForStuff = this.props.baseUrl + "/api/property/" + that.state.filter + "/asc/";
      fetch(urlForStuff + this.state.recordNum, {
        method: "POST",
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          password: localStorage.getItem("password"),
          direction: direction,
          filter2_field: that.state.filter2Field,
          filter2_search_string: that.state.filter2Text
        })
      }).then(function (response) {
        return response.json();
      }).then(function (myJson) {
        //aaa76 indicates no records to match query
        if (myJson == "aaa76") {
          console.log("aaa76");
          that.setState({ myJson: "", okToRender: true, recordCount: 0 });
        } else {
          myJson[that.state.recordNum]['count'] > 0 ? newRecordCount = myJson[that.state.recordNum]['count'] - 1 : newRecordCount = 0;
          that.setState({ myJson: myJson, recordCount: newRecordCount, okToRender: true });
        }
      });
    }
  }, {
    key: 'handleNoteTextChange',
    value: function handleNoteTextChange(e) {
      this.setState({ noteText: e.target.value });
    }
  }, {
    key: 'handleFilter2TextChange',
    value: function handleFilter2TextChange(e) {
      this.setState({ filter2Text: e.target.value });
    }
  }, {
    key: 'handleClickNext',
    value: function handleClickNext(e) {
      var _this2 = this;

      var that = this;
      //if we are waiting on the api to update count, don't do anything
      if (that.state.recordCount == -1) {
        //change button color momentarily
        that.setState({ nextButtonBgColor: '#404040' }, function () {
          setTimeout(function () {
            that.setState({ nextButtonBgColor: '#808080' });
          }, 100);
        });
        return;
      }
      //find first and last record numbers in our local cached records
      var lastRecordNum = Object.keys(that.state.myJson)[Object.keys(this.state.myJson).length - 1];
      var firstRecordNum = Object.keys(that.state.myJson)[0];
      var newRecordNum = that.state.recordNum + 1;
      //Figure out what the next record number should be
      if (newRecordNum > that.state.recordCount) {
        newRecordNum = 0;
      }
      that.setState({ recordNum: newRecordNum }, function () {
        //See if we are going to need to request more records from api
        if (newRecordNum > lastRecordNum || newRecordNum == 0) {
          that.setState({ recordCount: -1 }, function () {
            _this2.getFromApi("next");
          });
        }
      });
      //change button color momentarily
      that.setState({ nextButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          that.setState({ nextButtonBgColor: '#808080' });
        }, 100);
      });
    }
  }, {
    key: 'handleClickPrevious',
    value: function handleClickPrevious(e) {
      var _this3 = this;

      var that = this;
      //if we are waiting on the api to update count, don't do anything
      if (that.state.recordCount == -1) {
        //change button color momentarily
        that.setState({ previousButtonBgColor: '#404040' }, function () {
          setTimeout(function () {
            that.setState({ previousButtonBgColor: '#808080' });
          }, 100);
        });
        return;
      }
      //find first and last record numbers in our local cached records
      var lastRecordNum = Object.keys(that.state.myJson)[Object.keys(this.state.myJson).length - 1];
      var firstRecordNum = Object.keys(that.state.myJson)[0];
      var newRecordNum = that.state.recordNum - 1;
      //Figure out what the next record number should be
      if (newRecordNum < 0) {
        newRecordNum = that.state.recordCount;
      }
      that.setState({ recordNum: newRecordNum }, function () {
        //See if we are going to need to request more records from api
        if (newRecordNum < firstRecordNum || newRecordNum == that.state.recordCount) {
          that.setState({ recordCount: -1 }, function () {
            _this3.getFromApi("previous");
          });
        }
      });
      //change button color momentarily
      that.setState({ previousButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          that.setState({ previousButtonBgColor: '#808080' });
        }, 100);
      });
    }
  }, {
    key: 'handleClickAddNote',
    value: function handleClickAddNote(e) {
      var _this4 = this;

      var that = this;
      //if we are waiting on the api to update count, don't do anything
      if (that.state.recordCount == -1) {
        //change button color momentarily
        that.setState({ addNoteButtonBgColor: '#404040' }, function () {
          setTimeout(function () {
            that.setState({ addNoteButtonBgColor: '#808080' });
          }, 100);
        });
        return;
      }
      //see if the note text is blank, and if not blank then send to api
      if (this.state.noteText == "") {
        console.log("aaa235 note blank");
      } else {
        var urlForStuff = this.props.baseUrl + "/api/property_add_note/" + this.state.myJson[this.state.recordNum]['pid'];
        fetch(urlForStuff, {
          method: "POST",
          body: JSON.stringify({
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            note: this.state.noteText
          })
        }).then(function () {
          _this4.getFromApi();
        });
      }
      //change button color momentarily
      that.setState({ addNoteButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          that.setState({ addNoteButtonBgColor: '#808080' });
        }, 100);
      });
    }
  }, {
    key: 'handleClickFilter',
    value: function handleClickFilter(e) {
      var _this5 = this;

      var that = this;
      //if we are waiting on the api to update count, don't do anything
      if (that.state.recordCount == -1) {
        //change button color momentarily
        that.setState({ filterButtonBgColor: '#404040' }, function () {
          setTimeout(function () {
            that.setState({ filterButtonBgColor: '#808080' });
          }, 100);
        });
        return;
      }
      var filterName = "all";
      if (that.state.filter == "all") {
        filterName = "mailings";
      } else if (that.state.filter == "mailings") {
        filterName = "notes";
      } else {
        filterName = "all";
      }
      that.setState({ filter: filterName, recordNum: 0, recordCount: -1 }, function () {
        return _this5.getFromApi();
      });
      //change button color momentarily
      that.setState({ filterButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          that.setState({ filterButtonBgColor: '#808080' });
        }, 100);
      });
    }
  }, {
    key: 'handleClickFilter2',
    value: function handleClickFilter2(e) {
      var that = this;
      //if we are waiting on the api to update count, don't do anything
      if (that.state.recordCount == -1) {
        //change button color momentarily
        that.setState({ filter2ButtonBgColor: '#404040' }, function () {
          setTimeout(function () {
            that.setState({ filter2ButtonBgColor: '#808080' });
          }, 100);
        });
        return;
      }
      var filterName = "none";
      if (that.state.filter2Field == "none") {
        filterName = "property_address_contains";
      } else if (that.state.filter2Field == "property_address_contains") {
        filterName = "property_address_does_not_contain";
      } else if (that.state.filter2Field == "property_address_does_not_contain") {
        filterName = "owner_name_contains";
      } else if (that.state.filter2Field == "owner_name_contains") {
        filterName = "owner_name_does_not_contain";
      } else if (that.state.filter2Field == "owner_name_does_not_contain") {
        filterName = "owner_address_contains";
      } else if (that.state.filter2Field == "owner_address_contains") {
        filterName = "owner_address_does_not_contain";
      } else if (that.state.filter2Field == "owner_address_does_not_contain") {
        filterName = "notes_contains";
      } else if (that.state.filter2Field == "notes_contains") {
        filterName = "notes_does_not_contain";
      } else if (that.state.filter2Field == "notes_does_not_contain") {
        filterName = "none";
      }
      that.setState({ filter2Field: filterName });
      //change button color momentarily
      that.setState({ filter2ButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          that.setState({ filter2ButtonBgColor: '#808080' });
        }, 100);
      });
    }
  }, {
    key: 'handleClickSearch',
    value: function handleClickSearch(e) {
      var that = this;
      //if we are waiting on the api to update count, don't do anything
      if (that.state.recordCount == -1) {
        //change button color momentarily
        that.setState({ searchButtonBgColor: '#404040' }, function () {
          setTimeout(function () {
            that.setState({ searchButtonBgColor: '#808080' });
          }, 100);
        });
        return;
      }
      //change button color momentarily
      that.setState({ searchButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          that.setState({ searchButtonBgColor: '#808080' });
        }, 100);
      });
      that.setState({ recordNum: 0, recordCount: -1 }, function () {
        that.getFromApi();
      });
    }
  }, {
    key: 'handleClickLogout',
    value: function handleClickLogout() {
      var _this6 = this;

      //change button color momentarily
      this.setState({ logoutButtonBgColor: '#fb3621' }, function () {
        setTimeout(function () {
          _this6.setState({ logoutButtonBgColor: '#3d3d3d' });
        }, 100);
      });
      localStorage.setItem("logged_in", "no");
      localStorage.setItem("username", "");
      localStorage.setItem("password", "");
      setTimeout(function () {
        location.reload();
      }, 1000);
    }
  }, {
    key: 'renderViewSingleProp',
    value: function renderViewSingleProp() {
      return _react2.default.createElement(
        'div',
        { className: 'viewWrapper' },
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewLabel2.default, { type: 'recordCounter', data: this.state }),
          _react2.default.createElement(_ViewData2.default, { data: 'Welcome to Renthousemogul.com', type: 'other' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewLabel2.default, { label: "PID" }),
          _react2.default.createElement(_ViewData2.default, { data: this.state, type: 'pid' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewLabel2.default, { label: "Property Address" }),
          _react2.default.createElement(_ViewData2.default, { data: this.state, type: 'property_address' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewLabel2.default, { label: "Owner name" }),
          _react2.default.createElement(_ViewData2.default, { data: this.state, type: 'owner_name' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewLabel2.default, { label: "Owner address" }),
          _react2.default.createElement(_ViewData2.default, { data: this.state, type: 'owner_address' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewLabel2.default, { label: "Mailing dates" }),
          _react2.default.createElement(_ViewList2.default, { data: this.state, type: 'mailings' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_ViewLabel2.default, { label: "Notes" }),
          _react2.default.createElement(_ViewList2.default, { data: this.state, type: 'notes' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_NextButton2.default, { buttonLabel: 'Next', bgColor: this.state.nextButtonBgColor, controlFunc: this.handleClickNext })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_NextButton2.default, { buttonLabel: 'Previous', bgColor: this.state.previousButtonBgColor, controlFunc: this.handleClickPrevious })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_NextButton2.default, { buttonLabel: "Filter 1: " + this.state.filter, bgColor: this.state.filterButtonBgColor, controlFunc: this.handleClickFilter })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_NextButton2.default, { buttonLabel: "Filter 2: " + this.state.filter2Field, bgColor: this.state.filter2ButtonBgColor, controlFunc: this.handleClickFilter2 })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_EnterStuffLeft2.default, { placeholderText: 'Enter search text', controlFunc: this.handleFilter2TextChange }),
          _react2.default.createElement(_SmallButton2.default, { caption: "Search", bgColor: this.state.searchButtonBgColor, controlFunc: this.handleClickSearch })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_SmallButton2.default, {
            caption: 'Add note',
            bgColor: this.state.addNoteButtonBgColor,
            controlFunc: this.handleClickAddNote,
            pid: this.state.myJson['pid'],
            noteText: this.state.noteText }),
          _react2.default.createElement(_EnterStuff2.default, { placeholderText: 'Enter your note here', controlFunc: this.handleNoteTextChange })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rowWrapper' },
          _react2.default.createElement(_Logout2.default, { bgColor: this.state.logoutButtonBgColor, controlFunc: this.handleClickLogout })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.okToRender) {
        return this.renderViewSingleProp();
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'viewWrapper' },
          _react2.default.createElement(
            'div',
            { className: 'rowWrapper' },
            _react2.default.createElement(_Failed2.default, { data: 'No data available' })
          )
        );
      }
    }
  }]);

  return ViewProp;
}(_react2.default.Component);

exports.default = ViewProp;