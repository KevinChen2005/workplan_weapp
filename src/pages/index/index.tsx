import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView, Button, Picker } from '@tarojs/components'
import {
  AtAvatar,
  AtNoticebar,
  AtButton,
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  //  AtInput, 
  //  AtForm, 
  //  AtSwitch,
  AtSlider,
  AtIcon,
  AtProgress,
  AtTextarea,
} from 'taro-ui'

let loopload
let scrollty
let scrolltxx
let scrolltxy

let scrollid = ''
import './index.scss'
import url from '../../utils/url'

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '工作日志'
  }

  state = {
    userinfo: { type: 'userAvatarUrl' },
    currenttime: '',
    register: { msg: 'error', state: false },
    username: '',
    current: 2,
    currentdate: 0,
    current_today: '',
    onedayago: '',
    twodayago: '',
    today_is_edit:false,
    today_data_use:[],
    today_data_full:[],
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
      daily_sum: '',
    },
    onedayago_is_edit:true,
    onedayago_data_use:[],
    onedayago_data_full:[],
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
      daily_sum: '',
    },
    twodayago_is_edit:true,
    twodayago_data_use:[],
    twodayago_data_full:[],
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
      daily_sum: '',
    },
    categorys: ['开拓', '驱动', '实施', '维护', "协同"],
    itemtitles: ['时长(分)', /*'类别',*/ '对应目标','工作项目', '工作内容及说明', '效率自评',  '驱动自评'],
    moment: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
    showmodel: false,
    modeldatatitle: '标题',
    value: '',
    idMname: {
      work_start_time: '开始时间',
      length_time: '时长(分)',
      // category: '类别',
      work_effect: '对应目标',
      work_project: '工作项目',
      work_content: '工作内容及说明',
      work_efficiency: '效率自评',
      
      work_myself: '驱动自评',
    },
    targhtid: [],
    showmessageboolean: false,
    showmaeeagecontext: '',
    systemheight: '',
    resttime: '08:00,08:30,12:00,12:30,13:00,13:30,18:00,18:30,19:00,19:30,20:00,20:30,21:00',
    lockstate: false,
    functioncControlict: {

    },
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
  }

  componentWillMount() {

  }

  componentDidMount() {
    //载入锁定状态
    this.setState({
      lockstate: Taro.getStorageSync('lockstate')
    })
  }

  componentWillUnmount() { }

  componentDidShow() {
    //适配设备高度
    let sysinfo = Taro.getSystemInfoSync()
    let height = sysinfo.screenHeight
    let windowsheight = sysinfo.windowHeight

    this.setState({
      systemheight: 'height:' + (windowsheight - 118 - 25 - 75 -50) + 'px;',
      systeminfo: sysinfo
    })

    //判断是否有openid
    if (Taro.getStorageSync('openid') === "") {
      Taro.login({
        success: (res) => {
          console.log(res.code);

          Taro.request({
            url: url.locality_address + '/v1/work/jscode',
            data: {
              code: res.code
            }
          }).then((res1) => {
            if (res1.data.code == 200) {
              Taro.setStorage({
                key: 'openid',
                data: res1.data.success_msg.info.openid
              })
            } else {
              Taro.showToast({
                title: '获取用户标识失败请检查网络',
                icon: 'none'
              })
            }
            return res1.data.success_msg.info.openid
            //判断是否注册过
          }).then((openid) => {
            Taro.request({
              url: url.locality_address + '/v1/work/checkbind',
              data: {
                openid: openid
              }
            }).then((res) => {
              if (res.data.code == 10005) {
                Taro.setStorageSync('register', { msg: 'success', state: false })
                this.setState({
                  register: { msg: 'success', state: false }
                })
              } else if (res.data.code == 10003 || res.data.code == 10004) {
                Taro.setStorageSync('register', { msg: 'success', state: true })
                //如果已注册 拉取名字
                Taro.request({
                  url: url.locality_address + '/v1/work/username',
                  data: {
                    openid: openid
                  }
                }).then((res) => {
                  Taro.setStorageSync('username', res.data.result.username)
                  Taro.setStorageSync('phone', res.data.result.phone)
                  Taro.setStorageSync('department', res.data.result.department)
                  this.setState({
                    username: res.data.result.username,
                    department: res.data.result.department,
                    register: { msg: 'success', state: true }
                  })
                })
                this.pullmaintask()
                this.pulldata()
              } else {
                Taro.setStorageSync('register', { msg: 'error', state: false })
              }
            })
          })
        },
        fail: () => {
          Taro.showToast({
            title: '登录失败',
            icon: 'none'
          })
        }
      })
    } else {
      Taro.showLoading({
        title: '请稍候...'
      })

      this.setState({
        register: Taro.getStorageSync('register'),
        department: Taro.getStorageSync('department'),
        username: Taro.getStorageSync('username')
      })

      this.pullmaintask()
      this.pulldata()

      Taro.hideLoading()
    }

    console.log('加载啦')
  }

  componentDidHide() { }

  pullmaintask() {
    //载入主线任务
    Taro.request({
      url: url.locality_address + '/v1/work/task',
      data: {
        openid: Taro.getStorageSync('openid')
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.setState({
          maintask: res.data.result
        })
      } else {
        Taro.showToast({
          title: "主线任务加载失败，检查参数！",
          icon: 'none'
        })
      }
    }).catch((res) => {
      Taro.showToast({
        title: "主线任务加载失败，检查网络！",
        icon: 'none'
      })
    })
  }

  pulldata() {
    let time
    Taro.request({
      url: url.locality_address + '/v1/work/time'
    }).then((res) => {
      let now = new Date(parseInt(res.data.success_msg.time) * 1000)
      //  time = this.timedat(now)
      //  time = time + ' ' + this.getWeek(now)
      time = this.getWeek(now)
      this.setState({
        currenttime: time,
        currentdate: (parseInt(res.data.success_msg.time) * 1000)
      })
      return parseInt(res.data.success_msg.time) * 1000
    }).then((timest) => {
      this.setState({
        current_today: this.timedaty_m_d(timest),
        onedayago: this.timedaty_m_d((timest - 86400000)),
        twodayago: this.timedaty_m_d((timest - 86400000 * 2))
      })
      return [this.timedaty_m_d(timest), this.timedaty_m_d((timest - 86400000)), this.timedaty_m_d((timest - 86400000 * 2))]
    }).then((timearray) => {
      //拉取数据
      Taro.request({
        url: url.locality_address + '/v1/work/notes',
        data: {
          openid: Taro.getStorageSync('openid'),
          date: timearray[0]
        }
      }).then((res) => {
        let dataTemp = [];
        res.data.success_msg.info.map((item)=>{
          if (
            (item.length_time == null || item.length_time == '') && 
            (item.category == null || item.category == '') && 
            (item.work_project == null || item.work_project == '') && 
            (item.work_content == null || item.work_content == '') && 
            (item.work_efficiency == null || item.work_efficiency == 0) && 
            (item.work_effect == null || item.work_effect == 0) && 
            (item.work_myself == null || item.work_myself == 0) 
          ) {
            return;
          }
          dataTemp.push(item);
        });
        this.setState({
          today_data_use: dataTemp,
          today_data: dataTemp,
          today_data_full: res.data.success_msg.info,
          today_ext: res.data.success_msg.ext,
        })
      })
      return timearray
    }).then((timearray) => {
      //拉取数据
      Taro.request({
        url: url.locality_address + '/v1/work/notes',
        data: {
          openid: Taro.getStorageSync('openid'),
          date: timearray[1]
        }
      }).then((res) => {
        let dataTempOne = [];
        res.data.success_msg.info.map((item)=>{
          if (
            (item.length_time == null || item.length_time == '') && 
            (item.category == null || item.category == '') && 
            (item.work_project == null || item.work_project == '') && 
            (item.work_content == null || item.work_content == '') && 
            (item.work_efficiency == null || item.work_efficiency == 0) && 
            (item.work_effect == null || item.work_effect == 0) && 
            (item.work_myself == null || item.work_myself == 0) 
          ) {
            return;
          }
          dataTempOne.push(item);
        });
         this.setState({
          onedayago_data_use: dataTempOne,
          onedayago_data:dataTempOne,
          onedayago_data_full: res.data.success_msg.info,
          onedayago_ext: res.data.success_msg.ext,
        })
      })
      return timearray
    }).then((timearray) => {
      //拉取数据
      Taro.request({
        url: url.locality_address + '/v1/work/notes',
        data: {
          openid: Taro.getStorageSync('openid'),
          date: timearray[2]
        }
      }).then((res) => {
        let dataTempTwo = [];
          res.data.success_msg.info.map((item)=>{
            if (
              (item.length_time == null || item.length_time == '') && 
              (item.category == null || item.category == '') && 
              (item.work_project == null || item.work_project == '') && 
              (item.work_content == null || item.work_content == '') && 
              (item.work_efficiency == null || item.work_efficiency == 0) && 
              (item.work_effect == null || item.work_effect == 0) && 
              (item.work_myself == null || item.work_myself == 0) 
            ) {
              return;
            }
            dataTempTwo.push(item);
          });
        this.setState({
          twodayago_data_use: dataTempTwo,
          twodayago_data: dataTempTwo,
          twodayago_data_full: res.data.success_msg.info,
          twodayago_ext: res.data.success_msg.ext,
        })
      })
      return timearray
    })
  }

  render() {
    const tabList = [{ title: this.state.twodayago }, { title: this.state.onedayago }, { title: this.state.current_today }]
    let { itemtitles } = this.state
    let today_data = this.state.today_data_use
    let onedayago_data = this.state.onedayago_data_use
    let twodayago_data = this.state.twodayago_data_use
    let today_ext = this.state.today_ext
    let onedayago_ext = this.state.onedayago_ext
    let twodayago_ext = this.state.twodayago_ext

    //标题
    let itemtitle = itemtitles.map((item) => {
      return <View className='itemtitle'>{item}</View> 
      // { 
      //   if(item != '工作内容及说明')  
      //     return <View className='itemtitle'>{item}</View> 
      //   else
      //     return <View className='itemtitle_longfield'>{item}</View> 
      // }      
    })

    //时间栏
    let today_timelist = today_data.map(
      (item) => {
        return <View id={'work_start_time@@' + item.id} style={this.state.resttime.indexOf(item.work_start_time) > -1 && item.work_start_time.length >= 5 ? 'color:green' : 'none'} className='itemcontext1'>{item.work_start_time}</View>
      }
    )

    let onedayago_timelist = onedayago_data.map(
      (item) => {
        return <View id={'work_start_time@@' + item.id} style={this.state.resttime.indexOf(item.work_start_time) > -1 && item.work_start_time.length >= 5 ? 'color:green' : 'none'} className='itemcontext1'>{item.work_start_time}</View>
      }
    )

    let twodayago_timelist = twodayago_data.map(
      (item) => {
        return <View id={'work_start_time@@' + item.id} style={this.state.resttime.indexOf(item.work_start_time) > -1 && item.work_start_time.length >= 5 ? 'color:green' : 'none'} className='itemcontext1'>{item.work_start_time}</View>
      }
    )

    //内容
    //今日内容
    let itemcontexttoday = today_data.map((item) => {
      if (item.category == null) {
        item.category = '';
      }

      //类别对应选择
      let selIndex = 0;
      this.state.categorys.map((itemCate, index) => {
        if (itemCate == item.category) {
          selIndex = index;
        }
      });

      //对应目标对应选择
      let selIndexEff = 0;
      let maskTitles = [];
      this.state.maintask.map((itemEff, index) => {
        let title = itemEff.title;
        maskTitles.push(title);
        if (title == item.work_effect) {
          selIndexEff = index;
        }
      });

      return <View className='tabletitle'>
        {/* 时长 */}
        <View id={'length_time@@' + item.id} onClick={this.showrankmodel} className='itemcontext'><Text>{item.length_time}</Text></View>
        {/* {!this.state.lockstate  &&
        <View id={'length_time@@'+item.id}  className='itemcontext'>
          <Picker id={item.id} mode='time' onCancel={this.closepicker} onChange={this.onDateChange} style='width:100%;height:100%' value={item.length_time}>
            <View className='itemcontext1 noleftline'>
              {item.length_time}
            </View>
          </Picker>
        </View>
        }
         {this.state.lockstate  &&
        <View id={'length_time@@'+item.id}  className='itemcontext'>{item.length_time}</View>
         } */}

        {/* 类别 */}
        {/* <View id={'category@@' + item.id} className='itemcontext'>
          <Picker id={'category@@' + item.id} mode='selector' range={this.state.categorys} onChange={this.onCategoryChange} style='width:100%;height:100%' value={selIndex}>
            <View className='itemcontextCate'> {item.category} </View>
          </Picker>
        </View> */}
        <View id={'work_effect@@' + item.id} className='itemcontext'>
          <Picker id={'work_effect@@' + item.id} mode='selector' range={maskTitles} onChange={this.onEffChange} style='width:100%;height:100%' value={selIndexEff}>
            <View className='itemcontextCate'>
              {item.work_effect}
            </View>
          </Picker>
        </View>
        <View id={'work_project@@' + item.id} onClick={this.changemessage} className='itemcontext'><Text>{item.work_project}</Text></View>
        <View id={'work_content@@' + item.id} onClick={this.changemessage} className='itemcontext'><Text>{item.work_content}</Text></View>
        <View id={'work_efficiency@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>
          <Text> {item.work_efficiency}</Text>
        </View>
        

        <View id={'work_myself@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>
          <Text>{item.work_myself}</Text>
        </View>
      </View>
    })

    //上一天内容
    let itemcontextoneago = onedayago_data.map((item) => {
      if (item.category === null) {
        item.category = '';
      }

      let selIndex = 0;
      this.state.categorys.map((itemCate, index) => {
        if (itemCate == item.category) {
          selIndex = index;
        }
      });

      let selIndexEff = 0;
      let maskTitles = [];
      this.state.maintask.map((itemEff, index) => {
        let title = itemEff.title;
        maskTitles.push(title);
        if (title == item.work_effect) {
          selIndexEff = index;
        }
      });

      return <View className='tabletitle'>
        <View id={'length_time@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>{item.length_time}</View>
        {/* {!this.state.lockstate  &&
        <View id={'length_time@@'+item.id}  className='itemcontext'>
          <Picker id={item.id} mode='time' onCancel={this.closepicker} onChange={this.onDateChange} style='width:100%;height:100%' value={item.length_time}>
            <View className='itemcontext1 noleftline'>
              {item.length_time}
            </View>
          </Picker>
        </View>
        }
         {this.state.lockstate  &&
        <View id={'length_time@@'+item.id}  className='itemcontext'>{item.length_time}</View>
         } */}
        {/* <View id={'category@@' + item.id} className='itemcontext'>
          <Picker className='itemcontextCate' id={'category@@' + item.id} mode='selector' range={this.state.categorys} onChange={this.onCategoryChange} style='width:100%;height:100%' value={selIndex}>
            <View className='itemcontextCate'>
              {item.category}
            </View>
          </Picker>
        </View> */}
        <View id={'work_effect@@' + item.id} className='itemcontext'>
          <Picker id={'work_effect@@' + item.id} mode='selector' range={maskTitles} onChange={this.onEffChange} style='width:100%;height:100%' value={selIndexEff}>
            <View className='itemcontextCate'>
              {item.work_effect}
            </View>
          </Picker>
        </View>
        <View id={'work_project@@' + item.id} onClick={this.changemessage} className='itemcontext'>{item.work_project}</View>
        <View id={'work_content@@' + item.id} onClick={this.changemessage} className='itemcontext'>{item.work_content}</View>
        <View id={'work_efficiency@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>{item.work_efficiency}</View>
        
        <View id={'work_myself@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>
          {item.work_myself}
        </View>
      </View>
    })

    //上两天内容
    let itemcontexttwoago = twodayago_data.map((item) => {
      if (item.category === null) {
        item.category = '';
      }

      let selIndex = 0;
      this.state.categorys.map((itemCate, index) => {
        if (itemCate == item.category) {
          selIndex = index;
        }
      });

      let selIndexEff = 0;
      let maskTitles = [];
      this.state.maintask.map((itemEff, index) => {
        let title = itemEff.title;
        maskTitles.push(title);
        if (title == item.work_effect) {
          selIndexEff = index;
        }
      });

      return <View className='tabletitle'>
        <View id={'length_time@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>{item.length_time}</View>
        {/* <View id={'category@@' + item.id} className='itemcontext'>
          <Picker className='itemcontextCate1' id={'category@@' + item.id} mode='selector' range={this.state.categorys} onChange={this.onCategoryChange} style='width:100%;height:100%' value={selIndex}>
            <View className='itemcontextCate'> {item.category} </View>
          </Picker>
        </View> */}
        <View id={'work_effect@@' + item.id} className='itemcontext'>
          <Picker id={'work_effect@@' + item.id} mode='selector' range={maskTitles} onChange={this.onEffChange} style='width:100%;height:100%' value={selIndexEff}>
            <View className='itemcontextCate'> {item.work_effect} </View>
          </Picker>
        </View>
        <View id={'work_project@@' + item.id} onClick={this.changemessage} className='itemcontext'>{item.work_project}</View>
        <View id={'work_content@@' + item.id} onClick={this.changemessage} className='itemcontext'>{item.work_content}</View>
        <View id={'work_efficiency@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>{item.work_efficiency}</View>
        
        <View id={'work_myself@@' + item.id} onClick={this.showrankmodel} className='itemcontext'>
          {item.work_myself}
        </View>
      </View>
    })

    let title2 = <View className='itemtitleplus' id='ScrollView222' onTouchStart={this.touchstart}  >
      {/* 上半部分 */}
      <ScrollView className='scrollview1' scrollX={true} scrollWithAnimation>
        <View className='itemtitle1'>时间</View>
      </ScrollView>
      <ScrollView className='' scrollX={true} scrollWithAnimation style={'width:' + (this.state.systeminfo.windowWidth - 45) + 'px;'}
        scrollLeft={this.state.scrolltitlex} onScroll={this.scrollmovex} id='ScrollView222' >
        <View className='tabletitle'> {itemtitle} </View>
      </ScrollView>
    </View>

    // 下半部分
    let context = <View className='logcontext'>
      {/* 时间列表 */}
      <View id='ScrollView111' onTouchStart={this.touchstart}>
        <ScrollView className='timelistscroll' scrollY={true} scrollWithAnimation style={ this.state.systemheight}
          scrollTop={this.state.scrolltitley} onScroll={this.scrollmovey} id='ScrollView111'>
          <View className='timelistview'>
            {today_timelist}
          </View>
        </ScrollView>
      </View>

      {/* 任务内容列表 */}
      <View id='scrollcontext' onTouchStart={this.touchstart}>
        <ScrollView className='scrollview' scrollX={true} scrollY={true} scrollWithAnimation
          style={'width:' + (this.state.systeminfo.windowWidth - 45) + 'px;' + this.state.systemheight}
          onScroll={this.scrollmove} scrollTop={this.state.contextscrolltitley} scrollLeft={this.state.contextscrolltitlex} id='scrollcontext' >
          <View className='table'> {itemcontexttoday} </View>
        </ScrollView>
      </View>
    </View>

    let context1 = <View className='logcontext'>
      {/* 时间列表 */}
      <View id='ScrollView111' onTouchStart={this.touchstart}>
        <ScrollView className='timelistscroll' scrollY={true} scrollWithAnimation style={this.state.systemheight}
          scrollTop={this.state.scrolltitley} onScroll={this.scrollmovey} id='ScrollView111' >
          <View className='timelistview'> {onedayago_timelist} </View>
        </ScrollView>
      </View>

      {/* 任务内容列表 */}
      <View id='scrollcontext' onTouchStart={this.touchstart}>
        <ScrollView
          className='scrollview'
          scrollX={true}
          scrollY={true}
          scrollWithAnimation
          style={'width:' + (this.state.systeminfo.windowWidth - 45) + 'px;' + this.state.systemheight}
          onScroll={this.scrollmove}
          scrollTop={this.state.contextscrolltitley}
          scrollLeft={this.state.contextscrolltitlex}
          id='scrollcontext'
        >
          <View className='table'>
            {itemcontextoneago}
          </View>
        </ScrollView>
      </View>

    </View>


    let context2 = <View className='logcontext'>
      {/* 时间列表 */}
      <View id='ScrollView111' onTouchStart={this.touchstart}>
        <ScrollView
          className='timelistscroll'
          scrollY={true}
          scrollWithAnimation
          style={this.state.systemheight}
          scrollTop={this.state.scrolltitley}
          onScroll={this.scrollmovey}
          id='ScrollView111'
        >
          <View className='timelistview'>
            {twodayago_timelist}
          </View>
        </ScrollView>
      </View>

      {/* 任务内容列表 */}
      <View id='scrollcontext' onTouchStart={this.touchstart}>
        <ScrollView
          className='scrollview'
          scrollX={true}
          scrollY={true}
          scrollWithAnimation
          style={'width:' + (this.state.systeminfo.windowWidth - 45) + 'px;' + this.state.systemheight}
          onScroll={this.scrollmove}
          scrollTop={this.state.contextscrolltitley}
          scrollLeft={this.state.contextscrolltitlex}
          id='scrollcontext'
        >
          <View className='table'>
            {itemcontexttwoago}
          </View>
        </ScrollView>
      </View>

    </View>


    let tasklist = this.state.maintask.map((item) => {
      return <View className='maintaskitem'>
        <Text className='tasktitle'>{item.title}</Text>
        <View style='flex:1'>
          <AtProgress percent={parseInt(item.complete_time)} status={parseInt(item.complete_time) == 100 ? 'success' : 'progress'} />
        </View>
      </View>
    })


    return (
      <View className='index'>
        <AtNoticebar marquee speed="50"> 欢迎使用好玩工作日志系统 </AtNoticebar>
        <View className="title">
          <View className='userinfo'>
            <AtAvatar className='touxiang' openData={this.state.userinfo} circle={true} size="small"></AtAvatar>
            {this.state.register.state && <Text className="username">{this.state.department} - </Text> }
            <Text className="username">{this.state.register.state ? this.state.username : '欢迎'}</Text>
          </View>

          <Text className='currenttime'>{this.state.currenttime}</Text>
          {this.state.register.state &&
            <View className='task' onClick={this.tomaintask}>
              <Text className='text'>主线任务</Text>
              <AtIcon className='icon' value='clock' size='15' color='#888' ></AtIcon>
            </View>
          }
        </View>

        <ScrollView className='maintaskscroll' scrollY={true} scrollWithAnimation id='ScrollViewtask' >
          {this.state.maintask.length <= 0 &&
            <View className='maintaskempty'>
              <Text>暂无任务</Text>
            </View>
          }
          {this.state.maintask.length > 0 &&
            <View className='maintask'>
              {tasklist}
            </View>
          }
        </ScrollView>

        {/* 日志部分 */}
        {!this.state.register.state && <View className='center'>
          <AtButton className='goregster' type='primary' onClick={this.goregister} >请绑定用户姓名</AtButton>
        </View>
        }

        {this.state.register.state &&
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)} swipeable={false}>
            <AtTabsPane current={this.state.current} index={0} >
              <View className='test1'>
                {title2}
                {context2}
              </View>
              <View className='bottom_self'>今日工作要点自评:</View>
              <View id={'daily_sum@@' + twodayago_ext.id} onClick={this.changemessage_ext} className='bottom_value'>{twodayago_ext.daily_sum}</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View className='test1'>
                {title2}
                {context1}
              </View>
              <View className='bottom_self'>今日工作要点自评:</View>
              <View id={'daily_sum@@' + onedayago_ext.id} onClick={this.changemessage_ext} className='bottom_value'>{onedayago_ext.daily_sum}</View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View className='test1'>
                {title2}
                {context}
              </View>
              <View className='bottom_self'>今日工作要点自评:</View>
              <View id={'daily_sum@@' + today_ext.id} onClick={this.changemessage_ext} className='bottom_value'>{today_ext.daily_sum}</View>
            </AtTabsPane>
          </AtTabs>
        }


        <AtModal isOpened={this.state.showmodel} closeOnClickOverlay={false} onClose={this.closeModal.bind(this, 1, 'Modal被关闭了')}>
          <AtModalHeader>{this.state.modeldatatitle}</AtModalHeader>
          <AtModalContent>
            {/* <AtInput
              name='value1'
              type='text'
              placeholder='输入内容'
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              customStyle='border:1px solid #d6e4ef;padding:15rpx 0;border-radius:8rpx;              '
            /> */}
            {this.state.showmodel &&
              <AtTextarea
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                maxlength='400'
                placeholder='内容'
                className='addcontextarea'
              />
            }

          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeModal.bind(this, 1, '点击了取消')}>
              取消
            </Button>
            <Button
              style='color:#6190E8'
              onClick={this.updatemessage.bind(this, 1, '点击了确定')}
            >
              确定
            </Button>
          </AtModalAction>
        </AtModal>

        {/* 评分 */}
        <AtModal isOpened={this.state.showrankmodel} closeOnClickOverlay={false} onClose={this.closeModal.bind(this, 1, 'Modal被关闭了')}>
          <AtModalHeader>{this.state.modeldatatitle}</AtModalHeader>
          <AtModalContent>
            {!this.state.ischangetime &&
              <AtSlider step={0.5} min={5} value={parseFloat(this.state.value)} max={10} onChange={this.changerank} activeColor='#4285F4' backgroundColor='#BDBDBD' blockColor='#4285F4' blockSize={15} showValue={true}></AtSlider>
            }
            {this.state.ischangetime &&
              <AtSlider step={10} min={10} value={parseFloat(this.state.value)} max={120} onChange={this.changerank} activeColor='#4285F4' backgroundColor='#BDBDBD' blockColor='#4285F4' blockSize={15} showValue={true}></AtSlider>
            }
          </AtModalContent>
          <AtModalAction>
            <Button
              onClick={this.closeModal.bind(this, 1, '点击了取消')}
            >
              取消
            </Button>
            <Button
              style='color:#6190E8'
              onClick={this.updatemessage.bind(this, 1, '点击了确定')}
            >
              确定
            </Button>
          </AtModalAction>
        </AtModal>


        {/* //展示信息 */}
        <AtModal isOpened={this.state.showmessageboolean} onClose={this.closeshowModal.bind(this, 1, '点击了确定')}>
          <AtModalHeader>{this.state.modeldatatitle}</AtModalHeader>
          <AtModalContent>
            <View className='delmode'>
              <Text>{this.state.showmaeeagecontext}</Text>
            </View>
          </AtModalContent>
          <AtModalAction>
            {/* <Button onClick={this.closeshowModal.bind(this, 1, '点击了取消')}>
              取消
            </Button> */}
            <Button
              style='color:#6190E8'
              onClick={this.closeshowModal.bind(this, 1, '点击了确定')}
            >
              确定
            </Button>
          </AtModalAction>
        </AtModal>

      </View>
    )
  }

  tomaintask(e) {
    Taro.navigateTo({
      url: '/pages/maintask/maintask'
    })
  }

  touchstart(e) {
    scrollid = e.currentTarget.id
  }

  scrollmovex(e) {
    if (e.currentTarget.id === scrollid) {
      clearTimeout(scrolltxx)
      scrolltxx = setTimeout(() => {
        this.setState({
          contextscrolltitlex: e.currentTarget.scrollLeft,
        })
      }, 300);
    }
  }

  scrollmovey(e) {
    if (e.currentTarget.id === scrollid) {
      clearTimeout(scrolltxy)
      scrolltxy = setTimeout(() => {
        this.setState({
          contextscrolltitley: e.currentTarget.scrollTop
        })
      }, 300);
    }
  }


  scrollmove(e) {
    // console.log('区域移动')
    // console.log(e)
    clearTimeout(scrollty)
    if (e.currentTarget.id === scrollid) {
      scrollty = setTimeout(() => {
        // console.log('区域移动 修改数值')
        // console.log(e)
        scrollid = e.currentTarget.id
        this.setState({
          scrolltitlex: e.currentTarget.scrollLeft,
          scrolltitley: e.currentTarget.scrollTop
        })
      }, 300);
    }

    // scrollX = e.currentTarget.scrollLeft
    // scrollY = e.currentTarget.scrollTop
    // console.log(scrollX)
    // console.log(scrollY)
  }

  emptyfunction() {

  }

  showmessage(e) {

    // console.log('断案')

    let tapid = e.currentTarget.id
    let tab111 = tapid.split('@@')
    // console.log(tab111)

    this.setState({
      targhtid: tab111,
      modeldatatitle: this.state.idMname[tab111[0]]
    })

    let text = ''

    switch (this.state.current) {
      case 0:
        // console.log('进入10')
        let twodayago_data = this.state.twodayago_data
        for (let i = 0; i < twodayago_data.length; i++) {
          if (twodayago_data[i].id == tab111[1]) {
            text = twodayago_data[i][tab111[0]]
          }
        }
        break;
      case 1:
        // console.log('进入2')
        let onedayago_data = this.state.onedayago_data
        for (let i = 0; i < onedayago_data.length; i++) {
          if (onedayago_data[i].id == tab111[1]) {
            text = onedayago_data[i][tab111[0]]
          }
        }
        break;
      case 2:
        // console.log('进入3')
        let today_data_temp = this.state.today_data
        for (let i = 0; i < today_data_temp.length; i++) {
          if (today_data_temp[i].id == tab111[1]) {
            text = today_data_temp[i][tab111[0]]
          }
        }

        break;
    }


    this.setState({
      showmessageboolean: true,
      showmaeeagecontext: text
    })
  }


  changelockstate() {

    this.setState({
      lockstate: !this.state.lockstate
    })

    Taro.setStorageSync('lockstate', !this.state.lockstate)

  }

  //修改时间
  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })

    console.log(e)
    Taro.request({
      url: url.locality_address + '/v1/work/modify',
      data: {
        wid: e.currentTarget.id,
        openid: Taro.getStorageSync('openid'),
        field: 'length_time',
        val: e.detail.value
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then((res) => {
      //更改现有数据
      switch (this.state.current) {
        case 0:
          let twodayago_data = this.state.twodayago_data
          for (let i = 0; i < twodayago_data.length; i++) {
            if (twodayago_data[i].id == res.data.result.wid) {
              twodayago_data[i][res.data.result.field] = res.data.result.val;
            }
          }
          break;
        case 1:
          let onedayago_data = this.state.onedayago_data
          for (let i = 0; i < onedayago_data.length; i++) {
            if (onedayago_data[i].id == res.data.result.wid) {
              onedayago_data[i][res.data.result.field] = res.data.result.val;
            }
          }
          break;
        case 2:
          let today_data_temp = this.state.today_data
          for (let i = 0; i < today_data_temp.length; i++) {
            if (today_data_temp[i].id == res.data.result.wid) {
              today_data_temp[i][res.data.result.field] = res.data.result.val;
            }
          }
          break;
      }

      this.setState({
        showmodel: false,
        targhtid: [],
        modeldatatitle: '标题',
        value: ''
      })
    })
  }

  closepicker() {

  }

  closeshowModal() {
    this.setState({
      showmessageboolean: false,
      showmaeeagecontext: '',
      targhtid: [],
      modeldatatitle: '标题',
    })
  }

  //tab切换事件/替换显示内容
  handleClick(value) {
    
    this.setState({
      current: value,
      scrolltitlex: 0,
      scrolltitley: 0,
      contextscrolltitley: 0,
      contextscrolltitlex: 0
    })

    clearTimeout(
      scrollty
    )

    clearTimeout(
      scrolltxx
    )

    clearTimeout(
      scrolltxy
    )

    switch (this.state.current) {
      case 0:
      this.state.twodayago_is_edit = !this.state.twodayago_is_edit;
        if (this.state.twodayago_is_edit) {
          this.setState({
            twodayago_data_use: this.state.twodayago_data_full
          }) 
        } else {
          this.setState({
            twodayago_data_use: this.state.twodayago_data
          }) 
        }
        
        break;
      case 1:
        this.state.onedayago_is_edit = !this.state.onedayago_is_edit;
        if (this.state.onedayago_is_edit) {
          this.setState({
            onedayago_data_use: this.state.onedayago_data_full
          }) 
        } else {
          this.setState({
            onedayago_data_use: this.state.onedayago_data
          }) 
        }
        break;
      case 2:
        this.state.today_is_edit = !this.state.today_is_edit;
        if (this.state.today_is_edit) {
          this.setState({
            today_data_use: this.state.today_data_full
          }) 
        } else {
          this.setState({
            today_data_use: this.state.today_data
          }) 
        }
       break;
    }
  }

  //模态输入框文本变动
  handleChange(value) {
    this.setState({
      value: value.detail.value
    })
  }

  //修改文本
  changemessage(e) {
    if (!this.state.lockstate) {
      let tapid = e.currentTarget.id
      let tab111 = tapid.split('@@')
      this.setState({
        showmodel: true,
        targhtid: tab111,
        modeldatatitle: this.state.idMname[tab111[0]]
      })

      let text = ''
      switch (this.state.current) {
        case 0:
          let twodayago_data = this.state.twodayago_data
          for (let i = 0; i < twodayago_data.length; i++) {
            if (twodayago_data[i].id == tab111[1]) {
              text = twodayago_data[i][tab111[0]]
            }
          }
          break;
        case 1:
          let onedayago_data = this.state.onedayago_data
          for (let i = 0; i < onedayago_data.length; i++) {
            if (onedayago_data[i].id == tab111[1]) {
              text = onedayago_data[i][tab111[0]]
            }
          }
          break;
        case 2:
          let today_data_temp = this.state.today_data
          for (let i = 0; i < today_data_temp.length; i++) {
            if (today_data_temp[i].id == tab111[1]) {
              text = today_data_temp[i][tab111[0]]
            }
          }
         break;
      }

      this.setState({
        value: text
      })
    } 
  }

  //修改自评文本
  changemessage_ext(e) {
    if (!this.state.lockstate) {
      let tapid = e.currentTarget.id
      let tab111 = tapid.split('@@')
      this.setState({
        showmodel: true,
        targhtid: tab111,
        modeldatatitle: this.state.idMname[tab111[0]]
      })

      let text = ''
      switch (this.state.current) {
        case 0:
          text= this.state.twodayago_ext.daily_sum
          break;
        case 1:
          text= this.state.onedayago_ext.daily_sum
          break;
        case 2:
          text= this.state.today_ext.daily_sum
          break;
      }

      this.setState({
        value: text
      })
    } 
  }

  //修改分类
  onCategoryChange(e) {
    let selIndex = e.currentTarget.value
    if (!this.state.lockstate) {
      let tapid = e.currentTarget.id
      let tab111 = tapid.split('@@')

      let selText = this.state.categorys[selIndex];
      this.state.targhtid = tab111;
      this.state.value = selText;

      this.updatemessage(null);
    }
  }
  
  //修改选定目标
  onEffChange(e) {
    let selIndex = e.currentTarget.value
    if (!this.state.lockstate) {
      let tapid = e.currentTarget.id
      let tab111 = tapid.split('@@')

      let selItem = this.state.maintask[selIndex];
      let selText = selItem.title;
      this.state.targhtid = tab111;
      this.state.value = selText;

      this.updatemessage(null);
    }
  }

  //提交变动
  updatemessage(e) {
    let field = this.state.targhtid[0]
    Taro.request({
      url: url.locality_address + '/v1/work/modify',
      data: {
        wid: this.state.targhtid[1],
        openid: Taro.getStorageSync('openid'),
        field: field,
        val: this.state.value
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then((res) => {
      //更改现有数据
      switch (this.state.current) {
        case 0:
          if (field == "daily_sum") {
            this.state.twodayago_ext.daily_sum = this.state.value;
          } else {
            let twodayago_data = this.state.twodayago_data_full
            for (let i = 0; i < twodayago_data.length; i++) {
              if (twodayago_data[i].id == this.state.targhtid[1]) {
                console.log('1111' + twodayago_data[i][this.state.targhtid[0]])
                twodayago_data[i][this.state.targhtid[0]] = this.state.value;
              }
            }
            let dataTemp = [];
            twodayago_data.map((item)=>{
              if (
                (item.length_time == null || item.length_time == '') && 
                (item.category == null || item.category == '') && 
                (item.work_project == null || item.work_project == '') && 
                (item.work_content == null || item.work_content == '') && 
                (item.work_efficiency == null || item.work_efficiency == 0) && 
                (item.work_effect == null || item.work_effect == 0) && 
                (item.work_myself == null || item.work_myself == 0) 
              ) {
                return;
              }
              dataTemp.push(item);
            });
            this.state.twodayago_data = dataTemp;
          }
          break;
        case 1:
          if (field == "daily_sum") {
            this.state.onedayago_ext.daily_sum = this.state.value;
          } else {
            let onedayago_data = this.state.onedayago_data_full
            for (let i = 0; i < onedayago_data.length; i++) {
              if (onedayago_data[i].id == this.state.targhtid[1]) {
                console.log('1111' + onedayago_data[i][this.state.targhtid[0]])
                onedayago_data[i][this.state.targhtid[0]] = this.state.value;
              }
            }

            let dataTemp = [];
            onedayago_data.map((item)=>{
              if (
                (item.length_time == null || item.length_time == '') && 
                (item.category == null || item.category == '') && 
                (item.work_project == null || item.work_project == '') && 
                (item.work_content == null || item.work_content == '') && 
                (item.work_efficiency == null || item.work_efficiency == 0) && 
                (item.work_effect == null || item.work_effect == 0) && 
                (item.work_myself == null || item.work_myself == 0) 
              ) {
                return;
              }
              dataTemp.push(item);
            });
            this.state.onedayago_data = dataTemp;
          }
          break;
        case 2:
          if (field == "daily_sum") {
            this.state.today_ext.daily_sum = this.state.value;
          } else {
            let today_data_temp = this.state.today_data_full
            for (let i = 0; i < today_data_temp.length; i++) {
              if (today_data_temp[i].id == this.state.targhtid[1]) {
                console.log('1111' + today_data_temp[i][this.state.targhtid[0]])
                today_data_temp[i][this.state.targhtid[0]] = this.state.value;
              }
            }

            let dataTemp = [];
            today_data_temp.map((item)=>{
              if (
                (item.length_time == null || item.length_time == '') && 
                (item.category == null || item.category == '') && 
                (item.work_project == null || item.work_project == '') && 
                (item.work_content == null || item.work_content == '') && 
                (item.work_efficiency == null || item.work_efficiency == 0) && 
                (item.work_effect == null || item.work_effect == 0) && 
                (item.work_myself == null || item.work_myself == 0) 
              ) {
                return;
              }
              dataTemp.push(item);
            });
            this.state.today_data = dataTemp;
          }
          break;
      }

      this.setState({
        showmodel: false,
        targhtid: [],
        modeldatatitle: '标题',
        value: '',
        showrankmodel: false
      })
    })
  }

  changerank(e) {
    this.setState({
      value: e.value
    })
  }

  //关闭模态框
  closeModal = (type, msg) => {
    console.log(msg)
    this.setState({
      showmodel: false,
      targhtid: [],
      modeldatatitle: '标题',
      value: '',
      showrankmodel: false,
      ischangetime: false
    })
  }

  //显示滑动条取值对话框
  showrankmodel(e) {
    if (!this.state.lockstate) {
      let tapid = e.currentTarget.id
      let tab111 = tapid.split('@@')

      let text = ''
      switch (this.state.current) {
        case 0:
          let twodayago_data = this.state.twodayago_data
          for (let i = 0; i < twodayago_data.length; i++) {
            if (twodayago_data[i].id == tab111[1]) {
              text = twodayago_data[i][tab111[0]]
            }
          }
          break;
        case 1:
          let onedayago_data = this.state.onedayago_data
          for (let i = 0; i < onedayago_data.length; i++) {
            if (onedayago_data[i].id == tab111[1]) {
              text = onedayago_data[i][tab111[0]]
            }
          }
          break;
        case 2:
          let today_data_temp = this.state.today_data
          for (let i = 0; i < today_data_temp.length; i++) {
            if (today_data_temp[i].id == tab111[1]) {
              text = today_data_temp[i][tab111[0]]
            }
          }
          break;
      }
      console.log(typeof text)

      if (tab111[0] == 'length_time') { //取时长值
        this.setState({
          ischangetime: true,
          value: text === '' || !text ? '10' : text,
        })
      } else { //取评分值
        this.setState({
          value: text === '' || !text ? '5' : text, //最小值5
        })
      }

      this.setState({
        showrankmodel: true,
        targhtid: tab111,
        modeldatatitle: this.state.idMname[tab111[0]],
      })
    }
  }

  getWeek(date) {
    let week;
    if (date.getDay() == 0) week = "星期日"
    if (date.getDay() == 1) week = "星期一"
    if (date.getDay() == 2) week = "星期二"
    if (date.getDay() == 3) week = "星期三"
    if (date.getDay() == 4) week = "星期四"
    if (date.getDay() == 5) week = "星期五"
    if (date.getDay() == 6) week = "星期六"
    return week;
  }

  timedat(res) {   //res 为传入的时间戳   例：1509091800000
    var time = new Date(res);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();

    return m + '月' + d + '日';    //返回格式  "2017-10-27" 字符串
  }

  timedaty_m_d(res) {   //res 为传入的时间戳   例：1509091800000
    let time1 = new Date(res);
    var y = time1.getFullYear();
    var m = time1.getMonth() + 1;
    if (m < 10) {
      m = '0' + m
    }
    var d = time1.getDate();
    if (d < 10) {
      d = '0' + d
    }
    // console.log(res)
    // console.log(time1)

    return y + '-' + m + '-' + d;    //返回格式  "2017-10-27" 字符串
  }

  //跳转注册登录页面
  goregister() {
    Taro.navigateTo({
      url: '/pages/bindname/bindname'
    })
  }
}

