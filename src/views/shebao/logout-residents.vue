<template>
  <div class="logout-residents">
    <div v-if="!isSign">
      <div class="step">
        <van-steps :active="active" active-icon="success" active-color="#38f">
          <van-step>注销信息</van-step>
          <van-step>发放信息</van-step>
          <van-step>上传材料</van-step>
        </van-steps>
      </div>
      <van-form @submit="onSubmit" ref="refForm">
        <div v-if="active === 0">
          <div class="from-info-title">
            <van-cell-group>
              <van-cell>
                <van-row>
                  <van-col span="24">注销信息</van-col>
                </van-row>
              </van-cell>
            </van-cell-group>
          </div>
          <van-field
            readonly
            input-align="right"
            label="姓名"
            placeholder="姓名"
            name="username"
            v-model="info.username"
          />
          <van-field
            readonly
            input-align="right"
            label="身份证"
            placeholder="请填写身份证"
            name="aac002"
            v-model="info.aac002"
          />
          <van-field
            input-align="right"
            required
            readonly
            label="性别"
            placeholder="性别"
            name="aac004"
            v-model="info.aac004"
          />
          <van-field
            readonly
            required
            input-align="right"
            label="出生日期"
            placeholder="出生日期"
            name="aac006"
            v-model="info.aac006"
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
            label="户口性质"
            placeholder="户口性质"
            name="resident"
            v-model="info.resident"
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
            input-align="right"
            required
            readonly
            is-link
            label="终止原因"
            placeholder="请选择终止原因"
            name="reason"
            @click="showReason = true"
            v-model="info.reason"
          />
          <van-field
            readonly
            required
            input-align="right"
            label="终止日期"
            placeholder="请选择终止日期"
            is-link
            @click="showTime = true"
            name="time"
            v-model="info.time"
          />
        </div>
        <div v-if="active === 1">
          <div class="from-info-title">
            <van-cell-group>
              <van-cell>
                <van-row>
                  <van-col span="24">发放信息录入</van-col>
                </van-row>
              </van-cell>
            </van-cell-group>
          </div>
          <van-field
            input-align="right"
            required
            readonly
            is-link
            label="发放方式"
            placeholder="请选择发放方式"
            name="mode"
            @click="showMode = true"
            v-model="info.mode"
          />
          <van-field
            input-align="right"
            required
            readonly
            is-link
            label="银行类别"
            placeholder="请选择银行类别"
            name="bank"
            @click="showBank = true"
            v-model="info.bank"
          />
          <van-field
            input-align="right"
            label="银行户名"
            placeholder="请填写银行户名"
            name="bankName"
            v-model="info.bankName"
          />
          <van-field
            input-align="right"
            label="银行账号"
            placeholder="请填写银行账号"
            name="bankNum"
            v-model="info.bankNum"
          />
          <van-field
            input-align="right"
            required
            readonly
            is-link
            label="领取人关系"
            placeholder="请选择领取人关系"
            name="relationship"
            @click="showRelationship = true"
            v-model="info.relationship"
          />
          <van-field
            input-align="right"
            label="领取人姓名"
            placeholder="请填写领取人姓名"
            name="receiveName"
            v-model="info.receiveName"
          />
          <van-field
            input-align="right"
            label="领取人身份证"
            placeholder="请填写领取人身份证"
            name="receiveIdcard"
            v-model="info.receiveIdcard"
          />
        </div>
        <div v-if="active === 2">
          <div class="from-info-title">
            <van-cell-group>
              <van-cell>
                <van-row>
                  <van-col span="24">上传附件</van-col>
                </van-row>
              </van-cell>
            </van-cell-group>
          </div>
          <div class="upload-box">
            <div class="tips">
              <span class="tips-title">温馨提示：</span>
              单图片格式JPG、JPEG、PNG，文件大小5M以内，* 标注项为必传项。
            </div>
            <!--前往签名-->
            <div>
              <h3>
                <span class="required-red">*</span>
                <span class="title">
                  1.《城乡居民基本养老保险注销登记表》
                </span>
              </h3>
              <div class="autograph">
                <div
                  class="box just-list"
                  v-if="signImg === ''"
                  @click="goSign('')"
                >
                  <div>
                    <van-icon class=" just-list" :name="auto" size="19px" />
                    <div class="go-auto just-list">前往签名</div>
                  </div>
                </div>
                <div
                  class="just-list box-imgs"
                  @click="goSign('')"
                  v-if="signImg !== ''"
                >
                  <van-image class="img-responsive" :src="signImg" />
                </div>
                <div class="text">(点击前往签名即可自动生成登记表)</div>
              </div>
            </div>
            <!--材料上传-->
            <div v-for="(item, inx) in fileList.slice(1, 3)" :key="inx">
              <h3>
                <span v-if="inx !== 1" class="required-red">*</span>
                <span class="title"> {{ inx + 2 }}、{{ item.doc_name }} </span>
              </h3>
              <div class="autograph">
                <span>
                  <van-uploader
                    v-model="item.file"
                    multiple
                    :max-count="5"
                    :name="inx + 1"
                    :after-read="afterRead"
                    :before-delete="delImg"
                    max-size="5120byte"
                    accept="image/*,.png,.jpg,.jpeg"
                  />
                </span>
              </div>
            </div>
          </div>
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
    <div v-if="isSign">
      <van-image
        @click="showImg = true"
        class="img-responsive"
        :src="tableImg"
      />

      <div class="deployBtn" v-if="resultImg === ''">
        <div class="next-btn">
          <van-button
            class="button-large"
            @click="showSign = true"
            color="#4186fb"
            size="large"
            >开始签名</van-button
          >
        </div>
        <div class="prev-btn">
          <van-button
            plain
            @click="downSign"
            class="button-large b-color"
            color="#333"
            size="large"
            >上一步</van-button
          >
        </div>
      </div>
      <div class="deployBtn" v-if="resultImg !== ''">
        <div class="next-btn">
          <van-button
            class="button-large"
            @click="getTable"
            color="#4186fb"
            size="large"
            >上传登记表</van-button
          >
        </div>
        <div class="prev-btn">
          <van-button
            plain
            @click="showSign = true"
            class="button-large b-color"
            color="#333"
            size="large"
            >重新签名</van-button
          >
        </div>
      </div>
    </div>
    <!-- 生日 -->
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
    <!-- 个人编号 -->
    <van-popup v-model="showPerNumer" position="bottom">
      <van-picker
        show-toolbar
        :columns="perNumerArr"
        @cancel="showPerNumer = false"
        @confirm="onPerNumer"
      />
    </van-popup>
    <!-- 终止原因 -->
    <van-popup v-model="showReason" position="bottom">
      <van-picker
        show-toolbar
        :columns="reasonArr"
        @cancel="showReason = false"
        @confirm="onReason"
      />
    </van-popup>
    <!-- 发放方式 -->
    <van-popup v-model="showMode" position="bottom">
      <van-picker
        show-toolbar
        :columns="modeArr"
        @cancel="showMode = false"
        @confirm="onMode"
      />
    </van-popup>
    <!-- 领取人关系 -->
    <van-popup v-model="showRelationship" position="bottom">
      <van-picker
        show-toolbar
        :columns="relationshipArr"
        @cancel="showRelationship = false"
        @confirm="onRelationship"
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
    <!-- 签名 -->
    <van-popup v-model="showSign" position="bottom">
      <div class="van-picker__toolbar">
        <button
          type="button"
          class="van-picker__cancel"
          @click="showSign = false"
        >
          取消</button
        ><button
          type="button"
          class="van-picker__confirm"
          @click="handleGenerate"
        >
          确认
        </button>
      </div>
      <h3 class="title-sign">请用手指在虚线中绘制签名</h3>
      <div class="sign-box">
        <vue-esign
          class="border-sign"
          ref="esign"
          :width="400"
          :height="200"
          :isCrop="isCrop"
          :lineWidth="lineWidth"
          :lineColor="lineColor"
          :bgColor.sync="bgColor"
        />
        <div class="buttom-b just-list">
          <van-button plain type="default" @click="handleReset" class="mr20"
            >重新签名</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import EXIF from 'exif-js'
