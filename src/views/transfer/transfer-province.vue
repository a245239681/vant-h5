<template>
  <div class="transfer-province">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        input-align="right"
        label="姓名"
        placeholder="姓名"
        name="aac003"
        v-model="aac003"
      />
      <van-field
        readonly
        input-align="right"
        label="身份证"
        placeholder="身份证"
        name="aac002"
        v-model="aac002"
      />
      <van-field
        readonly
        required
        input-align="right"
        label="参保地"
        placeholder="请选择参保地"
        is-link
        @click="showMechanism = true"
        name="mechanism"
        v-model="mechanism.text"
      />
      <van-field
        readonly
        required
        input-align="right"
        label="转出机构"
        placeholder="选择转出机构"
        is-link
        @click="checkTran('aab301')"
        name="aab301"
        v-model="aab301.text"
        :disabled="isDisable"
      />
      <van-field
        readonly
        required
        input-align="right"
        label="转入机构"
        placeholder="选择转入机构"
        is-link
        @click="checkTran('aab299')"
        name="aab299"
        v-model="aab299.text"
        :disabled="isDisable"
      />
      <div class="sub-btn">
        <van-button
          native-type="submit"
          class="button-large"
          color="#287DE2"
          size="large"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-popup v-model="showMechanism" position="bottom">
      <van-picker
        show-toolbar
        :columns="mechanismArr"
        @cancel="showMechanism = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 转入、转出 -->
    <van-popup v-model="showTran" position="bottom">
      <van-picker
        show-toolbar
        :columns="tranArr"
        @cancel="showTran = false"
        @confirm="onTran"
      />
    </van-popup>
  </div>
</template>

<script>
import { getAddress } from '@/utils/user'
export default {
  name: 'province',
  data() {
    return {
      /**参保地 */
      mechanism: { text: '', value: '' }, // 参保地
      /**身份证 */
      aac002: '',
      /**姓名 */
      aac003: '',
      /**z转出 */
      aab301: { text: '', value: '' },
      /**转入 */
      aab299: { text: '', value: '' },
      showMechanism: false,
      mechanismArr: [],
      showTran: false,
      /**转移数组 */
      tranArr: [],
      /**判断是转出还是转入 */
      checkTranCode: '',
      isDisable: false,
    }
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getAddr().then(code => {
          if (code === 0) {
            this.personalInfo()
            this.tranList()
          }
        })
      }
    })
  },
  methods: {
    /**参保地获取 */
    async getAddr() {
      let _this = this
      try {
        return new Promise(resolve => {
          getAddress().then(res => {
            if (res.data.code === 0) {
              _this.mechanismArr = res.data.data.list.map(v => {
                return {
                  text: v.name,
                  value: v.code,
                }
              })
              _this.mechanismArr.length !== 0
                ? (_this.mechanism = _this.mechanismArr[0])
                : ''
              return resolve(res.data.code)
            } else if (
              (res.data.code === 1001 || res.data.code === 1002) &&
              _this.$store.state.type === 1
            ) {
              _this.$store.commit('token', 2)
              localStorage.removeItem('XX-Token')
              _this.$token.getToken().then(res => {
                if (res) {
                  this.getAddr().then(code => {
                    if (code === 0) {
                      this.personalInfo()
                      this.tranList()
                    }
                  })
                }
              })
            } else if (res.data.code === 1004 || res.data.code === 3000) {
              _this.isDisable = true
              _this.$dialog.alert({
                message: res.data.msg,
              })
            } else {
              _this.$dialog({ message: '数据异常' })
            }
          })
        })
      } catch (e) {
        console.error(e)
      }
    },
    /**获取用户信息 */
    async personalInfo() {
      let that = this
      try {
        let { data } = await that.$http.postRequest(
          '/api/gxrswx/Personal/personalInfo',
          {
            yab139: that.mechanism.value,
          }
        )
        if (data.code === 0) {
          that.aac002 = data.data.aac002
          that.aac003 = data.data.aac003
        } else {
          that.$dialog({ message: data.msg })
        }
      } catch (e) {
        console.error(e)
      }
    },
    /**转移机构 */
    async tranList() {
      let that = this
      let { data } = await that.$http.postRequest(
        '/api/gxrswx/apply_ws_ei_tran_ext/tranList',
        {
          yab139: that.mechanism.value,
        }
      )
      if (data.code === 0) {
        // console.log(data.data.list)
        that.isDisable = false
        that.tranArr = data.data.list.map(v => ({
          text: v.name,
          value: v.id,
        }))
      } else {
        that.$dialog({ message: data.msg })
        that.isDisable = true
      }
    },
    /**参保地选择 */
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
      this.tranList()
    },
    /**转入，转出弹框 */
    checkTran(value) {
      this.checkTranCode = value
      this.showTran = true
    },
    /**转入，转出选择 */
    onTran(v) {
      this.checkTranCode === 'aab301' ? (this.aab301 = v) : (this.aab299 = v)
      this.showTran = false
    },
    async onSubmit() {
      let that = this
      let model = {
        yab139: that.mechanism.value,
        /**转出行政代码 */
        aab301: that.aab301.value,
        /**转入行政区代码 */
        aab299: that.aab299.value,
      }
      if (model.aab301 === '') {
        that.$toast({ message: '选择转出机构' })
        return
      }
      if (model.aab299 === '') {
        that.$toast({ message: '选择转入机构' })
        return
      }
      try {
        let { data } = await that.$http.postRequest(
          '/api/gxrswx/apply_ws_ei_tran_ext/tranApply',
          model,
          '正在提交...'
        )
        if (data.code === 0) {
          that.$router.push({
            name: 'ToExamineTest',
            query: {
              id: data.data.acpt_no, // 受理号
              code: data.data.yab139, // 参保地
            },
          })
        } else {
          that.$dialog({ message: data.msg })
        }
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style>
.transfer-province .sub-btn {
  padding: 103px 30px 30px 30px;
}
.transfer-province .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
</style>
