<template>
  <div class="p280">
    <div class="p70">
      <van-image class="img-responsive" :src="tips" />
    </div>
    <div class="just-list">
      <p class="pt50 text"></p>
    </div>
    <div class="just-list">
      <p class="f16 pt10">
        <span class="black"
          >模块更新中，不便之处尽请谅解，如需办理社会保障卡请到社保经办窗口办理或于9月15日后线上办理。</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  data() {
    return {
      tips: require('@/assets/images/notice.png'),
    }
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
.text {
  font-size: 32px;
  font-weight: bold;
  color: rgba(102, 102, 102, 1);
  line-height: 60px;
}
.black {
  color: red;
  padding: 30px;
  display: block;
  line-height: 50px;
}
.red {
  color: red;
}
.f12 {
  font-size: 24px;
}
.f16 {
  font-size: 32px;
}
</style>
