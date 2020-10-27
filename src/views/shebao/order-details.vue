<template>
  <div class="info">
    <div v-show="showTips === false">
      <div class="info-title">
        <van-row>
          <van-col span="24"> EMS邮费订单详情</van-col>
        </van-row>
      </div>
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">姓名</van-col>
          <van-col span="16" class="input-list">{{ info.name }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">身份证号码</van-col>
          <van-col span="16" class="input-list">{{ info.idcard }}</van-col>
        </van-row>

        <van-row class="info-text">
          <van-col span="8" class="lable-title">社会保障号</van-col>
          <van-col span="16" class="input-list">{{ info.cardno }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">订单号</van-col>
          <van-col span="16" class="input-list">{{ info.pay_no }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">收件人姓名</van-col>
          <van-col span="16" class="input-list">{{ info.mail_name }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">收件人电话</van-col>
          <van-col span="16" class="input-list">{{ info.mail_mobile }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">收件人地址</van-col>
          <van-col span="16" class="input-list">{{
            info.mail_address
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">订单状态</van-col>
          <van-col span="16" class="input-list">{{ info.status_desc }}</van-col>
        </van-row>
      </div>
      <div class="sub-btn">
        <van-button
          class="button-large"
          color="#287DE2"
          size="large"
          to="/baoban"
          >返回</van-button
        >
      </div>
    </div>
    <div v-show="showTips === true">
      <Tips></Tips>
    </div>
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
        /**
         * 姓名
         */
        name: '',
        /**
         * 身份证
         */
        idcard: '',
        /**
         * 卡号
         */
        cardno: '',
        /**
         * 订单号
         */
        pay_no: '',
        /**
         * 收件人姓名
         */
        mail_name: '',
        /**
         * 收件人电话
         */
        mail_mobile: '',
        /**
         * 收件地址
         */
        mail_address: '',
        /**
         * 订单状态
         */
        status_desc: '',
      },
    }
  },
  components: { Tips },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getList()
      }
    })
  },
  methods: {
    /**
     * 获取基本信息
     */
    getList() {
      let that = this
      let orderid = that.getUrlOrderid().order_id
      let data = {
        order_id: orderid,
      }
      that.$http.postJson('/api/gxrswx/Card/cardReissueDetail', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          that.info = res.data.data
        } else if (res.data.code === 1001) {
          localStorage.removeItem('XX-Token')
          that.$token.getToken().then(res => {
            if (res) {
              that.getList()
            }
          })
        } else if (res.data.code === 3000) {
          setTimeout(() => {
            that.$toast(res.data.msg)
          }, 2000)
        } else if (res.data.code === 1003) {
          that.$toast(res.data.msg)
        } else if (res.data.code === 1004) {
          that.showTips = true
          that.$toast(res.data.msg)
        } else if (res.data.code === 2000) {
          that.$toast(res.data.msg)
        } else if (res.data.code === 1002) {
          localStorage.removeItem('XX-Token')
          that.$token.getToken().then(res => {
            if (res) {
              that.getList()
            }
          })
        } else {
          that.$toast({ message: '数据异常', duration: 3 })
        }
      })
    },
    /**
     * 获取订单id
     */
    getUrlOrderid() {
      var url = location.search
      // this.winUrl = url
      var theRequest = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      }
      return theRequest
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
.info .sub-btn {
  padding: 103px 30px 30px 30px;
}
.info .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
</style>
