"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../../../@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../../../prop-types/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../../../../../classnames/index.js");

var _index6 = _interopRequireDefault(_index5);

var _component = require("../../common/component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtSlider = (_temp2 = _class = function (_AtComponent) {
  _inherits(AtSlider, _AtComponent);

  function AtSlider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AtSlider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AtSlider.__proto__ || Object.getPrototypeOf(AtSlider)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "min", "max", "step", "_value", "disabled", "activeColor", "backgroundColor", "blockSize", "blockColor", "showValue", "__fn_onChanging", "__fn_onChange", "customStyle", "className", "value"], _this.$$refs = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AtSlider, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(AtSlider.prototype.__proto__ || Object.getPrototypeOf(AtSlider.prototype), "_constructor", this).apply(this, arguments);

      var value = props.value,
          min = props.min,
          max = props.max;

      this.state = {
        _value: AtSlider.clampNumber(value, min, max)
      };
    }
  }, {
    key: "handleChanging",
    value: function handleChanging(e) {
      var _value = this.state._value;
      var value = e.detail.value;


      if (value !== _value) {
        this.setState({ _value: value });
      }
      this.__triggerPropsFn("onChanging", [null].concat([{ value: value }]));
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var value = e.detail.value;


      this.setState({ _value: value });
      this.__triggerPropsFn("onChange", [null].concat([{ value: value }]));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var value = props.value,
          min = props.min,
          max = props.max;

      this.setState({
        _value: AtSlider.clampNumber(value, min, max)
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      ;

      var _value = this.__state._value;
      var _props = this.__props,
          customStyle = _props.customStyle,
          className = _props.className,
          min = _props.min,
          max = _props.max,
          step = _props.step,
          disabled = _props.disabled,
          activeColor = _props.activeColor,
          backgroundColor = _props.backgroundColor,
          blockSize = _props.blockSize,
          blockColor = _props.blockColor,
          showValue = _props.showValue;


      var anonymousState__temp = (0, _index6.default)({
        'at-slider': true,
        'at-slider--disabled': disabled
      }, className);
      var anonymousState__temp2 = (0, _index.internal_inline_style)(customStyle);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        min: min,
        max: max,
        step: step,
        disabled: disabled,
        activeColor: activeColor,
        backgroundColor: backgroundColor,
        blockSize: blockSize,
        blockColor: blockColor,
        showValue: showValue
      });
      return this.__state;
    }
  }], [{
    key: "clampNumber",
    value: function clampNumber(value, lower, upper) {
      return Math.max(lower, Math.min(upper, value));
    }
  }]);

  return AtSlider;
}(_component2.default), _class.properties = {
  "__fn_onChanging": {
    "type": null,
    "value": null
  },
  "__fn_onChange": {
    "type": null,
    "value": null
  },
  "customStyle": {
    "type": null,
    "value": null
  },
  "className": {
    "type": null,
    "value": null
  },
  "min": {
    "type": null,
    "value": null
  },
  "max": {
    "type": null,
    "value": null
  },
  "step": {
    "type": null,
    "value": null
  },
  "disabled": {
    "type": null,
    "value": null
  },
  "activeColor": {
    "type": null,
    "value": null
  },
  "backgroundColor": {
    "type": null,
    "value": null
  },
  "blockSize": {
    "type": null,
    "value": null
  },
  "blockColor": {
    "type": null,
    "value": null
  },
  "showValue": {
    "type": null,
    "value": null
  },
  "value": {
    "type": null,
    "value": null
  }
}, _class.$$events = ["handleChanging", "handleChange"], _class.defaultProps = {
  customStyle: '',
  className: '',
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  disabled: false,
  activeColor: '#6190e8',
  backgroundColor: '#e9e9e9',
  blockSize: 28,
  blockColor: '#ffffff',
  showValue: false,
  onChange: function onChange() {},
  onChanging: function onChanging() {}
}, _class.propTypes = {
  customStyle: _index4.default.oneOfType([_index4.default.object, _index4.default.string]),
  className: _index4.default.oneOfType([_index4.default.array, _index4.default.string]),
  min: _index4.default.number,
  max: _index4.default.number,
  step: _index4.default.number,
  value: _index4.default.number,
  disabled: _index4.default.bool,
  activeColor: _index4.default.string,
  backgroundColor: _index4.default.string,
  blockSize: _index4.default.number,
  blockColor: _index4.default.string,
  showValue: _index4.default.bool,
  onChange: _index4.default.func,
  onChanging: _index4.default.func
}, _temp2);
exports.default = AtSlider;

Component(require('../../../../../@tarojs/taro-weapp/index.js').default.createComponent(AtSlider));