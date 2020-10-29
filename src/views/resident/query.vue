<template>
  <div class="pace">
    <div class="info-title">
      <van-row>
        <van-col span="24">居民参保登记受理进度查询</van-col>
      </van-row>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        input-align="right"
        label="姓名"
        placeholder="请填写姓名"
        name="username"
        v-model="username"
      />
      <van-field
        input-align="right"
        label="身份证号"
        placeholder="请填写身份证号码"
        name="IDcard"
        v-model="IDcard"
      />

      <div class="sub-btn">
        <van-button
          native-type="submit"
          class="button-large"
          color="#287DE2"
          size="large"
          >查询</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '', // 姓名
      IDcard: '', // 身份证
    }
  },
  created() {},
  methods: {
    async onSubmit(values) {
      let modal = {
        idcard: values.IDcard,
        username: values.username,
      }
      let matchIDCard = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

      if (modal.username === '') {
        this.$toast('请填写姓名')
        return
      }
      if (modal.idcard === '') {
        this.$toast('请填写身份证')
        return
      }
      if (!matchIDCard.test(modal.idcard)) {
        this.$toast.fail('身份证号码格式不正确')
        return
      }
      // console.log(values)
      let { data } = await this.$http.postRequest(
        '/api/gxrswx/Progressresidentreg/progressList',
        modal
      )
      if (data.code === 0) {
        console.log(data.data.list)
        const item = JSON.stringify(data.data.list)
        this.$router.push({
          name: 'ResidentList',
          query: {
            item: item,
          },
        })
      }
      if (data.code === 3000 || data.code === 2000) {
        this.$toast(data.msg)
      }
    },
  },
}
</script>

<style>
.pace .sub-btn {
  padding: 103px 30px 30px 30px;
}
.pace .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.pace .van-cell {
  padding: 26px 32px;
  font-size: 30px;
  color: #666666;
}
.info-title {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
}
</style>
