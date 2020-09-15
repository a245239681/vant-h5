<template>
  <div class="modify">
    <!-- <div class="addressEnd" @click="bgshow = true">地区: {{ addr }}</div> -->
    <div class="info-title">
      <van-row>
        <van-col span="24">参保人信息</van-col>
      </van-row>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        class="modify-input"
        input-align="right"
        required
        readonly
        label="姓名"
        placeholder="请填写姓名"
        name="username"
        v-model="info.username"
      />
      <van-field
        input-align="right"
        required
        readonly
        label="身份证号"
        placeholder="请填写身份证号码"
        name="IDcard"
        v-model="info.IDcard"
      />
      <van-row class="idCard-list">
        <van-col class="h100" span="12">
          <div class="input-list van-cell van-cell--required van-field">
            <div class="van-cell__title van-field__label">
              <span>证件有效期</span>
            </div>
            <div class="van-cell__value van-field__value">
              <div class="van-field__body">
                <input
                  type="text"
                  readonly
                  v-model="info.startTime"
                  @click="showTime(1)"
                  placeholder="开始时间"
                  class="van-field__control f14"
                />
              </div>
            </div>
          </div>
        </van-col>
        <van-col class="h100" span="1">
          <div class="input-list van-cell van-field to">
            <span>至</span>
          </div>
        </van-col>
        <van-col class="h100" span="6">
          <div class="input-list van-cell van-field to">
            <div class="van-cell__value van-field__value">
              <div class="van-field__body">
                <input
                  type="text"
                  readonly
                  v-model="info.endTime"
                  :disabled="ischecked"
                  @click="showTime(2)"
                  placeholder="结束时间"
                  class="van-field__control f14"
                />
              </div>
            </div>
          </div>
        </van-col>
        <van-col class="h100" span="5">
          <div class="input-list van-cell van-field to long">
            <van-checkbox
              v-model="ischecked"
              @change="onChange(ischecked)"
              shape="square"
              >长期</van-checkbox
            >
          </div>
        </van-col>
      </van-row>
      <van-field
        class="modify-input"
        input-align="right"
        readonly
        required
        is-link
        label="职业"
        placeholder="请选择职业"
        name="job"
        v-model="info.job.text"
        @click="showVocation = true"
      />
      <van-field
        v-model="info.phone"
        input-align="right"
        label="联系电话"
        required
        placeholder="请输入手机号"
      />
      <van-field
        input-align="right"
        readonly
        is-link
        required
        label="省市/区县"
        placeholder="请选择所在省市/区县"
        name="addr"
        v-model="address"
        @click="bgshow = true"
      />
      <van-field
        input-align="right"
        readonly
        is-link
        required
        label="乡镇/街道"
        placeholder="请选择所在乡镇/街道"
        v-model="street"
        @click="Onstr"
      />
      <van-field
        name="address"
        v-model="info.address"
        input-align="right"
        label="村屯/门牌号"
        required
        :placeholder="tips"
      />

      <!-- 代理人填写 -->
      <div v-show="isAge === true">
        <p class="tips">未满16周岁参保人员需填写以下代理人信息</p>
        <van-field
          v-model="info.agentName"
          class="input-list"
          label="代理人姓名"
          required
          placeholder="请填写代理人姓名"
        />
        <van-field
          v-model="info.agentCard"
          class="input-list"
          label="代理证件号码"
          required
          placeholder="请填写代理证件号码"
        />
        <van-field
          v-model="info.agentPhone"
          class="input-phone"
          label="代理人联系电话"
          required
          placeholder="请填写代理人联系电话"
        />
      </div>
      <div class="sub-btn">
        <van-button
          native-type="submit"
          class="button-large"
          color="#287DE2"
          size="large"
          >保存</van-button
        >
      </div>
    </van-form>
    <!-- 职业选择 -->
    <van-popup v-model="showVocation" position="bottom">
      <van-picker
        show-toolbar
        :columns="vocationArr"
        @cancel="showVocation = false"
        @confirm="onVocation"
      />
    </van-popup>
    <!-- 有效日期选择 -->
    <van-popup v-model="showdate" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showdate = false"
      />
    </van-popup>
    <!-- 地区选择 -->
    <van-popup
      v-model="bgshow"
      position="bottom"
      @touchmove.stop.prevent="moveHandle"
      :style="{ height: '50%' }"
    >
      <div class="addkuang">
        <div class="addkuangtitle">
          <span>所在地区</span>
          <!-- <span id="xxx" @click="close()">✖</span> -->
        </div>
        <div class="province">
          <span
            @click="dataList()"
            :class="prishow == true ? 'spanact' : 'spannom'"
            >{{ pro }}</span
          >
          <span
            @click="citys()"
            v-show="cityspanshow == true"
            :class="cityshow == true ? 'spanact' : 'spannom'"
            >{{ cit }}</span
          >
          <span
            @click="qus()"
            v-show="quspanshow == true"
            :class="qushow == true ? 'spanact' : 'spannom'"
            >{{ qu }}</span
          >
          <!-- <span
            @click="streets()"
            v-show="streetspanshow == true"
            :class="streetshow == true ? 'spanact' : 'spannom'"
            >{{ street }}</span
          > -->
        </div>
        <div class="chooseadd">
          <div
            ref="pro1"
            v-show="prishow == true"
            class="provinceEach"
            v-for="(item, key) in proList"
            :key="key"
            @click="cityfun(item.region_name, item.region_code)"
          >
            {{ item.region_name }}
          </div>
          <div
            ref="cit2"
            v-show="cityshow == true"
            class="provinceEach"
            v-for="(item, i) in citList"
            :key="'citList-' + i"
            @click="qufun(item.region_name, item.region_code)"
          >
            {{ item.region_name }}
          </div>
          <!-- <div
            ref="street4"
            v-show="qushow == true"
            class="provinceEach"
            v-for="(item, inx) in quList"
            :key="'quList-' + inx"
            @click="streetfun(item.region_name, item.region_code)"
          >
            {{ item.region_name }}
          </div> -->
          <div
            ref="qu4"
            v-show="qushow == true"
            class="provinceEach"
            v-for="(item, index) in quList"
            :key="'quList-' + index"
            @click="endlist(item.region_name, item.region_code)"
          >
            {{ item.region_name }}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 街道选择 -->
    <van-popup v-model="showStreet" position="bottom">
      <van-picker
        show-toolbar
        :columns="streetArr"
        @cancel="showStreet = false"
        @confirm="onStree"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        /**
         * 姓名
         */
        username: '',
        /**
         * 身份证
         */
        IDcard: '',
        /**
         * 身份证开始日期
         */
        startTime: '',
        /**
         * 身份证结束日期
         */
        endTime: '',
        /**
         * 身份证长期
         */
        is_long: '0',
        /**
         * 职业选择
         */
        job: {
          text: '',
          value: '',
        },
        /**
         * 联系电话
         */
        phone: '',
        /**
         * 详细地址
         */
        address: '',
        /**
         * 代理人姓名
         */
        agentName: '',
        /**
         * 代理人证件号
         */
        agentCard: '',
        /**
         * 代理人联系电话
         */
        agentPhone: '',
      },
      tips: '小区/单元/室或村/屯/门牌号',
      /**
       * 身份证是否长期选择
       */
      ischecked: false,
      /**
       * 最小时间
       */
      minDate: new Date(1950, 0, 1),
      /**
       * 最大时间
       */
      maxDate: new Date(2099, 10, 1),
      /**
       * 选中时间
       */
      currentDate: new Date(),
      /**
       * 有效日期选择
       */
      showdate: false,
      /**
       * 职业
       */
      showVocation: false,
      show: false,
      /**
       * 街道显示
       */
      showStreet: false,
      /**
       * 通讯地址
       */
      address: '',
      bgshow: false,
      proList: [],
      citList: [],
      quList: [],
      streetList: [],
      prishow: true,
      cityshow: false,
      qushow: false,
      streetshow: false,
      cityspanshow: false,
      quspanshow: false,
      streetspanshow: false,
      pro: '请选择',
      cit: '请选择',
      qu: '请选择',
      street: '',
      /**
       * 省级代码
       */
      ProCode: '',
      /**
       * 市级代码
       */
      cityCode: '',
      /**
       * 区代码
       */
      regionCode: '',
      /**
       * 乡镇/街道代码
       */
      streetCode: '',
      /**
       * 是否为16周岁以下
       */
      isAge: false,
      /**
       * 职业数组
       */
      vocationArr: [
        {
          text: '公务员',
          value: '01',
        },
        {
          text: '事业单位员工',
          value: '02',
        },
        {
          text: '公司职员',
          value: '03',
        },
        {
          text: '军人警察',
          value: '04',
        },
        {
          text: '工人',
          value: '05',
        },
        {
          text: '农民',
          value: '06',
        },
        {
          text: '管理人员',
          value: '07',
        },
        {
          text: '技术人员',
          value: '08',
        },
        {
          text: '私营业主',
          value: '09',
        },
        {
          text: '文体明星',
          value: '10',
        },
        {
          text: '自由职业者',
          value: '11',
        },
        {
          text: '学生',
          value: '12',
        },
        {
          text: '无职业',
          value: '13',
        },
      ],
      /**
       * 街道数组
       */
      streetArr: [],
    }
  },
  mounted: function() {
    this.dataList()
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getUserinfo()
      }
    })
  },
  methods: {
    moveHandle() {},
    /**
     * 获取参保人信息
     */
    getUserinfo() {
      this.$http.postJson('/api/gxrswx/Card/cardStatus', {}, res => {
        if (res.data.code === 0) {
          // console.log(res)
          this.info.username = res.data.data.name
          this.info.IDcard = res.data.data.idcard
          // this.info.IDcard = '452201201012181235'
          let iden = this.info.IDcard
          if (iden === '') return
          let myDate = new Date()
          let age = myDate.getFullYear() - iden.substring(6, 10) - 1
          if (age < 16) {
            this.isAge = true
          }
        } else if (res.data.code === 1001 || res.data.code === 1002) {
          localStorage.removeItem('XX-Token')
          this.$token.getToken().then(res => {
            if (res) {
              this.getUserinfo()
            }
          })
        } else if (res.data.code === 1004 || res.data.code === 3000) {
          this.$dialog.alert({
            message: res.data.msg,
          })
        } else {
          this.$toast.fail(res.data.msg)
        }
      })
    },
    /**
     * 身份证有效期选择
     */
    showTime(t) {
      this.isTime = t
      this.showdate = true
    },
    /**
     * 日期选择
     */
    onConfirm(date) {
      if (this.isTime === 1) {
        this.info.startTime = this.formatter(date)
      } else if (this.isTime === 2) {
        this.info.endTime = this.formatter(date)
      }
      //   console.log(date)
      this.showdate = false
    },
    /**
     * 街道选择
     */
    onStree(val) {
      this.street = val.text
      this.streetCode = val.value
      this.showStreet = false
      this.street === '其他'
        ? (this.tips = '乡镇/街道,小区/单元/室或村/屯/门牌号')
        : (this.tips = '小区/单元/室或村/屯/门牌号')
    },
    /**
     * 格式化日期
     */
    formatter(date) {
      let y = date.getFullYear() // 年
      let MM = date.getMonth() + 1 // 月
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate() // 日

      return y + '-' + MM + '-' + d
    },
    // 长期设置
    onChange(ev) {
      ev
        ? ((this.info.endTime = '长期'), (this.info.is_long = '1'))
        : ((this.info.endTime = ''), (this.info.is_long = '0'))
    },
    /**
     * 职业选择
     */
    onVocation(value) {
      this.info.job = value
      this.showVocation = false
    },
    /**
     * 籍贯地区选择
     */
    getAddress: function() {
      this.bgshow = true
    },
    dataList: function() {
      // this.proList = address
      // window.console.log(address);
      this.$http.postJson(
        '/api/gxrswx/Address/regionChildCard',
        { parent_region_code: '100000000000' },
        res => {
          if (res.data.code === 0) {
            this.proList = res.data.data.list
            this.proList.push(
              {
                parent_region_code: '',
                region_code: '',
                region_level: '',
                region_name: '',
              },
              {
                parent_region_code: '',
                region_code: '',
                region_level: '',
                region_name: '',
              },
              {
                parent_region_code: '',
                region_code: '',
                region_level: '',
                region_name: '',
              }
            )
          }
        }
      )
      this.prishow = true
      this.cityshow = false
      this.qushow = false
      this.streetshow = false
    },
    cityfun: function(e, n) {
      if (e === '') {
        return
      }
      this.pro = e
      this.ProCode = n
      // this.citList = e
      this.$http.postJson(
        '/api/gxrswx/Address/regionChildCard',
        { parent_region_code: n },
        res => {
          if (res.data.code === 0) {
            this.citList = res.data.data.list
            this.citList.push(
              {
                parent_region_code: '',
                region_code: '',
                region_level: '',
                region_name: '',
              },
              {
                parent_region_code: '',
                region_code: '',
                region_level: '',
                region_name: '',
              }
            )
          }
        }
      )
      this.cityspanshow = true
      this.quspanshow = false
      this.streetspanshow = false

      this.prishow = false
      this.cityshow = true
      this.qushow = false
      this.streetshow = false
      this.cit = '请选择'
      this.qu = '请选择'
      this.street = '请选择'
    },
    citys: function() {
      this.prishow = false
      this.cityshow = true
      this.qushow = false
      this.streetshow = false
    },
    qus: function() {
      this.prishow = false
      this.cityshow = false
      this.qushow = true
      this.streetshow = false
    },
    qufun: function(e, n) {
      if (e === '') {
        return
      }
      this.cit = e
      this.cityCode = n
      this.$http.postJson(
        '/api/gxrswx/Address/regionChildCard',
        { parent_region_code: n },
        res => {
          if (res.data.code === 0) {
            this.quList = res.data.data.list
            this.quList.push(
              {
                parent_region_code: '',
                region_code: '',
                region_level: '',
                region_name: '',
              },
              {
                parent_region_code: '',
                region_code: '',
                region_level: '',
                region_name: '',
              }
            )
          }
        }
      )
      this.quspanshow = true
      this.streetspanshow = false

      this.prishow = false
      this.cityshow = false
      this.qushow = true
      this.streetshow = false

      this.qu = '请选择'
      // this.street = '请选择'
    },
    streets: function() {
      this.prishow = false
      this.cityshow = false
      this.qushow = false
      this.streetshow = true
    },
    streetfun: function(e, n) {
      if (e === '') {
        return
      }
      this.qu = e
      this.regionCode = n
      // this.streetList = e
      this.$http.postJson(
        '/api/gxrswx/Address/regionChildCard',
        { parent_region_code: n },
        res => {
          if (res.data.code === 0) {
            this.streetList = res.data.data.list
          }
        }
      )
      this.streetspanshow = true
      this.prishow = false
      this.cityshow = false
      this.qushow = false
      this.streetshow = true

      // this.street = '请选择'
    },
    endlist: function(e, n) {
      if (e === '') {
        return
      }
      this.qu = e
      this.regionCode = n
      this.getStreet(n)
      // this.street = e
      // this.streetCode = n
      this.bgshow = false
      this.address = this.pro + ',' + this.cit + ',' + this.qu
      // this.$emit('sendValueToParent',this.pro,this.cit,this.qu,false);
    },

    close: function() {
      this.bgshow = false
      // this.$emit('sendValueToParent',this.pro,this.cit,this.qu,false);
    },

    /**
     * 获取街道
     */
    getStreet(n) {
      this.$http.postJson(
        '/api/gxrswx/Address/regionChildCard',
        { parent_region_code: n },
        res => {
          if (res.data.code === 0) {
            this.streetArr = res.data.data.list.map(v => {
              return {
                text: v.region_name,
                value: v.region_code,
              }
            })
          }
        }
      )
    },
    Onstr() {
      if (this.streetArr.length === 0) {
        this.$dialog.alert({
          message: '请先选择省市/区县',
        })
        return
      }
      this.showStreet = true
    },
    /**
     * 表单提交
     */
    onSubmit() {
      let that = this
      /**
       * 身份证验证
       */
      const matchIDCard = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      /**
       * 手机号码验证
       */
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      let model = {
        /**
         * 身份证截止日期
         */
        aac059: that.info.endTime,
        /**
         * 是否为长期
         */
        is_long: that.info.is_long,
        /**
         * 职业
         */
        bac025: that.info.job.value,
        /**
         * 联系电话
         */
        bae017: that.info.phone,
        /**
         * 省
         */
        province_code: that.ProCode,
        /**
         * 市
         */
        city_code: that.cityCode,
        /**
         * 区
         */
        district_code: that.regionCode,
        /**
         * 街道/乡镇
         */
        street_code: that.streetCode,
        /**
         * 详细地址
         */
        address: that.info.address,
        /**
         * 代理人姓名
         */
        bab309: that.info.agentName,
        /**
         * 代理人身份证
         */
        bab310: that.info.agentCard,
        /**
         * 代理人电话
         */
        bab311: that.info.agentPhone,
      }
      if (that.info.startTime === '' && that.info.is_long === '0') {
        this.$toast.fail('请选择证件有效期')
        return
      }
      if (model.bac025 === '') {
        this.$toast.fail('请选择职业')
        return
      }
      if (model.bae017 === '') {
        this.$toast.fail('请输入联系电话')
        return
      }
      if (!reg.test(model.bae017)) {
        this.$toast.fail('手机号格式不正确')
        return
      }
      if (that.address === '') {
        this.$toast.fail('请选择省市/区县')
        return
      }
      if (model.street_code === '') {
        this.$toast.fail('请选择乡镇/街道')
        return
      }
      if (model.address === '') {
        this.$toast.fail('请输入详细地址')
        return
      }
      /**
       * 参保人未满16周岁时验证代理人填写信息
       */
      if (that.isAge) {
        if (model.bab309 === '') {
          this.$toast.fail('请输入代理人姓名')
          return
        }
        if (model.bab310 === '') {
          this.$toast.fail('请输入代理人身份证号码')
          return
        }
        if (!matchIDCard.test(model.bab310)) {
          this.$toast.fail('代理人身份证号码格式不正确')
          return
        }
        if (model.bab311 === '') {
          this.$toast.fail('请输入代理人电话')
          return
        }
        if (!reg.test(model.bab311)) {
          this.$toast.fail('代理人电话格式不正确')
          return
        }
      }

      that.$http.postJson('/api/gxrswx/Card/cardInfoEditor', model, res => {
        if (res.data.code === 0) {
          // that.$dialog.alert({ message: '修改成功' })
          that.$dialog
            .alert({
              message: '修改成功',
            })
            .then(() => {
              that.$router.push('/baoban')
            })
        } else if (res.data.code === 3001) {
          that.$dialog.alert({ message: res.data.msg })
        } else {
          that.$dialog.alert({ message: '修改失败，稍后重试' })
        }
      })
    },
  },
}
</script>

