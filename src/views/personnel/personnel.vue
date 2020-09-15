<template>
  <div class="personnel">
    <!-- <iframe
      src="http://sm.gxrc.com/webapp/login/AppMemberLogin"
      ref="iframe"
      id="bdIframe"
      frameborder="0"
      scrolling="no"
    ></iframe> -->
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <van-image class="img-responsive" :src="banner" />
      </van-swipe-item>
    </van-swipe>
    <div>
      <van-cell
        class="list-nav"
        icon-prefix="icon-size"
        :key="inx"
        v-for="(item, inx) in list"
        is-link
        :title="item.title"
        :icon="item.icon"
        :url="item.url"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bdTokenUrl: '',
      banner: require('@/assets/images/personnel-banner.png'),
      list: [
        {
          title: '毕业生登记',
          icon: require('@/assets/images/n1.png'),
          url: 'http://sm.gxrc.com/webapp/login/AppMemberLogin',
        },
        {
          title: '电子证书查询',
          icon: require('@/assets/images/n4.png'),
          url: 'https://gxrswx.healthan.net/home/select_zs',
        },
        {
          title: '(区直)人事档案存放地查询',
          icon: require('@/assets/images/n5.png'),
          url: 'https://gxrswx.healthan.net/rc/person/sh',
        },
      ],
    }
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    // const oIframe = document.getElementById('bdIframe')
    // const deviceWidth = document.documentElement.clientWidth
    // const deviceHeight = document.documentElement.clientHeight
    // oIframe.style.width = Number(deviceWidth) + 'px' //数字是页面布局宽度差值
    // oIframe.style.height = Number(deviceHeight) + 'px' //数字是页面布局高度差
  },
  created() {
    // this.getUrl()
    // this.$nextTick(() => {
    //   this.getCode()
    // })
  },
  methods: {
    /**
     * 获取-外部接口信息
     */
    // getUrl() {
    //   let that = this
    //   let bdUrl = { queryurl: this.$paths.bdpath + '/locate' }
    //   this.$api.getBdToken(bdUrl, function(res) {
    //     that.bdTokenUrl = res.data.data
    //   })
    // },
  },
}
</script>

<style>
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}
.personnel .list-nav .van-cell__left-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 23px;
}
.personnel .van-cell {
  padding: 26px 32px;
  font-size: 30px;
  color: #121212;
}
.personnel .icon-size {
  width: 40px;
  min-height: 40px;
  font-size: 40px;
}
</style>
