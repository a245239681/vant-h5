<template>
  <div class="list">
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <van-image class="img-responsive" :src="banner" />
      </van-swipe-item>
    </van-swipe>
    <div>
      <van-cell
        class="list-nav"
        :key="inx"
        v-for="(item, inx) in list"
        is-link
        :title="item.title"
        :icon="item.icon"
        :to="item.url"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: require('@/assets/images/baoban/banner-dian.png'),
      list: [
        {
          title: '职称电子证书',
          icon: require('@/assets/images/baoban/3.png'),
          url: '/TitlePdf',
        },
        {
          title: '职业技能等级电子证书',
          icon: require('@/assets/images/baoban/2.png'),
          url: '/LicensePdf',
        },
      ],
    }
  },
  created() {},
  methods: {},
}
</script>

<style>
.list .item-title_text {
  display: block;
  position: relative;
  padding: 36px 30px;
}

.mt10 {
  margin-top: 0.1rem;
}
.bc-w {
  background-color: #fff;
}

.list .van-grid-item__text {
  color: #646566;
  font-size: 24px;
  word-wrap: break-word;
  text-align: left;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-pack: center;
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
.list .van-grid-item__content {
  padding: 0px 16px;
}
.list-nav .van-cell__left-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 26px;
}

.list .van-cell {
  padding: 26px 32px;
}

/* .van-grid-item__content {
    background-color: #f3f9ff;
  } */

.list [class*='van-hairline']::after {
  border-color: #cccccc;
}
</style>
