<template>
  <div class="resident-from">
    <div v-if="!isSign">
      <div class="step">
        <van-steps :active="active" active-icon="success" active-color="#38f">
          <van-step>基本信息</van-step>
          <van-step>参保信息</van-step>
          <van-step>上传材料</van-step>
        </van-steps>
      </div>
      <div class="from-info">
        <van-form @submit="onSubmit">
          <div v-if="active === 0">
            <div class="from-info-title">
              <van-cell-group>
                <van-cell>
                  <van-row>
                    <van-col span="24">社保卡进度查询</van-col>
                  </van-row>
                </van-cell>
              </van-cell-group>
            </div>
            <van-field
              required
              input-align="right"
              label="姓名"
              placeholder="请填写姓名"
              name="aac003"
              v-model="info.aac003"
            />
            <van-field
              required
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
              is-link
              label="性别"
              placeholder="请选择性别"
              name="aac004"
              @click="showSex = true"
              v-model="info.aac004"
            />
            <van-field
              readonly
              required
              input-align="right"
              label="出生日期"
              placeholder="请选择出生日期"
              is-link
              @click="showBirthday = true"
              name="aac006"
              v-model="info.aac006"
            />
            <van-field
              input-align="right"
              required
              readonly
              is-link
              label="民族"
              placeholder="请选择民族"
              name="aac005"
              @click="showNation = true"
              v-model="info.aac005"
            />
            <van-field
              input-align="right"
              required
              readonly
              is-link
              label="户口性质"
              placeholder="请选择户口性质"
              name="aac009"
              @click="showHk = true"
              v-model="info.aac009"
            />
            <van-field
              required
              input-align="right"
              label="户籍所在地址"
              placeholder="请填写户籍所在地址"
              name="aac010"
              v-model="info.aac010"
            />
            <van-field
              input-align="right"
              label="居住地址"
              placeholder="请填写居住地址"
              name="address"
              v-model="info.address"
            />
            <van-field
              required
              input-align="right"
              label="联系电话"
              placeholder="请填写联系电话"
              name="aae005"
              v-model="info.aae005"
            />
          </div>
          <div v-if="active === 1">
            <div class="from-info-title">
              <van-cell-group>
                <van-cell>
                  <van-row>
                    <van-col span="24">参保信息</van-col>
                  </van-row>
                </van-cell>
              </van-cell-group>
            </div>
            <van-field
              input-align="right"
              required
              readonly
              is-link
              label="社区所在市"
              placeholder="请选择社区所在市"
              name="city"
              @click="getCity"
              v-model="info.city"
            />
            <van-field
              input-align="right"
              required
              readonly
              is-link
              label="区县"
              placeholder="请选择区县"
              name="county"
              @click="getCounty"
              v-model="info.county"
            />
            <van-field
              input-align="right"
              required
              readonly
              is-link
              label="乡镇"
              placeholder="请选择乡镇"
              name="rural"
              @click="getRural"
              v-model="info.rural"
            />
            <van-field
              input-align="right"
              required
              readonly
              is-link
              label="社区"
              placeholder="请选择社区"
              name="community"
              @click="getCommunity"
              v-model="info.community"
            />
            <van-field
              input-align="right"
              required
              readonly
              label="参保日期"
              placeholder="请选择参保日期"
              name="aac030_170"
              v-model="info.aac030_170"
            />
            <van-field
              input-align="right"
              required
              readonly
              is-link
              label="缴费档次"
              placeholder="请选择缴费档次"
              name="caz289_170"
              @click="gradeModal"
              v-model="info.caz289_170"
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
                    1.《城乡居民基本养老保险参保登记表》
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
                  <span class="title">
                    {{ inx + 2 }}、{{ item.doc_name }}
                  </span>
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
              >提交</van-button
            >
          </div>
        </van-form>
        <div class="deployBtn">
          <div class="next-btn" v-if="active === 0 || active === 1">
            <van-button
              @click="next"
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
              class="button-large b-color"
              color="#333"
              size="large"
              >上一步</van-button
            >
          </div>
        </div>
      </div>
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

    <!-- 性别选择 -->
    <van-popup v-model="showSex" position="bottom">
      <van-picker
        show-toolbar
        :columns="sexArr"
        @cancel="showSex = false"
        @confirm="onSex"
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
    <!-- 民族选择 -->
    <van-popup v-model="showNation" position="bottom">
      <van-picker
        show-toolbar
        :columns="nation"
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
    <!-- 社区所在市 -->
    <van-popup v-model="showCity" position="bottom">
      <van-picker
        show-toolbar
        :columns="cityArr"
        @cancel="showCity = false"
        @confirm="onCity"
      />
    </van-popup>
    <!-- 区县 -->
    <van-popup v-model="showCounty" position="bottom">
      <van-picker
        show-toolbar
        :columns="countyArr"
        @cancel="showCounty = false"
        @confirm="onCounty"
      />
    </van-popup>
    <!-- 乡镇 -->
    <van-popup v-model="showRural" position="bottom">
      <van-picker
        show-toolbar
        :columns="ruralArr"
        @cancel="showRural = false"
        @confirm="onRural"
      />
    </van-popup>
    <!-- 社区 -->
    <van-popup v-model="showCommunity" position="bottom">
      <van-picker
        show-toolbar
        :columns="communityArr"
        @cancel="showCommunity = false"
        @confirm="onCommunity"
      />
    </van-popup>
    <!-- 缴费档次 -->
    <van-popup v-model="showGrade" position="bottom">
      <van-picker
        show-toolbar
        :columns="gradeArr"
        @cancel="showGrade = false"
        @confirm="onGrade"
      />
    </van-popup>
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
    <!-- 图片全屏预览 -->
    <van-image-preview v-model="showImg" :images="images" @change="onChange">
      <!-- <template v-slot:index>第{{ index }}页</template> -->
    </van-image-preview>
  </div>
