<template>
  <div class="test">
    <vue-esign
      class="border"
      ref="esign"
      :width="400"
      :height="200"
      :isCrop="isCrop"
      :lineWidth="lineWidth"
      :lineColor="lineColor"
      :bgColor.sync="bgColor"
    />
    <div class="buttom-b">
      <van-button type="primary" @click="handleReset" class="mr20"
        >清空画板</van-button
      >
      <van-button @click="handleGenerate" type="info">生成图片</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false,
    }
  },
  methods: {
    handleReset() {
      this.$refs.esign.reset()
    },
    handleGenerate() {
      this.$refs.esign
        .generate()
        .then(res => {
          this.resultImg = res
          console.log(this.resultImg)
        })
        .catch(err => {
          alert(err) // 画布没有签字时会执行这里 'Not Signned'
        })
    },
  },
}
</script>

<style>
.test {
  padding: 30px;
}
.border {
  border: 2px solid #999;
}
.mr20 {
  margin-right: 20px;
}

.buttom-b {
  margin-top: 20px;
}
</style>
