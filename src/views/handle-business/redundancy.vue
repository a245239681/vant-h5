<template>
  <div class="redundancy">
    <van-form @submit="onSubmit" ref="refForm">
      <van-field
        readonly
        input-align="right"
        label="参保地"
        placeholder="请选择参保地"
        is-link
        @click="mechanismArr.length > 1 ? (showMechanism = true) : ''"
        name="mechanism"
        v-model="mechanism.text"
      />
      <van-field
        input-align="right"
        label="个人编号"
        readonly
        placeholder="请填写个人编号"
        name="bianhao"
        v-model="bianhao"
      />
      <van-field
        input-align="right"
        label="证照持有人姓名"
        readonly
        placeholder="请填写证照持有人姓名"
        name="name"
        v-model="name"
      />
      <van-field
        input-align="right"
        label="发放账号"
        readonly
        placeholder="请填写发放账号"
        name="zhanghao"
        v-model="zhanghao"
      />
      <van-field
        input-align="right"
        label="金融机构"
        readonly
        placeholder="请填写金融机构"
        name="jigou"
        v-model="jigou"
      />
      <van-field
        required
        input-align="right"
        label="联系电话"
        placeholder="请填写联系电话"
        name="iphone"
        v-model="iphone"
        :rules="[{ required: true, message: '请填写联系电话' }]"
      />
      <van-field
        required
        input-align="right"
        label="常驻地址"
        placeholder="请填写常驻地址"
        name="address"
        v-model="address"
        :rules="[{ required: true, message: '请填写常驻地址' }]"
      />
      <h3 class="h3">添加证书</h3>
      <div class="box">
        <p class="box-title">根据选项添加证书，可添加多项</p>
        <van-divider />
        <div
          class="certificate-box"
          v-for="(item, index) in certificateArr"
          :key="index"
        >
          <van-row>
            <van-col span="24" class="just-start list-h45">{{
              item.aja010
            }}</van-col>
            <van-col span="24">
              <van-row>
                <van-col span="8" class="list-h45 just-start">{{
                  item.aca111
                }}</van-col>
                <van-col span="8" class="list-h45 just-list">{{
                  item.ajc001
                }}</van-col>
                <van-col span="6" class="list-h45 just-list">
                  <span class="price-red">{{ item.yjc901 }}</span>
                </van-col>
                <van-col span="2" class="just-end">
                  <van-icon :name="del" @click="delList(index)" />
                </van-col>
              </van-row>
            </van-col>
            <van-col span="24" class="just-start list-h45">{{
              item.aac015_text
            }}</van-col>
          </van-row>
          <van-divider />
        </div>
        <div>
          <van-button
            native-type="button"
            icon="plus"
            @click="showCertificate = true"
            class="button-mall"
            >添加证书</van-button
          >
        </div>
      </div>
      <div class="uploads">
        <!--材料上传-->
        <div v-for="(item, inx) in fileList" :key="inx">
          <h3>
            <span class="required-red">*</span>
            <span class="title"> {{ item.doc_name }} </span>
          </h3>
          <div class="autograph">
            <span>
              <van-uploader
                v-model="item.file"
                multiple
                :max-count="2"
                :name="inx"
                :after-read="afterRead"
                :before-delete="delImg"
                max-size="5120byte"
                accept="image/*,.png,.jpg,.jpeg"
              />
            </span>
          </div>
        </div>
        <div class="tips">
          <span class="tips-title">温馨提示：</span>
          单张图片格式：JPG、JPEG、PNG，文件大小，5M以内。
        </div>
      </div>
      <div class="sub-btn">
        <van-button
          native-type="submit"
          class="button-large-sub"
          color="#287DE2"
          size="large"
          >提交审核</van-button
        >
      </div>
    </van-form>
    <!-- 选择参保地 -->
    <van-popup v-model="showMechanism" position="bottom">
      <van-picker
        show-toolbar
        :columns="mechanismArr"
        @cancel="showMechanism = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 添加证书 -->
    <van-dialog
      v-model="showCertificate"
      :before-close="onBeforeClose"
      @confirm="onCertificate"
      title="添加证书"
      show-cancel-button
    >
      <van-form ref="myform" class="p30 myform">
        <van-row>
          <van-col span="24" class="add-title-lable just-start"
            >证书获取日期</van-col
          >
          <van-col span="24">
            <van-field
              :style="{ background: '#F4F4F4', 'border-radius': '7px' }"
              readonly
              input-align="right"
              placeholder="证书获取日期"
              is-link
              @click="showTime = true"
              name="aja010"
              v-model="certificateObj.aja010"
              :rules="[{ required: true, message: '请选择证书获取日期' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="add-title-lable just-start"
            >证书编号</van-col
          >
          <van-col span="24">
            <van-field
              :style="{ background: '#F4F4F4', 'border-radius': '7px' }"
              input-align="right"
              placeholder="证书编号"
              name="ajc001"
              v-model="certificateObj.ajc001"
              :rules="[{ required: true, message: '请填写证书编号' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="add-title-lable just-start"
            >职业/工种</van-col
          >
          <van-col span="24">
            <van-field
              :style="{ background: '#F4F4F4', 'border-radius': '7px' }"
              input-align="right"
              placeholder="职业/工种"
              name="aca111"
              v-model="certificateObj.aca111"
              :rules="[{ required: true, message: '请填写职业/工种' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="add-title-lable just-start"
            >资格/等级</van-col
          >
          <van-col span="24">
            <van-field
              :style="{ background: '#F4F4F4', 'border-radius': '7px' }"
              readonly
              input-align="right"
              placeholder="资格/等级"
              is-link
              @click="showRank = true"
              name="aac015"
              v-model="certificateObj.aac015_text"
              :rules="[{ required: true, message: '请选择资格/等级' }]"
            />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="add-title-lable just-start"
            >补贴标准</van-col
          >
          <van-col span="24">
            <van-field
              readonly
              :style="{ background: '#F4F4F4', 'border-radius': '7px' }"
              input-align="right"
              placeholder="补贴标准"
              name="yjc901"
              v-model="certificateObj.yjc901"
            />
          </van-col>
        </van-row>
      </van-form>
    </van-dialog>
    <!-- 证书获取日期 -->
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
    <!-- 资格/等级 -->
    <van-popup v-model="showRank" position="bottom">
      <van-picker
        show-toolbar
        :columns="rankArr"
        @cancel="showRank = false"
        @confirm="onRank"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bianhao: '',
      name: '',
      zhanghao: '',
      jigou: '',
      iphone: '',
      address: '',
      // 参保地数据
      mechanismArr: [],
      mechanism: { text: '', value: '' }, // 参保地
      showMechanism: false,
      showCertificate: false,
      showTime: false,
      showRank: false,
      minDate: new Date(1949, 0, 1), // 最小时间
      maxDate: new Date(), // 最大时间
      currentDate: new Date(), // 默认选中时间
      bankNumer: '', // 银行编号
      // 证书表单
      certificateObj: {
        aja010: '',
        ajc001: '',
        aca111: '',
        aac015: '', // 等级编号
        yjc901: '',
        aac015_text: '',
      },
      del: require('@/assets/images/icon/x1.png'),
      rankArr: [
        { text: '职业资格一级(高级技师)', value: '1' },
        { text: '职业资格二级(技师)', value: '2' },
        { text: '职业资格三级(高级)', value: '3' },
        { text: '职业资格四级(中级)', value: '4' },
        { text: '职业资格五级(初级)', value: '5' },
      ],

      fileList: [
        {
          doc_name: '社会保障卡或居民身份证',
          doc_code: 'D0471',
          scan_num: '1',
          bz: '',
          doc: [],
        },
      ],
      certificateArr: [],
    }
  },
  created() {},
  mounted() {
    this.$token.getToken().then(async res => {
      if (res) {
        let res = await this.getAddress()
        if (res === 0) {
          this.getBankCardInfo()
        }
      }
    })
  },
  methods: {
    // 参保地选择
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
      this.getBankCardInfo()
    },
    /**获取参保地 */
    async getAddress() {
      let _this = this
      let { data } = await _this.$http.postRequest(
        '/api/gxrswx/Personal/addrList',
        {}
      )

      if (data.code === 0) {
        _this.mechanismArr = data.data.list.map(v => {
          return {
            text: v.name,
            value: v.code,
          }
        })
        _this.mechanismArr.length !== 0
          ? (_this.mechanism = _this.mechanismArr[0])
          : ''
        _this.$token.setToken('address', JSON.stringify(_this.mechanismArr))
      }
      return data.code
    },
    /**获取社保卡金融信息 */
    async getBankCardInfo() {
      let _this = this
      let {
        data,
      } = await _this.$http.postRequest(
        '/api/gxrswx/Socialapply/getBankCardInfo',
        { yab139: _this.mechanism.value }
      )
      if (data.code === 0) {
        console.log(data.data)
        _this.name = data.data.aac003
        _this.bianhao = data.data.aac001
        _this.zhanghao = data.data.aae010
        _this.jigou = data.data.baz838_desc
        _this.bankNumer = data.data.baz838
      }
    },
    /**
     * 上传
     */
    async afterRead(file, name) {
      let that = this
      let sub = name.name // 索引
      let params = new FormData()
      params.append('file', file.file)
      params.append('yab139', that.mechanism.value)
      params.append('file_type', 'IMAGE')
      let res = await that.upLoader(params) //使用上传的方法。file.file
      if (res?.code === 0) {
        that.fileList[sub].doc.push({
          fileid: res.data.fileid,
          filename: res.data.filename,
          yab003: that.cab139,
        })
      }
      if (res?.code === 3001) {
        file.status = 'failed'
        file.message = '上传失败'
        that.$toast.fail(res.msg)
      }
      if (!res) {
        file.status = 'failed'
        file.message = '上传失败'
      }
    },
    // api/gxrswx/Basedata/updateFileTest 上传测试接口
    // /api/gxrswx/Basedata/updateFile 正式接口
    async upLoader(params) {
      return await this.$http
        .upLoaderImg('/api/gxrswx/Basedata/updateFileTest', params)
        .then(res => {
          if (res.data.code === 0) {
            this.$toast('上传成功')
            return res.data
          }
          return new Promise()
        })
        .catch(res => {
          console.log(res)
        })
    },
    // 点击删除图片
    delImg(file, name) {
      console.log(file, name)
      let sub = name.name
      this.fileList[sub].doc.splice(name.index, 1)
      // file是图片预览的数组
      this.fileList[sub].file.splice(name.index, 1)
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
    // 参保日期
    timeConfirm(date) {
      this.certificateObj.aja010 = this.formatter(date)
      this.showTime = false
    },
    /**证书等级 */
    onRank(data) {
      this.certificateObj.aac015_text = data.text
      this.certificateObj.aac015 = data.value
      this.showRank = false
      switch (data.value) {
        case '1':
          this.certificateObj.yjc901 = 2500
          break
        case '2':
          this.certificateObj.yjc901 = 2200
          break
        case '3':
          this.certificateObj.yjc901 = 2000
          break
        case '4':
          this.certificateObj.yjc901 = 1500
          break
        case '5':
          this.certificateObj.yjc901 = 1000
          break
      }
    },
    /**添加证书 */

    onCertificate() {
      this.$refs['myform']
        .validate()
        .then(() => {
          this.certificateArr.push(this.certificateObj)
          this.showCertificate = false
          this.certificateObj = {
            aja010: '',
            ajc001: '',
            aca111: '',
            aac015: '',
            yjc901: '',
            aac015_text: '',
          }
        })
        .catch(() => {})
    },

    onBeforeClose(action, done) {
      if (action === 'confirm') {
        return done(false)
      } else {
        return done()
      }
    },
    /**删除证书 */
    delList(index) {
      console.log(index)
      this.certificateArr.splice(index, 1)
    },
    /**职业技能替补申请提交 */
    async onSubmit(values) {
      let that = this
      // 证书
      let skill_cert = this.certificateArr
      if (skill_cert.length === 0) {
        that.$toast('请添加证书')
      }
      console.log(skill_cert)
      // 附件处理
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
        this.$toast('请上传社会保障卡或居民身份证')
        return
      }
      let model = {
        yab139: that.mechanism.value, // 参保地
        aae010: values.zhanghao, // 银行卡号
        aae006: values.address, // 地址
        baz838: that.bankNumer, // 银行编号
        aae131: values.iphone, // 联系电话
        fileList: filelist, // 附件
        skill_cert: skill_cert, // 证书
      }
      let { data } = await that.$http.postRequest(
        '/api/gxrswx/Socialapply/skillSubsidyPost',
        model
      )
      if (data.code === 0) {
        console.log(data)
        that.$router.push({
          name: 'ToExamineTest',
          query: {
            id: data.data.acpt_no,
            code: that.mechanism.value,
          },
        })
      } else {
        that.$toast.fail(data.msg)
      }
    },
  },
}
</script>