<style>
#Address {
  width: 100%;
}

.addressEnd {
  font-size: 32px;
}

.blackbg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #333;
  z-index: 1000;

  max-height: 100%;
  overflow-y: auto;

  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  -webkit-overflow-scrolling: touch;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  /* -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0); */
}

.addkuang {
  width: 100%;
  height: 50%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
}

.addkuangtitle {
  line-height: 80px;
  font-size: 28px;
  text-align: center;
  color: #999;
  position: relative;
  letter-spacing: 0.01rem;
}

#xxx {
  position: absolute;
  right: 24px;
}

.province {
  width: 100%;
  height: 60px;
  border-bottom: 0.01rem solid #f5f5f5;
  margin-top: 0.05rem;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}

.spannom {
  margin-left: 24px;
  line-height: 60px;
  font-size: 28px;
  height: 60px;
  border-bottom: none;
}

.spannom1 {
  margin-left: 24px;
  line-height: 60px;
  font-size: 28px;
  height: 60px;
  border-bottom: none;
}

.spanact {
  margin-left: 24px;
  line-height: 60px;
  font-size: 28px;
  height: 60px;
  border-bottom: 0.01rem solid #e31336;
}

.chooseadd {
  width: 100%;
  height: 100%;
  padding-left: 0.12rem;
  overflow-x: hidden;
  padding-bottom: 140px;
}

