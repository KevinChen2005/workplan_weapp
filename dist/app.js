"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _url = require("./utils/url.js");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    var _this = _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).apply(this, arguments));

    _this.config = {
      pages: ['pages/index/index', 'pages/bindname/bindname', 'pages/maintask/maintask', 'pages/incident/incident'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };
    return _this;
  }
  //onlunch


  _createClass(_App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log(_url2.default.Online_address);
      //适配屏幕
      console.log(_index2.default.getSystemInfoSync());
      _index2.default.setStorageSync('sysinfo', _index2.default.getSystemInfoSync());
      // //判断是否有openid
      // if(Taro.getStorageSync('openid')===""){
      //     Taro.login({
      //       success:(res)=>{
      //         Taro.request({
      //           url:url.locality_address+'/v1/work/jscode',
      //           data: {
      //             code: res.code
      //           }
      //         }).then((res1)=>{
      //           if(res1.data.code == 200){
      //             Taro.setStorage({
      //               key:'openid',
      //               data:res1.data.success_msg.info.openid
      //             })
      //           }else{
      //             Taro.showToast({
      //               title:'获取用户标识失败请检查网络',
      //               icon:'none'
      //             })
      //           }
      //           return res1.data.success_msg.info.openid
      //         //判断是否注册过
      //         }).then(
      //           (res)=>{
      //                 if(Taro.getStorageSync('register')===''){
      //                   Taro.request({
      //                     url:url.locality_address+'/v1/work/checkbind',
      //                     data:{
      //                       openid:res
      //                     }
      //                   }).then((res)=>{
      //                       if(res.data.code==10005){
      //                           Taro.setStorageSync('register',{msg:'success',state:false})
      //                       }else if(res.data.code ==10003 || res.data.code ==10004){
      //                         Taro.setStorageSync('register',{msg:'success',state:true})
      //                         //如果已注册 拉取名字
      //                         Taro.request({
      //                           url:url.locality_address+'/v1/work/username',
      //                           data:{
      //                             openid:Taro.getStorageSync('openid')
      //                           }
      //                         }).then(
      //                           (res)=>{
      //                            Taro.setStorageSync('username',res.data.result.username)
      //                            Taro.setStorageSync('phone',res.data.result.phone)
      //                            Taro.setStorageSync('department',res.data.result.department)
      //                           }
      //                         )
      //                       }else{
      //                         Taro.setStorageSync('register',{msg:'error',state:false})
      //                       }
      //                   })
      //                 }
      //           }
      //         )
      //       },
      //       fail:()=>{
      //         Taro.showToast({
      //           title:'登录失败',
      //           icon:'none'
      //         })
      //       }
      //     })
      // }
      if (_index2.default.getStorageSync('lockstate') === '') {
        _index2.default.setStorageSync('lockstate', false);
      }
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});