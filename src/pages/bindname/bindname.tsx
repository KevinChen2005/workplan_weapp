import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Picker  } from '@tarojs/components'
import './bindname.scss'
import { AtAvatar,AtNoticebar,AtForm,AtInput,AtButton  } from 'taro-ui'
import url from '../../utils/url'


export default class Bindname extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  constructor () {
    super(...arguments)
  }

  config: Config = {
    navigationBarTitleText: '绑定账号',
  }

  
  state={
    userinfo:{type: 'userAvatarUrl'},
    openid:'',
    value:'',
    phonenumber:'',
    department:[],
    mydepartment:'-请选择-'
  }

  componentWillMount () {
    // 设置openid
    this.setState({
      openid:Taro.getStorageSync('openid')
    })

    // 请求部门列表
    Taro.request({
      url:'https://xyx-mainland-api.raink.com.cn/v1/work/get-department',
    }).then(
      (res)=>{
        res.data.result.forEach((item)=>{
          this.state.department.push(item.department)
        })
        
        this.setState({
          department: this.state.department
        })
      }
    ).catch(()=>{
      Taro.showToast({
        title:'部门列表获取失败！',
        icon:'none'
      })
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
          <AtAvatar className='icon' openData={this.state.userinfo} circle={true} size="normal"></AtAvatar>
          <View className="formstyle">

              <Picker mode='selector' range={this.state.department} onChange={this.changepicker} value={0} className='picker'>
                <View className='itemcontextbindname'>
                  <Text className='itemText'>部门：</Text>
                  <Text className='itemValue'>{this.state.mydepartment}</Text>
                </View>
              </Picker>
              
              <AtInput name='value' type='text' placeholder='请输入姓名' value={this.state.value} 
                onChange={this.handleChange.bind(this)} className='inputStyle' customStyle="padding-left:5px; "/>
              
              <AtInput name='value' type='number' placeholder='请输入手机号码' value={this.state.phonenumber}
                onChange={this.changePhone.bind(this)} className='inputStyle' customStyle="padding-left:5px; "
              />
              
              <AtButton customStyle="margin-top:20px; height:35px; line-height:35px;" size='normal' type='primary'  onClick={this.submitname}>提交</AtButton>
          </View>
      </View>
    )
  }

  changepicker(e){
    console.log(e)
    this.setState({
      mydepartment:this.state.department[e.detail.value]
    })
  }

  onSubmit (event) {
    console.log(event)
  }
  onReset (event) {
    console.log(event)
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  changePhone (value) {
    this.setState({
      phonenumber:value
    })
  }
  
  submitname(){

    const phoneverfy =  /(?:^1[3456789]|^9[28])\d{9}$/

    if(this.state.value.length>7||this.state.value.length<=0){
      Taro.showToast({
        title:'名字长度应该在1-6个字',
        icon:'none'
      })

    }else{

      if(!phoneverfy.test(this.state.phonenumber)){
            Taro.showToast({
              title:'手机号格式不正确',
              icon:'none'
            })

            return
      }
      if(this.state.mydepartment=='-请选择-'){
        Taro.showToast({
          title:'请选择部门',
          icon:'none'
        })

        return
  }

      
  console.log(Taro.getStorageSync('openid'));
  console.log(this.state.value);
  console.log(this.state.phonenumber);
  console.log(this.state.mydepartment);

      Taro.request({
        url:url.locality_address+'/v1/work/bind',
        data:{
          openid:Taro.getStorageSync('openid'),
          username:this.state.value,
          phone:this.state.phonenumber,
          scene:'wx',
          department:this.state.mydepartment
        },
        method:'POST',
        header:{  "Content-Type": "application/x-www-form-urlencoded"}
       }).then((res)=>{
         if(res.data.code==200){
          Taro.setStorageSync('username',this.state.value)
          Taro.setStorageSync('register',{msg:'success',state:true})
          Taro.setStorageSync('department',this.state.mydepartment)
          Taro.showLoading({
            title:'请稍后',
            mask:true,
          })
          setTimeout(() => {
            Taro.hideLoading()
            Taro.showModal({
              title:'提示',
              content:'实名注册成功,按确定键返回!'
              
            }).then(
              (res)=>{
                Taro.navigateBack()
              }
            )
          }, 1000);
        }else{
          Taro.showToast({
            title:'网络出错！',
            icon:'none'
          })
        }
        }).catch((res)=>{
          Taro.showToast({
            title:'网络出错！',
            icon:'none'
          })
        })

    }
  }

}

