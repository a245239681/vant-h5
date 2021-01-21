<template>
  <div class="modifyInfo">
    <van-form @submit="onSubmit">
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
        disabled
        input-align="right"
        label="姓名"
        placeholder="姓名"
        name="aac003"
        v-model="newInfo.aac003"
      />
      <van-field
        disabled
        input-align="right"
        label="证件类型"
        placeholder="证件类型"
        name="aac058"
        v-model="newInfo.aac058"
      />
      <van-field
        disabled
        input-align="right"
        label="身份证"
        placeholder="身份证"
        name="aac002"
        v-model="newInfo.aac002"
      />
      <van-field
        input-align="right"
        readonly
        is-link
        label="性别"
        placeholder="性别"
        name="aac004"
        @click="showSex = true"
        v-model="newInfo.aac004"
      />
      <van-field
        input-align="right"
        readonly
        is-link
        label="民族"
        placeholder="民族"
        name="aac005"
        @click="showNation = true"
        v-model="newInfo.aac005"
      />
      <van-field
        input-align="right"
        readonly
        is-link
        label="户口性质"
        placeholder="请选择户口性质"
        name="aac009"
        @click="showHk = true"
        v-model="newInfo.aac009"
      />
      <van-field
        input-align="right"
        label="户籍地址"
        placeholder="请填写户籍地址"
        name="aac010"
        v-model="newInfo.aac010"
      />
      <van-field
        input-align="right"
        label="通讯地址"
        placeholder="请填写通讯地址"
        name="aae006"
        v-model="newInfo.aae006"
      />
      <van-field
        readonly
        is-link
        input-align="right"
        label="出生日期"
        placeholder="出生日期"
        name="aac006"
        @click="showBirthday = true"
        v-model="newInfo.aac006"
      />
      <van-field
        input-align="right"
        type="number"
        label="联系电话"
        placeholder="请填写联系电话"
        name="aae005"
        v-model="newInfo.aae005"
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
    <!-- 性别选择 -->
    <van-popup v-model="showSex" position="bottom">
      <van-picker
        show-toolbar
        :columns="sexArr"
        @cancel="showSex = false"
        @confirm="onSex"
      />
    </van-popup>
    <!-- 民族 -->
    <van-popup v-model="showNation" position="bottom">
      <van-picker
        show-toolbar
        :columns="nationArr"
        @cancel="showNation = false"
        @confirm="onNation"
      />
    </van-popup>
    <!-- 户口性质 -->
    <van-popup v-model="showHk" position="bottom">
      <van-picker
        show-toolbar
        :columns="HkArr"
        @cancel="showHk = false"
        @confirm="onHk"
      />
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birthdayConfirm"
        @cancel="showBirthday = false"
      />
    </van-popup>
    <!-- 参保地 -->
    <van-popup v-model="showMechanism" position="bottom">
      <van-picker
        show-toolbar
        :columns="mechanismArr"
        @cancel="showMechanism = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { getAddress } from '@/utils/user'
