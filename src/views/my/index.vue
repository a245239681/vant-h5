<template>
  <div class="my">
    <div class="p15 fc-head">
      <div class="header just-list">
        <div class="header-box">
          <van-row gutter="20" class="just-list">
            <van-col span="4" class="just-list">
              <van-image class="img-responsive" :src="touxiang" />
            </van-col>
            <van-col span="16">
              <p class="header-name">{{ name }}</p>
              <p class="header-card">
                社会保障卡号：<span>{{ card }}</span>
              </p>
            </van-col>
            <van-col span="4" class="just-list">
              <van-image
                class="img-responsive"
                :src="QR_code.img"
                @click="go(QR_code.url)"
              />
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="m">
      <van-cell-group class="br">
        <van-cell
          class="br"
          title="我的电子社保卡"
          :icon="myIcon"
          is-link
          url="https://mp.weixin.qq.com/insurance/card/jump?is_depart=1&cityid=450000&from=gL8z-M6BY_HT0AhqZwE6fg.%3D#wechat_redirect"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          title="电子社保卡二维码"
          :icon="erweimaIcon"
          is-link
          url="https://card.wecity.qq.com/v2/scan-code-depart?channel=AAE-4VDBV6XgltQo6MpiVyX4"
        />
      </van-cell-group>
    </div>
    <div class="mt10">
      <van-cell-group>
        <van-cell
          title="我的电子证书"
          :icon="zhengshuIcon"
          is-link
          to="/dianzi"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="我的电子票据" :icon="piaojuIcon" is-link to="/bill" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="我的EMS寄递" :icon="EMSIcon" is-link to="/ems" />
      </van-cell-group>
    </div>
    <div class="mt10">
      <van-cell-group>
        <van-cell
          title="我的客服"
          :icon="kefuIcon"
          is-link
          url="http://user.saas.caih.com:2880/chat/h5/index.html?sysNum=e5d86398852f48bd8a295d85514ffc33"
        />
      </van-cell-group>
    </div>
    <div style="padding: 0.36rem;"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/" class="text-nav">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? iconHome.active : iconHome.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        url="https://card.wecity.qq.com/v2/scan-code-depart?channel=AAE-4VDBV6XgltQo6MpiVyX4"
        class="erweima-nav"
      >
        <span></span>
        <template>
          <img
            class="img-responsive erweima"
            src="@/assets/images/my/erweima.png"
            alt=""
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="text-nav">
        <span>个人中心</span>
        <template #icon="props">
          <img :src="props.active ? iconMy.active : iconMy.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 绑定链接
      card_url: '',
      active: 2,
      iconHome: {
        active: require('@/assets/images/my/home_avt.png'),
        inactive: require('@/assets/images/my/home.png'),
      },
      iconMy: {
        active: require('@/assets/images/my/my_avt.png'),
        inactive: require('@/assets/images/my/my.png'),
      },
      name: '',
      card: '',
      touxiang: require('@/assets/images/my/touxiang2.png'),
      QR_code: {
        img: require('@/assets/images/my/erweima2.png'),
        url:
          'https://card.wecity.qq.com/v2/scan-code-depart?channel=AAE-4VDBV6XgltQo6MpiVyX4S',
      },
      myIcon: require('@/assets/images/my/20.png'),
      erweimaIcon: require('@/assets/images/my/22.png'),
      zhengshuIcon: require('@/assets/images/my/21.png'),
      piaojuIcon: require('@/assets/images/my/23.png'),
      EMSIcon: require('@/assets/images/my/26.png'),
      kefuIcon: require('@/assets/images/my/27.png'),
    }
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.myCenter()
      }
    })
  },
  methods: {
    async myCenter() {
      let that = this
      try {
        let { data } = await that.$http.postRequest(
          '/api/gxrswx/Index/myCenter'
        )
        if (data.code === 0) {
          console.log(data.data)
          that.name = data.data.username
          that.card = data.data.card_no
          that.touxiang = data.data.headimgurl
            ? data.data.headimgurl
            : require('@/assets/images/my/touxiang2.png')
        }
        if (
          (data.code === 1001 || data.code === 1002) &&
          that.$store.state.type === 1
        ) {
          that.$store.commit('token', 2)
          localStorage.removeItem('XX-Token')
          that.$token.getToken().then(res => {
            if (res) {
              that.myCenter()
            }
          })
        }
      } catch (e) {
        console.error(e)
      }
    },
    go(url) {
      event.stopPropagation()
      window.location.href = url
    },
  },
}
</script>

<style lang="scss" scoped>
.fc-head {
  background-color: #e2e5ed;
}
.header {
  background-image: url('../../assets/images/my/banner-my.png');
  background-size: cover;
  height: 315px;
}
.header-box {
  width: 100%;
  padding: 0 40px;
}
.header-name {
  font-size: 30px;
  color: #fff;
  padding-bottom: 10px;
}
.header-card {
  font-size: 24px;
  color: #acddff;
}
.header-card > span {
  font-size: 30px;
  color: #fff;
}
.my .van-icon__image {
  width: 36px;
  height: 36px;
  object-fit: contain;
}
.my .van-cell__left-icon {
  margin-right: 29px;
  line-height: normal;
}
.p15 {
  padding: 30px;
}
.mt10 {
  margin-top: 20px;
}
.bc-w {
  background-color: #fff;
}

.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

.bc {
  background-color: #fdfafe;
}

.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.van-cell {
  padding: 26px 32px;
}
.m {
  margin-top: -70px;
}
.br {
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
}
.br[class*='van-hairline']::after {
  border-top-width: 0;
}
.erweima-nav .van-tabbar-item__icon img {
  display: block;
  height: auto;
}
.my .van-tabbar {
  height: 140px;
}
.erweima {
  width: 100px;
  margin-top: -80px;
  position: relative;
  z-index: 9;
}
.my .img-responsive > img {
  border-radius: 10px;
}
.my [class*='van-hairline']::after {
  border-color: #f1f1f1;
}
/deep/ .van-tabbar {
  background-color: #f8f8f8;
}
</style>
