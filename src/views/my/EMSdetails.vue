<template>
  <div class="EMSdetails">
    <div v-show="showTips === false">
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">业务类型</van-col>
          <van-col span="16" class="lable-title">{{
            info.card_type === 'reissue' ? '社保卡补卡' : '社保卡申领'
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">申请人</van-col>
          <van-col span="16" class="input-list">{{ info.name }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">联系电话</van-col>
          <van-col span="16" class="input-list">{{ info.mobile }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">寄送地址</van-col>
          <van-col span="16" class="input-list">{{ info.address }}</van-col>
        </van-row>
      </div>
    </div>
    <div>
      <van-steps direction="vertical" class="steps-list" :active="active">
        <van-step v-for="(item, inx) in step" :key="inx">
          <h3>{{ item.statusP }}</h3>
          <!-- <p v-show="items.point_user !== undefined">
            经办人：{{ items.point_user }}
          </p> -->
          <p>说明：{{ item.remark }}</p>
          <p class="time-ems" v-show="item.acceptTime !== undefined">
            {{ item.acceptTime }}
          </p>
        </van-step>
      </van-steps>
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
    dateFormat(t) {
      if (t === null || t === '') {
        return '-'
      }
      let date = new Date(t * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let y = date.getFullYear()
      let m =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return y + '-' + m + '-' + d
    },
  },
  data() {
    return {
      active: 0, // 当前步骤
      showTips: false, // 是否无数据
      info: {},
      id: '',
      step: [],
      code: '',
    }
  },
  components: { Tips },
  created() {
    this.getlist()
  },
  methods: {
    async getlist() {
      let that = this
      const { data } = await that.$http.postRequest(
        '/api/gxrswx/Expre_Info/mailTrack',
        {
          pay_no: that.$route.query.pay_no,
          card_type: that.$route.query.card_type,
        },
        '加载中'
      )
      if (data.code === 0) {
        that.info = data.data
        that.step = data.data.track_info
      }
    },
    go() {
      window.location.href =
        'https://h5-gxrswx.healthan.net/progress-pdf?id=' +
        this.info.acpt_no +
        '&code=' +
        this.code
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
.EMSdetails .van-step__title > span {
  font-size: 30px;
  font-weight: bold;
}
.steps-list .van-step--vertical {
  padding: 20px;
}
.EMSdetails .steps-list.van-steps--vertical {
  padding: 0 0 0 155px;
}
.pb10 {
  padding-bottom: 20px;
}
.black {
  color: #111;
}
.EMSdetails .red {
  color: #f45936;
}
.prompt {
  padding: 30px;
  font-size: 26px;
  line-height: 40px;
  background-color: #fff;
}
.text-indent {
  text-indent: 2em;
}
.fc9 {
  color: #999;
}
.fc3 {
  color: #333333;
}
.steps-list .van-step--finish .van-step__circle,
.steps-list .van-step--finish .van-step__line {
  background-color: #287de2;
}
.end-red {
  color: #e3552f;
}
.finish-green {
  color: #24ab57;
}
.in-w {
  color: #4186fb;
}
.in-y {
  color: #ff976a;
}
.time-ems {
  position: absolute;
  z-index: 12;
  left: -130px;
  top: 12px;
  display: inline-block;
  width: 112px;
}
</style>
