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

var Bindname = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Bindname, _BaseComponent);

  function Bindname() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bindname);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bindname.__proto__ || Object.getPrototypeOf(Bindname)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["userinfo", "openid", "value", "phonenumber", "department", "mydepartment"], _this.config = {
      navigationBarTitleText: '绑定账号'
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bindname, [{
    key: "_constructor",


    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    value: function _constructor() {
      _get(Bindname.prototype.__proto__ || Object.getPrototypeOf(Bindname.prototype), "_constructor", this).apply(this, arguments);

      this.state = {
        userinfo: { type: 'userAvatarUrl' },
        openid: '',
        value: '',
        phonenumber: '',
        department: [],
        mydepartment: '-请选择-'
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      // 设置openid
      this.setState({
        openid: _index2.default.getStorageSync('openid')
      });
      // 请求部门列表
      _index2.default.request({
        url: 'https://xyx-mainland-api.raink.com.cn/v1/work/get-department'
      }).then(function (res) {
        res.data.result.forEach(function (item) {
          _this2.state.department.push(item.department);
        });
        _this2.setState({
          department: _this2.state.department
        });
      }).catch(function () {
        _index2.default.showToast({
          title: '部门列表获取失败！',
          icon: 'none'
        });
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
      Object.assign(this.__state, {});
      return this.__state;
    }
  }, {
    key: "changepicker",
    value: function changepicker(e) {
      console.log(e);
      this.setState({
        mydepartment: this.state.department[e.detail.value]
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      console.log(event);
    }
  }, {
    key: "onReset",
    value: function onReset(event) {
      console.log(event);
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: "changePhone",
    value: function changePhone(value) {
      this.setState({
        phonenumber: value
      });
    }
  }, {
    key: "submitname",
    value: function submitname() {
      var _this3 = this;

      var phoneverfy = /(?:^1[3456789]|^9[28])\d{9}$/;
      if (this.state.value.length > 7 || this.state.value.length <= 0) {
        _index2.default.showToast({
          title: '名字长度应该在1-6个字',
          icon: 'none'
        });
      } else {
        if (!phoneverfy.test(this.state.phonenumber)) {
          _index2.default.showToast({
            title: '手机号格式不正确',
            icon: 'none'
          });
          return;
        }
        if (this.state.mydepartment == '-请选择-') {
          _index2.default.showToast({
            title: '请选择部门',
            icon: 'none'
          });
          return;
        }
        console.log(_index2.default.getStorageSync('openid'));
        console.log(this.state.value);
        console.log(this.state.phonenumber);
        console.log(this.state.mydepartment);
        _index2.default.request({
          url: _url2.default.locality_address + '/v1/work/bind',
          data: {
            openid: _index2.default.getStorageSync('openid'),
            username: this.state.value,
            phone: this.state.phonenumber,
            scene: 'wx',
            department: this.state.mydepartment
          },
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function (res) {
          if (res.data.code == 200) {
            _index2.default.setStorageSync('username', _this3.state.value);
            _index2.default.setStorageSync('register', { msg: 'success', state: true });
            _index2.default.setStorageSync('department', _this3.state.mydepartment);
            _index2.default.showLoading({
              title: '请稍后',
              mask: true
            });
            setTimeout(function () {
              _index2.default.hideLoading();
              _index2.default.showModal({
                title: '提示',
                content: '实名注册成功,按确定键返回!'
              }).then(function (res) {
                _index2.default.navigateBack();
              });
            }, 1000);
          } else {
            _index2.default.showToast({
              title: '网络出错！',
              icon: 'none'
            });
          }
        }).catch(function (res) {
          _index2.default.showToast({
            title: '网络出错！',
            icon: 'none'
          });
        });
      }
    }
  }]);

  return Bindname;
}(_index.Component), _class.properties = {}, _class.$$events = ["changepicker", "handleChange", "changePhone", "submitname"], _temp2);
exports.default = Bindname;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Bindname, true));