<style>
.redundancy .van-field__label {
  width: 200px;
}
.redundancy .h3 {
  padding: 30px;
  font-size: 30px;
  color: #666;
}
.redundancy .box {
  background-color: #fff;
  padding: 30px;
}
.redundancy .box .box-title {
  font-size: 30px;
  color: #666;
}
.redundancy .button-mall {
  font-weight: bold;
  background: #3b86e0;
  box-shadow: 0px 5px 10px 0px rgba(59, 134, 224, 0.35);
  border-radius: 14px;
  color: #fff;
}

.redundancy .price-red {
  color: #ed2a2a;
  font-weight: bold;
  font-size: 28px;
}
.h233 {
  min-height: 233px;
}
.redundancy .list-h45 {
  height: 45px;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.just-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.prl30 {
  padding: 0 30px;
}
.p30 {
  padding: 30px;
}
.add-title-lable {
  min-height: 80px;
  font-size: 30px;
  color: #333333;
  padding-left: 30px;
}
.redundancy .btn-h120 {
  height: 120px;
}
.redundancy .btn-h120 .define {
  color: #3b86e0;
}
.redundancy .btn-h120 .close {
  color: #999999;
}
.redundancy .uploads {
  background-color: #fff;
  padding: 30px;
}
.redundancy .uploads h3 {
  padding: 0 30px 30px 0;
}
.redundancy .uploads .tips {
  color: #999999;
  font-size: 28px;
  line-height: 40px;
  padding-bottom: 30px;
}
.redundancy .uploads .tips .tips-title {
  color: #fb5341;
}
.redundancy .uploads .required-red {
  color: #fb5341;
}

.redundancy .uploads h3 .title {
  font-size: 30px;
  font-weight: 500;
  line-height: 42px;
  color: #111111;
}
.redundancy .van-field__error-message {
  text-align: right;
}
.redundancy .sub-btn {
  padding: 30px 30px 30px 30px;
}
.redundancy .button-large-sub {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.redundancy .van-field__error-message {
  display: none;
}
</style>
