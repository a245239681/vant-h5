<template>
  <div class="pt50">
    <div class="p70">
      <van-image class="img-responsive" :src="tips" />
    </div>
    <div class="just-list">
      <p class="pt50 totext">提交成功，请等待审核</p>
    </div>
    <div class="just-list">
      <p class="f12 pt50">
        <span class="togrey">可在“办事进度"页面查看审核进度结果</span>
      </p>
    </div>
    <div class="just-list pt50 goBtn">
      <van-button
        plain
        size="large"
        @click="toGO"
        class="button-sub"
        color="#3B86E0"
        >前往查看</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      acpt_no: '',
      yab139: '',
      tips: require('@/assets/images/icon/toExamine.png'),
    }
  },
  created() {
    this.acpt_no = this.$route.query.id
    this.yab139 = this.$route.query.code
  },
  methods: {
    toGO() {
      if (this.acpt_no === '') {
        this.$router.push('/query')
      } else {
        this.$router.push({
          name: 'DetailsTest',
          query: {
            id: this.acpt_no,
            code: this.yab139,
          },
        })
      }
    },
  },
}
</script>

<style>
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}
.p70 {
  padding: 0 204px;
}
.p280 {
  padding-top: 30px;
}
.pt50 {
  padding-top: 50px;
}
.pt10 {
  padding-top: 10px;
}
.pt150 {
  padding-top: 300px;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.totext {
  font-size: 30px;
  font-weight: bold;
  color: #111111;
  line-height: 60px;
}
.goBtn {
  padding: 170px 75px 0 75px;
}
.goBtn .button-sub {
  background-color: #eeeeed;
  border-radius: 20px;
  font-size: 32px;
  color: #3b86e0;
  font-weight: bold;
}
.togrey {
  font-size: 28px;
  color: #666666;
}
.red {
  color: red;
}
.f12 {
  font-size: 24px;
}
</style>
