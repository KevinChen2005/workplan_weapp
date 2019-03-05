"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var loopload = void 0;
var scrollty = void 0;
var scrolltxx = void 0;
var scrolltxy = void 0;
var scrollid = '';

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp7", "anonymousState__temp8", "anonymousState__temp9", "anonymousState__temp14", "anonymousState__temp15", "loopArray0", "loopArray1", "loopArray2", "loopArray3", "loopArray4", "loopArray5", "loopArray6", "itemtitles", "today_data", "onedayago_data", "twodayago_data", "tabList", "twodayago_ext", "onedayago_ext", "today_ext", "userinfo", "currenttime", "register", "username", "current", "currentdate", "current_today", "onedayago", "twodayago", "today_is_edit", "today_data_use", "today_data_full", "onedayago_is_edit", "onedayago_data_use", "onedayago_data_full", "twodayago_is_edit", "twodayago_data_use", "twodayago_data_full", "categorys", "moment", "showmodel", "modeldatatitle", "value", "idMname", "targhtid", "showmessageboolean", "showmaeeagecontext", "systemheight", "resttime", "lockstate", "functioncControlict", "systeminfo", "scrolltitlex", "scrolltitley", "showrankmodel", "contextscrolltitlex", "contextscrolltitley", "ischangetime", "maintask", "department"], _this.config = {
      navigationBarTitleText: '工作日志'
    }, _this.onDateChange = function (e) {
      _this.setState({
        dateSel: e.detail.value
      });
      console.log(e);
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/modify',
        data: {
          wid: e.currentTarget.id,
          openid: _index2.default.getStorageSync('openid'),
          field: 'length_time',
          val: e.detail.value
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function (res) {
        //更改现有数据
        switch (_this.state.current) {
          case 0:
            var twodayago_data = _this.state.twodayago_data;
            for (var i = 0; i < twodayago_data.length; i++) {
              if (twodayago_data[i].id == res.data.result.wid) {
                twodayago_data[i][res.data.result.field] = res.data.result.val;
              }
            }
            break;
          case 1:
            var onedayago_data = _this.state.onedayago_data;
            for (var _i = 0; _i < onedayago_data.length; _i++) {
              if (onedayago_data[_i].id == res.data.result.wid) {
                onedayago_data[_i][res.data.result.field] = res.data.result.val;
              }
            }
            break;
          case 2:
            var today_data_temp = _this.state.today_data;
            for (var _i2 = 0; _i2 < today_data_temp.length; _i2++) {
              if (today_data_temp[_i2].id == res.data.result.wid) {
                today_data_temp[_i2][res.data.result.field] = res.data.result.val;
              }
            }
            break;
        }
        _this.setState({
          showmodel: false,
          targhtid: [],
          modeldatatitle: '标题',
          value: ''
        });
      });
    }, _this.closeModal = function (type, msg) {
      console.log(msg);
      _this.setState({
        showmodel: false,
        targhtid: [],
        modeldatatitle: '标题',
        value: '',
        showrankmodel: false,
        ischangetime: false
      });
    }, _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor() {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).apply(this, arguments);
      /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

      this.state = {
        userinfo: { type: 'userAvatarUrl' },
        currenttime: '',
        register: { msg: 'error', state: false },
        username: '',
        current: 2,
        currentdate: 0,
        current_today: '',
        onedayago: '',
        twodayago: '',
        today_is_edit: false,
        today_data_use: [],
        today_data_full: [],
        today_data: [{
          id: "1",
          date: "2018-12-14",
          work_start_time: "9:00",
          length_time: "0",
          work_project: "",
          work_content: "",
          work_efficiency: "0.0",
          work_effect: "0.0",
          work_myself: "0.0"
        }],
        today_ext: {
          id: '1',
          daily_sum: ''
        },
        onedayago_is_edit: true,
        onedayago_data_use: [],
        onedayago_data_full: [],
        onedayago_data: [{
          id: "1",
          date: "2018-12-14",
          work_start_time: "9:00",
          length_time: "0",
          work_project: "",
          work_content: "",
          work_efficiency: "0.0",
          work_effect: "0.0",
          work_myself: "0.0"
        }],
        onedayago_ext: {
          id: '1',
          daily_sum: ''
        },
        twodayago_is_edit: true,
        twodayago_data_use: [],
        twodayago_data_full: [],
        twodayago_data: [{
          id: "1",
          date: "2018-12-14",
          work_start_time: "9:00",
          length_time: "0",
          work_project: "",
          work_content: "",
          work_efficiency: "0.0",
          work_effect: "0.0",
          work_myself: "0.0"
        }],
        twodayago_ext: {
          id: '1',
          daily_sum: ''
        },
        categorys: ['开拓', '驱动', '实施', '维护', "协同"],
        itemtitles: ['时长(分)', '类别', '工作项目', '工作内容及说明', '效率自评', '对应目标', '驱动自评'],
        moment: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
        showmodel: false,
        modeldatatitle: '标题',
        value: '',
        idMname: {
          work_start_time: '开始时间',
          length_time: '时长(分)',
          category: '类别',
          work_project: '工作项目',
          work_content: '工作内容及说明',
          work_efficiency: '效率自评',
          work_effect: '对应目标',
          work_myself: '驱动自评'
        },
        targhtid: [],
        showmessageboolean: false,
        showmaeeagecontext: '',
        systemheight: '',
        resttime: '08:00,08:30,12:00,12:30,13:00,13:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00',
        lockstate: false,
        functioncControlict: {},
        systeminfo: {
          "model": "iPhone X", "pixelRatio": 3, "windowWidth": 375, "windowHeight": 724, "system": "iOS 10.0.1", "language": "zh", "version": "6.6.3", "screenWidth": 375, "screenHeight": 812, "SDKVersion": "2.4.2", "brand": "devtools", "fontSizeSetting": 16, "batteryLevel": 100, "statusBarHeight": 44, "platform": "devtools"
        },
        scrolltitlex: 0,
        scrolltitley: 0,
        showrankmodel: false,
        contextscrolltitlex: 0,
        contextscrolltitley: 0,
        ischangetime: false,
        maintask: [],
        department: ''
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
      };
      //修改时间
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      //载入锁定状态
      this.setState({
        lockstate: _index2.default.getStorageSync('lockstate')
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var _this2 = this;

      //适配设备高度
      var sysinfo = _index2.default.getSystemInfoSync();
      var height = sysinfo.screenHeight;
      var windowsheight = sysinfo.windowHeight;
      this.setState({
        systemheight: 'height:' + (windowsheight - 118 - 25 - 75 - 50) + 'px;',
        systeminfo: sysinfo
      });
      //判断是否有openid
      if (_index2.default.getStorageSync('openid') === "") {
        _index2.default.login({
          success: function success(res) {
            console.log(res.code);
            _index2.default.request({
              url: _url2.default.locality_address + '/v1/work/jscode',
              data: {
                code: res.code
              }
            }).then(function (res1) {
              if (res1.data.code == 200) {
                _index2.default.setStorage({
                  key: 'openid',
                  data: res1.data.success_msg.info.openid
                });
              } else {
                _index2.default.showToast({
                  title: '获取用户标识失败请检查网络',
                  icon: 'none'
                });
              }
              return res1.data.success_msg.info.openid;
              //判断是否注册过
            }).then(function (openid) {
              _index2.default.request({
                url: _url2.default.locality_address + '/v1/work/checkbind',
                data: {
                  openid: openid
                }
              }).then(function (res) {
                if (res.data.code == 10005) {
                  _index2.default.setStorageSync('register', { msg: 'success', state: false });
                  _this2.setState({
                    register: { msg: 'success', state: false }
                  });
                } else if (res.data.code == 10003 || res.data.code == 10004) {
                  _index2.default.setStorageSync('register', { msg: 'success', state: true });
                  //如果已注册 拉取名字
                  _index2.default.request({
                    url: _url2.default.locality_address + '/v1/work/username',
                    data: {
                      openid: openid
                    }
                  }).then(function (res) {
                    _index2.default.setStorageSync('username', res.data.result.username);
                    _index2.default.setStorageSync('phone', res.data.result.phone);
                    _index2.default.setStorageSync('department', res.data.result.department);
                    _this2.setState({
                      username: res.data.result.username,
                      department: res.data.result.department,
                      register: { msg: 'success', state: true }
                    });
                  });
                  _this2.pullmaintask();
                  _this2.pulldata();
                } else {
                  _index2.default.setStorageSync('register', { msg: 'error', state: false });
                }
              });
            });
          },
          fail: function fail() {
            _index2.default.showToast({
              title: '登录失败',
              icon: 'none'
            });
          }
        });
      } else {
        _index2.default.showLoading({
          title: '请稍候...'
        });
        this.setState({
          register: _index2.default.getStorageSync('register'),
          department: _index2.default.getStorageSync('department'),
          username: _index2.default.getStorageSync('username')
        });
        this.pullmaintask();
        this.pulldata();
        _index2.default.hideLoading();
      }
      console.log('加载啦');
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "pullmaintask",
    value: function pullmaintask() {
      var _this3 = this;

      //载入主线任务
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/task',
        data: {
          openid: _index2.default.getStorageSync('openid')
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this3.setState({
            maintask: res.data.result
          });
        } else {
          _index2.default.showToast({
            title: "主线任务加载失败，检查参数！",
            icon: 'none'
          });
        }
      }).catch(function (res) {
        _index2.default.showToast({
          title: "主线任务加载失败，检查网络！",
          icon: 'none'
        });
      });
    }
  }, {
    key: "pulldata",
    value: function pulldata() {
      var _this4 = this;

      var time = void 0;
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/time'
      }).then(function (res) {
        var now = new Date(parseInt(res.data.success_msg.time) * 1000);
        //  time = this.timedat(now)
        //  time = time + ' ' + this.getWeek(now)
        time = _this4.getWeek(now);
        _this4.setState({
          currenttime: time,
          currentdate: parseInt(res.data.success_msg.time) * 1000
        });
        return parseInt(res.data.success_msg.time) * 1000;
      }).then(function (timest) {
        _this4.setState({
          current_today: _this4.timedaty_m_d(timest),
          onedayago: _this4.timedaty_m_d(timest - 86400000),
          twodayago: _this4.timedaty_m_d(timest - 172800000)
        });
        return [_this4.timedaty_m_d(timest), _this4.timedaty_m_d(timest - 86400000), _this4.timedaty_m_d(timest - 172800000)];
      }).then(function (timearray) {
        //拉取数据
        _index2.default.request({
          url: _url2.default.locality_address + '/v1/work/notes',
          data: {
            openid: _index2.default.getStorageSync('openid'),
            date: timearray[0]
          }
        }).then(function (res) {
          var dataTemp = [];
          res.data.success_msg.info.map(function (item) {
            if ((item.length_time == null || item.length_time == '') && (item.category == null || item.category == '') && (item.work_project == null || item.work_project == '') && (item.work_content == null || item.work_content == '') && (item.work_efficiency == null || item.work_efficiency == 0) && (item.work_effect == null || item.work_effect == 0) && (item.work_myself == null || item.work_myself == 0)) {
              return;
            }
            dataTemp.push(item);
          });
          _this4.setState({
            today_data_use: dataTemp,
            today_data: dataTemp,
            today_data_full: res.data.success_msg.info,
            today_ext: res.data.success_msg.ext
          });
        });
        return timearray;
      }).then(function (timearray) {
        //拉取数据
        _index2.default.request({
          url: _url2.default.locality_address + '/v1/work/notes',
          data: {
            openid: _index2.default.getStorageSync('openid'),
            date: timearray[1]
          }
        }).then(function (res) {
          var dataTempOne = [];
          res.data.success_msg.info.map(function (item) {
            if ((item.length_time == null || item.length_time == '') && (item.category == null || item.category == '') && (item.work_project == null || item.work_project == '') && (item.work_content == null || item.work_content == '') && (item.work_efficiency == null || item.work_efficiency == 0) && (item.work_effect == null || item.work_effect == 0) && (item.work_myself == null || item.work_myself == 0)) {
              return;
            }
            dataTempOne.push(item);
          });
          _this4.setState({
            onedayago_data_use: dataTempOne,
            onedayago_data: dataTempOne,
            onedayago_data_full: res.data.success_msg.info,
            onedayago_ext: res.data.success_msg.ext
          });
        });
        return timearray;
      }).then(function (timearray) {
        //拉取数据
        _index2.default.request({
          url: _url2.default.locality_address + '/v1/work/notes',
          data: {
            openid: _index2.default.getStorageSync('openid'),
            date: timearray[2]
          }
        }).then(function (res) {
          var dataTempTwo = [];
          res.data.success_msg.info.map(function (item) {
            if ((item.length_time == null || item.length_time == '') && (item.category == null || item.category == '') && (item.work_project == null || item.work_project == '') && (item.work_content == null || item.work_content == '') && (item.work_efficiency == null || item.work_efficiency == 0) && (item.work_effect == null || item.work_effect == 0) && (item.work_myself == null || item.work_myself == 0)) {
              return;
            }
            dataTempTwo.push(item);
          });
          _this4.setState({
            twodayago_data_use: dataTempTwo,
            twodayago_data: dataTempTwo,
            twodayago_data_full: res.data.success_msg.info,
            twodayago_ext: res.data.success_msg.ext
          });
        });
        return timearray;
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      var _this5 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var tabList = [{ title: this.__state.twodayago }, { title: this.__state.onedayago }, { title: this.__state.current_today }];
      var itemtitles = this.__state.itemtitles;

      var today_data = this.__state.today_data_use;
      var onedayago_data = this.__state.onedayago_data_use;
      var twodayago_data = this.__state.twodayago_data_use;
      var today_ext = this.__state.today_ext;
      var onedayago_ext = this.__state.onedayago_ext;
      var twodayago_ext = this.__state.twodayago_ext;
      //标题

      //时间栏

      //内容
      //今日内容

      //上一天内容

      //上两天内容

      // 下半部分
      var anonymousState__temp7 = (0, _index.internal_inline_style)(this.__state.systemheight);
      var anonymousState__temp8 = (0, _index.internal_inline_style)(this.__state.systemheight);
      var anonymousState__temp9 = (0, _index.internal_inline_style)(this.__state.systemheight);
      var anonymousState__temp14 = !this.__state.ischangetime ? parseFloat(this.__state.value) : null;
      var anonymousState__temp15 = this.__state.ischangetime ? parseFloat(this.__state.value) : null;
      var loopArray0 = today_data.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = (0, _index.internal_inline_style)(_this5.__state.resttime.indexOf(item.$original.work_start_time) > -1 && item.$original.work_start_time.length >= 5 ? 'color:green' : 'none');
        return {
          $loopState__temp2: $loopState__temp2,
          $original: item.$original
        };
      });
      var loopArray1 = onedayago_data.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp4 = (0, _index.internal_inline_style)(_this5.__state.resttime.indexOf(item.$original.work_start_time) > -1 && item.$original.work_start_time.length >= 5 ? 'color:green' : 'none');
        return {
          $loopState__temp4: $loopState__temp4,
          $original: item.$original
        };
      });
      var loopArray2 = twodayago_data.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp6 = (0, _index.internal_inline_style)(_this5.__state.resttime.indexOf(item.$original.work_start_time) > -1 && item.$original.work_start_time.length >= 5 ? 'color:green' : 'none');
        return {
          $loopState__temp6: $loopState__temp6,
          $original: item.$original
        };
      });
      var loopArray3 = today_data.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };

        if (item.$original.category == null) {
          item.$original.category = '';
        }
        //类别对应选择
        var selIndex = 0;
        _this5.__state.categorys.map(function (itemCate, index) {
          if (itemCate == item.$original.category) {
            selIndex = index;
          }
        });
        //对应目标对应选择
        var selIndexEff = 0;
        var maskTitles = [];
        _this5.__state.maintask.map(function (itemEff, index) {
          var title = itemEff.title;
          maskTitles.push(title);
          if (title == item.$original.work_effect) {
            selIndexEff = index;
          }
        });
        return {
          selIndex: selIndex,
          selIndexEff: selIndexEff,
          maskTitles: maskTitles,
          $original: item.$original
        };
      });
      var loopArray4 = onedayago_data.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };

        if (item.$original.category === null) {
          item.$original.category = '';
        }
        var selIndex = 0;
        _this5.__state.categorys.map(function (itemCate, index) {
          if (itemCate == item.$original.category) {
            selIndex = index;
          }
        });
        var selIndexEff = 0;
        var maskTitles = [];
        _this5.__state.maintask.map(function (itemEff, index) {
          var title = itemEff.title;
          maskTitles.push(title);
          if (title == item.$original.work_effect) {
            selIndexEff = index;
          }
        });
        return {
          selIndex: selIndex,
          selIndexEff: selIndexEff,
          maskTitles: maskTitles,
          $original: item.$original
        };
      });
      var loopArray5 = twodayago_data.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };

        if (item.$original.category === null) {
          item.$original.category = '';
        }
        var selIndex = 0;
        _this5.__state.categorys.map(function (itemCate, index) {
          if (itemCate == item.$original.category) {
            selIndex = index;
          }
        });
        var selIndexEff = 0;
        var maskTitles = [];
        _this5.__state.maintask.map(function (itemEff, index) {
          var title = itemEff.title;
          maskTitles.push(title);
          if (title == item.$original.work_effect) {
            selIndexEff = index;
          }
        });
        return {
          selIndex: selIndex,
          selIndexEff: selIndexEff,
          maskTitles: maskTitles,
          $original: item.$original
        };
      });

      var loopArray6 = this.__state.maintask.map(function (item) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp11 = parseInt(item.$original.complete_time);
        var $loopState__temp13 = parseInt(item.$original.complete_time) == 100 ? 'success' : 'progress';
        return {
          $loopState__temp11: $loopState__temp11,
          $loopState__temp13: $loopState__temp13,
          $original: item.$original
        };
      });

      Object.assign(this.__state, {
        anonymousState__temp7: anonymousState__temp7,
        anonymousState__temp8: anonymousState__temp8,
        anonymousState__temp9: anonymousState__temp9,
        anonymousState__temp14: anonymousState__temp14,
        anonymousState__temp15: anonymousState__temp15,
        loopArray0: loopArray0,
        loopArray1: loopArray1,
        loopArray2: loopArray2,
        loopArray3: loopArray3,
        loopArray4: loopArray4,
        loopArray5: loopArray5,
        loopArray6: loopArray6,
        tabList: tabList
      });
      return this.__state;
    }
  }, {
    key: "tomaintask",
    value: function tomaintask(e) {
      _index2.default.navigateTo({
        url: '/pages/maintask/maintask'
      });
    }
  }, {
    key: "touchstart",
    value: function touchstart(e) {
      scrollid = e.currentTarget.id;
    }
  }, {
    key: "scrollmovex",
    value: function scrollmovex(e) {
      var _this6 = this;

      if (e.currentTarget.id === scrollid) {
        clearTimeout(scrolltxx);
        scrolltxx = setTimeout(function () {
          _this6.setState({
            contextscrolltitlex: e.currentTarget.scrollLeft
          });
        }, 300);
      }
    }
  }, {
    key: "scrollmovey",
    value: function scrollmovey(e) {
      var _this7 = this;

      if (e.currentTarget.id === scrollid) {
        clearTimeout(scrolltxy);
        scrolltxy = setTimeout(function () {
          _this7.setState({
            contextscrolltitley: e.currentTarget.scrollTop
          });
        }, 300);
      }
    }
  }, {
    key: "scrollmove",
    value: function scrollmove(e) {
      var _this8 = this;

      // console.log('区域移动')
      // console.log(e)
      clearTimeout(scrollty);
      if (e.currentTarget.id === scrollid) {
        scrollty = setTimeout(function () {
          // console.log('区域移动 修改数值')
          // console.log(e)
          scrollid = e.currentTarget.id;
          _this8.setState({
            scrolltitlex: e.currentTarget.scrollLeft,
            scrolltitley: e.currentTarget.scrollTop
          });
        }, 300);
      }
      // scrollX = e.currentTarget.scrollLeft
      // scrollY = e.currentTarget.scrollTop
      // console.log(scrollX)
      // console.log(scrollY)
    }
  }, {
    key: "emptyfunction",
    value: function emptyfunction() {}
  }, {
    key: "showmessage",
    value: function showmessage(e) {
      // console.log('断案')
      var tapid = e.currentTarget.id;
      var tab111 = tapid.split('@@');
      // console.log(tab111)
      this.setState({
        targhtid: tab111,
        modeldatatitle: this.state.idMname[tab111[0]]
      });
      var text = '';
      switch (this.state.current) {
        case 0:
          // console.log('进入10')
          var twodayago_data = this.state.twodayago_data;
          for (var i = 0; i < twodayago_data.length; i++) {
            if (twodayago_data[i].id == tab111[1]) {
              text = twodayago_data[i][tab111[0]];
            }
          }
          break;
        case 1:
          // console.log('进入2')
          var onedayago_data = this.state.onedayago_data;
          for (var _i3 = 0; _i3 < onedayago_data.length; _i3++) {
            if (onedayago_data[_i3].id == tab111[1]) {
              text = onedayago_data[_i3][tab111[0]];
            }
          }
          break;
        case 2:
          // console.log('进入3')
          var today_data_temp = this.state.today_data;
          for (var _i4 = 0; _i4 < today_data_temp.length; _i4++) {
            if (today_data_temp[_i4].id == tab111[1]) {
              text = today_data_temp[_i4][tab111[0]];
            }
          }
          break;
      }
      this.setState({
        showmessageboolean: true,
        showmaeeagecontext: text
      });
    }
  }, {
    key: "changelockstate",
    value: function changelockstate() {
      this.setState({
        lockstate: !this.state.lockstate
      });
      _index2.default.setStorageSync('lockstate', !this.state.lockstate);
    }
  }, {
    key: "closepicker",
    value: function closepicker() {}
  }, {
    key: "closeshowModal",
    value: function closeshowModal() {
      this.setState({
        showmessageboolean: false,
        showmaeeagecontext: '',
        targhtid: [],
        modeldatatitle: '标题'
      });
    }
    //tab切换事件/替换显示内容

  }, {
    key: "handleClick",
    value: function handleClick(value) {
      this.setState({
        current: value,
        scrolltitlex: 0,
        scrolltitley: 0,
        contextscrolltitley: 0,
        contextscrolltitlex: 0
      });
      clearTimeout(scrollty);
      clearTimeout(scrolltxx);
      clearTimeout(scrolltxy);
      switch (this.state.current) {
        case 0:
          this.state.twodayago_is_edit = !this.state.twodayago_is_edit;
          if (this.state.twodayago_is_edit) {
            this.setState({
              twodayago_data_use: this.state.twodayago_data_full
            });
          } else {
            this.setState({
              twodayago_data_use: this.state.twodayago_data
            });
          }
          break;
        case 1:
          this.state.onedayago_is_edit = !this.state.onedayago_is_edit;
          if (this.state.onedayago_is_edit) {
            this.setState({
              onedayago_data_use: this.state.onedayago_data_full
            });
          } else {
            this.setState({
              onedayago_data_use: this.state.onedayago_data
            });
          }
          break;
        case 2:
          this.state.today_is_edit = !this.state.today_is_edit;
          if (this.state.today_is_edit) {
            this.setState({
              today_data_use: this.state.today_data_full
            });
          } else {
            this.setState({
              today_data_use: this.state.today_data
            });
          }
          break;
      }
    }
    //模态输入框文本变动

  }, {
    key: "handleChange",
    value: function handleChange(value) {
      this.setState({
        value: value.detail.value
      });
    }
    //修改文本

  }, {
    key: "changemessage",
    value: function changemessage(e) {
      if (!this.state.lockstate) {
        var tapid = e.currentTarget.id;
        var tab111 = tapid.split('@@');
        this.setState({
          showmodel: true,
          targhtid: tab111,
          modeldatatitle: this.state.idMname[tab111[0]]
        });
        var text = '';
        switch (this.state.current) {
          case 0:
            var twodayago_data = this.state.twodayago_data;
            for (var i = 0; i < twodayago_data.length; i++) {
              if (twodayago_data[i].id == tab111[1]) {
                text = twodayago_data[i][tab111[0]];
              }
            }
            break;
          case 1:
            var onedayago_data = this.state.onedayago_data;
            for (var _i5 = 0; _i5 < onedayago_data.length; _i5++) {
              if (onedayago_data[_i5].id == tab111[1]) {
                text = onedayago_data[_i5][tab111[0]];
              }
            }
            break;
          case 2:
            var today_data_temp = this.state.today_data;
            for (var _i6 = 0; _i6 < today_data_temp.length; _i6++) {
              if (today_data_temp[_i6].id == tab111[1]) {
                text = today_data_temp[_i6][tab111[0]];
              }
            }
            break;
        }
        this.setState({
          value: text
        });
      }
    }
    //修改自评文本

  }, {
    key: "changemessage_ext",
    value: function changemessage_ext(e) {
      if (!this.state.lockstate) {
        var tapid = e.currentTarget.id;
        var tab111 = tapid.split('@@');
        this.setState({
          showmodel: true,
          targhtid: tab111,
          modeldatatitle: this.state.idMname[tab111[0]]
        });
        var text = '';
        switch (this.state.current) {
          case 0:
            text = this.state.twodayago_ext.daily_sum;
            break;
          case 1:
            text = this.state.onedayago_ext.daily_sum;
            break;
          case 2:
            text = this.state.today_ext.daily_sum;
            break;
        }
        this.setState({
          value: text
        });
      }
    }
    //修改分类

  }, {
    key: "onCategoryChange",
    value: function onCategoryChange(e) {
      var selIndex = e.currentTarget.value;
      if (!this.state.lockstate) {
        var tapid = e.currentTarget.id;
        var tab111 = tapid.split('@@');
        var selText = this.state.categorys[selIndex];
        this.state.targhtid = tab111;
        this.state.value = selText;
        this.updatemessage(null);
      }
    }
    //修改选定目标

  }, {
    key: "onEffChange",
    value: function onEffChange(e) {
      var selIndex = e.currentTarget.value;
      if (!this.state.lockstate) {
        var tapid = e.currentTarget.id;
        var tab111 = tapid.split('@@');
        var selItem = this.state.maintask[selIndex];
        var selText = selItem.title;
        this.state.targhtid = tab111;
        this.state.value = selText;
        this.updatemessage(null);
      }
    }
    //提交变动

  }, {
    key: "updatemessage",
    value: function updatemessage(e) {
      var _this9 = this;

      var field = this.state.targhtid[0];
      _index2.default.request({
        url: _url2.default.locality_address + '/v1/work/modify',
        data: {
          wid: this.state.targhtid[1],
          openid: _index2.default.getStorageSync('openid'),
          field: field,
          val: this.state.value
        },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function (res) {
        //更改现有数据
        switch (_this9.state.current) {
          case 0:
            if (field == "daily_sum") {
              _this9.state.twodayago_ext.daily_sum = _this9.state.value;
            } else {
              var twodayago_data = _this9.state.twodayago_data;
              for (var i = 0; i < twodayago_data.length; i++) {
                if (twodayago_data[i].id == _this9.state.targhtid[1]) {
                  console.log('1111' + twodayago_data[i][_this9.state.targhtid[0]]);
                  twodayago_data[i][_this9.state.targhtid[0]] = _this9.state.value;
                }
              }
            }
            break;
          case 1:
            if (field == "daily_sum") {
              _this9.state.onedayago_ext.daily_sum = _this9.state.value;
            } else {
              var onedayago_data = _this9.state.onedayago_data;
              for (var _i7 = 0; _i7 < onedayago_data.length; _i7++) {
                if (onedayago_data[_i7].id == _this9.state.targhtid[1]) {
                  console.log('1111' + onedayago_data[_i7][_this9.state.targhtid[0]]);
                  onedayago_data[_i7][_this9.state.targhtid[0]] = _this9.state.value;
                }
              }
            }
            break;
          case 2:
            if (field == "daily_sum") {
              _this9.state.today_ext.daily_sum = _this9.state.value;
            } else {
              var today_data_temp = _this9.state.today_data;
              for (var _i8 = 0; _i8 < today_data_temp.length; _i8++) {
                if (today_data_temp[_i8].id == _this9.state.targhtid[1]) {
                  console.log('1111' + today_data_temp[_i8][_this9.state.targhtid[0]]);
                  today_data_temp[_i8][_this9.state.targhtid[0]] = _this9.state.value;
                }
              }
            }
            break;
        }
        _this9.setState({
          showmodel: false,
          targhtid: [],
          modeldatatitle: '标题',
          value: '',
          showrankmodel: false
        });
      });
    }
  }, {
    key: "changerank",
    value: function changerank(e) {
      this.setState({
        value: e.value
      });
    }
    //显示滑动条取值对话框

  }, {
    key: "showrankmodel",
    value: function showrankmodel(e) {
      if (!this.state.lockstate) {
        var tapid = e.currentTarget.id;
        var tab111 = tapid.split('@@');
        var text = '';
        switch (this.state.current) {
          case 0:
            var twodayago_data = this.state.twodayago_data;
            for (var i = 0; i < twodayago_data.length; i++) {
              if (twodayago_data[i].id == tab111[1]) {
                text = twodayago_data[i][tab111[0]];
              }
            }
            break;
          case 1:
            var onedayago_data = this.state.onedayago_data;
            for (var _i9 = 0; _i9 < onedayago_data.length; _i9++) {
              if (onedayago_data[_i9].id == tab111[1]) {
                text = onedayago_data[_i9][tab111[0]];
              }
            }
            break;
          case 2:
            var today_data_temp = this.state.today_data;
            for (var _i10 = 0; _i10 < today_data_temp.length; _i10++) {
              if (today_data_temp[_i10].id == tab111[1]) {
                text = today_data_temp[_i10][tab111[0]];
              }
            }
            break;
        }
        console.log(typeof text === "undefined" ? "undefined" : _typeof(text));
        if (tab111[0] == 'length_time') {
          //取时长值
          this.setState({
            ischangetime: true,
            value: text === '' || !text ? '10' : text
          });
        } else {
          //取评分值
          this.setState({
            value: text === '' || !text ? '5' : text
          });
        }
        this.setState({
          showrankmodel: true,
          targhtid: tab111,
          modeldatatitle: this.state.idMname[tab111[0]]
        });
      }
    }
  }, {
    key: "getWeek",
    value: function getWeek(date) {
      var week = void 0;
      if (date.getDay() == 0) {
        week = "星期日";
      }if (date.getDay() == 1) {
        week = "星期一";
      }if (date.getDay() == 2) {
        week = "星期二";
      }if (date.getDay() == 3) {
        week = "星期三";
      }if (date.getDay() == 4) {
        week = "星期四";
      }if (date.getDay() == 5) {
        week = "星期五";
      }if (date.getDay() == 6) {
        week = "星期六";
      }return week;
    }
  }, {
    key: "timedat",
    value: function timedat(res) {
      var time = new Date(res);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      return m + '月' + d + '日'; //返回格式  "2017-10-27" 字符串
    }
  }, {
    key: "timedaty_m_d",
    value: function timedaty_m_d(res) {
      var time1 = new Date(res);
      var y = time1.getFullYear();
      var m = time1.getMonth() + 1;
      if (m < 10) {
        m = '0' + m;
      }
      var d = time1.getDate();
      if (d < 10) {
        d = '0' + d;
      }
      // console.log(res)
      // console.log(time1)
      return y + '-' + m + '-' + d; //返回格式  "2017-10-27" 字符串
    }
    //跳转注册登录页面

  }, {
    key: "goregister",
    value: function goregister() {
      _index2.default.navigateTo({
        url: '/pages/bindname/bindname'
      });
    }
  }]);

  return Index;
}(_index.Component), _class.properties = {}, _class.$$events = ["showrankmodel", "onCategoryChange", "changemessage", "onEffChange", "touchstart", "scrollmovex", "scrollmovey", "scrollmove", "tomaintask", "goregister", "handleClick", "changemessage_ext", "closeModal", "handleChange", "updatemessage", "changerank", "closeshowModal"], _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));