<template>
  <div class="ems">
    <van-row gutter="15">
      <van-col
        span="24"
        @click="toGo(item)"
        class="mb15"
        :key="inx"
        v-for="(item, inx) in listArr"
      >
        <van-row class="just-list min-h180 box-shadow">
          <van-col span="16">
            <span class="van-grid-item__text">{{ item.name }}</span>
            <span class="van-grid-item__text" v-if="!item.emsno"
              >物流状态:未揽收</span
            >
            <span class="van-grid-item__text" v-if="item.emsno"
              >物流单号:{{ item.emsno }}</span
            >
            <span class="van-grid-item__text"
              >办理时间:{{ item.datetime }}</span
            >
          </van-col>
          <van-col span="8" class="just-list">
            <span
              :class="item.card_type === 'reissue' ? 'strart-color' : 'Finish'"
              >{{
                item.card_type === 'reissue' ? '社保卡补卡' : '社保卡申领'
              }}</span
            >
            <van-icon class="f22" name="arrow" />
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listArr: [],
    }
  },
  created() {
    this.busiList()
  },
  methods: {
    async busiList() {
      let that = this
      const { data } = await that.$http.postRequest(
        '/api/gxrswx/Expre_Info/busiList',
        { code: that.$store.state.code },
        '加载中'
      )
      if (data.code === 0) {
        that.listArr = data.data.list
      }
      if (data.code === 1002 || data.code === 1001) {
        that.$dialog.alert({
          message: data.msg,
        })
      }
    },
    toGo(item) {
      if (item.emsno === '') {
        this.$dialog.alert({
          message: '社保卡揽件后才能查看物流信息',
        })
        return
      }
      this.$router.push({
        name: 'EMSdetails',
        query: {
          pay_no: item.pay_no,
          card_type: item.card_type,
        },
      })
    },
  },
}
</script>

<style>
.ems {
  padding: 30px;
}
.ems .van-grid-item__text {
  font-size: 24px;
  color: #646566;
  line-height: 1.5;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.ems .van-grid-item__text:first-child {
  font-size: 30px;
  font-weight: bold;
  color: #333333;
}

.Finish {
  border: 2px solid#24AB57;
  color: #24ab57;
  font-size: 24px;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
.box-shadow {
  padding: 0 30px;
  background: #fbfcfc;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.strart-color {
  border: 2px solid #3b86e0;
  color: #3b86e0;
  font-size: 24px;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
.min-h180 {
  min-height: 180px;
  padding: 30px;
}
</style>