.provinceEach {
  width: 100%;
  height: 60px;
  font-size: 28px;
  line-height: 60px;
}

@media screen and (max-width: 400px) {
  #Address {
    width: 100%;
  }

  .blackbg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    color: #333;
    z-index: 1000;
  }

  .addkuang {
    width: 100%;
    height: 50%;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
  }

  .addkuangtitle {
    line-height: 80px;
    font-size: 28px;
    text-align: center;
    color: #999;
    position: relative;
    letter-spacing: 0.01rem;
  }

  #xxx {
    position: absolute;
    right: 0.12rem;
  }

  .province {
    width: 100%;
    height: 60px;
    border-bottom: 0.01rem solid #f5f5f5;
    margin-top: 0.05rem;
  }

  .spannom {
    display: inline-block;
    margin-left: 24px;
    line-height: 60px;
    font-size: 28px;
    height: 60px;
    border-bottom: none;
  }

  .spannom1 {
    display: inline-block;
    margin-left: 24px;
    line-height: 60px;
    font-size: 28px;
    height: 60px;
    border-bottom: none;
  }

  .spanact {
    display: inline-block;
    margin-left: 24px;
    line-height: 60px;
    font-size: 28px;
    height: 60px;
    border-bottom: 0.01rem solid #e31336;
  }

  .chooseadd {
    width: 100%;
    height: 100%;
    padding-left: 0.12rem;
    overflow-x: hidden;
    padding-bottom: 140px;
  }

  .provinceEach {
    width: 100%;
    height: 76px;
    font-size: 28px;
    line-height: 76px;
  }
}
.info-title {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
}
.modify .van-cell {
  padding: 26px 32px;
}
.idCard-list {
  height: 100px;
  position: relative;
}
.idCard-list .van-cell {
  height: 100px;
  padding: 26px 0 26px 32px;
}

.idCard-list .to.van-cell {
  padding: 26px 0 26px 0;
}
.idCard-list .to.long.van-cell {
  padding: 26px 32px 26px 0;
}
.idCard-list .h100 {
  height: 100px;
  line-height: 100px;
}
.idCard-list .van-checkbox__icon {
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.idCard-list .van-checkbox__label {
  line-height: 48px;
}
.idCard-list::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 32px;
  bottom: 0;
  left: 32px;
  border-bottom: 2px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  width: 92%;
}
.modify .tips {
  padding: 30px;
  color: #666;
  font-size: 30px;
}
.modify .sub-btn {
  padding: 103px 30px 30px 30px;
}
.modify .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.input-phone .van-field__label {
  width: 200px;
}
</style>