import nationList from '@/assets/js/nation'
export default {
  data() {
    return {
      /**参保地 */
      mechanism: { text: '', value: '' },
      /**性别 */
      sex: { text: '', value: '' },
      /**户口性质 */
      hk: { text: '', value: '' },
      /**民族 */
      nation: { text: '', value: '' },
      newInfo: {
        /**身份证（不可编辑） */
        aac002: '',
        /**姓名（不可编辑） */
        aac003: '',
        /**证件类型（不可编辑） */
        aac058: '',
        /**性别 */
        aac004: '',
        /**民族 */
        aac005: '',
        /**户口性质 */
        aac009: '',
        /** 户籍地址*/
        aac010: '',
        /**通讯地址 */
        aae006: '',
        /**出生日期（YYYY-MM-DD） */
        aac006: '',
        /**联系电话 */
        aae005: '',
      },
      minDate: new Date(1949, 0, 1), // 最小时间
      maxDate: new Date(), // 最大时间
      currentDate: new Date(2000, 10, 1), // 默认选中时间
      showSex: false,
      showHk: false,
      showBirthday: false, // 生日显示
      showMechanism: false,
      showNation: false,
      oldInfo: {},
      sexCode: '',
      HkCode: '',
      mechanismArr: [],
      nationArr: this.onMap(nationList.list),
      sexArr: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
      HkArr: [
        {
          value: '10',
          text: '非农业户口（城镇）',
        },
        {
          value: '11',
          text: '本地非农业户口（本地城镇）',
        },
        {
          value: '12',
          text: '外地非农业户口（外地城镇）',
        },
        {
          value: '20',
          text: '农业户口（农村）',
        },
        {
          value: '21',
          text: '本地农业户口（本地农村）',
        },
        {
          value: '22',
          text: '外地农业户口（外地农村）',
        },
        {
          value: '30',
          text: '港澳台侨人员',
        },
        {
          value: '31',
          text: '香港特别行政区居民',
        },
        {
          value: '32',
          text: '澳门特别行政区居民',
        },
        {
          value: '33',
          text: '台湾地区居民',
        },
        {
          value: '34',
          text: '华侨',
        },
        {
          value: '40',
          text: '外国人',
        },
        {
          value: '41',
          text: '未取得永久居留权的外国人',
        },
        {
          value: '42',
          text: '取得永久居留权的外国人',
        },
        {
          value: '50',
          text: '居民户口（含农业户口、非农业户口）',
        },
        {
          value: '51',
          text: '本地居民户口',
        },
        {
          value: '52',
          text: '外地居民户口',
        },
      ],
      /**证件类型字典 */
      credentials: [
        { text: '居民身份证（户口簿）', value: '01' },
        { text: '港澳居民来往内地通行证', value: '04' },
        { text: '台湾居民来往大陆通行证', value: '06' },
        { text: '外国人永久居留证', value: '07' },
        { text: '护照', value: '08' },
      ],
    }
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getAddr().then(code => {
          if (code === 0) {
            this.wsInfo()
          }
        })
      }
    })
  },
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
    // 重组民族数据
    onMap(arr) {
      return arr.map(v => {
        return {
          text: v.name,
          value: v.code,
        }
      })
    },
    /**
     * 性别选择
     */
    onSex(v) {
      this.newInfo.aac004 = v.text
      this.sex = v
      this.sexCode = v.value
      this.showSex = false
    },
    /**民族 */
    onNation(v) {
      this.newInfo.aac005 = v.text
      this.nation = v
      this.showNation = false
    },
    // 户口性质选择
    onHk(v) {
      this.newInfo.aac009 = v.text
      this.hk = v
      this.HkCode = v.value
      this.showHk = false
    },
    // 生日选择
    birthdayConfirm(date) {
      this.newInfo.aac006 = this.formatter(date)
      this.showBirthday = false
    },
    /**参保地选择 */
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
      this.wsInfo()
    },
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
                      this.wsInfo()
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
    /**获取基本信息 */
    async wsInfo() {
      let that = this
      try {
        let { data } = await that.$http.postRequest(
          '/api/gxrswx/apply_ws_pu_edit/wsInfo',
          {
            yab139: that.mechanism.value,
          }
        )
        if (data.code === 0) {
          that.oldInfo = data.data
          that.newInfo.aac002 = data.data.aac002
          that.newInfo.aac003 = data.data.aac003
          that.newInfo.aac058 = data.data.aac058
          that.newInfo.aac004 = data.data.aac004
          that.newInfo.aac009 = data.data.aac009
          that.newInfo.aac010 = data.data.aac010
          that.newInfo.aae006 = data.data.aae006
          that.newInfo.aac006 = data.data.aac006
          that.newInfo.aae005 = data.data.aae005
          that.newInfo.aac005 = data.data.aac005
          that.credentials.forEach(v => {
            if (that.newInfo.aac058 === v.value) {
              that.newInfo.aac058 = v.text
            }
          })
          that.nationArr.forEach(v => {
            if (that.newInfo.aac005 === v.value) {
              that.newInfo.aac005 = v.text
              that.nation.text = v.text
              that.nation.value = v.value
            }
          })
          that.sexArr.forEach(v => {
            if (that.newInfo.aac004 === v.value) {
              that.newInfo.aac004 = v.text
              that.sex.text = v.text
              that.sex.value = v.value
            }
          })
          that.HkArr.forEach(v => {
            if (that.newInfo.aac009 === v.value) {
              that.newInfo.aac009 = v.text
              that.hk.text = v.text
              that.hk.value = v.value
            }
          })
        } else {
          that.$dialog({ message: data.msg })
        }
      } catch (e) {
        console.error(e)
      }
    },
    async onSubmit() {
      let that = this
      let dataArr = []
      /**变更内容 */
      let tip = ''
      let sex = ''
      let nation = ''
      let hk = ''
      /**性别是否变更 */
      if (that.oldInfo.aac004 !== that.sex.value) {
        dataArr.push({
          param: 'aac004',
          _new: that.sex.value,
          _old: that.oldInfo.aac004,
        })
        that.sexArr.forEach(v => {
          if (that.oldInfo.aac004 === v.value) {
            sex = v.text
          }
        })

        tip += `性别：${sex}->${that.sex.text}<br>`
      }
      /**民族是否变更 */
      if (that.oldInfo.aac005 !== that.nation.value) {
        dataArr.push({
          param: 'aac005',
          _new: that.nation.value,
          _old: that.oldInfo.aac005,
        })
        that.nationArr.forEach(v => {
          if (that.oldInfo.aac005 === v.value) {
            nation = v.text
          }
        })
        tip += `民族：${nation}->${that.nation.text}<br>`
      }
      /**户口性质是否变更 */
      if (that.oldInfo.aac009 !== that.hk.value) {
        dataArr.push({
          param: 'aac009',
          _new: that.hk.value,
          _old: that.oldInfo.aac009,
        })
        that.HkArr.forEach(v => {
          if (that.oldInfo.aac009 === v.value) {
            hk = v.text
          }
        })
        tip += `户口性质：${hk}->${that.hk.text}<br>`
      }
      /**户籍地址是否变更 */
      if (that.newInfo.aac010 === '') {
        that.$toast.fail({
          message: '户籍地址不能为空',
          duration: 3000,
          forbidClick: true,
        })
        return
      } else if (that.oldInfo.aac010 !== that.newInfo.aac010) {
        dataArr.push({
          param: 'aac010',
          _new: that.newInfo.aac010,
          _old: that.oldInfo.aac010,
        })
        tip += `户籍地址：${that.oldInfo.aac010}->${that.newInfo.aac010}<br>`
      }
      /**通讯地址是否变更 */
      if (that.newInfo.aae006 === '') {
        that.$toast.fail({
          message: '通讯地址不能为空',
          duration: 3000,
          forbidClick: true,
        })
        return
      } else if (that.oldInfo.aae006 !== that.newInfo.aae006) {
        dataArr.push({
          param: 'aae006',
          _new: that.newInfo.aae006,
          _old: that.oldInfo.aae006,
        })
        tip += `通讯地址：${that.oldInfo.aae006}->${that.newInfo.aae006}<br>`
      }
      /**出生日期是否变更 */
      if (that.oldInfo.aac006 !== that.newInfo.aac006) {
        dataArr.push({
          param: 'aac006',
          _new: that.newInfo.aac006,
          _old: that.oldInfo.aac006,
        })
        tip += `出生日期：${that.oldInfo.aac006}->${that.newInfo.aac006}<br>`
      }
      /**联系电话是否变更 */
      if (that.newInfo.aae005 === '') {
        that.$toast.fail({
          message: '联系电话不能为空',
          duration: 3000,
          forbidClick: true,
        })
        return
      } else if (that.oldInfo.aae005 !== that.newInfo.aae005) {
        dataArr.push({
          param: 'aae005',
          _new: that.newInfo.aae005,
          _old: that.oldInfo.aae005,
        })
        tip += `联系电话：${that.oldInfo.aae005}->${that.newInfo.aae005}<br>`
      }
      let model = {
        yab139: that.mechanism.value,
        change_list: dataArr,
      }
      if (dataArr.length !== 0) {
        that.$dialog
          .confirm({
            title: '请确认您的变更信息',
            message: `${tip}`,
          })
          .then(async () => {
            try {
              let { data } = await that.$http.postRequest(
                '/api/gxrswx/apply_ws_pu_edit/wsInfoPost',
                model,
                '正在提交'
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
          })
          .catch(() => {})
      } else {
        that.$dialog({ message: '您的个人信息没有改动，不需要进行提交。' })
      }
    },
  },
}
</script>

<style>
.modifyInfo .sub-btn {
  padding: 103px 30px 30px 30px;
}
.modifyInfo .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
</style>
