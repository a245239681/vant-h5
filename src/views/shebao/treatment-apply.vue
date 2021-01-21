<template>
  <div class="treatment-apply">
    <div class="step">
      <van-steps :active="active" active-icon="success" active-color="#38f">
        <van-step>基本信息</van-step>
        <van-step>申请信息</van-step>
        <van-step>发放信息</van-step>
      </van-steps>
    </div>
    <div class="from-info">
      <van-form @submit="onSubmit">
        <div v-if="active === 0">
          <div class="from-info-title">
            <van-cell-group>
              <van-cell>
                <van-row>
                  <van-col span="24">基本信息</van-col>
                </van-row>
              </van-cell>
            </van-cell-group>
          </div>
          <van-field
            readonly
            input-align="right"
            label="姓名"
            placeholder="姓名"
            name="name"
            v-model="info.name"
          />
          <van-field
            readonly
            input-align="right"
            label="身份证"
            placeholder="请填写身份证"
            name="idcard"
            v-model="info.idcard"
          />
          <van-field
            readonly
            input-align="right"
            label="出生日期"
            placeholder="出生日期"
            name="birthday"
            v-model="info.birthday"
          />
          <van-field
            readonly
            input-align="right"
            label="户口性质"
            placeholder="户口性质"
            name="aac009"
            v-model="info.aac009"
          />
          <van-field
            input-align="right"
            required
            readonly
            is-link
            label="个人编号"
            placeholder="请选择个人编号"
            name="number"
            @click="showPerNumer = true"
            v-model="info.bianhao.text"
          />
          <van-field
            readonly
            input-align="right"
            label="参保状态"
            placeholder="参保状态"
            name="aac008"
            v-model="info.aac008"
          />
          <van-field
            readonly
            input-align="right"
            label="首次参保年月"
            placeholder="首次参保年月"
            name="aac049"
            v-model="info.aac049"
          />
          <van-field
            readonly
            input-align="right"
            label="个人缴费"
            placeholder="个人缴费"
            name="aac031"
            v-model="info.aac031"
          />
          <van-field
            readonly
            input-align="right"
            label="参保所属机构"
            placeholder="参保所属机构"
            name="cab139"
            v-model="info.jigou.text"
          />
          <van-field
            readonly
            input-align="right"
            label="社区"
            placeholder="社区"
            name="community"
            v-model="info.community"
          />
          <van-field
            readonly
            input-align="right"
            label="离退休标志"
            placeholder="离退休标志"
            name="retire"
            v-model="info.retire"
          />
        </div>
        <div v-if="active === 1">
          <div class="from-info-title">
            <van-cell-group>
              <van-cell>
                <van-row>
                  <van-col span="24">申请信息</van-col>
                </van-row>
              </van-cell>
            </van-cell-group>
          </div>
          <van-field
            required
            readonly
            is-link
            input-align="right"
            label="到龄日期"
            placeholder="到龄日期"
            name="aic162"
            @click="showTime = true"
            v-model="info.aic162"
          />
          <van-field
            readonly
            required
            input-align="right"
            label="待遇开始年月"
            placeholder="待遇开始年月"
            name="aic160"
            v-model="info.aic160"
          />
          <van-field
            readonly
            input-align="right"
            label="最后缴费到账日期"
            placeholder="最后缴费到账日期"
            name="aae079"
            v-model="info.aae079"
          />
          <van-field
            readonly
            input-align="right"
            label="实际缴费月数"
            placeholder="实际缴费月数"
            name="aae201"
            v-model="info.aae201"
          />
          <van-field
            readonly
            is-link
            input-align="right"
            label="是否贫困人员"
            placeholder="请选择"
            name="cac056"
            @click="showPoor = true"
            v-model="info.cac056.text"
          />
          <van-field
            readonly
            is-link
            input-align="right"
            label="特殊人员类别"
            placeholder="请选择"
            name="cac121"
            @click="showPersonnel = true"
            v-model="info.cac121.text"
          />
        </div>
        <div v-if="active === 2">
          <div class="from-info-title">
            <van-cell-group>
              <van-cell>
                <van-row>
                  <van-col span="24">发放信息</van-col>
                </van-row>
              </van-cell>
            </van-cell-group>
          </div>
          <van-field
            readonly
            input-align="right"
            label="发放方式"
            placeholder="发放方式"
            name="bankType"
            v-model="info.bankType"
          />
          <van-field
            required
            readonly
            is-link
            input-align="right"
            label="银行类别"
            placeholder="请选择银行类别"
            name="bank"
            @click="showBank = true"
            v-model="info.bank"
          />
          <van-field
            input-align="right"
            required
            label="银行户名"
            placeholder="请填写银行户名"
            name="bankName"
            v-model="info.bankName"
          />
          <van-field
            input-align="right"
            required
            label="银行账号"
            placeholder="请填写银行账号"
            name="bankNum"
            v-model="info.bankNum"
          />
          <van-field
            input-align="right"
            label="领取人电话"
            placeholder="请填写领取人电话"
            name="receivePhone"
            v-model="info.receivePhone"
          />
          <van-field
            input-align="right"
            label="领取人地址"
            placeholder="请填写领取人地址"
            name="receiveAddr"
            v-model="info.receiveAddr"
          />
        </div>
        <div class="sub-btn" v-if="active === 2">
          <van-button
            native-type="submit"
            class="button-large-sub"
            color="#287DE2"
            size="large"
            >提交审核</van-button
          >
        </div>
        <div class="deployBtn">
          <div class="next-btn" v-if="active === 0 || active === 1">
            <van-button
              @click="next"
              native-type="button"
              class="button-large"
              color="#4186fb"
              size="large"
              :disabled="isDisable"
              >下一步</van-button
            >
          </div>
          <div class="prev-btn" v-if="active === 1 || active === 2">
            <van-button
              plain
              @click="prev"
              native-type="button"
              class="button-large b-color"
              color="#333"
              size="large"
              >上一步</van-button
            >
          </div>
        </div>
      </van-form>
    </div>
    <!-- 个人编号 -->
    <van-popup v-model="showPerNumer" position="bottom">
      <van-picker
        show-toolbar
        :columns="perNumerArr"
        @cancel="showPerNumer = false"
        @confirm="onPerNumer"
      />
    </van-popup>
    <!-- 到龄日期 -->
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="timeConfirm"
        @cancel="showTime = false"
      />
    </van-popup>
    <!-- 是否贫困 -->
    <van-popup v-model="showPoor" position="bottom">
      <van-picker
        show-toolbar
        :columns="poorArr"
        @cancel="showPoor = false"
        @confirm="onPoor"
      />
    </van-popup>
    <!-- 是否贫困 -->
    <van-popup v-model="showPersonnel" position="bottom">
      <van-picker
        show-toolbar
        :columns="personnel"
        @cancel="showPersonnel = false"
        @confirm="onPersonnel"
      />
    </van-popup>
    <!-- 银行类别 -->
    <van-popup v-model="showBank" position="bottom">
      <van-picker
        show-toolbar
        :columns="bankArr"
        @cancel="showBank = false"
        @confirm="onBank"
      />
    </van-popup>
    <van-popup
      class="van-dialog"
      :close-on-click-overlay="false"
      v-model="showTips"
      position="center"
    >
      <div>
        <div class="van-dialog__header">提示</div>
        <div class="van-dialog__content">
          <div class="van-dialog__message van-dialog__message--has-title">
            {{ content }}
          </div>
        </div>
        <div class="van-hairline--top van-dialog__footer">
          <button
            class="van-button van-button--default van-button--large van-dialog__cancel"
            @click="cole()"
          >
            <div class="van-button__content">
              <span class="van-button__text">取消</span>
            </div></button
          ><button
            class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left"
            @click="next_act()"
          >
            <div class="van-button__content">
              <span class="van-button__text">{{ text }}</span>
            </div>
          </button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**步骤 */
      active: 0,
      /**表单信息 */
      info: {
        /**姓名 */
        name: '',
        /**身份证 */
        idcard: '',
        /**出生年月 */
        birthday: '',
        /**户口性质 */
        aac009: '',
        /**个人编号 text为编号， value为户口性质编号 */
        bianhao: { text: '', value: '' },
        /**参保状态 */
        aac008: '',
        /**首次参保年月 */
        aac049: '',
        /**个人缴费 */
        aac031: '',
        /**参保所属机构 */
        jigou: { text: '', value: '' },
        /**社区 */
        community: '',
        /**离退休标志 */
        retire: '',
        /**到龄日期 */
        aic162: '',
        /**待遇享受开始年月 */
        aic160: '',
        /**最后一次缴费到账日期 */
        aae079: '',
        /**实际缴费月数 */
        aae201: '',
        /**是否贫困人员 */
        cac056: { text: '', value: '' },
        /**特殊人员类别 */
        cac121: { text: '', value: '' },
        /**银行类别 */
        bank: '',
        /**发放方式 */
        bankType: '委托银行发放',
        /**银行户名 */
        bankName: '',
        /**银行账号 */
        bankNum: '',
        /**领取人电话 */
        receivePhone: '',
        /**领取人地址 */
        receiveAddr: '',
      },
      /**贫困数据 */
      poorArr: [
        { text: '是', value: '1' },
        { text: '否', value: '0' },
      ],
      personnel: [
        { text: '重度残疾人', value: '170106' },
        { text: '贫困残疾人', value: '170107' },
        { text: '城乡特困救助供养对象', value: '170108' },
        { text: '低保对象', value: '170109' },
        { text: '民办教师、代课人员', value: '170111' },
        { text: '计划生育人员', value: '170112' },
        { text: '建档立卡贫困户', value: '170199' },
      ],
      /**银行类别 */
      bankArr: [
        {
          text: '中国工商银行',
          value: '102',
        },
        {
          text: '中国农业银行',
          value: '103',
        },
        {
          text: '中国银行',
          value: '104',
        },
        {
          text: '中国建设银行',
          value: '105',
        },
        {
          text: '交通银行',
          value: '301',
        },
        {
          text: '中信银行',
          value: '302',
        },
        {
          text: '招商银行',
          value: '308',
        },
        {
          text: '兴业银行',
          value: '309',
        },
        {
          text: '北部湾银行',
          value: '313-BBW',
        },
        {
          text: '桂林银行',
          value: '313-GL',
        },
        {
          text: '柳州银行',
          value: '313-LZ',
        },
        {
          text: '农村商业银行',
          value: '314',
        },
        {
          text: '农村信用社',
          value: '402',
        },
        {
          text: '中国邮政储蓄银行',
          value: '403',
        },
      ],
      aaz159: '', // 	人员参保关系ID
      showPerNumer: false,
      showTime: false,
      showPoor: false,
      showPersonnel: false,
      showBank: false,
      perNumerArr: [],
      /**是否可以下一步 */
      isDisable: false,
      minDate: new Date(1949, 0, 1), // 最小时间
      maxDate: new Date(new Date().getFullYear() + 60, 1, 1), // 最大时间
      currentDate: new Date(2000, 10, 1), // 默认选中时间
      bankCode: '',
      /**退休标志状态 */
      cac084: '',
      /**社区ID */
      aaz070: '',
      time: 5,
      timer: null,
      text: '5秒后确认',
      content:
        '    发放信息将优先匹配领取待遇人员名下的社保卡，若该社保卡的金融功能处于非正常状态,申请人可自行选填发放账户的相关信息。注:若因个人填写失误造成无法发放或错发的情况，由本人自行负责。',
      showTips: false,
    }
  },
  created() {
    this.$token.getToken().then(async res => {
      if (res) {
        let res = await this.getNumberList()
        if (res === 0) {
          let user = await this.getuser()
          if (user === 0) {
            await this.account()
          }
        }
      }
    })
  },
  mounted() {},
  methods: {
    // 格式化时间选择格式
    formatter(date) {
      let y = date.getFullYear() // 年
      let MM = date.getMonth() + 1 // 月
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate() // 日
      d = d < 10 ? '0' + d : d

      return y + '-' + MM + '-' + d
    },
    /**下一步 */
    async next() {
      let that = this

      console.log(that.active)
      if (that.active === 1) {
        that.text = '5秒后确认'
        that.time = 5
        that.timer = setInterval(() => {
          if (that.time === 0) {
            clearInterval(that.timer)
            that.text = '确认'
          } else {
            that.text = `${that.time}` + '秒后确认'
            that.time--
            // console.log(that.text)
          }
        }, 1000)
        that.showTips = true
      } else {
        ++this.active
        that.active > 2 ? (that.active = 2) : that.active
      }
    },
    cole() {
      this.showTips = false
      this.time = 5
      clearInterval(this.timer)
    },
    next_act() {
      if (this.time === 0) {
        console.log(11)
        this.showTips = false
        ++this.active
        this.active > 2 ? (this.active = 2) : this.active
      }
    },
    /**上一步 */
    prev() {
      --this.active
      this.active < 0 ? (this.active = 0) : this.active
    },
    beforeClose(action, done) {
      console.log(action)
      if (action === 'confirm') {
        setTimeout(done, 5000)
      } else {
        done()
      }
    },
    /**到龄日期选择 */
    timeConfirm(date) {
      this.info.aic162 = this.formatter(date)
      this.showTime = false
      this.verifyTreaTime()
    },
    // 是否贫困选择
    onPoor(v) {
      this.info.cac056 = v
      this.showPoor = false
    },
    // 特殊人员选择
    onPersonnel(v) {
      this.info.cac121 = v
      this.showPersonnel = false
    },
    /**银行类别 */
    onBank(item) {
      this.info.bank = item.text
      this.bankCode = item.value
      this.showBank = false
    },
    // 切换个人编号
    onPerNumer(v) {
      this.info.bianhao = v
      this.showPerNumer = false
      this.getuser()
    },
    /**获取个人编号列表 */
    async getNumberList() {
      let _this = this
      try {
        let { data } = await _this.$http.postRequest(
          '/api/gxrswx/Resident/getAac001List',
          {}
        )
        if (data.code === 0) {
          _this.perNumerArr = data.data.list.map(v => ({
            text: v.aac001,
            value: v.aac009,
          }))
          _this.perNumerArr.length !== 0
            ? (_this.info.bianhao = _this.perNumerArr[0])
            : ''
          _this.isDisable = false
        } else if (
          (data.code === 1002 || data.code === 1001) &&
          _this.$store.state.type === 1
        ) {
          _this.$store.commit('token', 2)
          localStorage.removeItem('XX-Token')
          this.$token.getToken().then(async res => {
            if (res) {
              let res = await this.getNumberList()
              if (res === 0) {
                let user = await this.getuser()
                if (user === 0) {
                  await this.account()
                }
              }
            }
          })
        } else {
          _this.$dialog({ message: data.msg })
          _this.isDisable = true
        }
        return data.code
      } catch (e) {
        console.error(e)
      }
    },
    /**资格校验 */
    async account() {
      let that = this
      try {
        let { data } = await that.$http.postRequest(
          '/api/gxrswx/Resident/verifyTreaApply',
          {
            // 个人编号
            aac001: that.info.bianhao.text,
            // 经办机构
            cab139: that.info.jigou.value,
            // 参保险种
            aae140: '170',
            // 人员参保关系ID
            aaz159: that.aaz159,
            // 户口性质
            aac009: that.info.bianhao.value,
          }
        )
        if (data.code === 0) {
          // 下一步
          that.isDisable = false
          // 最后一次缴费到账日期
          that.info.aae079 = data.data.aae079
          // 实际缴费月数
          that.info.aae201 = data.data.aae201
          // 	待遇享受开始年月
          that.info.aic160 = data.data.aic160
          // 	到龄日期
          that.info.aic162 = data.data.aic162
          that.currentDate = new Date(data.data.aic162)

          return data.msg
        } else {
          that.$dialog({ message: data.msg })
          that.isDisable = true
        }
      } catch (e) {
        that.$toast({ message: '出错了，请稍后再试' })
        console.error(e)
      }
    },
    /**修改到龄日期时校验 */
    async verifyTreaTime() {
      let that = this
      try {
        let { data } = await that.$http.postRequest(
          '/api/gxrswx/Resident/verifyTreaTime',
          {
            // 个人编号
            aac001: that.info.bianhao.text,
            // 经办机构
            cab139: that.info.jigou.value,
            // 出生年月 YYYY-MM-DD
            aac006: that.info.birthday,
            // 档案出生日期 YYYY-MM-DD
            cac516: that.info.birthday,
            // 到龄日期 YYYY-MM-DD
            aic162: that.info.aic162,
            // 户口性质
            aac009: that.info.bianhao.value,
          }
        )
        if (data.code === 0) {
          console.log(data)
        }
      } catch (e) {
        that.$toast({ message: '龄日期时校验失败，请稍后再试' })
        console.error(e)
      }
    },
    /**获取参保信息 */
    async getuser() {
      try {
        let _this = this
        let { data } = await _this.$http.postRequest(
          '/api/gxrswx/Resident/residentSocialInfo',
          {
            aac001: _this.info.bianhao.text,
          }
        )
        if (data.code === 0) {
          _this.isDisable = false
          // 姓名
          _this.info.name = data.data.aac003
          // 身份证
          _this.info.idcard = data.data.aac002
          // 出生年月
          _this.info.birthday = data.data.aac006
          // 户口性质
          _this.info.aac009 = data.data.aac009_desc
          // 参保机构名称
          _this.info.jigou.text = data.data.cab139_desc
          // 参保机构代码
          _this.info.jigou.value = data.data.cab139
          // 社区
          _this.info.community = data.data.aab069_af02
          // 首次参保年月
          _this.info.aac049 = data.data.aac049
          // 个人缴费
          _this.info.aac031 = data.data.aac031
          // 参保状态
          _this.info.aac008 = data.data.aac008
          // 离退休标志
          _this.info.retire = data.data.cac084_desc
          // 离退休标志状态
          _this.cac084 = data.data.cac084
          // 人员参保关系ID
          _this.aaz159 = data.data.aaz159
          // 社区ID
          _this.aaz070 = data.data.aaz070
        } else {
          _this.isDisable = true
          _this.$dialog({ message: data.msg })
        }
        return data.code
      } catch (e) {
        console.error(e)
        this.$dialog({ message: '出错了，请重试' })
      }
    },
    onSubmit() {
      let that = this
      if (that.info.bank === '') {
        that.$toast({ message: '请选择银行类别' })
        return
      }
      if (that.info.bankName === '') {
        that.$toast({ message: '请填写银行户名' })
        return
      }
      if (that.info.bankNum === '') {
        that.$toast({ message: '请填写银行账号' })
        return
      }
      let modal = {
        // 离退休标志
        aac084: that.cac084,
        // 险种代码
        aae140: '170',
        // 个人编号
        aac001: that.info.bianhao.text,
        // 户口类型
        aac009: that.info.bianhao.value,
        // 银行类别代码
        aaf002: that.bankCode,
        // 银行户名
        aae009: that.info.bankName,
        // 经办机构代码
        cab139: that.info.jigou.value,
        // 银行账户
        aae010: that.info.bankNum,
        // 到龄日期
        aic162: that.info.aic162,
        // 待遇享受开始年月
        aic160: that.info.aic160,
        // 人员参保关系ID
        aaz159: that.aaz159,
        // 社区ID
        aaz070: that.aaz070,
        // 人员类别
        cac121: that.info.cac121.value,
        // 扶贫人员标志
        cac056: that.info.cac056.value,
        // 实际缴费月数
        aae201: that.info.aae201,
        // 出生日期
        aac006: that.info.birthday,
        // 最后一次到账时间
        aae079: that.info.aae079,
      }
      try {
        this.$dialog
          .confirm({
            title: '',
            message: '是否确认申请待遇领取',
          })
          .then(async () => {
            let { data } = await that.$http.postRequest(
              '/api/gxrswx/Resident/treaApplyPost',
              modal,
              '正在提交...'
            )
            if (data.code === 0) {
              that.$router.push({
                name: 'ToExamineTest',
                query: {
                  id: data.data.acpt_no,
                  code: that.info.jigou.value,
                },
              })
            } else {
              that.$toast({ message: data.msg })
            }
          })
          .catch(() => {})
      } catch (err) {
        that.$toast({ message: '提交失败,稍后请重试' })
        console.error(err)
      }
    },
  },
}
</script>

