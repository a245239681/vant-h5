<template>
  <div class="nav">
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <van-image class="img-responsive" :src="banner" />
      </van-swipe-item>
    </van-swipe>
    <div class="bc">
      <div class="header">
        <van-row class="just-list" @click="onshow">
          <van-col span="22">
            <span class="item-title_text role-title_text">
              <span v-cloak>社会保障卡(打包办)</span>
            </span>
            <!-- <span class="item-title_text "></span> -->
          </van-col>
          <van-col span="2">
            <van-icon :name="arrow" />
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="bc-w" v-show="show">
      <van-grid square :border="false" :column-num="3">
        <van-grid-item
          :key="inx"
          @click="go(item)"
          v-for="(item, inx) in list"
          :icon="item.icon"
        >
          <i class="van-icon van-grid-item__icon" style="font-size: 20px;"
            ><img :src="item.icon" class="van-icon__image" />
          </i>
          <span class="van-grid-item__text">{{ item.title }}</span>
          <span class="van-grid-item__text">{{ item.details }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrow: 'arrow-up',
      show: true,
      banner: require('@/assets/images/baoban/banner-baoban.png'),
      list: [
        {
          title: '社会保障卡',
          details: '申领',
          icon: require('@/assets/images/baoban/42.png'),
          url: '/notice',
        },
        {
          title: '社会保障卡启用',
          details: '(社保功能激活)',
          icon: require('@/assets/images/baoban/41.png'),
          url: 'https://gxrswx.healthan.net/card/log/cardActLogin',
        },
        {
          title: '社会保障卡',
          details: '挂失与解挂',
          icon: require('@/assets/images/baoban/43.png'),
          url: '/loss',
        },
        {
          title: '社会保障卡补领',
          details: '换领、换发',
          icon: require('@/assets/images/baoban/44.png'),
          url: '/lossFormal',
        },
        // {
        //   title: '社会保障卡',
        //   details: '补卡',
        //   icon: require('@/assets/images/baoban/45.png'),
        //   url:
        //     'https://openid-gxrswx.healthan.net/index.php/Home/Home/openidByUrl?url=http://h5.gxrswx.healthan.net/cardReplacement',
        // },
        {
          title: '社会保障卡',
          details: '信息变更',
          icon: require('@/assets/images/baoban/46.png'),
          url: '/modify',
        },
        {
          title: '社会保障卡注销',
          details: '(社保功能注销)',
          icon: require('@/assets/images/baoban/47.png'),
          url: '/logout',
        },
        {
          title: '社会保障卡',
          details: '进度查询',
          icon: require('@/assets/images/baoban/48.png'),
          url: '/pace',
        },
        {
          title: '社会保障卡应用',
          details: '状态查询',
          icon: require('@/assets/images/baoban/49.png'),
          url: '/card',
        },
        {
          title: '即时制卡',
          details: '网点查询',
          icon: require('@/assets/images/baoban/50.png'),
          url: '/bank',
        },
      ],
    }
  },
  created() {},
  methods: {
    onshow() {
      if (this.show) {
        this.show = !this.show
        this.arrow = 'arrow-down'
      } else {
        this.show = true
        this.arrow = 'arrow-up'
      }
    },
    go(item) {
      if (
        item.title + item.details === '社会保障卡启用(社保功能激活)' ||
        item.title + item.details === '社会保障卡补卡'
      ) {
        window.location.href = item.url
      } else {
        this.$router.push(item.url)
      }
    },
  },
}
</script>

<style>
.mt10 {
  margin-top: 20px;
}
.bc-w {
  background-color: #fff;
}

.nav .item-title_text {
  display: block;
  position: relative;
  padding: 0 30px;
  text-indent: 10px;
  height: 100px;
  color: #111111;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.nav .item-title_text > span {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav .item-title_text:before {
  content: '';
  width: 10px;
  height: 30px;
  background: rgba(59, 134, 224, 1);
  border-radius: 10px;
}

.nav .van-grid-item__text {
  color: #333333;
  font-size: 28px;
  word-wrap: break-word;
  text-align: left;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-pack: start;
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
.nav .van-grid-item__content {
  padding: 0px 16px;
}

/* .van-grid-item__content {
    background-color: #f3f9ff;
  } */

.nav [class*='van-hairline']::after {
  border-color: #cccccc;
}
</style>
