<template>
  <div class="p280">
    <div class="p70">
      <van-image class="img-responsive" :src="tips" />
    </div>
    <div class="just-list">
      <p class="pt50 text-nodata">{{ psMsg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  data() {
    return {
      tips: require('@/assets/images/no.png'),
    }
  },
  props: ['psMsg'],
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
.text-nodata {
  font-size: 30px;
  font-weight: 500;
  color: #666666;
  line-height: 60px;
}
.black {
  color: #111;
}
.red {
  color: red;
}
.f12 {
  font-size: 24px;
}
</style>