<style>
.treatment-apply .van-step__circle {
  width: 20px;
  height: 20px;
}
.treatment-apply .van-step--horizontal .van-step__icon {
  font-size: 30px;
}
.treatment-apply .sub-btn {
  padding: 30px 30px 30px 30px;
}
.treatment-apply .button-large-sub {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.treatment-apply .next-btn {
  padding: 30px 30px 30px 30px;
}
.treatment-apply .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.treatment-apply .button-large.b-color {
  border-color: #f1f1f1 !important;
}
.treatment-apply .prev-btn {
  padding: 0 30px 30px 30px;
}
.treatment-apply .from-info-title {
  /* padding: 30px; */
  color: #666;
  font-size: 30px;
  font-weight: bold;
}
.treatment-apply .from-info-title .van-hairline--top-bottom::after,
.treatment-apply .from-info-title .van-hairline-unset--top-bottom::after {
  border-top-width: 0;
}
.treatment-apply .van-field__label {
  width: 250px;
}
.treatment-apply .van-popup--center {
  width: 90%;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
._p30_tips {
  padding: 0 30px 30px 30px;
}
._text-right {
  text-align: right;
}
.treatment-apply .tips {
  height: 60px;
}
.treatment-apply .content {
  padding: 30px;
  line-height: 45px;
}
.treatment-apply .van-dialog__confirm,
.treatment-apply .van-dialog__cancel {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  height: 96px;
  margin: 0;
  border: 0;
}
.treatment-apply .van-dialog__footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
}
.treatment-apply .van-dialog__message {
  text-align: left;
}
</style>
