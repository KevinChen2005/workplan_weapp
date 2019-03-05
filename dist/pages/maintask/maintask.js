"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _url = require("../../utils/url.js");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Maintask = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Maintask, _BaseComponent);

  function Maintask() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Maintask);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Maintask.__proto__ || Object.getPrototypeOf(Maintask)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp5", "anonymousState__temp6", "anonymousState__temp7", "anonymousState__temp8", "loopArray0", "maintasklist", "maintask", "showaddmodel", "addtitle", "addcontext", "addtime", "showSheetstate", "cardid", "locktaskstate", "currenttime", "currenttask", "complete_time_temp", "deltitle", "showupdatetime", "showdelTask", "showUpdatetask"], _this.config = {
      navigationBarTitleText: '主线任务'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Maintask, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Maintask.prototype.__proto__ || Object.getPrototypeOf(Maintask.prototype), "_constructor", this).apply(this, arguments);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      //task格式
      // {
      //   id: "2",
      //   username: "朱海涛",
      //   openid: "o-GjW5XADtUav0uDKr319xbTe9mk",
      //   title: "任务1",
      //   content: "内容1",
      //   date: "2018-12",
      //   length_time: "100",
      //   create_time: "2018-12-20 09:54:40",
      //   complete_time:'100'
      // }
      this.state = {
        maintask: [],
        showaddmodel: false,
        addtitle: '',
        addcontext: '',
        addtime: '',
        showSheetstate: false,
        cardid: '',
        locktaskstate: false,
        currenttime: {
          length_time: '',
          complete_time: ''
        },
        currenttask: {
          id: "2",
          username: "朱海涛",
          openid: "o-GjW5XADtUav0uDKr319xbTe9mk",
          title: "任务1",
          content: "内容1",
          date: "2018-12",
          length_time: "100",
          create_time: "2018-12-20 09:54:40",
          complete_time: '100'
        },
        complete_time_temp: 0,
        deltitle: '',
        showupdatetime: false,
        showdelTask: false,
        showUpdatetask: false
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var _this2 = this;

      //载入主线任务
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/task',
        data: {
          openid: _index2.default.getStorageSync('openid')
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this2.setState({
            maintask: res.data.result
          });
        }
      });
      this.setState({
        locktaskstate: _index2.default.getStorageSync('locktaskstate')
      });
      //返回时重置
      this.setState({
        showSheetstate: false,
        cardid: ''
      });
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "emptyfunction",
    value: function emptyfunction() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      //列表渲染
      var maintasklist = this.__state.maintask;
      var anonymousState__temp5 = 'width:100%;height:' + (_index2.default.getSystemInfoSync().windowHeight - 50) + 'px';
      var anonymousState__temp6 = parseInt(this.__state.currenttime.complete_time);
      var anonymousState__temp7 = parseInt(this.__state.currenttime.complete_time) == 100 ? 'success' : 'progress';
      var anonymousState__temp8 = parseInt(this.__state.currenttime.complete_time);
      var loopArray0 = maintasklist.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = parseInt(item.$original.complete_time);
        var $loopState__temp4 = parseInt(item.$original.complete_time) == 100 ? 'success' : 'progress';
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $original: item.$original
        };
      });
      Object.assign(this.__state, {
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6,
        anonymousState__temp7: anonymousState__temp7,
        anonymousState__temp8: anonymousState__temp8,
        loopArray0: loopArray0,
        maintasklist: maintasklist
      });
      return this.__state;
    }
  }, {
    key: "changelockstate",
    value: function changelockstate() {
      this.setState({
        locktaskstate: !this.state.locktaskstate
      });
      _index2.default.setStorageSync('locktaskstate', !this.state.locktaskstate);
    }
  }, {
    key: "showaddmodel",
    value: function showaddmodel() {
      this.setState({
        showaddmodel: true
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({
        showaddmodel: false,
        addtitle: '',
        addcontext: '',
        addtime: ''
      });
    }
  }, {
    key: "addtask",
    value: function addtask(e) {
      var _this3 = this;

      _index2.default.showLoading({
        title: '正在添加'
      });
      if (this.state.addtitle != '' && this.state.addcontext != '') {
        _index2.default.request({
          url: _url2.default.locality_address + '/v1/work/addmain',
          data: {
            openid: _index2.default.getStorageSync('openid'),
            title: this.state.addtitle,
            content: this.state.addcontext
          },
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function (res) {
          if (res.data.code == 200) {
            _this3.setState({
              maintask: res.data.result
            });
          } else if (res.data.code == 10007) {
            _index2.default.showToast({
              title: '当月只能添加五个任务',
              icon: 'none'
            });
          }
          _this3.closeModal();
          _index2.default.hideLoading();
        }).catch(function () {
          _index2.default.showToast({
            title: '网络错误!',
            icon: 'none'
          });
        });
      } else {
        _index2.default.showToast({
          title: '信息不能为空',
          icon: 'none'
        });
      }
    }
  }, {
    key: "showSheet",
    value: function showSheet(e) {
      if (!this.state.locktaskstate) {
        console.log(e);
        this.setState({
          showSheetstate: true,
          cardid: e.currentTarget.id
        });
      }
    }
  }, {
    key: "closesheet",
    value: function closesheet(e) {
      this.setState({
        showSheetstate: false,
        cardid: ''
      });
    }
  }, {
    key: "closesheet1",
    value: function closesheet1(e) {
      this.setState({
        showSheetstate: false
      });
    }
  }, {
    key: "titleChange",
    value: function titleChange(value) {
      console.log(value);
      this.setState({
        addtitle: value
      });
    }
  }, {
    key: "contextChange",
    value: function contextChange(e) {
      console.log(e.detail.value);
      this.setState({
        addcontext: e.detail.value
      });
    }
  }, {
    key: "timeChange",
    value: function timeChange(value) {
      console.log(value);
      this.setState({
        addtime: value
      });
    }
  }, {
    key: "updatetime",
    value: function updatetime(e) {
      var temp = { length_time: '',
        complete_time: ''
      };
      for (var i = 0; i < this.state.maintask.length; i++) {
        console.log(this.state.maintask[i]);
        console.log(this.state.maintask[i].id);
        if (this.state.maintask[i].id == this.state.cardid) {
          temp.length_time = this.state.maintask[i].length_time;
          temp.complete_time = this.state.maintask[i].complete_time;
        }
      }
      this.setState({
        currenttime: temp,
        showupdatetime: true,
        showSheetstate: false
      });
    }
  }, {
    key: "changeComplete_time",
    value: function changeComplete_time(e) {
      this.setState({
        complete_time_temp: e.value
      });
    }
  }, {
    key: "closeUpdateTime",
    value: function closeUpdateTime() {
      this.setState({
        currenttime: { length_time: '',
          complete_time: ''
        },
        showupdatetime: false,
        complete_time_temp: '',
        cardid: ''
      });
    }
  }, {
    key: "UpdateTime",
    value: function UpdateTime() {
      var _this4 = this;

      _index2.default.showLoading({
        title: '请稍候...'
      });
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/updatetask',
        data: {
          openid: _index2.default.getStorageSync('openid'),
          taskid: this.state.cardid,
          complete_time: this.state.complete_time_temp
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this4.setState({
            currenttime: { length_time: '',
              complete_time: ''
            },
            showupdatetime: false,
            complete_time_temp: '',
            cardid: '',
            maintask: res.data.result
          });
        } else {
          _index2.default.showToast({
            title: '错误!',
            icon: 'none'
          });
        }
        _index2.default.hideLoading();
      }).catch(function (res) {
        _index2.default.hideLoading();
        _index2.default.showToast({
          title: '网络错误!',
          icon: 'none'
        });
      });
    }
  }, {
    key: "updatetask",
    value: function updatetask(e) {}
  }, {
    key: "deltask",
    value: function deltask(e) {
      for (var i = 0; i < this.state.maintask.length; i++) {
        if (this.state.maintask[i].id == this.state.cardid) {
          this.setState({
            deltitle: this.state.maintask[i].title
          });
        }
      }
      this.setState({
        showdelTask: true,
        showSheetstate: false
      });
    }
  }, {
    key: "closedeltask",
    value: function closedeltask() {
      this.setState({
        deltitle: '',
        showdelTask: false,
        cardid: ''
      });
    }
  }, {
    key: "Deltask",
    value: function Deltask() {
      var _this5 = this;

      _index2.default.showLoading({
        title: '请稍候...'
      });
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/deltask',
        data: {
          openid: _index2.default.getStorageSync('openid'),
          taskid: this.state.cardid
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this5.setState({
            showdelTask: false,
            cardid: '',
            deltitle: '',
            maintask: res.data.result
          });
        } else {
          _index2.default.showToast({
            title: '错误!',
            icon: 'none'
          });
        }
        _index2.default.hideLoading();
      }).catch(function (res) {
        _index2.default.hideLoading();
        _index2.default.showToast({
          title: '网络错误!',
          icon: 'none'
        });
      });
    }
  }, {
    key: "toincident",
    value: function toincident() {
      _index2.default.navigateTo({
        url: '/pages/incident/incident?taskid=' + this.state.cardid
      });
    }
  }]);

  return Maintask;
}(_index.Component), _class.properties = {}, _class.$$events = ["showSheet", "showaddmodel", "changelockstate", "closeModal", "titleChange", "contextChange", "addtask", "closesheet1", "closesheet", "updatetime", "toincident", "deltask", "closeUpdateTime", "changeComplete_time", "UpdateTime", "closedeltask", "Deltask"], _temp2);
exports.default = Maintask;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Maintask, true));