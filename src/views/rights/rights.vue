<template>
  <div class="prove">
    <van-form @submit="onSubmit">
      <!-- <van-field
        input-align="right"
        label="姓名"
        placeholder="请输入姓名"
        name="username"
        v-model="username"
      /> -->
      <van-field
        readonly
        input-align="right"
        label="参保机构"
        placeholder="请选择参保机构"
        is-link
        @click="showMechanism = true"
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
      <van-field
        readonly
        input-align="right"
        label="查询年度"
        placeholder="请选择查询年度"
        is-link
        @click="showTime = true"
        name="time"
        v-model="time"
      />
      <van-popup v-model="showTime" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="timeConfirm"
          @cancel="showTime = false"
        />
      </van-popup>
      <div class="p44">
        <span class="tips-color">温馨提示:</span>
        <span class="ml5">
          险种欠费情况下无法查看权益单。
        </span>
      </div>
      <div class="sub-btn">
        <van-button
          native-type="submit"
          class="button-large"
          color="#287DE2"
          size="large"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMechanism: false,
      showTime: false,
      username: '', // 姓名
      mechanism: { text: '', value: '' }, // 参保地
      time: '', // 查询年度
      // 机构数据
      mechanismArr: [],
      minDate: new Date(2000, 0, 1), // 最小时间
      maxDate: new Date(2025, 10, 1), // 最大时间
      currentDate: new Date(), // 默认选中时间
      timeCode: '',
    }
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getAddress()
      }
    })
  },
  methods: {
    // 参保机构选择
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
    },
    // 年度
    timeConfirm(date) {
      this.time = this.filterTime(date)
      this.timeCode = date.getFullYear()
      this.showTime = false
    },
    // 时间处理成x年x月
    filterTime(date) {
      let y = date.getFullYear() // 年

      return y + '年'
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
    /**
     * 获取参保地
     */
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
          } else if (res.data.code === 1001 || res.data.code === 1002) {
            localStorage.removeItem('XX-Token')
            localStorage.removeItem('address')
            _this.$token.getToken().then(res => {
              if (res) {
                _this.getAddress()
              }
            })
          } else if (res.data.code === 1004 || res.data.code === 3000) {
            this.$dialog.alert({
              message: res.data.msg,
            })
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
      }
    },
    onSubmit() {
      let _this = this
      let model = {
        /**
         * 参保地
         */
        yab139: _this.mechanism.value,
        /**
         * 年度
         */
        aae001: _this.timeCode,
      }
      if (model.yab139 === '') {
        this.$toast('请选择参保机构')
        return
      }
      if (model.aae001 === '') {
        this.$toast('请选择查询年度')
        return
      }
      _this.$http.postJson(
        '/api/gxrswx/Personal/socialInterestsBase64',
        model,
        res => {
          if (res.data.code === 0) {
            let pdf = JSON.stringify(res.data.data.pdf)
            _this.$token.setToken('rights', pdf)
            window.location.href = 'http://h5.gxrswx.healthan.net/rightsDetails'
            // _this.$router.push({
            //   name: 'Provelist',
            // })
          }
          if (res.data.code === 3000) {
            setTimeout(() => {
              _this.$toast(res.data.msg)
            }, 1000)
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
          if (res.data.code === 1004) {
            this.$dialog.alert({
              message: res.data.msg,
            })
          }
        }
      )
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
