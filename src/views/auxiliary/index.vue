<template>
  <div class="prove">
    <van-form @submit="onSubmit" v-show="shownodata === false">
      <van-field
        readonly
        input-align="right"
        label="参保地"
        placeholder="请选择参保地"
        is-link
        @click="mechanismArr.length > 1 ? (showMechanism = true) : ''"
        name="mechanism"
        v-model="mechanism.text"
      />
      <van-popup v-model="showMechanism" position="bottom">
        <van-picker
          show-toolbar
          :columns="mechanismArr"
          @cancel="showMechanism = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div v-show="showTips === false">
        <van-field
          readonly
          input-align="right"
          label="姓名"
          placeholder="姓名"
          name="name"
          v-model="name"
        />
        <van-field
          readonly
          input-align="right"
          label="身份证"
          placeholder="身份证"
          name="idcard"
          v-model="idcard"
        />
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>单位名称</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <div class="van-field__control van-field__control--right">
                {{ companyname }}
              </div>
            </div>
          </div>
        </div>
        <!-- <van-field
          input-align="right"
          label="单位名称"
          placeholder="单位名称"
          name="companyname"
          v-model="companyname"
        /> -->
        <van-field
          readonly
          input-align="right"
          label="终止原因"
          placeholder="终止原因"
          is-link
          @click="showCoverage = true"
          name="coverage"
          v-model="reason.text"
        />
        <van-popup v-model="showCoverage" position="bottom">
          <van-picker
            show-toolbar
            :columns="coverageArr"
            @cancel="showCoverage = false"
            @confirm="coverageConfirm"
          />
        </van-popup>
        <van-field
          readonly
          input-align="right"
          label="终止时间"
          placeholder="终止时间"
          is-link
          @click="showtime = true"
          name="time"
          v-model="time"
        />
        <van-popup v-model="showtime" position="bottom">
          <van-picker
            show-toolbar
            :columns="timeArr"
            @cancel="showtime = false"
            @confirm="timeConfirm"
          />
        </van-popup>
        <div class="sub-btn">
          <van-button
            native-type="submit"
            class="button-large"
            color="#287DE2"
            size="large"
            >终止</van-button
          >
        </div>
      </div>
      <div v-show="showTips === true">
        <Nodata :psMsg="tip"></Nodata>
      </div>
    </van-form>
    <div v-show="shownodata === true">
      <Nodata :psMsg="tip"></Nodata>
    </div>
  </div>
</template>

<script>
import Nodata from '@/components/nodata'

