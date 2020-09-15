<template>
  <div class="info">
    <div v-show="showTips === false">
      <div class="info-title">
        <van-row>
          <van-col span="24" class="just-start"
            ><span
              class="just-list"
              @click="
                if (addressArr.length > 1) {
                  show = true
                }
              "
              >参保地：<span class="fc mr5">{{ yab139.text }}</span>
              <van-icon name="arrow-down" v-show="addressArr.length > 1" />
            </span>
          </van-col>
        </van-row>
      </div>
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="12" class="lable-title">姓名</van-col>
          <van-col span="12" class="input-list">{{ info.aac003 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">身份证</van-col>
          <van-col span="12" class="input-list">{{ info.aac002 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">单位名称</van-col>
          <van-col span="12" class="input-list">{{ info.aab004 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">待遇申领年月</van-col>
          <van-col span="12" class="input-list">{{ info.bie508 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">核准年月</van-col>
          <van-col span="12" class="input-list">{{ info.bie507 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">待遇开始年月</van-col>
          <van-col span="12" class="input-list">{{ info.aae041 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">退休时基本养老金</van-col>
          <van-col span="12" class="input-list">{{ info.bie510 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">首发年月</van-col>
          <van-col span="12" class="input-list">{{ info.bie608 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">累计实缴月数</van-col>
          <van-col span="12" class="input-list">{{ info.aae201 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">视同实缴月数</van-col>
          <van-col span="12" class="input-list">{{ info.bie609 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">计算缴费年限开始年月</van-col>
          <van-col span="12" class="input-list">{{ info.bie055 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">计算缴费年限截止年月</van-col>
          <van-col span="12" class="input-list">{{ info.aic162 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">中断缴费月数</van-col>
          <van-col span="12" class="input-list">{{ info.bie616 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title"
            >建立个人账户前缴费月数</van-col
          >
          <van-col span="12" class="input-list">{{ info.bie617 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="12" class="lable-title">当前实发月养老金</van-col>
          <van-col span="12" class="input-list">{{ info.aic263 }}</van-col>
        </van-row>
        <!-- <van-row class="info-text">
          <van-col span="12" class="lable-title"
            >退休时上年全区城镇单位在岗位职工月平均工资</van-col
          >
          <van-col span="12" class="input-list">{{ info.bie606 }}</van-col>
        </van-row> -->
      </div>
    </div>
    <div v-show="showTips === true">
      <Tips></Tips>
    </div>

    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :columns="addressArr"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import Tips from '@/components/tips'
export default {
  filters: {
    formatDate(value) {
      // 时间戳转换日期格式方法
      if (value === null || value === '' || value.length <= 4) {
        return value
      } else {
        let date = new Date(value)
        let y = date.getFullYear() // 年
        let MM = date.getMonth() + 1 // 月
        MM = MM < 10 ? '0' + MM : MM
        let d = date.getDate() // 日
        d = d < 10 ? '0' + d : d
        return y + '-' + MM + '-' + d
      }
    },
  },
  data() {
    return {
      yab139: {
        text: '',
        value: '',
      },
      show: false,
      loading: true, // 数据是否加载中
      contentLoad: true,
      addressArr: [], // 参保地址
      showTips: false, // 是否无数据
      info: {
        aae041: '', // 待遇开始年月
        bie055: '', // 计算缴费年限开始年月
        aac001: '', // 个人编号
        aab001: '', // 单位编号
        aac002: '', // 身份证
        bic100: '', // 执行个人账户前四年指数
        aae201: '', // 累计实缴【月数】
        bie510: '', // 退休时基本养老金
        aic162: '', // 计算缴费年限截止年月
        bie504: '', // 档案出生年月
        bie616: '', // 中断缴费【月数】
        bie508: '', // 待遇申领年月
        bie507: '', // 核准年月
        aic164: '', // 平均缴费指数
        bie617: '', // 建立个人账户前缴费【月数】
        aic263: '', // 当前实发月养老金
        bie606: '', // 退休时上年全区城镇单位在岗位职工月平均工资
        aaz257: '', // 享受定期待遇人员ID
        bie609: '', // 视同缴费【月数】
        bie608: '', // 首发年月
        aab004: '', // 单位名称
        aac003: '', // 姓名
        aac004: '', // 性别
      },
    }
  },
  components: { Tips },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getAddress()
      }
    })
  },
  methods: {
    /**
     * 切换地区
     */
    onConfirm(value) {
      this.yab139 = value
      this.show = false
      this.getList()
    },
    async getAddress() {
      let _this = this
      let address = localStorage.getItem('address')
      if (address === 'undefined' || address === null || address === '') {
        _this.$http.postJson('/api/gxrswx/Personal/addrList', {}, async res => {
          if (res.data.code === 0) {
            _this.addressArr = res.data.data.list.map(v => {
              return {
                text: v.name,
                value: v.code,
              }
            })
            _this.$token.setToken('address', JSON.stringify(_this.addressArr))
            _this.addressArr.length !== 0
              ? (_this.yab139 = _this.addressArr[0])
              : ''
            _this.loading = false
            _this.showTips = false
            _this.getList()
          } else if (res.data.code === 1001) {
            localStorage.removeItem('XX-Token')
            localStorage.removeItem('address')
            _this.$token.getToken().then(res => {
              if (res) {
                _this.getAddress()
              }
            })
          } else if (res.data.code === 3000) {
            // setTimeout(() => {
            //   _this.$toast(res.data.msg)
            // }, 2000)
            _this.showTips = true
          } else if (res.data.code === 1003) {
            _this.$toast(res.data.msg)
          } else if (res.data.code === 1004) {
            _this.showTips = true
          } else if (res.data.code === 2000) {
            _this.$toast(res.data.msg)
          } else if (res.data.code === 1002) {
            localStorage.removeItem('XX-Token')
            localStorage.removeItem('address')
            _this.$token.getToken().then(res => {
              if (res) {
                // alert(res)
                _this.getAddress()
              }
            })
          } else {
            this.$toast('数据异常')
          }
        })
      } else {
        _this.addressArr = JSON.parse(address)
        _this.addressArr.length !== 0
          ? (_this.yab139 = _this.addressArr[0])
          : ''
        this.loading = false
        this.getList()
      }
    },
    /**
     * 获取城镇职工基本养老金核定及发放查询信息
     */
    getList() {
      let that = this
      let data = {
        yab139: this.yab139.value,
      }
      that.$http.postJson('/api/gxrswx/Personal/annuityStandard', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          that.info = res.data.data
          that.contentLoad = false
          that.showTips = false
        } else if (res.data.code === 1001) {
          localStorage.removeItem('XX-Token')
          localStorage.removeItem('address')
          that.$token.getToken().then(res => {
            if (res) {
              that.getAddress()
            }
          })
        } else if (res.data.code === 3000) {
          that.showTips = true
          // setTimeout(() => {
          //   that.$toast(res.data.msg)
          // }, 2000)
        } else if (res.data.code === 1003) {
          that.$toast(res.data.msg)
        } else if (res.data.code === 1004) {
          that.showTips = true
          that.$toast(res.data.msg)
        } else if (res.data.code === 2000) {
          that.$toast(res.data.msg)
        } else if (res.data.code === 1002) {
          localStorage.removeItem('XX-Token')
          localStorage.removeItem('address')
          that.$token.getToken().then(res => {
            if (res) {
              that.getAddress()
            }
          })
        } else {
          that.$toast({ message: '数据异常', duration: 3 })
        }
      })
    },
  },
}
</script>

<style>
.info-title {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
}
.info-content {
  padding: 0 30px;
  background-color: #fff;
}
.lable-title {
  color: #666666;
  font-weight: 500;
}
.info-text {
  text-align: left;
  font-size: 30px;
  padding: 30px 0;
  border-bottom: 2px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-text .input-list {
  color: #333333;
  font-weight: bold;
  text-align: right;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fc {
  color: #111111;
}
.mr5 {
  margin-right: 10px;
}
</style>
