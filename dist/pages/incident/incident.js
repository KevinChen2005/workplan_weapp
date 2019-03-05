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

{}

var Incident = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Incident, _BaseComponent);

  function Incident() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Incident);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Incident.__proto__ || Object.getPrototypeOf(Incident)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "taskdetall", "taskid", "showaddincidentmodel", "addincidentvalue", "addincidentvalueitem", "systemheight"], _this.config = {
      navigationBarTitleText: '任务详情'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Incident, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Incident.prototype.__proto__ || Object.getPrototypeOf(Incident.prototype), "_constructor", this).apply(this, arguments);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        taskdetall: {
          task: {
            id: "",
            username: "",
            openid: "",
            title: "",
            content: "",
            date: "",
            length_time: "",
            complete_time: "",
            speed: "",
            state: "",
            create_time: ""
          },
          smalltask: [{
            title: "",
            content: [],
            icon: ''
          }]
        },
        taskid: '',
        showaddincidentmodel: false,
        addincidentvalue: [],
        addincidentvalueitem: '',
        systemheight: ''
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      var sysinfo = _index2.default.getSystemInfoSync();
      var height = sysinfo.screenHeight;
      var windowsheight = sysinfo.windowHeight;
      this.setState({
        systemheight: 'height:' + (windowsheight - 184 - 56) + 'px;',
        systeminfo: sysinfo
      });
      this.setState({
        taskid: this.$router.params.taskid
      });
      //载入主线任务
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/get-smalltask',
        data: {
          openid: _index2.default.getStorageSync('openid'),
          taskid: this.$router.params.taskid
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this2.setState({
            taskdetall: res.data.result
          });
        } else {
          _index2.default.showToast({
            title: '参数错误!',
            icon: 'none'
          });
        }
      }).catch(function (e) {
        _index2.default.showToast({
          title: '网络错误!',
          icon: 'none'
        });
      });
      this.setState({
        locktaskstate: _index2.default.getStorageSync('locktaskstate')
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;
      var anonymousState__temp = (0, _index.internal_inline_style)(this.__state.systemheight);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp
      });
      return this.__state;
    }
  }, {
    key: "addincident",
    value: function addincident(e) {
      this.setState({
        showaddincidentmodel: true
      });
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.setState({
        showaddincidentmodel: false,
        addincidentvalue: [],
        addincidentvalueitem: ''
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      this.setState({
        addincidentvalueitem: value
      });
    }
  }, {
    key: "addtag",
    value: function addtag(e) {
      if (this.state.addincidentvalueitem != '') {
        var array_temp = this.state.addincidentvalue;
        array_temp.push(this.state.addincidentvalueitem);
        this.setState({
          addincidentvalue: array_temp,
          addincidentvalueitem: ''
        });
      } else {
        _index2.default.showToast({
          title: '事件不能为空',
          icon: 'none'
        });
      }
    }
  }, {
    key: "AddIncident",
    value: function AddIncident(e) {
      var _this3 = this;

      if (this.state.addincidentvalue.length == 0) {
        _index2.default.showToast({
          title: "不能添加空事件",
          icon: 'none'
        });
        return;
      }
      var value = '';
      _index2.default.showLoading({
        title: '请稍候...'
      });
      for (var i = 0; i < this.state.addincidentvalue.length; i++) {
        if (i < this.state.addincidentvalue.length - 1) {
          value += this.state.addincidentvalue[i] + '@@';
        } else {
          value += this.state.addincidentvalue[i];
        }
      }
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/smalltask',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: {
          openid: _index2.default.getStorageSync('openid'),
          taskid: this.state.taskid,
          content: value
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this3.setState({
            taskdetall: res.data.result
          });
          _this3.setState({
            showaddincidentmodel: false,
            addincidentvalue: [],
            addincidentvalueitem: ''
          });
        } else {
          _index2.default.showToast({
            title: '网络出错',
            icon: 'none'
          });
        }
        _index2.default.hideLoading();
      }).catch(function (res) {
        _index2.default.hideLoading();
        _this3.setState({
          showaddincidentmodel: false,
          addincidentvalue: [],
          addincidentvalueitem: ''
        });
        _index2.default.showToast({
          title: '网络出错',
          icon: 'none'
        });
      });
    }
  }]);

  return Incident;
}(_index.Component), _class.properties = {}, _class.$$events = ["addincident", "closeModal", "handleChange", "addtag", "AddIncident"], _temp2);
exports.default = Incident;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Incident, true));