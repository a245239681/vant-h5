<template>
  <div class="logout">
    <div class="info-title">参保人社保卡</div>
    <div class="card-box">
      <van-row class="pl15">
        <van-col span="3" class="h160 just-list">
          <van-image
            round
            width="40"
            height="40"
            class="img-responsive"
            :src="info.touxiang"
          />
        </van-col>
        <van-col span="9" class="h160 just-start">
          <span class="pl15 card-name">{{ info.name }}</span>
        </van-col>
        <van-col span="12" class="just-end">
          <span class="card-type">卡状态：{{ info.type }}</span>
        </van-col>
        <van-col span="24" class="h60">
          <span class="idcard-title">
            身份证号：
          </span>
          <span class="f30">{{ info.idcard }}</span>
        </van-col>
        <van-col span="24" class="h60">
          <span class="idcard-title">
            社会保障卡号：
          </span>
          <span class="f30">
            {{ info.card }}
          </span>
        </van-col>
      </van-row>
    </div>

    <div class="tips">
      <p class="title">温馨提示</p>
      <p class="details pb10">
        1、微信挂失补卡暂不支持南宁市参保人员，南宁市参保的可以通过“南宁人社”微信公众号或者南宁“智慧人社”APP等途径办理。
      </p>
      <p class="details">
        2、其他地市参保人员均可以使用本模块进行挂失补卡，领卡方式支持EMS邮寄、即时制卡。
      </p>
    </div>
    <div class="sub-btn">
      <van-button
        class="button-large"
        color="#287DE2"
        size="large"
        @click="logout"
        :disabled="info.type === '已挂失'"
        >{{ info.text }}</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        name: '', // 姓名
        card: '', // 社保卡号
        type: '', // 卡状态
        idcard: '', // 身份证号
        touxiang: require('@/assets/images/renshe-icon.png'),
        text: '正式挂失',
      },
      cardUrl: '',
      cardId: '',
    }
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getUserinfo()
      }
    })
  },
  methods: {
    /**
     * 获取卡状态
     */
    getUserinfo() {
      this.$http.postJson('/api/gxrswx/Card/cardStatus', {}, res => {
        if (res.data.code === 0) {
          // console.log(res)
          this.info.name = res.data.data.name
          this.info.card = res.data.data.cardno
          this.info.type = res.data.data.status
          this.info.idcard = res.data.data.idcard
          if (res.data.data.status_code === '2') {
            this.cardId = res.data.data.status_code
            this.cardUrl = res.data.data.card_reissue_url
            this.info.text = '补卡'
          }
        } else if (res.data.code === 1001 || res.data.code === 1002) {
          localStorage.removeItem('XX-Token')
          this.$token.getToken().then(res => {
            if (res) {
              this.getUserinfo()
            }
          })
        } else if (res.data.code === 1004 || res.data.code === 3000) {
          this.$dialog.alert({
            message: res.data.msg,
          })
        } else {
          this.$toast.fail(res.data.msg)
        }
      })
    },
    /**
     * 挂失卡
     */
    logout() {
      let that = this
      that.cardId === '2'
        ? (window.location.href = that.cardUrl)
        : that.$dialog
            .confirm({
              title: '确定挂失社保卡',
              message:
                '挂失后本卡失效，将无法使用社保卡相关服务，需申请补办卡才可以继续使用',
              confirmButtonText: '挂失',
            })
            .then(() => {
              that.$http.postJson('/api/gxrswx/Card/cardLoss', {}, res => {
                if (res.data.code === 0) {
                  this.info.text = '已挂失'
                  that.getUserinfo()
                  that.$dialog
                    .confirm({
                      message: '已成功挂失，是否继续进行补卡',
                    })
                    .then(() => {
                      location.href = res.data.data.url
                    })
                    .catch(() => {
                      // on cancel
                    })
                  // that.$dialog.alert({ message: '挂失成功' }).then(() => {

                  //   location.href = res.data.url
                  // })
                } else if (res.data.code === 3001) {
                  that.$dialog.alert({ message: res.data.msg })
                } else {
                  that.$dialog.alert({ message: '挂失失败，稍后重试' })
                }
              })
            })
            .catch(() => {})
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
.logout .card-box {
  height: 315px;
  margin: 0 30px;
  background-image: url(../../assets/images/card-bg.png);
  background-size: cover;
  box-shadow: 1px 5px 20px 0px rgba(40, 152, 231, 0.35);
  border-radius: 20px;
  color: #fff;
}
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}
.card-type {
  display: block;
  min-width: 240px;
  height: 70px;
  background: linear-gradient(
    90deg,
    rgba(146, 179, 219, 1) 0%,
    rgba(206, 219, 235, 1) 100%
  );
  border-radius: 0px 20px 0px 0px;
  font-size: 26px;
  text-align: center;
  line-height: 70px;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.just-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl15 {
  padding-left: 30px;
}
.pb10 {
  padding-bottom: 20px;
}
.logout .h160 {
  height: 160px;
}
.logout .card-name {
  font-size: 36px;
}
.f30 {
  font-size: 30px;
}
.logout .idcard-title {
  font-size: 30px;
  color: #becfed;
}
.logout .h60 {
  height: 60px;
  line-height: 60px;
}
.icon-size {
  width: 40px;
  min-height: 40px;
  font-size: 40px;
}
.tips {
  padding: 30px;
}
.tips .title {
  color: #e3552f;
  font-size: 28px;
  font-weight: bold;
  line-height: 60px;
}
.tips .details {
  line-height: 40px;
  font-size: 24px;
  color: #666666;
}
.logout .sub-btn {
  padding: 103px 30px 30px 30px;
}
.logout .sub-btn .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
  box-shadow: 0px 5px 20px 0px rgba(30, 98, 214, 0.35);
}
</style>