</template>

<script>
import nationList from '@/assets/js/nation'
export default {
  data() {
    return {
      active: 0, // 步骤
      showSex: false, // 性别显示
      showBirthday: false, // 生日显示
      showNation: false, // 民族显示
      showHk: false, // 户口性质显示
      showCity: false, // 市级显示
      showCounty: false, // 区县
      showRural: false, // 乡镇
      showCommunity: false, // 社区
      showTime: false, // 参保日期
      showGrade: false, // 缴费档次
      showSign: false, // 显示签名
      showImg: false, // 预览表格
      isDisable: false, // 是否禁用提交/下一步
      sexArr: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
      ],
      HkArr: [
        {
          code: '10',
          text: '非农业户口（城镇）',
        },
        {
          code: '11',
          text: '本地非农业户口（本地城镇）',
        },
        {
          code: '12',
          text: '外地非农业户口（外地城镇）',
        },
        {
          code: '20',
          text: '农业户口（农村）',
        },
        {
          code: '21',
          text: '本地农业户口（本地农村）',
        },
        {
          code: '22',
          text: '外地农业户口（外地农村）',
        },
        {
          code: '30',
          text: '港澳台侨人员',
        },
        {
          code: '31',
          text: '香港特别行政区居民',
        },
        {
          code: '32',
          text: '澳门特别行政区居民',
        },
        {
          code: '33',
          text: '台湾地区居民',
        },
        {
          code: '34',
          text: '华侨',
        },
        {
          code: '40',
          text: '外国人',
        },
        {
          code: '41',
          text: '未取得永久居留权的外国人',
        },
        {
          code: '42',
          text: '取得永久居留权的外国人',
        },
        {
          code: '50',
          text: '居民户口（含农业户口、非农业户口）',
        },
        {
          code: '51',
          text: '本地居民户口',
        },
        {
          code: '52',
          text: '外地居民户口',
        },
      ],
      nation: this.onMap(nationList.list), // 民族数据
      cityArr: [], // 市级数据
      countyArr: [], // 区县
      ruralArr: [], // 乡镇
      communityArr: [], // 社区
      gradeArr: [], // 缴费档次
      minDate: new Date(1949, 0, 1), // 最小时间
      maxDate: new Date(), // 最大时间
      currentDate: new Date(2000, 10, 1), // 默认选中时间
      info: {
        aaf030: '', // 社区或村编号
        aac002: '', // 身份证号
        aac003: '', // 姓名
        aac004: '', // 性别
        aac006: '', // 出生日期（YYYYMM）
        aac005: '', // 民族代码
        aac009: '', // 户口性质
        aac010: '', // 户籍所在地址
        aac030_170: '', // 参保日期（YYYYMMDD）
        caz289_170: '', // 缴费档次
        aae005: '', // 联系电话
        cab139: '', // 参保地
        aac058: '', // 证件类型
        address: '', // 居住地址
        city: '', // 社区所在市
        county: '', // 区县
        rural: '', // 乡镇
        community: '', // 社区
      },
      sexCode: '', // 性别代号
      nationCode: '', // 民族编码
      HkCode: '', // 户口性质代码
      cityCode: '', // 市级代码
      countyCode: '', // 区县代码
      ruralCode: '', // 乡镇
      communityCode: '', // 社区
      gradeCode: '', // 缴费档次代码
      cab139: '', // 参保地代码
      aaf019: '',
      auto: require('@/assets/images/icon/autograph.png'),
      fileList: [
        {
          doc_name: '《城乡居民基本养老保险参保登记表》',
          doc_code: 'D11976',
          scan_num: '1',
          bz: '',
          doc: [],
        },
        {
          doc_name: '身份证件(正反面)和户口簿',
          doc_code: 'D11977',
          scan_num: '1',
          bz: '',
          doc: [],
        },
        {
          doc_name:
            '低保、特困人员、重度残疾人、贫困残疾人、建档立卡贫困人员等特殊群体证明材料',
          doc_code: 'D11978',
          scan_num: '1',
          bz: '',
          doc: [],
        },
      ],

      isSign: false, // 是否签名中
      tableImg: '', // 生成表格图片
      signImg: '', // 签名后的图片
      // 签名属性设置
      lineWidth: 3,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '', // 签名
      isCrop: false,
      index: 0,
      images: [],
      // 身份证验证
      matchIDCard: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      // 手机号验证
      reg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    }
  },
  created() {},
  methods: {
    prev() {
      --this.active
      this.active < 0 ? (this.active = 0) : this.active
      if (this.active === 1) {
        this.resultImg = ''
      }
    },
    async next() {
      if (this.active === 0) {
        if (this.info.aac003 === '') {
          this.$toast('请填写姓名')
          return
        }
        if (this.info.aac002 === '') {
          this.$toast('请填写身份证')
          return
        }
        if (this.info.aac004 === '') {
          this.$toast('请选择性别')
          return
        }
        if (this.info.aac006 === '') {
          this.$toast('请选择出生日期')
          return
        }
        if (this.info.aac005 === '') {
          this.$toast('请选择民族')
          return
        }
        if (this.info.aac009 === '') {
          this.$toast('请选择户口性质')
          return
        }
        if (this.info.aac010 === '') {
          this.$toast('请填写户籍所在地')
          return
        }
        if (this.info.aae005 === '') {
          this.$toast('请填写联系电话')
          return
        }
        if (!this.matchIDCard.test(this.info.aac002)) {
          this.$toast.fail('身份证号码格式不正确')
          return
        }
        if (!this.reg.test(this.info.aae005)) {
          this.$toast.fail('手机号格式不正确')
          return
        }
      }
      if (this.active === 1) {
        if (this.info.city === '') {
          this.$toast('请选择社区所在市')
          return
        }
        if (this.info.county === '') {
          this.$toast('请选择区县')
          return
        }
        if (this.info.rural === '') {
          this.$toast('请选择乡镇')
          return
        }
        if (this.info.community === '') {
          this.$toast('请选择社区')
          return
        }
        if (this.info.aac030_170 === '') {
          this.$toast('请选择参保日期')
          return
        }
        if (this.info.caz289_170 === '') {
          this.$toast('请选择缴费档次')
          return
        }
      }
      ++this.active
      this.active > 2 ? (this.active = 2) : this.active
    },
    /**
     * 性别选择
     */
    onSex(v) {
      this.info.aac004 = v.text
      this.sexCode = v.value
      this.showSex = false
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
    // 生日选择
    birthdayConfirm(date) {
      this.info.aac006 = this.formatter(date)
      this.showBirthday = false
    },
    // 参保日期
    timeConfirm(date) {
      this.info.aac030_170 = this.formatter(date)
      this.showTime = false
    },
    // 民族选择
    onNation(v) {
      this.info.aac005 = v.text
      this.nationCode = v.code
      this.showNation = false
    },
    // 户口性质选择
    onHk(v) {
      this.info.aac009 = v.text
      this.HkCode = v.code
      this.showHk = false
    },
    // 获取市级地址
    async getCity() {
      try {
        if (this.cityArr.length === 0) {
          const result = await this.getAddr(1, 0)
          if (result === 0) {
            this.showCity = true
          }
        } else {
          this.showCity = true
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 获取区县
    async getCounty() {
      if (this.cityCode === '') {
        this.$toast('请先选择社区所在市')
        return
      }
      if (this.countyArr.length === 0) {
        const result = await this.getAddr(2, this.cityCode)
        if (result === 0) {
          this.showCounty = true
        }
      } else {
        this.showCounty = true
      }
    },
    // 获取乡镇
    async getRural() {
      if (this.cityCode === '') {
        this.$toast('请先选择社区所在市')
        return
      }
      if (this.countyCode === '') {
        this.$toast('请先选择区县')
        return
      }
      if (this.ruralArr.length === 0) {
        const result = await this.getAddr(3, this.countyCode)
        if (result === 0) {
          this.showRural = true
        }
      } else {
        this.showRural = true
      }
    },
    async getCommunity() {
      if (this.cityCode === '') {
        this.$toast('请先选择社区所在市')
        return
      }
      if (this.countyCode === '') {
        this.$toast('请先选择区县')
        return
      }
      if (this.ruralCode === '') {
        this.$toast('请先选择乡镇')
        return
      }
      if (this.communityArr.length === 0) {
        const result = await this.getAddr(4, this.ruralCode)
        if (result === 0) {
          this.showCommunity = true
        }
      } else {
        this.showCommunity = true
      }
    },
    async getAddr(i, y) {
      try {
        let { data } = await this.$http.postRequest(
          '/api/gxrswx/ResidentBase/getAddr',
          {
            level: i,
            code: y,
          }
        )
        if (data.code === 0) {
          // console.log(res.data.data)
          const result = data.data.map(v => ({
            text: v.name,
            code: v.code,
          }))
          if (i === 1) {
            this.cityArr = result
          }
          if (i === 2) {
            this.countyArr = result
          }
          if (i === 3) {
            this.ruralArr = result
          }
          if (i === 4) {
            this.communityArr = result
          }
        }
        if (data.code === 3000) {
          this.$toast(data.msg)
        }
        return data.code
      } catch (error) {
        console.error(error)
      }
    },
    // 市级选择
    onCity(v) {
      this.info.city = v.text
      this.cityCode = v.code
      this.showCity = false
      // 重置区县
      this.info.county = ''
      this.countyCode = ''
      this.countyArr = []
      // 重置乡镇
      this.info.rural = ''
      this.ruralCode = ''
      this.ruralArr = []
      // 重置社区
      this.info.community = ''
      this.communityCode = ''
      this.communityArr = []
    },

    async gradeModal() {
      if (this.countyCode === '') {
        this.$toast('区县未选择')
        return
      }
      if (this.gradeArr.length === 0) {
        const res = await this.getgrade()
        if (res === 0) {
          this.showGrade = true
        }
      } else {
        this.showGrade = true
      }
    },

    // 获取缴费档次
    async getgrade() {
      try {
        let { data } = await this.$http.postRequest(
          '/api/gxrswx/Residentbase/payLevel',
          {
            addr_code_level2: this.countyCode,
          }
        )
        if (data.code === 0) {
          this.gradeArr = data.data.map(v => ({
            text: v.name,
            code: v.id,
          }))
        }
        if (data.code === 3000) {
          this.$toast(data.msg)
        }
        return data.code
      } catch (error) {
        console.error(error)
      }
    },

    // 区县选择
    onCounty(v) {
      this.info.county = v.text
      this.countyCode = v.code
      this.showCounty = false
      // 重置乡镇
      this.info.rural = ''
      this.ruralCode = ''
      this.ruralArr = []
      // 重置社区
      this.info.community = ''
      this.communityCode = ''
      this.communityArr = []
      // 重置缴费档次
      this.info.caz289_170 = ''
      this.gradeCode = ''
      this.gradeArr = []
    },
    // 乡镇选择
    onRural(v) {
      this.info.rural = v.text
      this.ruralCode = v.code
      this.showRural = false
      // 重置社区
      this.info.community = ''
      this.communityCode = ''
      this.communityArr = []
    },
    // 社区选择
    async onCommunity(v) {
      let res = await this.getAddrInfo(v.code)
      if (res === '1') {
        this.info.community = v.text
        this.communityCode = v.code
        this.showCommunity = false
        this.isDisable = false
        await this.getTime()
      } else if (res === '0') {
        this.$toast('您选择的社区暂时无法参保')
        this.isDisable = true
      }
    },
    // 获取参保日期
    async getTime() {
      let modal = {
        cab139: this.cab139,
        aac006: this.info.aac006,
        aac009: this.info.aac009,
      }
      if (modal.cab139 === '') {
        this.$toast('请选择社区')
        return
      }
      let { data } = await this.$http.postRequest(
        '/api/gxrswx/Residentbase/getAac030_170ByAac009',
        modal
      )
      if (data.code === 0) {
        this.info.aac030_170 = data.data.aac030_170
      }
    },
    // 缴费档次选择
    onGrade(v) {
      this.info.caz289_170 = v.text
      this.gradeCode = v.code
      this.showGrade = false
      console.log(this.gradeCode)
    },
    // 重组民族数据
    onMap(arr) {
      return arr.map(v => {
        return {
          text: v.name,
          code: v.code,
        }
      })
    },
    async getAddrInfo(code) {
      let modal = {
        addr_code_level4: code,
        aac003: this.info.aac003,
        aac147: this.info.aac002,
      }
      let { data } = await this.$http.postRequest(
        '/api/gxrswx/Residentbase/getAddrInfo',
        modal
      )
      if (data.code === 0) {
        this.cab139 = data.data.cab139
        this.aaf019 = data.data.aaf019
        return data.data.apply_flag
      }
      if (data.code === 2000 || data.code === 3000) {
        this.$toast(data.msg)
      }
    },
    beforeRead(i) {
      console.log(i)
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
      }
      if (res.code === 3001) {
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
    handleClick() {
      // console.log(item)
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

    // 前往签名
    async goSign(img) {
      let modal = {
        aac003: this.info.aac003, // 姓名
        aac002: this.info.aac002, // 身份证号
        aac004: this.sexCode, // 性别
        aab069: this.info.community, // 社区名称
        aac005: this.nationCode, // 民族
        aac006: this.info.aac006, // 出生年月日
        aac010: this.info.aac010, // 户籍所在地
        aae006: this.info.address, // 居住地址
        yae107: this.info.aae005, // 电话
        caz289_170: this.gradeCode, // 缴费档次
        is_poor: '', // 是否建档贫苦户
        aac030_170: this.info.aac030_170, // 参保时间
        sing_datetime: this.formatter(new Date()), // 签字时间
        write_time: this.formatter(new Date()), // 填写时间
        type: '1', // 业务类型
        sign_png: img, // 签名图片base64
      }
      console.log(modal)
      let { data } = await this.$http.postRequest(
        '/api/gxrswx/Residentbase/imagesAddMark',
        modal
      )
      if (data.code === 0) {
        // 显示签名结果
        this.tableImg = 'data:image/png;base64,' + data.data.jpeg
        this.images = []
        this.images.push(this.tableImg)
        img
          ? ((this.showSign = false), (this.signImg = this.tableImg))
          : ((this.isSign = true), (this.signImg = ''), (this.resultImg = ''))
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
    /**

* @description: base64位图片转码文件流

* @param {type}
*/

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
    // delImg(file) {
    //   console.log(file)
    // },
    async onSubmit() {
      // console.log(this.uploads)

      const filelist = this.fileList.map(v => ({
        doc_name: v.doc_name,
        doc_code: v.doc_code,
        scan_num: v.scan_num,
        bz: v.bz,
        doc: v.doc,
      }))
      let fild = false
      try {
        filelist.forEach(function(item, index) {
          if (item.doc.length === 0 && index !== 2) {
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
      const modal = {
        aaf030: this.communityCode,
        aac002: this.info.aac002,
        aac003: this.info.aac003,
        aac004: this.sexCode, // 性别
        aac006: this.info.aac006, // 出生年月日,
        aac005: this.nationCode, // 民族
        aac009: this.HkCode,
        aac010: this.info.aac010,
        aac030_170: this.info.aac030_170, // 参保时间
        caz289_170: this.gradeCode, // 缴费档次
        aae005: this.info.aae005, // 电话
        cab139: this.cab139,
        aaf019: this.aaf019,
        aac058: this.HkCode,
        file_list: filelist,
      }
      //  console.log(JSON.stringify(modal))

      this.$dialog
        .confirm({
          title: '',
          message: '是否确认提交居民参保登记',
        })
        .then(async () => {
          let { data } = await this.$http.postRequest(
            '/api/gxrswx/Residentbase/residentReg',
            modal
          )
          if (data.code === 0) {
            console.log(data)
            this.$router.push({
              name: 'ToExamine',
              query: {
                id: '',
                code: '',
              },
            })
          }
          if (data.code === 3001) {
            this.$toast(data.msg)
          }
        })
        .catch(() => {})

      // console.log(modal)
      // console.log(this.fileList)
    },
  },
}
</script>

<style>
.resident-from {
  background-color: #fff;
}
.from-info-title {
  /* padding: 30px; */
  color: #666;
  font-size: 30px;
  font-weight: bold;
}
.resident-from .from-info-title .van-hairline--top-bottom::after,
.resident-from .from-info-title .van-hairline-unset--top-bottom::after {
  border-top-width: 0;
}
.resident-from .next-btn {
  padding: 30px 30px 30px 30px;
}
.resident-from .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.resident-from .button-large.b-color {
  border-color: #f1f1f1 !important;
}
.resident-from .prev-btn {
  padding: 0 30px 30px 30px;
}
.resident-from .sub-btn {
  padding: 30px 30px 30px 30px;
}
.resident-from .button-large-sub {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.resident-from .upload-box {
  background-color: #fff;
  padding: 30px;
}
.resident-from .tips {
  color: #999999;
  font-size: 28px;
  line-height: 40px;
  border-bottom: #999999 2px dashed;
  padding-bottom: 30px;
}
.resident-from .tips .tips-title {
  color: #fb5341;
}
.resident-from .upload-box .required-red {
  color: #fb5341;
}
.resident-from .upload-box h3 {
  padding: 30px 0;
}
.resident-from .upload-box h3 .title {
  font-size: 30px;
  font-weight: 500;
  line-height: 42px;
  color: #111111;
}
.resident-from .upload-box .autograph {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: #999999 2px dashed;
}
.resident-from .upload-box .autograph .box {
  width: 180px;
  height: 180px;
  background: #ffffff;
  border: 2px dashed #3c89e4;
  border-radius: 10px;
}
.resident-from .upload-box .autograph .box-imgs {
  width: 180px;
  background: #ffffff;
  border: 2px dashed #3c89e4;
  border-radius: 10px;
}
.resident-from .upload-box .autograph .text {
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
.resident-from .upload-box .autograph .box .go-auto {
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
.resident-from .van-step__circle {
  width: 20px;
  height: 20px;
}
.resident-from .van-step--horizontal .van-step__icon {
  font-size: 30px;
}
.van-ellipsis {
  line-height: 50px;
}
</style>