export default {
  data() {
    return {
      showMechanism: false,
      showCoverage: false,
      showtime: false,
      mechanism: { text: '', value: '' }, // 参保地
      name: '', // 姓名
      idcard: '', // 身份证
      reason: { text: '', code: '' }, // 终止原因
      companyname: '', // 单位
      time: '', // 终止时间
      // 参保地数据
      mechanismArr: [],
      // 终止原因数据
      coverageArr: [],
      // 终止时间数据
      timeArr: [],
      minDate: new Date(1997, 0, 1), // 最小时间
      maxDate: new Date(2025, 10, 1), // 最大时间
      currentDate: this.getPreMonth(this.getNowFormatDate()), // 默认选中时间
      showTips: false,
      shownodata: false,
      tip: '您未申请失业补助金，无需办理终止业务',
    }
  },
  components: {
    Nodata,
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getAddress()
      }
    })
  },
  methods: {
    // 参保地选择
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
      this.getinfo()
    },
    // 终止原因
    coverageConfirm(value) {
      this.reason = value
      this.showCoverage = false
    },
    /**
     * 终止时间
     */
    timeConfirm(date) {
      this.time = date
      this.showtime = false
    },
    // 时间处理成x年x月
    filterTime(date) {
      let y = date.getFullYear() // 年
      let MM = date.getMonth() + 1 // 月
      MM = MM < 10 ? '0' + MM : MM

      return y + '年' + MM + '月'
    },
    // 时间处理成202012
    filterdate(date) {
      let y = date.getFullYear() // 年
      let MM = date.getMonth() + 1 // 月
      MM = MM < 10 ? '0' + MM : MM

      return y + '' + MM
    },
    // 格式化时间选择格式
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    async getAddress() {
      let _this = this
      let address = localStorage.getItem('address')
      if (address === 'undefined' || address === null || address === '') {
        _this.$http.postJson('/api/gxrswx/Personal/addrList', {}, async res => {
          if (res.data.code === 0) {
            _this.mechanismArr = res.data.data.list.map(v => {
              return {
                text: v.name,
                value: v.code,
              }
            })
            _this.mechanismArr.length !== 0
              ? (_this.mechanism = _this.mechanismArr[0])
              : ''
            _this.$token.setToken('address', JSON.stringify(_this.mechanismArr))
            _this.loading = false
            _this.shownodata = false
            _this.getinfo()
          } else if (res.data.code === 1001 || res.data.code === 1002) {
            localStorage.removeItem('XX-Token')
            localStorage.removeItem('address')
            _this.$token.getToken().then(res => {
              if (res) {
                _this.getAddress()
              }
            })
          } else if (res.data.code === 1004 || res.data.code === 3000) {
            _this.tip = '未查询到您的参保信息'
            _this.shownodata = true
          } else {
            _this.$toast({ message: '数据异常', duration: 3 })
          }
        })
      } else {
        _this.mechanismArr = JSON.parse(address)
        _this.mechanismArr.length !== 0
          ? (_this.mechanism = _this.mechanismArr[0])
          : ''
        _this.loading = false
        _this.getinfo()
      }
    },
    /**
     * 获取当前时间的上个月
     */
    getPreMonth(date) {
      let arr = date.split('-')
      let year = arr[0] //获取当前日期的年份
      let month = arr[1] //获取当前日期的月份
      let day = arr[2] //获取当前日期的日
      let year2 = year
      let month2 = parseInt(month) - 1
      if (month2 == 0) {
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      console.log(111)
      let t2 = year2 + '-' + month2 + '-' + day2
      return new Date(t2)
    },
    /**
     * 获取当前时间 并且转化成yy-mm-dd格式
     */
    getNowFormatDate() {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },

    /**
     * 获取终止人基本信息
     */
    getinfo() {
      let that = this
      let model = {
        yab139: this.mechanism.value,
      }
      that.$http.postJson(
        '/api/gxrswx/Socialapply/unJobSubsidyVerify',
        model,
        res => {
          if (res.data.code === 0) {
            console.log(res.data.data.aae044)
            that.name = res.data.data.aac003
            that.idcard = res.data.data.aac002
            that.companyname = res.data.data.aae044
            that.coverageArr = res.data.data.aae160_list.map(v => {
              return {
                text: v.name,
                code: v.code,
              }
            })
            that.timeArr = res.data.data.month_list
            that.showTips = false
          } else if (res.data.code === 1001 || res.data.code === 1002) {
            localStorage.removeItem('XX-Token')
            localStorage.removeItem('address')
            that.$token.getToken().then(res => {
              if (res) {
                that.getAddress()
              }
            })
          } else {
            that.showTips = true
          }
        }
      )
    },

    onSubmit() {
      let _this = this
      let model = {
        yab139: _this.mechanism.value,
        end_time: _this.time,
        aae160: _this.reason.code,
      }
      if (model.yab139 === '') {
        _this.$toast('请选择参保地')
        return
      }
      if (model.aae160 === '') {
        _this.$toast('请选择终止原因')
        return
      }
      if (model.end_time === '') {
        _this.$toast('请选择终止时间')
        return
      }
      _this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认终止失业补助金？',
          confirmButtonText: '确认',
        })
        .then(() => {
          _this.$http.postJson(
            '/api/gxrswx/Socialapply/unJobSubsidyCease',
            model,
            res => {
              if (res.data.code === 0) {
                _this.$router.push({
                  name: 'ToExamine',
                  query: {
                    id: res.data.data.acpt_no,
                    code: res.data.data.yab139,
                  },
                })
              }
              if (res.data.code === 3000) {
                _this.$dialog.alert({
                  message: res.data.msg,
                })
              }
              if (res.data.code === 1001 || res.data.code === 1002) {
                localStorage.removeItem('address')
                localStorage.removeItem('XX-Token')
                _this.$token.getToken().then(res => {
                  if (res) {
                    _this.getAddress()
                  }
                })
              }
              if (res.data.code === 1004 || res.data.code === 3001) {
                _this.$dialog.alert({
                  message: res.data.msg,
                })
              }
            }
          )
        })
        .catch(() => {})
    },
  },
}
</script>

<style>
.p44 {
  padding: 44px 31px;
  font-size: 24px;
  color: #666666;
}
.tips-color {
  color: #f45936;
}
.ml5 {
  margin-left: 10px;
}
.prove .sub-btn {
  padding: 103px 30px 30px 30px;
}
.prove .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.prove .van-cell {
  padding: 26px 32px;
  font-size: 30px;
  color: #666666;
}
</style>