export default {
  data() {
    return {
      info: {
        username: '', // 姓名
        aac002: '', // 身份证
        aac004: '', // 性别
        aac006: '', // 生日
        bianhao: { text: '', value: '' }, // 个人编号
        resident: '', // 户口性质
        community: '', // 社区
        reason: '', // 终止原因
        mode: '', // 发放方式
        bank: '', // 银行类别
        bankName: '', // 银行户名
        bankNum: '', // 银行账号
        relationship: '', // 领取人关系
        receiveName: '', // 领取人姓名
        receiveIdcard: '',
        time: '',
      },
      cab139: '',
      showTime: false,
      showPerNumer: false,
      showReason: false,
      showMode: false, // 发放方式
      showRelationship: false, // 领取人关系
      showBank: false,
      minDate: new Date(1949, 0, 1), // 最小时间
      maxDate: new Date(), // 最大时间
      currentDate: new Date(2000, 10, 1), // 默认选中时间
      isSign: false, // 是否显示签名
      signImg: '', // 签名后的图片
      showSign: false, // 显示签名
      showImg: false, // 预览表格
      tableImg: '', // 生成表格图片
      // 签名属性设置
      lineWidth: 3,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '', // 签名
      isCrop: false,
      index: 0,
      images: [],
      zoomImg: '', // 缩放后的签名
      auto: require('@/assets/images/icon/autograph.png'), // 默认签名图标
      active: 0, // 步骤
      isDisable: false, // 是否禁用提交/下一步
      sexArr: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
      perNumerArr: [],
      sexCode: '',
      modeCode: '',
      relationshipCode: '',
      bankCode: '',
      // 身份证验证
      matchIDCard: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      // 手机号验证
      reg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
      /**终止原因 */
      reasonArr: [
        {
          text: '人员死亡(退休)',
          value: '1401',
        },
        {
          text: '人员出国定居(退休)',
          value: '1402',
        },
        {
          text: '人员港澳台定居(退休)',
          value: '1403',
        },
        {
          text: '养老待遇重复领取(退休)',
          value: '1404',
        },
        {
          text: '城乡转城职(退休)',
          value: '1406',
        },
        {
          text: '其他原因终止养老待遇(退休)',
          value: '1499',
        },
        {
          text: '人员死亡(在职)',
          value: '6401',
        },
        {
          text: '人员终止缴费(在职)',
          value: '6400',
        },
        {
          text: '出国定居(在职)',
          value: '6402',
        },
        {
          text: '港澳台定居(在职)',
          value: '6403',
        },
        {
          text: '重复参保(在职)',
          value: '6408',
        },
        {
          text: '参保未缴费(在职)',
          value: '6906',
        },
      ],
      reasonCode: '',
      /**发放方式 */
      modeArr: [
        {
          text: '委托银行发放',
          value: '11',
        },
        {
          text: '委托邮寄发放',
          value: '12',
        },
        {
          text: '委托街道社区代发',
          value: '13',
        },
        {
          text: '网银',
          value: '14',
        },
        {
          text: '柜台发放',
          value: '15',
        },
        {
          text: '本人直接到经办机构领取',
          value: '21',
        },
        {
          text: '指定他人直接到经办机构领取',
          value: '22',
        },
        {
          text: '单位代发（含个人委托单位领取）',
          value: '31',
        },
        {
          text: '直接对机构拨付',
          value: '41',
        },
        {
          text: '电汇',
          value: '99',
        },
      ],
      /**领取人关系 */
      relationshipArr: [
        {
          text: '本人',
          value: '0',
        },
        {
          text: '配偶',
          value: '1',
        },
        {
          text: '父母',
          value: '5',
        },
        {
          text: '子女',
          value: '2',
        },
        {
          text: '孙子、孙女或外孙子、外孙女',
          value: '4',
        },
        {
          text: '祖父母或外祖父母',
          value: '6',
        },
        {
          text: '兄、弟、姐、妹',
          value: '7',
        },
        {
          text: '单位',
          value: '9',
        },
        {
          text: '其他',
          value: '10',
        },
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

      /**附件 */
      fileList: [
        {
          doc_name: '《城乡居民基本养老保险注销登记表》',
          doc_code: 'D11988',
          scan_num: '1',
          bz: '',
          doc: [],
        },
        {
          doc_name: '申请人有效身份证件',
          doc_code: 'D11989',
          scan_num: '1',
          bz: '',
          doc: [],
        },
      ],
    }
  },
  created() {
    this.$token.getToken().then(async res => {
      if (res) {
        let res = await this.getNumberList()
        if (res === 0) {
          let user = await this.getuser()
          if (user === 0) {
            let account = await this.account()
            // state 0不可以注销 1不可以注销
            if (account.state === '0') {
              this.$dialog({ message: account.remark })
            }
          }
        }
      }
    })
  },
  mounted() {},
  methods: {
    /**下一步 */
    async next() {
      if (this.active === 0) {
        if (this.info.username === '') {
          this.$toast('姓名不能为空')
          return
        }
        if (this.info.aac002 === '') {
          this.$toast('身份证不能为空')
          return
        }
        if (this.info.aac004 === '') {
          this.$toast('性别不能为空')
          return
        }
        if (this.info.aac006 === '') {
          this.$toast('出生日期不能为空')
          return
        }
        if (this.info.bianhao.value === '') {
          this.$toast('个人编号不能为空')
          return
        }
        if (this.info.resident === '') {
          this.$toast('户口性质不能为空')
          return
        }
        if (this.info.community === '') {
          this.$toast('社区不能为空')
          return
        }
        if (this.info.reason === '') {
          this.$toast('终止原因不能为空')
          return
        }
        if (this.info.time === '') {
          this.$toast('终止日期不能为空')
          return
        }
      }
      if (this.active === 1) {
        if (this.info.mode === '') {
          this.$toast('请选择发放方式')
          return
        }
        if (this.bankCode === '') {
          this.$toast('请选择银行类别')
          return
        }
        if (this.info.bankName === '') {
          this.$toast('请填写银行户名')
          return
        }
        if (this.info.bankNum === '') {
          this.$toast('请填写银行账号')
          return
        }
        if (this.info.relationship === '') {
          this.$toast('请选择领取人关系')
          return
        }
        if (this.info.receiveName === '') {
          this.$toast('请填写领取人姓名')
          return
        }
        if (this.info.receiveIdcard === '') {
          this.$toast('请填写领取人身份证')
          return
        }
        if (!this.matchIDCard.test(this.info.receiveIdcard)) {
          this.$toast.fail('身份证号码格式不正确')
          return
        }
      }
      ++this.active
      this.active > 2 ? (this.active = 2) : this.active
    },
    /**上一步 */
    prev() {
      --this.active
      this.active < 0 ? (this.active = 0) : this.active
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
                  let account = await this.account()
                  // state 0不可以注销 1可以注销
                  if (account.state === '0') {
                    this.$dialog({ message: account.remark })
                  }
                }
              }
            }
          })
        } else {
          _this.$dialog({ message: data.msg })
        }
        return data.code
      } catch (e) {
        console.error(e)
      }
    },
    /**获取个人信息 */
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
          _this.info.username = data.data.aac003
          _this.info.aac002 = data.data.aac002
          _this.info.aac004 = data.data.aac004
          _this.info.aac006 = data.data.aac006
          _this.info.resident = data.data.aac009
          _this.info.community = data.data.aab069_af02
          _this.cab139 = data.data.cab139
        } else {
          _this.$dialog({ message: data.msg })
        }
        return data.code
      } catch (e) {
        console.error(e)
        this.$dialog({ message: '出错了，请重试' })
      }
    },
    /**验证是否可注销 */
    async account() {
      let that = this
      let { data } = await that.$http.postRequest(
        '/api/gxrswx/Resident/verifyCloseAccount',
        {
          aac001: that.info.bianhao.text,
          cab139: that.cab139,
          aac019: that.info.bianhao.value,
        }
      )
      if (data.code === 0) {
        return data.data
      }
    },
    // 切换个人编号
    onPerNumer(v) {
      this.info.bianhao = v
      this.showPerNumer = false
      this.getuser()
    },
    // 格式化时间选择格式
    formatter(date) {
      let y = date.getFullYear() // 年
      let MM = date.getMonth() + 1 // 月
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate() // 日
      d = d < 10 ? '0' + d : d

      return y + '-' + MM + '-' + d
    },
    // 终止日期
    timeConfirm(date) {
      this.info.time = this.formatter(date)
      this.showTime = false
    },
    // 终止原因
    onReason(item) {
      this.info.reason = item.text
      this.reasonCode = item.value
      this.showReason = false
    },
    /**发放方式 */
    onMode(item) {
      this.info.mode = item.text
      this.modeCode = item.value
      this.showMode = false
    },
    /**领取人关系 */
    onRelationship(item) {
      this.info.relationship = item.text
      this.relationshipCode = item.value
      this.showRelationship = false
    },
    /**银行类别 */
    onBank(item) {
      this.info.bank = item.text
      this.bankCode = item.value
      this.showBank = false
    },
    // 上传
    async afterRead(file, name) {
      //file为 你读取成功的回调文件信息
      //new 一个FormData格式的参数
      console.log(name)
      let that = this
      let sub = name.name // 索引
      let params = new FormData()
      params.append('file', file.file)
      params.append('yab139', that.cab139)
      params.append('file_type', 'IMAGE')
      let res = await that.upLoader(params) //使用上传的方法。file.file
      if (res.code === 0) {
        that.fileList[sub].doc.push({
          fileid: res.data.fileid,
          filename: res.data.filename,
          yab003: that.cab139,
        })
      } else {
        file.status = 'failed'
        file.message = '上传失败'
        that.$toast.fail(res.msg)
      }
    },
    // 点击删除图片
    delImg(file, name) {
      console.log(file, name)
      let sub = name.name
      // doc是传给后台的图片数组
      this.fileList[sub].doc.splice(name.index, 1)
      // file是图片预览的数组
      this.fileList[sub].file.splice(name.index, 1)
      // console.log(this.fileList)
    },
    // api/gxrswx/Basedata/updateFileTest 上传测试接口
    // /api/gxrswx/Basedata/updateFile 正式接口
    async upLoader(params) {
      let { data } = await this.$http.upLoaderImg(
        '/api/gxrswx/Basedata/updateFileTest',
        params
      )

      if (data.code === 0) {
        this.$toast('上传成功')
      }
      return data
    },
    /**城乡居民基本养老保险注销登记表 签名 */
    async goSign(imgs) {
      let _this = this
      // if (imgs) {
      //   imgs = await _this.compressImage(_this.base64toFile(imgs))
      // }
      // console.log(imgs)
      let modal = {
        aab069_af02: _this.info.community,
        aac003: _this.info.username,
        aac002: _this.info.aac002,
        aae160: _this.reasonCode,
        aae160_remark: _this.info.reason,
        aae138: _this.info.time,
        cae243: _this.info.receiveName,
        cae245: _this.info.receiveIdcard,
        aaf002: _this.info.bank,
        aae010: _this.info.bankNum,
        cae246: _this.info.relationship,
        sign_png: imgs,
      }
      let { data } = await _this.$http.postRequest(
        '/api/gxrswx/Imagemark/residentCloseAccount',
        modal
      )
      if (data.code === 0) {
        // 显示签名结果
        _this.tableImg = 'data:image/png;base64,' + data.data.jpeg
        _this.images = []
        _this.images.push(_this.tableImg)
        imgs
          ? ((_this.showSign = false), (_this.signImg = _this.tableImg))
          : ((_this.isSign = true),
            (_this.signImg = ''),
            (_this.resultImg = ''))
      }
    },
    // 关闭签名
    downSign() {
      this.isSign = false
    },
    // 清空签名画布
    handleReset() {
      this.$refs.esign.reset()
    },
    // 生成签名
    handleGenerate() {
      this.$refs.esign
        .generate()
        .then(res => {
          this.goSign(res)
          this.resultImg = res
          // console.log(this.resultImg)
        })
        .catch(() => {
          this.$toast('请进行签名') // 画布没有签字时会执行这里 'Not Signned'
        })
    },
    // 上传登记表
    async getTable() {
      let that = this
      let file = that.base64toFile(that.tableImg)
      console.log(file)
      let params = new FormData()
      params.append('file', file)
      params.append('yab139', that.cab139)
      params.append('file_type', 'IMAGE')
      let res = await that.upLoader(params)
      console.log(res)
      if (res.code === 0) {
        that.isSign = false
        that.fileList[0].doc = []
        that.fileList[0].doc.push({
          fileid: res.data.fileid,
          filename: res.data.filename,
          yab003: that.cab139,
        })
      }
    },
    // 压缩图片 and 旋转角度纠正
    async compressImage(im) {
      // let _this = this
      let file = im
      let fileReader = new FileReader()
      let img = new Image()
      let imgWidth = ''
      let imgHeight = ''
      // 旋转角度
      let Orientation = null
      // 缩放图片需要的canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d') // 图片大小  大于2MB 则压缩
      const isLt2MB = file.size < 2097152
      // 通过 EXIF 获取旋转角度 1 为正常  3 为 180°  6 顺时针90°  9 为 逆时针90°
      EXIF.getData(file, function() {
        EXIF.getAllTags(this)
        Orientation = EXIF.getTag(this, 'Orientation')
      })
      // 文件读取 成功执行
      fileReader.onload = function(ev) {
        // 文件base64化，以便获知图片原始尺寸
        img.src = ev.target.result
      }
      // 读取文件
      fileReader.readAsDataURL(file)
      // base64地址图片加载完毕后
      return new Promise(resolve => {
        img.onload = function() {
          imgWidth = img.width
          imgHeight = img.height
          canvas.width = img.width
          canvas.height = img.height
          // 目标尺寸
          let targetWidth = imgWidth
          let targetHeight = imgHeight
          // 大于2MB 、img宽高 > 90*40 则进行压缩
          if (!isLt2MB || imgWidth >= 90 || imgHeight >= 40) {
            // 最大尺寸
            let maxWidth = 90
            let maxHeight = 40
            if (imgWidth > maxWidth || imgHeight > maxHeight) {
              if (imgWidth / imgHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth
                targetHeight = Math.round(maxWidth * (imgHeight / imgWidth))
              } else {
                targetHeight = maxHeight
                targetWidth = Math.round(maxHeight * (imgWidth / imgHeight))
              }
            }
            // canvas对图片进行缩放
            canvas.width = targetWidth
            canvas.height = targetHeight
            // 图片大小超过 2Mb 但未旋转  则只需要进行图片压缩
            if (!Orientation || +Orientation === 1) {
              ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
            }
          }
          // 拍照旋转 需矫正图片
          if (Orientation && +Orientation !== 1) {
            switch (+Orientation) {
              case 6: // 旋转90度
                canvas.width = targetHeight
                canvas.height = targetWidth
                ctx.rotate(Math.PI / 2)
                // 图片渲染
                ctx.drawImage(img, 0, -targetHeight, targetWidth, targetHeight)
                break
              case 3: // 旋转180度
                ctx.rotate(Math.PI)
                // 图片渲染
                ctx.drawImage(
                  img,
                  -targetWidth,
                  -targetHeight,
                  targetWidth,
                  targetHeight
                )
                break
              case 8: // 旋转-90度
                canvas.width = targetHeight
                canvas.height = targetWidth
                ctx.rotate((3 * Math.PI) / 2)
                // 图片渲染
                ctx.drawImage(img, -targetWidth, 0, targetWidth, targetHeight)
                break
            }
          }
          let data = canvas.toDataURL('image/jpeg', 1)
          resolve(data)
        }
      })
    },
    base64toFile(dataurl, filename = 'file') {
      let arr = dataurl.split(',')

      let mime = arr[0].match(/:(.*?);/)[1]

      let suffix = mime.split('/')[1]

      let bstr = atob(arr[1])

      let n = bstr.length

      let u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime,
      })
    },
    onChange(index) {
      this.index = index
    },
    /**提交数据 */
    async onSubmit() {
      let that = this
      const filelist = this.fileList.map(v => ({
        doc_name: v.doc_name,
        doc_code: v.doc_code,
        scan_num: v.scan_num,
        bz: v.bz,
        doc: v.doc,
      }))
      let fild = false
      try {
        filelist.forEach(function(item) {
          if (item.doc.length === 0) {
            fild = true
          }
        })
      } catch (e) {
        console.error(e)
      }
      if (fild) {
        this.$toast('带*号为必传项，请检查')
        return
      }
      let modal = {
        /**发放方式 */
        aae145: that.modeCode,
        /**银行类别 */
        aaf002: that.bankCode,
        /**终止原因 */
        aae160: that.reasonCode,
        /**户口类型 */
        aac009: that.info.resident,
        /** 领取人关系*/
        cae246: that.relationshipCode,
        /**领取人证件号 */
        cae245: that.info.receiveIdcard,
        /**终止日期 */
        aae138: that.info.time,
        /**领取人姓名 */
        cae243: that.info.receiveName,
        /**银行户名 */
        aae009: that.info.bankName,
        /** 经办机构*/
        cab139: that.cab139,
        /**银行账号 */
        aae010: that.info.bankNum,
        /**个人编号 */
        aac001: that.info.bianhao.text,
        file_list: filelist, // 附件
      }
      console.log(modal)
      try {
        this.$dialog
          .confirm({
            title: '',
            message: '是否确认注销居民参保登记',
          })
          .then(async () => {
            let { data } = await that.$http.postRequest(
              '/api/gxrswx/Resident/closeAccountPost',
              modal,
              '正在提交...'
            )
            if (data.code === 0) {
              that.$router.push({
                name: 'ToExamineTest',
                query: {
                  id: data.data.acpt_no,
                  code: that.yab139,
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
.from-info-title {
  /* padding: 30px; */
  color: #666;
  font-size: 30px;
  font-weight: bold;
}
.logout-residents .from-info-title .van-hairline--top-bottom::after,
.logout-residents .from-info-title .van-hairline-unset--top-bottom::after {
  border-top-width: 0;
}
.logout-residents .sub-btn {
  padding: 30px 30px 30px 30px;
}
.logout-residents .sub-btn .button-large-sub {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.logout-residents .van-step__circle {
  width: 20px;
  height: 20px;
}
.logout-residents .van-step--horizontal .van-step__icon {
  font-size: 30px;
}
.logout-residents .next-btn {
  padding: 30px 30px 30px 30px;
}
.logout-residents .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.logout-residents .button-large.b-color {
  border-color: #f1f1f1 !important;
}
.logout-residents .prev-btn {
  padding: 0 30px 30px 30px;
}
.logout-residents .upload-box {
  background-color: #fff;
  padding: 30px;
}
.logout-residents .tips {
  color: #999999;
  font-size: 28px;
  line-height: 40px;
  border-bottom: #999999 2px dashed;
  padding-bottom: 30px;
}
.logout-residents .tips .tips-title {
  color: #fb5341;
}
.logout-residents .upload-box .required-red {
  color: #fb5341;
}
.logout-residents .upload-box h3 {
  padding: 30px 0;
}
.logout-residents .upload-box h3 .title {
  font-size: 30px;
  font-weight: 500;
  line-height: 42px;
  color: #111111;
}
.logout-residents .upload-box .autograph {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: #999999 2px dashed;
}
.logout-residents .upload-box .autograph .box {
  width: 180px;
  height: 180px;
  background: #ffffff;
  border: 2px dashed #3c89e4;
  border-radius: 10px;
}
.logout-residents .upload-box .autograph .box-imgs {
  width: 180px;
  background: #ffffff;
  border: 2px dashed #3c89e4;
  border-radius: 10px;
}
.logout-residents .upload-box .autograph .text {
  font-size: 24px;
  font-weight: 500;
  line-height: 33px;
  color: #999999;
  padding-top: 20px;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logout-residents .upload-box .autograph .box .go-auto {
  font-size: 28px;
  font-weight: 500;
  line-height: 40px;
  color: #287de2;
  padding-top: 20px;
}
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}
.sign-box {
  padding: 30px;
}
.border-sign {
  border: 2px solid #999;

  height: 300px;
  border-radius: 10px;
}
.title-sign {
  font-size: 30px;
  font-weight: 500;
  line-height: 42px;
  color: #999999;
  text-align: center;
}
.mr20 {
  margin-right: 20px;
}
.buttom-b {
  margin-top: 20px;
}
</style>
